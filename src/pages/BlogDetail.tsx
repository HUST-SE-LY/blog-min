import { useLoaderData } from "react-router-dom"
import { getBlogDetailRes } from "../types"
import BlogHtml from "../components/blogDetail/BlogHtml";
import blogConfig from "../blog.config";
import toTopSVG from "../assets/toTop.svg"

import { lazy } from "react";
import toTop from "../utils/toTop";

const BlogContent = lazy(() => import("../components/blogDetail/BlogContent"))
const BlogComment = lazy(() => import("../components/blogDetail/BlogComment"));
export default function BlogDetail() {
  const res = useLoaderData() as getBlogDetailRes;

  return <><BlogHtml title={res.data.title} date={res.data.date} html={res.data.html} />
    {
      blogConfig.blogBackground ? <img src={blogConfig.blogBackground} className="top-0 left-0 w-screen h-screen fixed z-[-10] object-cover" alt="" />:null
    }
    {
      blogConfig.blogContent ? <BlogContent /> : null
    }
    {
      blogConfig.blogComment ? <BlogComment /> : null
    }

    <div onClick={() => {toTop()}} className="fixed right-[150px] bottom-[50px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center">
      <img src={toTopSVG} alt="" />
    </div>
  </>
}