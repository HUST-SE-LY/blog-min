import { useNavigate, useParams } from "react-router-dom";
import BlogHtml from "../components/blogDetail/BlogHtml";
import blogConfig from "../blog.config";
import toTopSVG from "../assets/toTop.svg";
import lottie from "lottie-web";
import React, { lazy, useEffect, useRef, useState } from "react";
import toTop from "../utils/toTop";
import cx from "clsx";
import { getBlogDetail, getStaticBlogDetail } from "../utils/requests";
import homeSVG from "../assets/home.svg";

const BlogContent = lazy(() => import("../components/blogDetail/BlogContent"));
const BlogComment = lazy(() => import("../components/blogDetail/BlogComment"));
export default function BlogDetail() {
  const [showLoading, setShowLoading] = useState(true);
  const loadingLineContainer = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const params = useParams();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [html, setHtml] = useState("");
  const nav = () => {
    setShowLoading(true);
    setTimeout(() => {
      navigate("/");
    }, 500);
  };
  useEffect(() => {
    if (blogConfig.static) {
      getStaticBlogDetail({ id: parseInt(params.id as string) })
        .then((res) => {
          if (!res) return;
          setTitle(res.title);
          setDate(res.date);
          setHtml(res.html);
        })
        .finally(() => {
          setShowLoading(false);
        });
    } else {
      getBlogDetail({ id: parseInt(params.id as string) })
        .then((res: getBlogDetailRes) => {
          setTitle(res.data.title);
          setDate(res.data.date);
          setHtml(res.data.html);
        })
        .finally(() => {
          setShowLoading(false);
        });
    }
  }, [params.id]);
  useEffect(() => {
    loadingLineContainer.current &&
      lottie.loadAnimation({
        container: loadingLineContainer.current,
        loop: true,
        autoplay: true,
        path: "/loadingLine.json",
      });
  }, []);
  return (
    <>
      <React.Suspense>
        <BlogHtml title={title} date={date} html={html} />
        {blogConfig.blogBackground ? (
          <img
            src={blogConfig.blogBackground}
            className="top-0 left-0 w-screen h-screen fixed z-[-10] object-cover"
            alt=""
          />
        ) : null}
        {blogConfig.blogContent ? <BlogContent /> : null}
        {blogConfig.blogComment && !blogConfig.static ? <BlogComment /> : null}
        <div
          onClick={() => {
            toTop();
          }}
          className="max-sm:w-[30px] max-sm:h-[30px] max-md:right-[50px] fixed right-[150px] bottom-[50px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center"
        >
          <div className='button-pixel-border max-sm:hidden absolute top-1/2 left-1/2 translate-x-[-4px] translate-y-[-4px]'></div> 
          <img
            className="max-sm:w-[15px] max-sm:h-[15px]"
            src={toTopSVG}
            alt=""
          />
        </div>

        <div
          onClick={nav}
          className="max-sm:w-[30px] max-sm:h-[30px] max-md:right-[50px] fixed right-[150px] bottom-[120px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center"
        >
          <div className='button-pixel-border max-sm:hidden absolute top-1/2 left-1/2 translate-x-[-4px] translate-y-[-4px]'></div> 
          <img
            className="max-sm:w-[15px] w-[30px] h-[30px] max-sm:h-[15px]"
            src={homeSVG}
            alt=""
          />
        </div>
      </React.Suspense>

      <div
        className={cx([
          "bg-white fixed w-screen h-screen z-[999] top-0 transition-all flex justify-center flex-col items-center duration-500",
          showLoading ? "right-0" : "right-[100vw]",
        ])}
      >
        <div ref={loadingLineContainer} className="w-full"></div>
      </div>
    </>
  );
}
