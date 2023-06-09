import { useEffect, useRef, useState } from "react";
import blogConfig from "../../blog.config";
import { chatListElement } from "../../types";
import { fetchData } from "../../utils/fetchData";
import SingleInfoRes from "./ChatBox/SingleInfoRes";
import SingleInfoReq from "./ChatBox/SingleInfoReq";
import chatSVG from "/src/assets/chat.svg";

export default function ChatBox() {
  const [showBox, setShowBox] = useState(false);
  const [reqContent, setReqContent] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [currentRes, setCurrentRes] = useState("");
  const [chatList, setChatList] = useState<Array<chatListElement>>([]);
  const main = useRef<HTMLDivElement>(null);

  let id = 0;
  const systemPrompt = "现在假设你是一个赛博朋克柴犬，能回答我提出的问题，你的回答方式要像赛博朋克柴犬说话的样子。我的问题是："
  async function send() {
    if (!reqContent && !apiKey) return;
    const list = [...chatList, { isReq: true, content: reqContent }];
    setChatList(list);
    await fetchData(apiKey, systemPrompt + reqContent, setCurrentRes, (data) => {
      setCurrentRes("");
      setChatList([...list, { isReq: false, content: data }]);
    });
  }
  useEffect(() => {
    if(main.current) {
      main.current.scrollTop = main.current.scrollHeight;
    }
  },[currentRes]);
  return (
    <div
      className={`fixed w-fit h-full flex gap-[1rem] z-[900] items-center transition-all ${
        showBox ? "right-0" : "right-[-400px]"
      }`}
    >
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-[1px] border-blue-200 bg-white cursor-pointer"
        onClick={() => {
          setShowBox(!showBox);
        }}
        onTouchStart={() => {
          setShowBox(!showBox);
        }}
      >
        <img src={chatSVG} alt="" />
      </div>
      <div className="w-[400px] h-full bg-white border-l-2 border-blue-300 flex flex-col">
        <div className="w-full h-fit p-[26px] flex border-b-[1px] border-blue-200 gap-[1rem] justify-center items-center">
          <img
            src="/src/assets/cyberCheems.jpg"
            className="w-[60px] h-[60px] rounded-full object-cover border-2  border-blue-200"
            alt=""
          />
          <p>赛博柴犬</p>
        </div>
        <div
          onWheel={(e) => {
            e.stopPropagation();
          }}
          className=" h-full flex-1 overflow-y-auto p-[0.5rem]"
          ref={main}
        >
          <SingleInfoRes res={blogConfig.chatWelcomeWord} />
          {chatList.map((info) => {
            if (info.isReq) {
              return <SingleInfoReq key={id++} req={info.content} />;
            } else {
              return <SingleInfoRes key={id++} res={info.content} />;
            }
          })}
          {currentRes.length ? <SingleInfoRes res={currentRes} /> : null}
        </div>
        <div className="h-[300px] p-[20px_40px] w-full mt-[auto] border-[1px] border-blue-200 flex flex-col gap-[10px] justify-center items-center">
          <input
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
            }}
            className="w-full p-[0.5rem_1rem] rounded-md bg-gray-100 outline-blue-200"
            placeholder="输入你的openAI apiKey"
          />
          <textarea
            value={reqContent}
            onChange={(e) => {
              setReqContent(e.target.value);
            }}
            className="w-full h-[100px] bg-gray-100 p-[0.5rem_1rem] outline-blue-200 rounded-md"
            placeholder="和赛博柴犬聊天"
          ></textarea>
          <button
            className="w-full bg-blue-400 transition-all hover:bg-blue-500 text-white py-[0.5rem] rounded"
            onClick={() => {
              send();
            }}
          >
            发送
          </button>
        </div>
      </div>
    </div>
  );
}
