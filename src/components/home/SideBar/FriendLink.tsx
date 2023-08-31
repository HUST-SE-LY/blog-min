import { useEffect, useState } from "react";
import blogConfig from "../../../blog.config";
import { addFriendLink, getFriendLinks } from "../../../utils/requests";

export default function FriendLink() {
  const [friendLinkList, setFriendLinkList] = useState<friendLinkInfo[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  async function requestLink() {
    if(!(name&&content&&url)) return;
    await addFriendLink({name, content, url});
    setContent("");
    setName("");
    setUrl("");
  }
  useEffect(() => {
    async function init() {
      if (blogConfig.static && blogConfig.staticFriendLink) {
        const list: friendLinkInfo[] = [];
        blogConfig.staticFriendLink.forEach((info, index) => {
          list.push({ ...info, id: index });
        });
        setFriendLinkList(list);
      } else if (!blogConfig.static) {
        const res = (await getFriendLinks()) as getFriendLinkListRes;
        setFriendLinkList(res.data.list);
      }
    }
    init();
  },[]);
  return (
    <div className="max-h-[40%] pt-[1rem] overflow-y-auto non-scrollbar border-b-[1px] border-blue-200">
      <p className="max-sm:text-[12px] relative px-[1rem] before:absolute before:h-full before:top-0 before:left-0 before:w-[5px] before:bg-gradient-to-br before:from-purple-300 before:to-blue-300 before:transition-all hover:before:w-[10px]">
        友链
      </p>
      <div className="flex flex-col gap-[1rem] p-[1rem]">
        <div className="flex gap-[0.5rem] flex-col">
          {blogConfig.staticFriendLink&&blogConfig.static ? null : (
            <>
              <p className="max-sm:text-[12px]">友链申请</p>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="名称"
                className="outline-none border-[1px] text-sm px-[0.5rem] py-[0.2rem] rounded-md focus:border-blue-300 transition-all"
              />
              <input
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="简介"
                className="outline-none border-[1px] text-sm px-[0.5rem] py-[0.2rem] rounded-md focus:border-blue-300 transition-all"
              />
              <input
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="url"
                className="outline-none border-[1px] text-sm px-[0.5rem] py-[0.2rem] rounded-md focus:border-blue-300 transition-all"
              />
              <button onClick={requestLink} className="bg-blue-200 transition-all hover:bg-blue-600 hover:text-white text-sm py-[0.2rem] rounded-md text-gray-600">
                申请
              </button>
            </>
          )}
        </div>
        {friendLinkList.map((info) => (
          <a
            target="_blank"
            className="flex px-[1rem] py-[0.2rem] transition-all hover:bg-blue-500 hover:text-white rounded bg-blue-100"
            key={info.id}
            href={info.url}
          >
            <div className="max-sm:text-[12px] max-sm:w-[3rem] text-sm w-[5rem]">
              {info.name}
            </div>
            <div className="max-sm:text-[12px] text-sm">{info.content}</div>
          </a>
        ))}
      </div>
    </div>
  );
}
