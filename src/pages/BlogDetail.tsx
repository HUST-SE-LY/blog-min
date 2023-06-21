import { useLoaderData } from "react-router-dom"
import BlogHtml from "../components/blogDetail/BlogHtml";
import blogConfig from "../blog.config";
import toTopSVG from "../assets/toTop.svg"

import { lazy } from "react";
import toTop from "../utils/toTop";

const BlogContent = lazy(() => import("../components/blogDetail/BlogContent"))
const BlogComment = lazy(() => import("../components/blogDetail/BlogComment"));
export default function BlogDetail() {
  const res = useLoaderData() as getBlogDetailRes|staticBlogInfo;
  const title = blogConfig.static ? (res as staticBlogInfo).title : (res as getBlogDetailRes).data.title;
  const date = blogConfig.static ? (res as staticBlogInfo).date : (res as getBlogDetailRes).data.date;
  const html = blogConfig.static ? (res as staticBlogInfo).html : (res as getBlogDetailRes).data.html;
  return <><BlogHtml title={title} date={date} html={html} />
    {
      blogConfig.blogBackground ? <img src={blogConfig.blogBackground} className="top-0 left-0 w-screen h-screen fixed z-[-10] object-cover" alt="" />:null
    }
    {
      blogConfig.blogContent ? <BlogContent /> : null
    }
    {
      blogConfig.blogComment&&!blogConfig.static ? <BlogComment /> : null
    }

    <div onClick={() => {toTop()}} className="max-sm:w-[30px] max-sm:h-[30px] max-md:right-[50px] fixed right-[150px] bottom-[50px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center">
      <img className="max-sm:w-[15px] max-sm:h-[15px]" src={toTopSVG} alt="" />
    </div>
  </>
}