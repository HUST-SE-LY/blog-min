import { useEffect, useState } from "react";
import contentSVG from "../../assets/content.svg";
import getBlogContentTitles from "../../utils/getBlogContentTitles";
import { blogContentTitles } from "../../types";

export default function BlogContent() {
  const [showContent, setShowContent] = useState(false);
  const [contentList, setContentList] = useState<blogContentTitles[]>([]);

  useEffect(() => {
    setContentList(getBlogContentTitles());
  }, []);
  return (
    <div
      className={`flex h-screen justify-center top-0 fixed z-[10] items-center transition-all ${
        showContent ? "right-0" : "right-[-400px]"
      } h-fit w-fit gap-[1rem]`}
    >
      <div
        className="flex justify-center items-center w-[40px] h-[40px] rounded-full border-[1px] border-blue-200 bg-white cursor-pointer"
        onClick={() => {
          setShowContent(!showContent);
        }}
      >
        <img src={contentSVG} alt="" />
      </div>
      <div
        className={`h-fit max-h-screen overflow-y-auto non-scrollbar w-[400px] bg-white border-2 rounded-[16px_0_0_16px] shadow-md border-r-0 py-[1rem] border-blue-200 overflow-x-auto non-scrollbar`}
      >
        <p className="text-[20px] mb-[1rem] px-[8px]">目录</p>
        {contentList.map((contentInfo, index) => (
          <a
            href={`#${contentInfo.title}`}
            key={index}
            className={` overflow-x-auto non-scrollbar hover:bg-blue-500 transition-all hover:text-white w-[full] bg-blue-50 leading-[28px] h-[28px] mx-[1rem] rounded-md mb-[1rem] ${contentInfo.style} block`}
          >
            {contentInfo.title}
          </a>
        ))}
      </div>
    </div>
  );
}
