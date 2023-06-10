/* eslint-disable @typescript-eslint/no-explicit-any */
import {  getBlogRes } from "../types";
import getAxios from "./getAxios";
const axios = getAxios();
export async function homeLoader() {
  const res = await axios.post("/get/blog",{
    limit: 10,
    offset: 0,
  }).catch((err) => {throw(err)});
  return res as unknown as getBlogRes;
}

export async function BlogDetailLoader({params}:any){
  const id = params.id;
  const res = await axios.post('get/blogById', {
    id: id,
  })
  console.log(res)
  return res
}