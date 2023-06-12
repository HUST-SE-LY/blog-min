/* eslint-disable @typescript-eslint/no-explicit-any */
import {  getBlogRes } from "../types";
import getAxios from "./getAxios";
import requests from "./requests";
const axios = getAxios();
export async function homeLoader() {
  const res = await axios.post(requests.getBlogList,{
    limit: 10,
    offset: 0,
  }).catch((err) => {throw(err)});
  return res as unknown as getBlogRes;
}

export async function BlogDetailLoader({params}:any){
  const id = params.id;
  const res = await axios.post(requests.getBlogDetail, {
    id: id,
  })
  console.log(res)
  return res
}