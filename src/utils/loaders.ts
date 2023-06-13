/* eslint-disable @typescript-eslint/no-explicit-any */
import blogConfig from "../blog.config";
import { getBlogDetail, getBlogList, getStaticBlogDetail, getStaticBlogList } from "./requests";
export async function homeLoader() {
  let res
  if(blogConfig.static) {
    res = await getStaticBlogList({limit: 10, offset: 0});
    return res
  } else {
    res = await getBlogList({limit: 10, offset: 0}).catch((err) => {throw(err)});
  }
  
  return res;
}

export async function BlogDetailLoader({params}:any){
  let res;
  if(blogConfig.static) {
    res = await getStaticBlogDetail({id: parseInt(params.id as string)});
  } else {
    res = await getBlogDetail({id: parseInt(params.id as string)})
  }
  
  return res
}