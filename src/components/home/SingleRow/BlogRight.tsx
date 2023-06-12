import { useEffect, useRef, useState } from "react";
import { blogTowColProps } from "../../../types";
import blogConfig from "../../../blog.config";
import { Link } from "react-router-dom";

export default function BlogRight(props: blogTowColProps) {
  const [imgIn, setImgIn] = useState(false);
  const mainBox = useRef<HTMLDivElement>(null);
  const [showMain, setShowMain] = useState(true);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].intersectionRatio > 0) {
        setShowMain(true);
      } else {
        setShowMain(false)
      }
    },{
      threshold: [0,0.1]
    });
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

  const img = `https://www.coisini.love/api/picture/${props.blogInfo.picture}`;
  if (props.isMain) {
    return (
      <div ref={mainBox} className="border-l-[1px] border-blue-200 text-left flex gap-[20px] justify-start items-center">
        <span className="relative w-[150px] h-[1px] bg-blue-200">
          <span className="absolute w-[5px] h-[5px] top-[-2px] right-0 rounded-full bg-blue-200"></span>
        </span>
        {showMain ? (
          <Link to={`/blog/${props.blogInfo.id}`}>
            <div
              className={`animate-comeInFromRight shadow-2xl rounded-md cursor-pointer overflow-x-hidden relative w-[400px] h-[200px] border-[1px] p-[32px] border-blue-200`}
              onMouseEnter={() => {
                hoverIn();
              }}
              onMouseLeave={() => {
                hoverOut();
              }}
            >
              {blogConfig.blogBackground ? (
                <img
                  src={img}
                  alt=""
                  className={`-z-10 absolute w-full h-full object-cover transition-all top-0 ${
                    imgIn ? "right-0" : "right-[-100%]"
                  }`}
                />
              ) : null}
              <div
                className={`absolute w-full h-full clip-trapezoid-right bg-blue-200/80  top-0 transition-all -z-[9]  ${
                  imgIn ? "left-0" : "left-[-100%]"
                }  `}
              ></div>
              <div className="absolute w-full h-full top-0 left-0 bg-white/70 z-[-11]"></div>
              <p className="font-bold text-xl tracking-wider">
                {props.blogInfo.title}
              </p>
              <p>{props.blogInfo.des}</p>
            </div>
          </Link>
        ) : null}
      </div>
    );
  }

  return (
    <div className="border-l-[1px] border-blue-200 text-left flex justify-start items-center">
      <div className="rounded-md shadow-md w-[150px] relative h-[50px] text-center leading-[50px] bg-white/70 backdrop-blur-md ml-[32px] text-xl">
        {props.blogInfo.date}
        <div className="absolute top-[-50px] h-[50px] w-[107px] right-[75px] border-t-2 border-r-2 border-blue-200"></div>
      </div>
    </div>
  );
}
