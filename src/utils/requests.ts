import blogConfig, { getBlogByTagsParams, getBlogByTitleParams, getBlogDetailParams, getBlogListParams, getBlogTagsParams} from "../blog.config";
import { routerType } from "../types";
import getAxios from "./getAxios";
const requestConfig = blogConfig.requests as {
  host: string;
  router: {
    getBlogList: routerType;
    getBlogDetail: routerType;
    getBlogByTitle: routerType;
    getTags: routerType;
    getBlogTags: routerType;
    getBlogByTags: routerType;
  };
}
const routers = requestConfig.router;
export default {}

const axios = getAxios();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function basicRequest(path:string,method: "post"|"get", params?: Record<string,any>) {
  if(method === "post") {
    return await axios.post(path, params);
  } else {
    return await axios.get(path, {
      params: params
    })
  }
}

export async function getBlogList(params: getBlogListParams) {
  return await basicRequest(routers.getBlogList.path, routers.getBlogList.method, params)
}

export async function getBlogDetail(params: getBlogDetailParams) {
  return await basicRequest(routers.getBlogDetail.path, routers.getBlogDetail.method, params)
}

export async function getBlogByTitle(params: getBlogByTitleParams) {
  return await basicRequest(routers.getBlogByTitle.path, routers.getBlogByTitle.method, params)
}

export async function getTags() {
  return await basicRequest(routers.getTags.path, routers.getTags.method)
}

export async function getBlogTags(params: getBlogTagsParams) {
  return await basicRequest(routers.getBlogTags.path, routers.getBlogTags.method, params)
}

export async function getBlogByTags(params: getBlogByTagsParams) {
  return await basicRequest(routers.getBlogByTags.path, routers.getBlogByTags.method, params)
}




