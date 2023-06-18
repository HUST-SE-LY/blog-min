export interface staticBlogInfo {
  file: string;
  id: number;
  date: string;
  title: string;
  des: string;
  html: string;
  tags: string[];
  picture: string;
}

export interface blogInfo {
  date: string;
  des: string;
  file: string;
  id: number;
  picture: string;
  title: string;
}


export interface getBlogRes {
  data: {
    blogs: Array<blogInfo>;
  };
}

export interface getBlogDetailRes {
  data: {
    html: string;
    code: number;
    msg: string;
    date: string;
    title: string;
  };
}

export interface singleRowProps {
  blogInfo: blogInfo;
  index: number;
}

export interface blogTowColProps {
  blogInfo: blogInfo;
  isMain: boolean;
}

export interface blogOneColProps {
  blogInfo: blogInfo;
  isLeft: boolean;
}

export interface chatResProps {
  res: string;
}

export interface chatReqProps {
  req: string;
}

export interface chatListElement {
  isReq: boolean;
  content: string;
}

export interface playListElement {
  name: string;
  id: number;
}

export interface blogHtmlProps {
  html: string;
  title: string;
  date: string;
}

export interface blogContentTitles {
  style: string;
  title: string;
}

export interface tagInfo {
  id: number;
  name: string;
}

export interface getBlogTagRes {
  data: {
    tags: Array<tagInfo>;
  };
}

export interface getTagsRes {
  data: {
    tags: Array<tagInfo>;
  }
}

export interface singleTagProps {
  content: string;
  setList: React.Dispatch<React.SetStateAction<blogInfo[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setIsBottom: React.Dispatch<React.SetStateAction<boolean>>
  setCurrentTag: React.Dispatch<React.SetStateAction<string>>
}

export interface routerType {
  path: string;
  method: 'get'|'post';
}

export interface staticLink {
  name: string;
  url: string;
}

export interface getLinksRes {
  data: {
    links: Array<staticLink>
  }
}

export interface commentInfo {
  name: string;
  content: string;
  id: number;
}

export interface getCommentsRes {
  data: {
    list: commentInfo[];
  }
}

