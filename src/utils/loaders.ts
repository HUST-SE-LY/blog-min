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