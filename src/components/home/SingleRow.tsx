import { lazy } from "react";
import blogConfig from "../../blog.config.ts";
import { singleRowProps } from "../../types/index.ts";

const BlogLeft = lazy(() => import("./SingleRow/BlogLeft.tsx"));
const BlogRight = lazy(() => import("./SingleRow/BlogRight.tsx"));
const BlogSingle = lazy(() => import("./SingleRow/BlogSingle.tsx"));

export default function SingleRow(props: singleRowProps) {
  if (blogConfig.layout === "one col") {
    return <BlogSingle isLeft={props.index % 2 === 0} blogInfo={props.blogInfo} />;
  }

  return (
    <div className={"grid grid-cols-2 h-[300px]"}>
      <BlogLeft isMain={props.index % 2 === 1} blogInfo={props.blogInfo} />
      <BlogRight isMain={props.index % 2 === 0} blogInfo={props.blogInfo} />
    </div>
  );
}
