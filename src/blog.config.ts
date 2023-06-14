import { routerType, staticLink } from "./types";

export interface router {
  getBlogList: routerType;
  getBlogDetail: routerType;
  getBlogByTitle: routerType;
  getTags: routerType;
  getBlogTags: routerType;
  getBlogByTags: routerType;
  getLinks: routerType;
  getBlogComments: routerType;
  addComment: routerType;
}
interface config {
  static: boolean;
  homeBackground: false | string;
  mainBackground: false | string;
  staticBlogBackground: false | string[];
  homeVideo: false | string;
  avatarTags: false | [string, string?, string?, string?, string?];
  blogBackground: false | string;
  blogComment: boolean;
  blogContent: boolean;
  commonTags: boolean;
  staticCommonTags: false | Array<string>;
  search: boolean;
  commonSites: boolean;
  staticCommonSites: false | Array<staticLink>;
  layout: "one col" | "two cols";
  avatar: string;
  title: string;
  introduction: string;
  chatBox: boolean;
  chatAvatar: false | string;
  chatWelcomeWord: false | string;
  systemPrompt: false | string,
  music: boolean;
  neteasePlayListId: false|string;
  staticMusicList: false | Array<string>;
  requests:
    | false
    | {
        host: string;
        router: router;
      };
}

export interface getBlogListParams {
  limit: number;
  offset: number;
}

export interface getBlogDetailParams {
  id: number;
}

export interface getBlogByTitleParams {
  limit: number;
  offset: number;
  title: string;
}

export interface getBlogTagsParams {
  id: number;
}

export interface getBlogByTagsParams {
  limit: number;
  offset: number;
  tag: string;
}

export interface getLinksParams {
  limit: number;
  offset: number;
}

export interface getBlogCommentsParams {
  limit: number;
  offset: number;
  blog: number;
}

export interface addCommentParams {
  name: string;
  content: string;
  blog: string;
}

const blogConfig: config = {
  static: true,
  requests: {
    host: "https://www.coisini.love/api/",
    router: {
      getBlogList: {
        path: "/get/blog",
        method: "post",
      },
      getBlogByTitle: {
        path: "/get/blogByTitle",

        method: "post",
      },
      getBlogDetail: {
        path: "/get/blogById",
        method: "post",
      },
      getBlogTags: {
        path: "/get/blogTag",
        method: "post",
      },
      getTags: {
        path: "/get/tag",
        method: "post",
      },
      getBlogByTags: {
        path: "/get/blogByTag",
        method: "post",
      },
      getLinks: {
        path: "/get/link",
        method: "post",
      },
      getBlogComments: {
        path: "/get/comment",
        method: "post",
      },
      addComment: {
        path: "/comment/add",
        method: "post",
      },
    },
  },
  homeBackground: false,
  mainBackground: "mainBackground.jpg",
  staticBlogBackground: ["blogBackground1.jpeg","blogBackground2.jpeg","blogBackground3.jpeg"],
  chatBox: true,
  chatAvatar: "cyberCheems.jpg",
  homeVideo: "background.mp4",
  blogBackground: "/blogBackground.jpeg",
  blogComment: true,
  blogContent: true,
  commonTags: true,
  staticCommonTags: ["vue", "react","hello"],
  search: true,
  commonSites: true,
  staticCommonSites: [
    {
      name: "bilibili",
      url: "https://www.bilibili.com/",
    },
    {
      name: "google",
      url: "https://www.google.com/"
    }
  ],
  music: true,
  neteasePlayListId: "2517473337",
  staticMusicList: ["bgm.m4a"],
  layout: "two cols",
  avatar: "avatar.jpg",
  avatarTags: ["前端", "想吃薯条", "infp", "enfp", "睡眠好差"],
  title: "柴犬的小窝",
  introduction: "她做着琉璃般的梦...当星河坠入深海之时...",
  chatWelcomeWord:
    "你好，我是柴犬的朋友赛博柴犬，你可以在下面的输入框里添加openAI的apiKey来与我对话，我不会收集任何apiKey",
  systemPrompt: "现在假设你是一个赛博朋克柴犬，能回答我提出的问题，你的回答方式要像赛博朋克柴犬说话的样子。我的问题是："
};

export default blogConfig;
