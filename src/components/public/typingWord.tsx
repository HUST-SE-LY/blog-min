/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

interface typingWordProps {
  time: number;
  content: string;
}

export default function TypingWord(props: typingWordProps) {
  const [word, setWord] = useState("");
  useEffect(() => {
    const contentArray = props.content.split("");
    const interval = setInterval(() => {
      if(contentArray.length === 1) {
        clearInterval(interval)
      }
      setWord((prev) => prev + contentArray.shift());
    },props.time)
  },[])
  return <>{word}</>
}