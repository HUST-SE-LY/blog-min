import React, { lazy, useEffect, useRef, useState } from 'react';
import blogConfig from '../blog.config';
import SingleRow from '../components/home/SingleRow';
import loadingSVG from '../assets/loading.svg';
import toTopSVG from '../assets/toTop.svg';
import toTop from '../utils/toTop';
import { getBlogList, getStaticBlogList } from '../utils/requests';
import cx from 'clsx';
import lottie from 'lottie-web';
import { useScrollPosition } from '../store/useScrollPosition';

const limit = 10;
const ChatBox = lazy(() => import('../components/home/ChatBox'));
const MusicBar = lazy(() => import('../components/home/MusicBar'));
const SideBar = lazy(() => import('../components/home/SideBar'));
export default function Home() {
  const offset = useRef(10);
  const [isLoading, setIsLoading] = useState(false);
  const mainContainer = useRef<HTMLDivElement>(null);
  const headerContainer = useRef<HTMLDivElement>(null);
  const loadingLineContainer = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState(false);
  const loadingBall = useRef<HTMLDivElement>(null);
  const [isJump, setIsJump] = useState(true);
  const { state, dispatch } = useScrollPosition();

  const [blogList, setBlogList] = useState<
    Array<blogInfo> | Array<staticBlogInfo>
  >([]);
  document.addEventListener('scroll', (e) => {
    e.stopPropagation();
  });
  const handleScroll = async () => {
    if (isLoading) return;
    if (mainContainer.current) {
      const { scrollHeight, scrollTop, clientHeight } = mainContainer.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsLoading(true);
        await updateBlogList();
        setIsLoading(false);
      }
    }
  };

  const getVideo = () => {
    return (new Date()).getHours() > 6 && (new Date()).getHours() < 19 ? '/morningBg.mp4' : '/nightBg.mp4'
    
  }
  async function updateBlogList() {
    if (blogConfig.static) {
      const res = await getStaticBlogList({
        limit: limit,
        offset: offset.current,
      });
      if (res.length < limit) {
        setIsBottom(true);
      }
      offset.current += res.length;
      setBlogList((prev) => [...prev, ...res]);
    } else {
      const res = await getBlogList({ limit: limit, offset: offset.current });
      const blogs = (res as getBlogRes).data.blogs;
      if (blogs.length < limit) {
        setIsBottom(true);
      }
      offset.current += blogs.length;
      setBlogList((prev) => [...prev, ...(res as getBlogRes).data.blogs]);
    }
  }
  const onJump = () => {
    setIsJump(true);
    if (container.current && mainContainer.current) {
      dispatch({
        type: 'setPosition',
        payload: {
          position: container.current.scrollTop,
          mainPosition: mainContainer.current.scrollTop,
        },
      });
    }
  };
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
        path: '/loadingLine.json',
      });
  }, []);
  useEffect(() => {
    console.log(state);
    if (
      container.current &&
      mainContainer.current &&
      state.mainPosition &&
      state.position
    ) {
      container.current.scrollTo({
        top: state.position,
      });
      mainContainer.current.scrollTo({
        top: state.mainPosition,
      });
      dispatch({ type: 'clear' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            className="relative snap-start w-full h-screen flex gap-[1rem] flex-col items-center justify-center"
          >
            <div className="relative w-fit h-fit">
              <div className="avatar-pixel-circle bg-transparent z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute"></div>
              <img
                src={blogConfig.avatar}
                alt=""
                className="block scale-[0.9] w-[5rem] h-[5rem] rounded-full hover:shadow-md transition-all"
              />
            </div>

            <p className="animate-floatIn font-pixel bg-clip-text text-transparent bg-gradient-to-br from-white to-blue-300 font-bold text-2xl max-sm:text-[16px]">
              {blogConfig.title}
            </p>
            <p className="animate-floatIn font-pixel bg-clip-text text-white max-sm:text-[12px]">
              {blogConfig.introduction}
            </p>
            <video
              src={getVideo()}
              className="-z-10 max-sm:hidden object-cover w-full h-full absolute top-0 left-0"
              autoPlay
              loop
              muted
              controls={false}
            ></video>
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
            onScroll={handleScroll}
            className="relative snap-start w-full h-screen overflow-y-auto non-scrollbar"
            ref={mainContainer}
          >
            {blogList.map((blogInfo, index) => (
              <div key={blogInfo.id}>
                <SingleRow
                  onJump={onJump}
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
                <div
                  ref={loadingBall}
                  className="w-[40px] mb-[2rem] h-[40px] rounded-full animate-spin flex justify-center items-center bg-blue-200"
                >
                  <img src={loadingSVG} alt="" />
                </div>
              ) : (
                <div className="font-pixel text-left mb-[2rem] text-[white] flex justify-start items-center">
                  <div className="max-sm:w-[100px] max-sm:h-[25px] max-sm:leading-[25px] max-sm:text-[12px] rounded-md shadow-md w-[150px] relative h-[50px] text-center leading-[50px] bg-blue-500/30 backdrop-blur-md text-xl">
                    没有了
                    <div className="blog-sub-pixel-border absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="blog-sub-pixel-decoration absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"></div>
                  </div>
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
          <div className="button-pixel-border max-sm:hidden absolute top-1/2 left-1/2 translate-x-[-4px] translate-y-[-4px]"></div>
          <img
            className="max-sm:w-[15px] max-sm:h-[15px]"
            src={toTopSVG}
            alt=""
          />
        </div>
      </React.Suspense>
      <div
        className={cx([
          'bg-white fixed w-screen h-screen z-[999] top-0 transition-all flex justify-center items-center duration-500',
          isJump ? 'left-0' : 'left-[100vw]',
        ])}
      >
        <div ref={loadingLineContainer} className="w-1/2"></div>
      </div>
    </>
  );
}
