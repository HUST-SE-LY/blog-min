/* eslint-disable @typescript-eslint/no-explicit-any */
import blogConfig, {
  addCommentParams,
  getBlogByTagsParams,
  getBlogByTitleParams,
  getBlogCommentsParams,
  getBlogDetailParams,
  getBlogListParams,
  getBlogTagsParams,
  router,
} from "../blog.config";
import staticInfo from "../static/static";
import getAxios from "./getAxios";
const requestConfig = blogConfig.requests as {
  host: string;
  router: router;
};
const routers = requestConfig.router;
export default {};

const axios = getAxios();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function basicRequest(
  path: string,
  method: "post" | "get",
  params?: Record<string, any>
) {
  if (method === "post") {
    return await axios.post(path, params);
  } else {
    return await axios.get(path, {
      params: params,
    });
  }
}

export async function basicStaticRequest() {
  const fetchData = await fetch(staticInfo.path);
  const blogList = await fetchData.json();
  return blogList;
}

export async function getBlogList(params: getBlogListParams) {
  return await basicRequest(
    routers.getBlogList.path,
    routers.getBlogList.method,
    params
  );
}

export async function getStaticBlogList(params: getBlogListParams) {
  let blogList = (await basicStaticRequest()) as staticBlogInfo[];
  blogList.length - params.offset > params.limit
    ? blogList = blogList.slice(params.offset, params.offset + params.limit)
    : blogList = blogList.slice(params.offset, blogList.length);
  return blogList;
}

export async function getBlogDetail(params: getBlogDetailParams) {
  return await basicRequest(
    routers.getBlogDetail.path,
    routers.getBlogDetail.method,
    params
  );
}

export async function getStaticBlogDetail(params: getBlogDetailParams) {
  const blogList = (await basicStaticRequest()) as staticBlogInfo[];
  const blogInfo = blogList.find((blog) => blog.id == params.id);
  return blogInfo;
}

export async function getBlogByTitle(params: getBlogByTitleParams) {
  return await basicRequest(
    routers.getBlogByTitle.path,
    routers.getBlogByTitle.method,
    params
  );
}

export async function getStaticBlogByTitle(params: getBlogByTitleParams) {
  const blogList = (await basicStaticRequest()) as staticBlogInfo[];
  let blogsNeed = blogList.filter((blog) =>
    blog.title.includes(params.title)
  );
  blogsNeed.length - params.offset > params.limit
    ? blogsNeed = blogsNeed.slice(params.offset, params.offset + params.limit)
    : blogsNeed = blogsNeed.slice(params.offset, blogList.length);
  return blogsNeed;
}

export async function getTags() {
  return await basicRequest(routers.getTags.path, routers.getTags.method);
}

export async function getBlogTags(params: getBlogTagsParams) {
  return await basicRequest(
    routers.getBlogTags.path,
    routers.getBlogTags.method,
    params
  );
}

export async function getStaticBlogTags(params: getBlogTagsParams) {
  const blogList = (await basicStaticRequest()) as staticBlogInfo[];
  const tags = (
    blogList.find((blog) => blog.id === params.id) as staticBlogInfo
  ).tags;
  return tags;
}

export async function getBlogByTags(params: getBlogByTagsParams) {
  return await basicRequest(
    routers.getBlogByTags.path,
    routers.getBlogByTags.method,
    params
  );
}

export async function getStaticBlogByTags(params: getBlogByTagsParams) {
  const blogList = (await basicStaticRequest()) as staticBlogInfo[];
  let blogsNeed = blogList.filter(blog => blog.tags.includes(params.tag));
  blogsNeed.length - params.offset > params.limit
    ? blogsNeed = blogsNeed.slice(params.offset, params.offset + params.limit)
    : blogsNeed = blogsNeed.slice(params.offset, blogList.length);
  return blogsNeed;
}

export async function getLinks() {
  return await basicRequest(routers.getLinks.path, routers.getLinks.method);
}

export async function getBlogComments(params: getBlogCommentsParams) {
  return await basicRequest(
    routers.getBlogComments.path,
    routers.getBlogComments.method,
    params
  );
}

export async function addComment(params: addCommentParams) {
  return await basicRequest(
    routers.addComment.path,
    routers.addComment.method,
    params
  );
}
