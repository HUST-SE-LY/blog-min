import { fetchEventSource } from '@microsoft/fetch-event-source';
import { Dispatch } from 'react';

interface responseJsonType {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    delta: { content: string } | Record<string, never>;
    finish_reason: string | null;
    index: number;
  }>;
}
export async function fetchData(
  key: string,
  message: string,
  setData: Dispatch<React.SetStateAction<string>>,
  close: (data:string) => void
) {
  const url = 'https://api.openai.com/v1/chat/completions';
  const apiKey = key;
  let data = '';
  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
    stream: true,
  };
  await fetchEventSource(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(requestData),
    // eslint-disable-next-line @typescript-eslint/require-await
    async onopen(response) {
      if (
        response.ok &&
        response.headers.get('content-type') === 'text/event-stream'
      ) {
        // 可以补充代表连接成功的信息
      } else if (
        response.status >= 400 &&
        response.status < 500 &&
        response.status !== 429
      ) {
        // 可以补充代表出现400,500,429错误的信息
        data = "出错了"
      } else {
        // 可以补充代表出现其他错误的信息
        data = "出错了"
      }
    },
    onmessage(event) {
      if (event.data === '[DONE]') {
        // 可以补充代表结束的信息
        return;
      }
      const jsonData = JSON.parse(event.data) as responseJsonType;
      if (jsonData.choices[0].finish_reason === 'stop') {
        return;
      }
      if (jsonData.choices[0].delta.content !== undefined) {
        data += jsonData.choices[0].delta.content;
        setData(data);
        return ;
      }
    },
    onclose() {
      close(data);
    },
  });
}