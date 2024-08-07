/* eslint-disable react-hooks/exhaustive-deps */
import htmr from "htmr";
import {
  BlogA,
  BlogBlockQuote,
  BlogCode,
  BlogH1,
  BlogH2,
  BlogH3,
  BlogH4,
  BlogH5,
  BlogH6,
  BlogLi,
  BlogP,
  BlogPre,
} from "./BlogHtml/ BlogHtmlComponent";
import getAxios from "../../utils/getAxios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import blogConfig from "../../blog.config";
import { getStaticBlogTags } from "../../utils/requests";

export default function BlogHtml(props: blogHtmlProps) {
  const axios = getAxios();
  const params = useParams();
  const [tags, setTags] = useState<
    {
      id: number;
      name: string;
    }[]
  >([]);
  const transform = {
    p: BlogP,
    pre: BlogPre,
    h1: BlogH1,
    h2: BlogH2,
    h3: BlogH3,
    h4: BlogH4,
    h5: BlogH5,
    h6: BlogH6,
    code: BlogCode,
    li: BlogLi,
    blockquote: BlogBlockQuote,
    a: BlogA,
    
  };
  async function getTag() {
    if (blogConfig.static) {
      const res = await getStaticBlogTags({id: parseInt(params.id as string)});
      const tags:tagInfo[] = [];
      res.forEach((tag, index) => {
        tags.push({
          id: index,
          name: tag
        })
      })
      setTags(tags)
    } else {
      const res = await axios.post("/get/blogTag", {
        id: params.id,
      });
      const tags = (res as getBlogTagRes).data.tags;
      setTags(tags);
    }
  }
  useEffect(() => {
    getTag();
  }, []);
  return (
    <div className="max-w-[800px] mx-[auto] mb-[1rem] rounded-[0_0_16px_16px] max-md:w-auto max-md:mx-[20px] border-2 overflow-x-hidden bg-white/90 transition-all hover:backdrop-blur-sm  py-[1rem] px-[2rem] max-sm:px-[1rem] border-blue-200">
      <div className="w-full min-w-fit max-w-full border-y-2 border-blue-200  relative pl-[1rem] py-[1rem] pr-[30px]">
        <p className="text-xl max-sm:mb-[5px] max-sm:text-[16px] font-bold mb-[10px]">{props.title}</p>
        <p className="text-gray-600 max-sm:mb-[5px] max-sm:text-[12px] mb-[10px]">{props.date}</p>
        {tags ? (
          tags.map((tag) => (
            <span
              key={tag.id}
              className="w-fit h-fit px-[1rem] max-sm:text-[12px] text-sm py-[0.1rem] bg-blue-200 rounded mr-[1rem]"
            >
              {tag.name}
            </span>
          ))
        ) : (
          <span className="bg-gray-400 animate-pulse h-[1.2rem] w-[10rem]"></span>
        )}
      </div>
      {htmr(props.html, {
        transform,
      })}
    </div>
  );
}
