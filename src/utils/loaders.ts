/* eslint-disable @typescript-eslint/no-explicit-any */
import {  getBlogRes } from "../types";
import { getBlogDetail, getBlogList } from "./requests";
export async function homeLoader() {
  const res = await getBlogList({limit: 10, offset: 0}).catch((err) => {throw(err)});
  return res as unknown as getBlogRes;
}

export async function BlogDetailLoader({params}:any){
  const res = await getBlogDetail({id: parseInt(params.id as string)})
  console.log(res)
  return res
}