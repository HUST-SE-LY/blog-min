import htmr from "htmr";
import { blogHtmlProps } from "../../types";
import { BlogCode, BlogH1, BlogH2, BlogH3, BlogH4, BlogH5, BlogH6, BlogP, BlogPre } from "./BlogHtml/ BlogHtmlComponent";

export default function BlogHtml(props: blogHtmlProps) {
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
  }
  return (
    <div className="max-w-[800px] mx-auto border-x-2 bg-white/90 transition-all hover:backdrop-blur-sm  py-[1rem] px-[2rem] border-blue-200">
      {htmr(props.html, {
        transform
      })}
    </div>
  );
}
