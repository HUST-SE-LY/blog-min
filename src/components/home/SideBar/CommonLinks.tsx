import { useEffect, useState } from "react";
import { getLinksRes, staticLink } from "../../../types";
import { getLinks } from "../../../utils/requests";
import blogConfig from "../../../blog.config";

export default function CommonLinks() {
  const [links, setLinks] = useState<staticLink[]>([]);
  async function getSites() {
    if(blogConfig.static&&blogConfig.staticCommonSites) {
      setLinks(blogConfig.staticCommonSites)
      return ;
    }
    const res = (await getLinks()) as getLinksRes;
    setLinks(res.data.links);
  }
  useEffect(() => {
    getSites();
  }, []);
  return (
    <div className="max-h-[20%] pt-[1rem] overflow-y-auto non-scrollbar border-b-2 border-blue-200">
      <p className="max-sm:text-[12px] relative px-[1rem] before:absolute before:h-full before:top-0 before:left-0 before:w-[5px] before:bg-gradient-to-br before:from-purple-300 before:to-blue-300 before:transition-all hover:before:w-[10px]">
        常用网址
      </p>
      <div className="w-full p-[1rem] h-fit flex flex-wrap gap-[1rem]">
        {links.map((link, index) => (
          <a href={link.url} target="_blank" key={index}>
            <div className="relative w-fit max-sm:px-[16px] max-sm:h-[20px] max-sm:leading-[18px] px-[20px] h-[24px] rounded-full leading-[20px] text-[12px] overflow-hidden">
              <div className="animate-spin w-[200px]  h-[200px] absolute top-[calc(50%_-_100px)] left-[calc(50%_-_100px)] bg-gradient-to-br from-pink-300 to-blue-300"></div>
              <div
                className={`bg-white max-sm:w-[calc(100%_-_2px)] max-sm:h-[calc(100%_-_2px)] max-sm:top-[1px] max-sm:left-[1px] cursor-pointer text-center w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] absolute transition-all hover:bg-transparent hover:text-white top-[2px] left-[2px] rounded-full`}
              >
                {link.name}
              </div>
              <p>{link.name}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}


