import React, { lazy, useEffect, useRef, useState } from "react";
import blogConfig from "../blog.config";

import SingleRow from "../components/home/SingleRow";
import getTitleTagPos from "../utils/getTitleTagPos";
import loadingSVG from "../assets/loading.svg";
import toTopSVG from "../assets/toTop.svg";
import toTop from "../utils/toTop";
import { getBlogList, getStaticBlogList } from "../utils/requests";
import cx from "clsx";
import lottie from "lottie-web";

const ChatBox = lazy(() => import("../components/home/ChatBox"));
const MusicBar = lazy(() => import("../components/home/MusicBar"));
const SideBar = lazy(() => import("../components/home/SideBar"));
export default function Home() {
  const mainContainer = useRef<HTMLDivElement>(null);
  const headerContainer = useRef<HTMLDivElement>(null);
  const loadingLineContainer = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);
  const loadingBall = useRef<HTMLImageElement>(null);
  const [isJump, setIsJump] = useState(true);
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
    console.log(offset)
    if (blogConfig.static) {
      const res = await getStaticBlogList({ limit: limit, offset: offset });
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
  }, [loadingBall.current]);
  useEffect(() => {
    if (blogConfig.static) {
      getStaticBlogList({ limit: 10, offset: 0 }).then((loaderData) => {
        setBlogList(loaderData as staticBlogInfo[]);
      });
    } else {
      getBlogList({ limit: 10, offset: 0 }).then((loaderData: getBlogRes) => {
        setBlogList(loaderData.data.blogs);
        setIsJump(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        {blogConfig.chatBox ? <ChatBox /> : null}
        {blogConfig.music ? <MusicBar /> : null}
        {blogConfig.search ||
        blogConfig.commonSites ||
        blogConfig.commonTags ? (
          <SideBar />
        ) : null}
        <div
          className="h-screen overflow-y-scroll non-scrollbar snap-y snap-mandatory"
          ref={container}
        >
          <div
            ref={headerContainer}
            className="relative snap-start w-full h-screen flex gap-[1rem] flex-col items-center justify-center bg-radial-transparent-to-white"
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
                className="max-sm:w-[3rem] max-sm:h-[3rem] block w-[5rem] h-[5rem] border-blue-400 border-[1px] rounded-full hover:shadow-md hover:shadow-blue-200 transition-all"
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

            <p className="animate-floatIn font-bold text-2xl max-sm:text-[16px]">
              {blogConfig.title}
            </p>
            <p className="animate-floatIn max-sm:text-[12px]">
              {blogConfig.introduction}
            </p>
            {blogConfig.homeVideo ? (
              <>
                <video
                  src={blogConfig.homeVideo}
                  className="-z-10 max-sm:hidden object-cover w-full h-full absolute top-0 left-0"
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
                  className="-z-10 object-cover w-full h-full absolute top-0 left-0"
                />
              </>
            ) : null}
          </div>
          <div
            className="relative snap-start w-full h-screen overflow-y-auto non-scrollbar"
            ref={mainContainer}
          >
            {blogList.map((blogInfo, index) => (
              <div key={blogInfo.id}>
                <SingleRow
                  onJump={() => {
                    setIsJump(true);
                  }}
                  key={blogInfo.id}
                  blogInfo={blogInfo}
                  index={index}
                />
              </div>
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
                <div className="w-[40px] mb-[2rem] h-[40px] rounded-full animate-spin flex justify-center items-center bg-blue-200">
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
          className="max-sm:w-[30px] max-sm:h-[30px] max-md:right-[50px] z-[904] fixed right-[150px] bottom-[100px] w-[40px] h-[40px] bg-white border-blue-200 border-2 cursor-pointer rounded-full flex justify-center items-center"
        >
          <img
            className="max-sm:w-[15px] max-sm:h-[15px]"
            src={toTopSVG}
            alt=""
          />
        </div>
      </React.Suspense>
      <div
        className={cx([
          "bg-white fixed w-screen h-screen z-[999] top-0 transition-all flex justify-center items-center duration-500",
          isJump ? "left-0" : "left-[100vw]",
        ])}
      >
        <div ref={loadingLineContainer} className="w-full"></div>
      </div>
    </>
  );
}
