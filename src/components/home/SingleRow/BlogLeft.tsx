import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function BlogLeft(props: blogTowColProps) {
  const mainBox = useRef<HTMLDivElement>(null);
  const [showMain, setShowMain] = useState(false);
  const navigate = useNavigate();
  const nav = () => {
    props.onJump();
    setTimeout(() => {
      navigate(`/blog/${props.blogInfo.id}`);
    }, 500);
  };
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0) {
          setShowMain(true);
          observer.disconnect();
        }
      },
      {
        threshold: [0, 0.1],
      }
    );
    if (mainBox.current) {
      observer.observe(mainBox.current);
    }
  }, []);

  if (props.isMain) {
    return (
      <div
        ref={mainBox}
        className="border-r-[8px] border-[#D6EAF8] text-right flex gap-[20px] justify-end items-center"
      >
        {showMain ? (
          <div
            onClick={nav}
            className={`animate-comeInFromLeft text-[white] animate-pause shadow-blue-400 shadow-2xl hover:bg-blue-500/50 max-sm:h-[100px] bg-blue-500/30 transition-colors duration-500  backdrop-blur-md max-sm:p-[1rem] max-sm:w-[160px] max-sm:ml-[5px] cursor-pointer animate-floating rounded-md relative w-[400px] h-[200px] p-[32px] `}
          >
            <div className="absolute blog-pixel-decoration-left left-1/2 top-1/2 translate-x-[-6px] translate-y-[-6px]"></div>
            <div className="absolute top-[12px] left-[-12px] w-[12px] h-[176px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute top-[-12px] left-[12px] w-[376px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[12px] right-[-12px] w-[12px] h-[176px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute top-[2px] left-[-6px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute top-[-8px] left-[0px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[2px] left-[-6px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[-8px] left-[0px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[2px] right-[-6px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[-8px] right-[0px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute top-[2px] right-[-6px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute top-[-8px] right-[0px] w-[12px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <div className="absolute bottom-[-12px] right-[12px] w-[376px] h-[12px] bg-[#D6EAF8] z-10"></div>
            <p className="overflow-x-hidden text-ellipsis [#D6EAF8]space-nowrap max-sm:text-[16px] font-bold text-xl tracking-wider">
              {props.blogInfo.title}
            </p>
            <p className="overflow-x-hidden text-ellipsis [#D6EAF8]space-nowrap max-sm:text-[12px]">
              {props.blogInfo.des}
            </p>
          </div>
        ) : null}

        <span className="relative w-[150px] h-[6px] bg-[#D6EAF8]">
          <span className="absolute w-[12px] h-[12px] bg-[#D6EAF8] left-0 top-[-3px]"></span>
        </span>
      </div>
    );
  }

  return (
    <div className=" text-right text-[white] relative flex justify-end items-center">
      <div className="w-[150px] max-sm:w-[100px] max-sm:h-[25px] max-sm:leading-[25px] max-sm:text-[12px] shadow-md rounded-md relative h-[50px] text-center leading-[50px] bg-blue-500/30 backdrop-blur-md mr-[32px] text-xl">
        {props.blogInfo.date}
        <div className="absolute top-[-50px] translate-x-[-3px] translate-y-[-3px] left-[75px] blog-sub-left-pixel-leadline"></div>
        <div className="blog-sub-pixel-border absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="blog-sub-pixel-decoration absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>

      </div>
    </div>
  );
}
