import { useEffect, useRef, useState } from "react";
import { blogInfo, getBlogRes, getTagsRes, tagInfo } from "../../../types";
import { getBlogByTags, getTags } from "../../../utils/requests";
import SingleTag from "./CommonTags/SingleTag";
import { Link } from "react-router-dom";
import blogConfig from "../../../blog.config";

export default function CommonTags() {
  const [tags, setTags] = useState<tagInfo[]>([]);
  const [resultList, setResultList] = useState<blogInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentTag, setCurrentTag] = useState("");
  const [isBottom, setIsBottom] = useState(true);
  const limit = 10;
  let offset = 0;
  const bottom = useRef<HTMLDivElement>(null);
  async function getList() {
    if(!blogConfig.static) {
      const res = (await getTags()) as getTagsRes;
      setTags(res.data.tags);
    } else {
      const list = blogConfig.staticCommonTags;
      const res:tagInfo[] = [];
      if(list) {
        list.forEach((tag, index) => {
          res.push({id: index,name: tag})
        })
      }
      setTags(res)

    }
    
  }
  async function updateList() {
    offset += limit;
    setLoading(true);
    const res = await getBlogByTags({limit: limit, offset: offset, tag: currentTag}) as getBlogRes;
    setResultList((prev) => [...prev, ...res.data.blogs]);
    res.data.blogs.length < limit ? setIsBottom(true) : setIsBottom(false);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if(bottom.current) {
      const observer = new IntersectionObserver((entries) => {
        if(entries[0].intersectionRatio > 0) {
          updateList();
        }
      });
      observer.observe(bottom.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isBottom])
  return (
    <div className="max-h-[30%] pt-[1rem] overflow-y-auto non-scrollbar border-b-2 border-blue-200">
      <p className="relative px-[1rem] before:absolute before:h-full before:top-0 before:left-0 before:w-[5px] before:bg-gradient-to-br before:from-purple-300 before:to-blue-300 before:transition-all hover:before:w-[10px]">
        常用Tag
      </p>
      <div className="w-full p-[1rem] h-fit flex flex-wrap gap-[1rem]">
        {tags.map((tagInfo) => (
          <SingleTag
            setCurrentTag={setCurrentTag}
            setIsBottom={setIsBottom}
            setLoading={setLoading}
            setList={setResultList}
            key={tagInfo.id}
            content={tagInfo.name}
          />
        ))}
      </div>
      <div className="px-[1rem]">
        {resultList.map((blogInfo) => (
          <Link key={blogInfo.id} to={`/blog/${blogInfo.id}`}>
            <div className="transition-all mb-[0.5rem] hover:text-white hover:bg-blue-500 w-full py-[0.2rem] px-[1rem] text-gray-500 text-sm rounded-lg bg-blue-200">
              {blogInfo.title}
            </div>
          </Link>
        ))}
        {loading ? (
          <div className="w-full h-[16px] bg-gray-200 animate-pulse"></div>
        ) : null}
        {isBottom ? null : (
          <div ref={bottom} className="w-full h-[16px] bg-gray-200 animate-pulse"></div>
        )}
      </div>
    </div>
  );
}
