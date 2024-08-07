import { lazy } from "react";
import blogConfig from "../../blog.config.ts";
import { MobileRow } from "./SingleRow/MobileRow.tsx";

const BlogLeft = lazy(() => import("./SingleRow/BlogLeft.tsx"));
const BlogRight = lazy(() => import("./SingleRow/BlogRight.tsx"));
const BlogSingle = lazy(() => import("./SingleRow/BlogSingle.tsx"));

export default function SingleRow(props: singleRowProps) {
  if (blogConfig.layout === "one col") {
    return (
      <BlogSingle isLeft={props.index % 2 === 0} blogInfo={props.blogInfo} />
    );
  }

  return (
    <>
      <div className={"max-sm:hidden font-pixel  grid grid-cols-2 max-sm:h-[150px] h-[300px]"}>
        <BlogLeft
          onJump={props.onJump}
          isMain={props.index % 2 === 1}
          blogInfo={props.blogInfo}
        />
        <BlogRight
          onJump={props.onJump}
          isMain={props.index % 2 === 0}
          blogInfo={props.blogInfo}
        />
      </div>
      <div className="hidden max-sm:block w-full">
        <MobileRow onJump={props.onJump} blogInfo={props.blogInfo} />
      </div>
    </>
  );
}
