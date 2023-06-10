import { useLoaderData } from "react-router-dom"
import { getBlogDetailRes } from "../types"
import BlogHtml from "../components/blogDetail/BlogHtml";
import blogConfig from "../blog.config";

import { lazy } from "react";

const BlogContent = lazy(() => import("../components/blogDetail/BlogContent"))


export default function BlogDetail() {
  const res = useLoaderData() as getBlogDetailRes;

  return <><BlogHtml html={res.data.html} />
    {
      blogConfig.blogBackground ? <img src={blogConfig.blogBackground} className="top-0 left-0 w-screen h-screen fixed z-[-10] object-cover" alt="" />:null
    }
    {
      blogConfig.blogContent ? <BlogContent /> : null
    }
  </>
}