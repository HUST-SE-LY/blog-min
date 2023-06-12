import { getBlogRes, singleTagProps } from "../../../../types";
import { getBlogByTags } from "../../../../utils/requests";

export default function SingleTag(props: singleTagProps) {

  async function getList() {
    props.setCurrentTag(props.content)
    props.setList([]);
    props.setLoading(true);
    const res = await getBlogByTags({limit: 10, offset: 0, tag: props.content}) as getBlogRes;
    props.setList(res.data.blogs);
    res.data.blogs.length < 10 ? props.setIsBottom(true) : props.setIsBottom(false);
    props.setLoading(false);
  }

  return (
    <div onClick={() => getList()} className="relative w-fit px-[20px] h-[24px] rounded-full leading-[20px] text-[12px] overflow-hidden">
      <div className="animate-spin w-[200px]  h-[200px] absolute top-[calc(50%_-_100px)] left-[calc(50%_-_100px)] bg-gradient-to-br from-pink-300 to-blue-300"></div>
      <div className="cursor-pointer text-center w-[calc(100%_-_4px)] h-[calc(100%_-_4px)] absolute transition-all hover:bg-transparent hover:text-white top-[2px] left-[2px] rounded-full bg-white">
        {props.content}
      </div>
      <p>{props.content}</p>
    </div>
  );
}
