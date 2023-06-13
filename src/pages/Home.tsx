import { lazy, useEffect, useRef, useState } from "react";
import blogConfig from "../blog.config";
import {
  handleKeyBoard,
  handleScroll,
  handleTouch,
} from "../utils/eventHandler";
import { blogInfo, getBlogRes, staticBlogInfo } from "../types";
import { useLoaderData } from "react-router-dom";
import SingleRow from "../components/home/SingleRow";
import getTitleTagPos from "../utils/getTitleTagPos";
import loadingSVG from "../assets/loading.svg";
import toTopSVG from "../assets/toTop.svg";
import toTop from "../utils/toTop";
import { getBlogList, getStaticBlogList } from "../utils/requests";

const TypingWord = lazy(() => import("../components/public/typingWord"));
const ChatBox = lazy(() => import("../components/home/ChatBox"));
const MusicBar = lazy(() => import("../components/home/MusicBar"));
const SideBar = lazy(() => import("../components/home/SideBar"));
export default function Home() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const headerContainer = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const loaderData = useLoaderData() as staticBlogInfo[] | getBlogRes;
  const [isBottom, setIsBottom] = useState(false);
  const loadingBall = useRef<HTMLImageElement>(null);
  const limit = 10;
  let offset = 10;
  const [blogList, setBlogList] = useState<
    Array<blogInfo> | Array<staticBlogInfo>
  >([]);
  const [showTags, setShowTags] = useState(false);
  document.addEventListener("scroll", (e) => {
    e.stopPropagation();
  });
  async function updateBlogList() {
    offset += blogList.length;
    if (blogConfig.static) {
      const res = await getStaticBlogList({ limit: limit, offset: offset });
      console.log(res);
      if (res.length < limit) {
        setIsBottom(true);
      }
      offset += res.length;
      setBlogList((prev) => [...prev, ...res]);
    } else {
      const res = await getBlogList({ limit: limit, offset: offset });
      const blogs = (res as getBlogRes).data.blogs;
      if (blogs.length < limit) {
        setIsBottom(true);
      }
      offset += blogs.length;
      setBlogList((prev) => [...prev, ...(res as getBlogRes).data.blogs]);
    }
  }
  useEffect(() => {
    const handler: (e: WheelEvent) => void = (e: WheelEvent) => {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleScroll(e, headerContainer.current, mainContainer.current);
      }
    };
    function mobileHandler(e: TouchEvent) {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleTouch(
          container.current,
          headerContainer.current,
          mainContainer.current,
          e
        );
      }
    }
    function keyboardHandler(e: KeyboardEvent) {
      if (
        mainContainer.current &&
        headerContainer.current &&
        container.current
      ) {
        handleKeyBoard(e, headerContainer.current, mainContainer.current);
      }
    }
    if (container.current) {
      container.current.addEventListener("wheel", (e) => {
        e.preventDefault();
        handler(e);
      });
      container.current.addEventListener("touchstart", (e) => {
        e.preventDefault();
        mobileHandler(e);
      });
      document.addEventListener("keyup", (e) => {
        keyboardHandler(e);
      });
    }
    if (mainContainer.current) {
      let isGoingToTop = false;
      mainContainer.current.addEventListener("wheel", (e) => {
        if (!mainContainer.current?.scrollTop && e.deltaY < 0) {
          e.preventDefault();
          if (isGoingToTop) return;
          isGoingToTop = true;
          headerContainer.current?.scrollIntoView({
            behavior: "smooth",
          });
          setTimeout(() => {
            isGoingToTop = false;
          }, 800);
        }
        e.stopPropagation();
      });
      mainContainer.current.addEventListener("touchstart", (e) => {
        e.stopPropagation();
      });
      mainContainer.current.addEventListener("touchend", (e) => {
        e.stopPropagation();
      });
    }
  }, []);
  useEffect(() => {
    let isLoading = false;
    const observer = new IntersectionObserver(
      async (entries) => {
        if (isLoading) return;
        isLoading = true;
        if (entries[0].intersectionRatio > 0) {
          await updateBlogList();
        }
        isLoading = false;
      },
      {
        threshold: [0, 0.1, 0.5, 1],
      }
    );
    if (loadingBall.current) {
      observer.observe(loadingBall.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (blogConfig.static) {
      setBlogList(loaderData as staticBlogInfo[]);
    } else {
      setBlogList((loaderData as getBlogRes).data.blogs);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {blogConfig.chatBox ? <ChatBox /> : null}
      {blogConfig.music ? <MusicBar /> : null}
      {blogConfig.search || blogConfig.commonSites || blogConfig.commonTags ? (
        <SideBar />
      ) : null}
      <div className="h-screen overflow-y-scroll non-scrollbar" ref={container}>
        <div
          ref={headerContainer}
          className="relative w-full h-screen flex gap-[1rem] flex-col items-center justify-center bg-radial-transparent-to-white"
        >
          <div className="relative w-fit h-fit">
            <img
              src={blogConfig.avatar}
              alt=""
              onMouseMove={() => {
                setShowTags(true);
              }}
              onMouseLeave={() => {
                setShowTags(false);
              }}
              className="block w-[5rem] h-[5rem] border-blue-400 border-[1px] rounded-full hover:shadow-md hover:shadow-blue-200 transition-all"
            />
            {blogConfig.avatarTags && showTags
              ? blogConfig.avatarTags.map((tag, index) => {
                  const pos = getTitleTagPos(index);
                  return (
                    <p className={`animate-pulse absolute ${pos.x} ${pos.y}`}>
                      {tag}
                    </p>
                  );
                })
              : null}
          </div>

          <p className="font-bold text-2xl">
            <TypingWord time={200} content={blogConfig.title} />
          </p>
          <p>
            <TypingWord time={100} content={blogConfig.introduction} />
          </p>
          {blogConfig.homeVideo ? (
            <>
              <video
                src={blogConfig.homeVideo}
                className="-z-10 object-cover w-full h-full absolute top-0 left-0"
                autoPlay
                loop
                muted
                controls={false}
              ></video>
            </>
          ) : null}
          {blogConfig.homeBackground ? (
            <>
              <img
                src={blogConfig.homeBackground}
                className="-z-10 object-fill w-full h-full absolute top-0 left-0"
              />
            </>
          ) : null}
        </div>
        <div
          className="relative w-full h-screen overflow-y-auto non-scrollbar"
          ref={mainContainer}
        >
          {blogList.map((blogInfo, index) => (
            <SingleRow key={blogInfo.id} blogInfo={blogInfo} index={index} />
          ))}
          {blogConfig.mainBackground ? (
            <>
              <img
                className="fixed w-screen h-screen object-cover top-0 z-[-1000] left-0"
                src={blogConfig.mainBackground}
                alt=""
              />
              {/* <div className="fixed w-screen h-screen top-0 left-0 z-[-999] bg-radial-transparent-to-white"></div> */}
            </>
          ) : null}
          <div className="w-full flex justify-center items-center">
            {!isBottom ? (
              <div className="w-[40px] h-[40px] rounded-full animate-spin flex justify-center items-center bg-blue-200">
                <img ref={loadingBall} src={loadingSVG} alt="" />
              </div>
            ) : (
              <div className="w-fit h-fit px-[2rem] py-[1rem] border-2 border-blue-200 bg-white/80 rounded-lg mb-[2rem] ">
                已经到尽头了哦
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          toTop(mainContainer.current as HTMLElement);
        }}
        className="z-[904] fixed right-[150px] bottom-[100px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center"
      >
        <img src={toTopSVG} alt="" />
      </div>
    </>
  );
}
