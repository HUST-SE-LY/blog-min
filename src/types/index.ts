export interface blogInfo {
  date: string;
  des: string;
  file: string;
  id: number;
  picture: string;
  title: string;
}

export interface basicRes {
  code: number;
  message: string;
}

export interface getBlogRes extends basicRes {
  data: {   
      blogs: Array<blogInfo>
  }
}

export interface getBlogDetailRes {
  data: {
    html: string;
    code: number;
    msg: string;
  }
}

export interface singleRowProps {
  blogInfo: blogInfo;
  index: number
}

export interface blogTowColProps  {
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
  id: number
}

export interface blogHtmlProps {
  html: string;
}

export interface blogContentTitles {
  style: string
  title: string;
}



