import { useState } from "react";
import { getBlogByTags } from "../../../../utils/requests";
import blogConfig from "../../../../blog.config";
import staticInfo from "../../../../static/static";

export default function SingleTag(props: singleTagProps) {
  const [choose, setChoose] = useState(false);
  async function getList() {
    let res: getBlogRes;
    if (choose) {
      setChoose(false);
      props.setIsBottom(true);
      props.setCurrentTag("");
      props.setList([]);
    } else {
      setChoose(true);
      props.setCurrentTag(props.content);
      props.setList([]);
      props.setLoading(true);
      if (blogConfig.static) {
        const fetchResult = await fetch(staticInfo.path);
        const blogList = await fetchResult.json();
        const resultList = blogList.filter((blog: staticBlogInfo) =>
          blog.tags.find((tag) => tag === props.content)
        );
        res = {
          data: {
            blogs: resultList,
          },
        };
      } else {
        res = (await getBlogByTags({
          limit: 10,
          offset: 0,
          tag: props.content,
        })) as getBlogRes;
      }

      props.setList(res.data.blogs);
      res.data.blogs.length < 10
        ? props.setIsBottom(true)
        : props.setIsBottom(false);
      props.setLoading(false);
    }
  }

  return (
    <div
      onClick={() => getList()}
      className="relative w-fit px-[20px] h-[24px] max-sm:px-[16px] max-sm:h-[20px] max-sm:leading-[18px] rounded-full leading-[20px] text-[12px] overflow-hidden"
    >
      <div className="animate-spin w-[200px]  h-[200px] absolute top-[calc(50%_-_100px)] left-[calc(50%_-_100px)] bg-gradient-to-br from-pink-300 to-blue-300"></div>
      <div className="cursor-pointer max-sm:w-[calc(100%_-_2px)] max-sm:h-[calc(100%_-_2px)] max-sm:top-[1px] max-sm:left-[1px] text-center w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] absolute transition-all hover:bg-transparent hover:text-white top-[2px] left-[2px] rounded-full bg-white">
        {props.content}
      </div>
      <p>{props.content}</p>
    </div>
  );
}
