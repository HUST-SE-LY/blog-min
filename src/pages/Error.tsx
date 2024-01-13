import { useEffect, useRef, useState } from "react"
import lottie from 'lottie-web'
import cx from 'clsx'
import { useNavigate } from "react-router-dom";
export const ErrorPage = () => {
  const lottieContainer = useRef<HTMLDivElement>(null);
  const loadingLineContainer = useRef<HTMLDivElement>(null);
  const [showLoading, setShowLoading] = useState(false);
  const navigate = useNavigate();
  const nav = () => {
    setShowLoading(true);
    setTimeout(() => {
      navigate('/')
    }, 500)
  }
  useEffect(() => {
    lottieContainer.current && lottie.loadAnimation({
      container: lottieContainer.current,
      path: '/loading.json',
      loop: true,
      autoplay: true,
    });
    loadingLineContainer.current &&
      lottie.loadAnimation({
        container: loadingLineContainer.current,
        loop: true,
        autoplay: true,
        path: "/loadingLine.json",
      });
  },[])
  return <div className="w-screen h-screen bg-white">
    <div ref={lottieContainer} className="w-[500px] mx-auto max-sm:w-[250px]">

    </div>
    <p className="text-xl max-sm:text-lg text-center">页面错误了, <span onClick={nav} className="text-blue-500 font-bold cursor-pointer">返回主页</span></p>
    <div
        className={cx([
          "bg-white fixed w-screen h-screen z-[999] top-0 transition-all flex justify-center flex-col items-center duration-500",
          showLoading ? "right-0" : "right-[100vw]",
        ])}
      >
        <div ref={loadingLineContainer} className="w-full"></div>
      </div>
  </div>
}