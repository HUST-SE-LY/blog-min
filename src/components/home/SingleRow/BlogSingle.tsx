import { useMemo, useState } from "react";
import blogConfig from "../../../blog.config";
import { blogOneColProps } from "../../../types";
import { Link } from "react-router-dom";

export default function BlogSingle(props: blogOneColProps) {
  const [imgIn, setImgIn] = useState(false);
  function hoverIn() {
    setImgIn(true);
  }

  function hoverOut() {
    setImgIn(false);
  }
  
  const img = useMemo(() => props.blogInfo.picture ?( blogConfig.static ? props.blogInfo.picture : `${(blogConfig.requests as {host: string}).host}/picture/${props.blogInfo.picture}`) : (blogConfig.staticBlogBackground ? blogConfig.staticBlogBackground[Math.floor(blogConfig.staticBlogBackground.length*Math.random())] : ""),[props.blogInfo.picture]) 

  return (
    <div>
      <div className="w-[2px] h-[50px] bg-blue-200 mx-[auto]"></div>
      <Link to={`/blog/${props.blogInfo.id}`}>
        <div
          className={`cursor-pointer overflow-x-hidden relative mx-[auto] w-[400px] h-[200px] border-[1px] p-[32px] border-blue-200`}
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
          <div className="absolute w-full h-full top-0 left-0 bg-white/50 backdrop-blur-md z-[-11]"></div>
          <p className="font-bold text-xl tracking-wider">
            {props.blogInfo.title}
          </p>
          <p>{props.blogInfo.des}</p>
          <p>{props.blogInfo.date}</p>
        </div>
      </Link>

      <div className="w-[2px] h-[50px] bg-blue-200 mx-[auto]"></div>
    </div>
  );
}
