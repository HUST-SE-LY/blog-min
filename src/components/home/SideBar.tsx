import { lazy, useState } from "react";
import contentSVG from '../../assets/content.svg'
import blogConfig from "../../blog.config";

const SearchBar = lazy(() => import("./SideBar/SearchBar"))

export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return <div className={`transition-all fixed z-[905] ${showSideBar ? "left-0" : "left-[-400px]"} w-fit h-screen flex gap-[1rem] top-0 items-center`}>
    <div className="w-[400px] h-full bg-white border-r-2 border-blue-200 p-[1rem]">
      {
        blogConfig.search ? <SearchBar /> : null
      }
    </div>
    <div className="cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white border-[1px] border-blue-200">
      <img src={contentSVG}
      onClick={() => {setShowSideBar(!showSideBar)}} />
    </div>
  </div>
}