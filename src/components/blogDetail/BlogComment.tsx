import { useEffect, useRef, useState } from "react";
import commentSVG from "../../assets/comment.svg";
import { addComment, getBlogComments } from "../../utils/requests";
import { useParams } from "react-router-dom";

export default function BlogComment() {
  const [commentList, setCommentList] = useState<commentInfo[]>([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const bottom = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(true);
  const [isLoading, setIsLoading] = useState(false)
  const [showComment, setShowComment] = useState(false);
  const params = useParams();
  const limit = 10;
  let offset = 0;
  async function getCommentList() {
    const res = (await getBlogComments({
      limit: limit,
      offset: offset,
      blog: parseInt(params.id as string),
    })) as getCommentsRes;
    res.data.list.length < limit ? setIsBottom(true) : setIsBottom(false);
    setCommentList(res.data.list);
  }
  async function addAComment() {
    if(isLoading) return
    if (!(name && content)) return;
    setIsLoading(true);
    await addComment({name: name, content: content, blog: params.id as string});
    setCommentList([]);
    offset = 0;
    await getCommentList();
    setContent("");
    setIsLoading(false);
  }
  async function updateList() {
    offset += limit;
    const res = (await getBlogComments({
      limit: limit,
      offset: offset,
      blog: parseInt(params.id as string),
    })) as getCommentsRes;
    res.data.list.length < limit ? setIsBottom(true) : setIsBottom(false);
    setCommentList((prev) => [...prev, ...res.data.list]);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(async (entries) => {
      if(entries[0].intersectionRatio > 0) {
        await updateList();
      }
    })
    if(bottom.current) {
      observer.observe(bottom.current);
    }
  },[isBottom])

  useEffect(() => {
    getCommentList();
  }, []);
  return (
    <div
      className={`transition-all fixed z-[905] flex items-center gap-[1rem] w-fit h-screen top-0 ${
        showComment ? "left-0" : "left-[-400px] max-sm:left-[-250px]"
      }`}
    >
      <div className="bg-white w-[400px] max-sm:w-[250px] h-full border-r-2 border-blue-200 flex flex-col gap-[1rem]">
        <div className="py-[1rem] flex flex-col gap-[1rem] h-full overflow-y-auto non-scrollbar">
          {commentList.map((commentInfo) => (
            <div className="px-[1rem]" key={commentInfo.id}>
              <p className="w-fit bg-blue-200 px-[0.5rem] rounded text-sm mb-[0.2rem]">
                {commentInfo.name}
              </p>
              <div className="w-fit max-w-full px-[1rem] py-[0.5rem] bg-blue-500 text-white rounded-[0_1rem_1rem_1rem]">
                {commentInfo.content}
              </div>
            </div>
          ))}
          {!isBottom ? (
            <div ref={bottom} className="w-full px-[1rem]">
              <div className="w-1/2 h-[4rem] rounded-[0_1rem_1rem_1rem] bg-gray-100 animate-pulse"></div>
            </div>
          ) : null}
        </div>
        <div className="flex p-[1rem] flex-col gap-[1rem] flex-1">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="输入昵称"
            className="w-full rounded-lg bg-gray-100 px-[1rem] py-[0.5rem] max-sm:text-[12px] max-sm:p-[0.2rem_0.5rem] outline-none text-sm"
          />
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder="输入评论内容"
            className="w-full h-[100px] rounded-lg bg-gray-100 outline-none p-[1rem] max-sm:p-[0.2rem_0.5rem] max-sm:text-[12px] text-sm"
          ></textarea>
          <button onClick={() => {addAComment()}} className="w-full py-[0.5rem] max-sm:text-[12px] text-center bg-blue-200 rounded-lg transition-all hover:text-white hover:bg-blue-500">
            发送
          </button>
        </div>
      </div>
      <div
        onClick={() => {
          setShowComment(!showComment);
        }}
        className="max-sm:w-[30px] max-sm:h-[30px] w-[40px] bg-white h-[40px] rounded-full cursor-pointer flex justify-center items-center border-[1px] border-blue-200"
      >
        <img className="max-sm:w-[20px] max-sm:h-[20px]" src={commentSVG} alt="" />
      </div>
    </div>
  );
}
