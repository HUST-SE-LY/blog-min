import { useMemo } from "react";
import blogConfig from "../../../blog.config";
import { useNavigate } from "react-router-dom";

export const MobileRow = ({ blogInfo, onJump }: MobileRowProps) => {
  const navigate = useNavigate()
  const nav = () => {
    onJump();
    setTimeout(() => {
      navigate(`/blog/${blogInfo.id}`)
    },500)
  }
  const img = useMemo(
    () =>
      blogInfo.picture
        ? blogConfig.static
          ? blogInfo.picture
          : `${(blogConfig.requests as { host: string }).host}/picture/${
              blogInfo.picture
            }`
        : blogConfig.staticBlogBackground
        ? blogConfig.staticBlogBackground[
            Math.floor(blogConfig.staticBlogBackground.length * Math.random())
          ]
        : "",
    [blogInfo.picture]
  );
  return (
    <div onClick={nav} className="w-[80vw] text-white mx-auto my-[2rem]">
      <div className="bg-white/70 rounded-lg shadow-lg flex items-center justify-center h-[40vw]">
        <img className="block object-contain h-full" src={img} />
      </div>

      <p className="font-bold text-lg mt-[12px]">{blogInfo.title}</p>
      <p className=" text-gray-200">{blogInfo.des}  <span className="text-sm leading-[1rem] ml-[1rem] text-gray-200">{blogInfo.date}</span></p>
     
    </div>
  );
};
