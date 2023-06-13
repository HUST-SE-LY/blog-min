/* eslint-disable @typescript-eslint/no-explicit-any */
import blogConfig from "../blog.config";
import staticInfo from "../static/static";
import {  getBlogRes, staticBlogInfo } from "../types";
import { getBlogDetail, getBlogList } from "./requests";
export async function homeLoader() {
  let res
  if(blogConfig.static) {
    const result = await fetch(staticInfo.path);
    const json = await result.json();
    const res = {
      data: {
        blogs: json
      }
    }
    return res
  } else {
    res = await getBlogList({limit: 10, offset: 0}).catch((err) => {throw(err)});
  }
  
  return res as unknown as getBlogRes;
}

export async function BlogDetailLoader({params}:any){
  let res;
  if(blogConfig.static) {
    const result = await fetch(staticInfo.path);
    const blogList = await result.json() as Array<staticBlogInfo>;
    const blog = blogList.find((el) => el.id == params.id) as staticBlogInfo;
    res =  {
      data: {
        html: blog.html,
        code: 200,
        msg: "success",
        date: blog.date,
        title: blog.title,
      }
    }
  } else {
    res = await getBlogDetail({id: parseInt(params.id as string)})
  }
  
  return res
}