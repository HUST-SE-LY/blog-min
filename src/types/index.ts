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

export interface singleRowProps {
  blogInfo: blogInfo;
  index: number
}

export interface blogTowColProps  {
  blogInfo: blogInfo;
  isMain: boolean;
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


