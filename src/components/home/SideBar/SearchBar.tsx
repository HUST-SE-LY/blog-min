import { useEffect, useRef, useState } from "react";
import { handleSearchBarInput } from "../../../utils/eventHandler";
import { Link } from "react-router-dom";
import { getBlogByTitle } from "../../../utils/requests";

export default function SearchBar() {
  const [resultList, setResultList] = useState<Array<blogInfo>>([]);
  const [keyWords, setKeyWords] = useState("");
  const [loading, setLoading] = useState(false);
  const [isBottom, setIsBottom] = useState(true);
  const bottom = useRef<HTMLDivElement>(null);
  let list: blogInfo[] = [];
  const limit = 10;
  // eslint-disable-next-line prefer-const
  let offset = 0;
  async function handler(value: string) {
    const res = (await handleSearchBarInput(
      value,
      limit,
      offset,
      setLoading
    )) as blogInfo[];
    if (res) {
      list.push(...res);
      setResultList(list);
      res.length >= limit ? setIsBottom(false) : setIsBottom(true);
    }
  }

  async function updateList() {
    offset += resultList.length;
    const res = await getBlogByTitle({limit: limit, offset: offset, title: keyWords});
    console.log(res.data.blogs);
    if (res.data.blogs) {
      if (res.data.blogs.length < limit) setIsBottom(true);
      setResultList((prev) => [...prev,...res.data.blogs])
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (!keyWords) return;
      if (entries[0].intersectionRatio > 0) {
        updateList();
      }
    },{
      threshold: [0]
    });
    if (bottom.current) {
      observer.observe(bottom.current);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBottom]);

  return (
    <div className="border-b-[1px] p-[1rem] border-blue-200">
      <div className="mb-[1rem]">
        <input
          type="text"
          placeholder="搜索标题"
          value={keyWords}
          onChange={(e) => {
            list = [];
            offset = 0;
            setKeyWords(e.target.value);
            setResultList([]);
            setLoading(true);
            handler(e.target.value);
          }}
          className="w-full py-[0.2rem] max-sm:text-[12px] max-sm:py-[1px] outline-none text-sm border-[1px] border-blue-200 rounded-full px-[1rem]"
        />
      </div>
      <div className="h-fit max-h-[40%] overflow-y-auto non-scrollbar">
        {loading ? (
          <div className="w-full h-[2rem] bg-gray-200 rounded-lg animate-pulse"></div>
        ) : null}
        {resultList.map((blogInfo) => (
          <Link key={blogInfo.id} to={`/blog/${blogInfo.id}`}>
            <div className="max-sm:bg-blue-500 max-sm:text-white max-sm:text-[12px] transition-all mb-[0.5rem] hover:text-white hover:bg-blue-500 w-full py-[0.2rem] px-[1rem] text-gray-500 text-sm rounded-lg bg-blue-200">
              {blogInfo.title}
            </div>
          </Link>
        ))}
        <div ref={bottom}>
          {isBottom ? null : (
            <div className="w-full h-[2rem] bg-gray-200 rounded-lg animate-pulse"></div>
          )}
        </div>
      </div>
    </div>
  );
}
