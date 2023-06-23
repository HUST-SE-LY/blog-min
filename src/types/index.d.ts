declare interface staticBlogInfo {
  file: string;
  id: number;
  date: string;
  title: string;
  des: string;
  html: string;
  tags: string[];
  picture: string;
}

declare interface blogInfo {
  date: string;
  des: string;
  file: string;
  id: number;
  picture: string;
  title: string;
}


declare interface getBlogRes {
  data: {
    blogs: Array<blogInfo>;
  };
}

declare interface getBlogDetailRes {
  data: {
    html: string;
    code: number;
    msg: string;
    date: string;
    title: string;
  };
}

declare interface singleRowProps {
  blogInfo: blogInfo;
  index: number;
}

declare interface blogTowColProps {
  blogInfo: blogInfo;
  isMain: boolean;
}

declare interface blogOneColProps {
  blogInfo: blogInfo;
  isLeft: boolean;
}

declare interface chatResProps {
  res: string;
}

declare interface chatReqProps {
  req: string;
}

declare interface chatListElement {
  isReq: boolean;
  content: string;
}

declare interface playListElement {
  name: string;
  id: number;
}

declare interface blogHtmlProps {
  html: string;
  title: string;
  date: string;
}

declare interface blogContentTitles {
  style: string;
  title: string;
}

declare interface tagInfo {
  id: number;
  name: string;
}

declare interface getBlogTagRes {
  data: {
    tags: Array<tagInfo>;
  };
}

declare interface getTagsRes {
  data: {
    tags: Array<tagInfo>;
  }
}

declare interface singleTagProps {
  content: string;
  setList: React.Dispatch<React.SetStateAction<blogInfo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsBottom: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>
}

declare interface routerType {
  path: string;
  method: 'get'|'post';
}

declare interface staticLink {
  name: string;
  url: string;
}

declare interface getLinksRes {
  data: {
    links: Array<staticLink>
  }
}

declare interface commentInfo {
  name: string;
  content: string;
  id: number;
}

declare interface getCommentsRes {
  data: {
    list: commentInfo[];
  }
}

declare interface friendLinkInfo {
  name: string;
  content: string;
  url: string;
  id: number;
}

declare interface staticFriendLinkInfo {
  name: string;
  content: string;
  url: string
}

declare interface getFriendLinkListRes {
  data: {
    list: friendLinkInfo[];
  }
}

declare interface addFriendLinkParams {
  name: string;
  content: string;
  url: string;
}



