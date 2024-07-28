import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function BlogRight(props: blogTowColProps) {
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
        className="border-l-[8px] border-[#D6EAF8] text-left flex gap-[20px] justify-start items-center"
      >
        <span className="relative w-[150px] h-[6px] bg-[#D6EAF8]">
          <span className="absolute w-[12px] h-[12px] top-[-3px] right-0 bg-[#D6EAF8]"></span>
        </span>
        {showMain ? (
          <div
            onClick={nav}
            className={`animate-comeInFromRight animate-pause text-[white] hover:bg-blue-500/50  shadow-2xl rounded-md bg-blue-500/30 transition-colors duration-500  backdrop-blur-md cursor-pointer relative max-sm:h-[100px] max-sm:p-[1rem] max-sm:w-[160px] max-sm:mr-[5px] w-[400px] h-[200px] border-[1px] p-[32px] border-blue-200`}
          >
            <div className="absolute blog-pixel-decoration-right left-1/2 top-1/2 translate-x-[-6px] translate-y-[-6px]"></div>
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
            <p className=" overflow-x-hidden text-ellipsis [#D6EAF8]space-nowrap max-sm:text-[16px] font-bold text-xl tracking-wider">
              {props.blogInfo.title}
            </p>
            <p className="overflow-x-hidden text-ellipsis [#D6EAF8]space-nowrap max-sm:text-[12px]">
              {props.blogInfo.des}
            </p>
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className=" text-left text-[white] flex justify-start items-center">
      <div className="max-sm:w-[100px] max-sm:h-[25px] max-sm:leading-[25px] max-sm:text-[12px] rounded-md shadow-md w-[150px] relative h-[50px] text-center leading-[50px] bg-blue-500/30 backdrop-blur-md ml-[32px] text-xl">
        {props.blogInfo.date}
        <div className="absolute blog-sub-right-pixel-leadline  max-sm:top-[-30px] max-sm:h-[30px] max-sm:right-[50px] max-sm:w-[82px] top-[-50px] h-[50px] w-[107px] right-[75px]"></div>
        <div className="blog-sub-pixel-border absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="blog-sub-pixel-decoration absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}
