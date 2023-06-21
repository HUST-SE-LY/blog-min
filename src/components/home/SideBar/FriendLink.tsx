import { useEffect, useState } from "react";
import blogConfig from "../../../blog.config";
import { getFriendLinks } from "../../../utils/requests";

export default function FriendLink() {
  const [friendLinkList, setFriendLinkList] = useState<friendLinkInfo[]>([])
  useEffect(() => {
    async function init() {
      if(blogConfig.static && blogConfig.staticFriendLink) {
        const list:friendLinkInfo[] = [];
        blogConfig.staticFriendLink.forEach((info,index) => {
          list.push({...info, id: index});
        })
        setFriendLinkList(list);
      } else if(blogConfig.friendLink) {
        const res = await getFriendLinks() as getFriendLinkListRes;
        setFriendLinkList(res.data.list);
      }
    }
    init()
  })
  return (
    <div className="max-h-[40%] pt-[1rem] overflow-y-auto non-scrollbar border-b-[1px] border-blue-200">
      <p className="max-sm:text-[12px] relative px-[1rem] before:absolute before:h-full before:top-0 before:left-0 before:w-[5px] before:bg-gradient-to-br before:from-purple-300 before:to-blue-300 before:transition-all hover:before:w-[10px]">
        友链
      </p>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        {
          friendLinkList.map((info) => <a target="_blank" className="flex px-[1rem] py-[0.2rem] transition-all hover:bg-blue-500 hover:text-white rounded bg-blue-100" key={info.id} href={info.url}>
            <div className="w-[5rem]">{info.name}</div>
            <div>{info.content}</div>
          </a>)
        }
      </div>
    </div>
  );
}
