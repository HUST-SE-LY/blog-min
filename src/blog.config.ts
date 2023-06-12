import { routerType, staticLink } from "./types";

interface config {
  static: boolean;
  homeBackground: false | string;
  mainBackground: false | string;
  homeVideo: false | string;
  avatarTags: false | [string, string?, string?, string?, string?];
  blogBackground: false | string;
  blogComment: boolean;
  blogContent: boolean;
  commonTags: boolean;
  staticCommonTags: false | [string, string?, string?, string?, string?];
  search: boolean;
  commonSites: boolean;
  staticCommonSites: false | Array<staticLink>;
  layout: "one col" | "two cols";
  avatar: string;
  title: string;
  introduction: string;
  chatBox: boolean;
  chatWelcomeWord: false | string;
  music: boolean;
  staticMusicList: false| Array<string>;
  requests:
    | false
    | {
        host: string;
        router: {
          getBlogList: routerType;
          getBlogDetail: routerType;
          getBlogByTitle: routerType;
          getTags: routerType;
          getBlogTags: routerType;
          getBlogByTags: routerType;
          getLinks: routerType;
        };
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

const blogConfig: config = {
  static: false,
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
    },
  },
  homeBackground: false,
  mainBackground: "/src/assets/mainBackground.jpg",
  chatBox: true,
  homeVideo: "/src/assets/background.mp4",
  blogBackground: "/src/assets/blogBackground.jpeg",
  blogComment: false,
  blogContent: true,
  commonTags: true,
  staticCommonTags: ["vue", "react"],
  search: true,
  commonSites: true,
  staticCommonSites: [{
    name: "bilibili",
    url: "https://www.bilibili.com/",
  }],
  music: true,
  staticMusicList: ["/src/assets/bgm.m4a"],
  layout: "two cols",
  avatar: "/src/assets/avatar.jpg",
  avatarTags: ["前端", "想吃薯条", "infp", "enfp", "睡眠好差"],
  title: "柴犬的小窝",
  introduction: "她做着琉璃般的梦...当星河坠入深海之时...",
  chatWelcomeWord:
    "你好，我是柴犬的朋友赛博柴犬，你可以在下面的输入框里添加openAI的apiKey来与我对话，我不会收集任何apiKey",
};



export default blogConfig;
