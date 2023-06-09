import { lazy, useEffect, useRef, useState } from "react";
import blogConfig from "../blog.config";
import {
  handleKeyBoard,
  handleScroll,
  handleTouch,
} from "../utils/eventHandler";
import getAxios from "../utils/getAxios";
import { blogInfo, getBlogRes } from "../types";
import { useLoaderData } from "react-router-dom";
import SingleRow from "../components/ home/SingleRow";


const TypingWord = lazy(() => import("../components/public/typingWord"));
const ChatBox = lazy(() => import("../components/ home/ChatBox"));
export default function Home() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const headerContainer = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loaderData = useLoaderData() as getBlogRes;
  const [blogList, setBlogList] = useState<Array<blogInfo>>(
    loaderData.data.blogs
  );
  document.addEventListener("scroll", (e) => {
    e.stopPropagation();
  });
  useEffect(() => {
    const handler: (e: WheelEvent) => void = (e: WheelEvent) => {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleScroll(e, headerContainer.current, mainContainer.current);
      }
    };
    function mobileHandler(e: TouchEvent) {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleTouch(
          container.current,
          headerContainer.current,
          mainContainer.current,
          e
        );
      }
    }
    function keyboardHandler(e: KeyboardEvent) {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleKeyBoard(e, headerContainer.current, mainContainer.current);
      }
    }
    if (container.current) {
      container.current.addEventListener("wheel", (e) => {
        e.preventDefault();
        handler(e);
      });
      container.current.addEventListener("touchstart", (e) => {
        e.preventDefault();
        mobileHandler(e);
      });
      document.addEventListener("keyup", (e) => {
        keyboardHandler(e);
      });
    }
    if (mainContainer.current) {
      let isGoingToTop = false;
      mainContainer.current.addEventListener("wheel", (e) => {
        if (!mainContainer.current?.scrollTop && e.deltaY < 0) {
          e.preventDefault();
          if (isGoingToTop) return;
          isGoingToTop = true;
          headerContainer.current?.scrollIntoView({
            behavior: "smooth",
          });
          setTimeout(() => {
            isGoingToTop = false;
          }, 800);
        }
        e.stopPropagation();
      });
      mainContainer.current.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
      mainContainer.current.addEventListener("touchend", (e) => {
        e.stopPropagation();
      });
    }
    return () => {
      if (container.current) {
        container.current.removeEventListener("wheel", (e) => {
          e.preventDefault();
          handler(e);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
        container.current.removeEventListener("touchstart", (e) => {
          e.preventDefault();
          mobileHandler(e);
        });
        document.removeEventListener("keyup", (e) => {
          keyboardHandler(e);
        });
      }
    };
  }, []);
  return (
    <div className="h-screen overflow-y-scroll non-scrollbar" ref={container}>
      {
        blogConfig.chatBox? <ChatBox /> : null
      }
      <div
        ref={headerContainer}
        className="relative w-full h-screen flex gap-[1rem] flex-col items-center justify-center bg-radial-transparent-to-white"
      >
        <img
          src={blogConfig.avatar}
          alt=""
          className="block w-[5rem] h-[5rem] border-blue-400 border-[1px] rounded-full hover:shadow-md hover:shadow-blue-200 transition-all"
        />
        <p className="font-bold text-2xl">
          <TypingWord time={200} content={blogConfig.title} />
        </p>
        <p>
          <TypingWord time={100} content={blogConfig.introduction} />
        </p>
        {blogConfig.homeVideo ? (
          <>
            <video
              src={blogConfig.homeVideo}
              className="-z-10 object-cover w-full h-full absolute top-0 left-0"
              autoPlay
              loop
              muted
              controls={false}
            ></video>
          </>
        ) : null}
        {blogConfig.homeBackground ? (
          <>
            <img
              src={blogConfig.homeBackground}
              className="-z-10 object-fill w-full h-full absolute top-0 left-0"
            />
          </>
        ) : null}
      </div>
      <div
        className="w-full h-screen overflow-y-auto"
        ref={mainContainer}
      >
        {
          blogList.map((blogInfo,index) => <SingleRow key={blogInfo.id} blogInfo={blogInfo} index={index} />)
        }
      </div>
    </div>
  );
}
