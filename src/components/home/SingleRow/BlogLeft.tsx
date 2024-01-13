import { useEffect, useMemo, useRef, useState } from "react";
import blogConfig from "../../../blog.config";
import { useNavigate } from "react-router-dom";

export default function BlogLeft(props: blogTowColProps) {
  const [imgIn, setImgIn] = useState(false);
  const mainBox = useRef<HTMLDivElement>(null);
  const [showMain, setShowMain] = useState(false);
  const navigate = useNavigate()
  const nav = () => {
    setTimeout(() => {
      navigate(`/blog/${props.blogInfo.id}`)
    },500)
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].intersectionRatio > 0) {
          setShowMain(true);
        } else {
          setShowMain(false);
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
  function hoverIn() {
    setImgIn(true);
  }

  function hoverOut() {
    setImgIn(false);
  }

  const img = useMemo(
    () =>
      props.blogInfo.picture
        ? blogConfig.static
          ? props.blogInfo.picture
          : `${(blogConfig.requests as { host: string }).host}/picture/${
              props.blogInfo.picture
            }`
        : blogConfig.staticBlogBackground
        ? blogConfig.staticBlogBackground[
            Math.floor(blogConfig.staticBlogBackground.length * Math.random())
          ]
        : "",
    [props.blogInfo.picture]
  );
  if (props.isMain) {
    return (
      <div
        ref={mainBox}
        className="border-r-[1px] border-blue-200 text-right flex gap-[20px] justify-end items-center"
      >
        {showMain ? (
            <div
              onClick={nav}
              className={`animate-comeInFromLeft max-sm:h-[100px] max-sm:p-[1rem] max-sm:w-[160px] max-sm:ml-[5px] cursor-pointer animate-floating shadow-2xl rounded-md overflow-x-hidden relative w-[400px] h-[200px] border-[1px] p-[32px] border-blue-200`}
              onMouseEnter={() => {
                hoverIn();
              }}
              onMouseLeave={() => {
                hoverOut();
              }}
            >
              <img
                src={img}
                alt=""
                className={`-z-10 absolute w-full h-full object-cover transition-all top-0 ${
                  imgIn ? "left-0" : "left-[-100%]"
                }`}
              />

              <div
                className={`absolute w-full h-full clip-trapezoid-left bg-blue-200/80  top-0 transition-all -z-[9]  ${
                  imgIn ? "right-0" : "right-[-100%]"
                }  `}
              ></div>
              <div className="absolute w-full h-full top-0 left-0 bg-white/70 z-[-11]"></div>
              <p className="overflow-x-hidden text-ellipsis whitespace-nowrap max-sm:text-[16px] font-bold text-xl tracking-wider">
                {props.blogInfo.title}
              </p>
              <p className="overflow-x-hidden text-ellipsis whitespace-nowrap max-sm:text-[12px]">{props.blogInfo.des}</p>
            </div>
        ) : null}

        <span className="relative w-[150px] h-[1px] bg-blue-200">
          <span className="absolute w-[5px] h-[5px] rounded-full bg-blue-200 left-0 top-[-2px]"></span>
        </span>
      </div>
    );
  }

  return (
    <div className="border-r-[1px] border-blue-200 text-right flex justify-end items-center">
      <div className="w-[150px] max-sm:w-[100px] max-sm:h-[25px] max-sm:leading-[25px] max-sm:text-[12px] shadow-md rounded-md relative h-[50px] text-center leading-[50px] bg-white/70 backdrop-blur-md mr-[32px] text-xl">
        {props.blogInfo.date}
        <div className="absolute max-sm:top-[-30px] max-sm:h-[30px] max-sm:left-[50px] max-sm:w-[82px] top-[-50px] h-[50px] w-[107px] left-[75px] border-t-2 border-l-2 border-blue-200"></div>
      </div>
    </div>
  );
}
