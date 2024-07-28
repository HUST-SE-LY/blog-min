import { lazy, useState } from "react";
import contentSVG from '../../assets/content.svg'
import blogConfig from "../../blog.config";

const SearchBar = lazy(() => import("./SideBar/SearchBar"));
const CommonTags = lazy(() => import("./SideBar/CommonTags"));
const CommonLinks = lazy(() => import("./SideBar/CommonLinks"));
const FriendLink = lazy(() => import("./SideBar/FriendLink"));

export default function SideBar() {
  const [showSideBar, setShowSideBar] = useState(false);
  return <div className={`transition-all font-pixel fixed z-[905] ${showSideBar ? "left-0" : "max-sm:left-[-250px] left-[-400px]"} w-fit h-screen flex gap-[1rem] top-0 items-center`}>
    <div className="w-[400px] max-sm:w-[250px] h-full bg-white border-r-2 border-blue-200 p-[1rem]">
      {
        blogConfig.search ? <SearchBar /> : null
      }
      {
        blogConfig.commonTags ? <CommonTags /> : null
      }
      {
        blogConfig.commonSites ? <CommonLinks /> : null
      }
      {
        blogConfig.friendLink ? <FriendLink /> : null
      }
    </div>
    <div onClick={() => {setShowSideBar(!showSideBar)}} className="max-sm:w-[30px] relative  max-sm:h-[30px] cursor-pointer w-[40px] h-[40px] rounded-full flex justify-center items-center bg-white border-[1px] border-blue-200">
      <div className='button-pixel-border max-sm:hidden absolute top-1/2 left-1/2 translate-x-[-4px] translate-y-[-4px]'></div> 
      <img className="max-sm:w-[15px] max-sm:h-[15px]" src={contentSVG} />
    </div>
  </div>
}