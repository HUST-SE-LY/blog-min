import React from "react";
import { asyncDebounce } from "./debounce";
import throttle from "./throttle";
import { getBlogByTitle, getStaticBlogByTitle } from "./requests";
import blogConfig from "../blog.config";

export const handleScroll = throttle(
  (e: WheelEvent, from: HTMLDivElement, to: HTMLDivElement) => {
    function prevent(e: WheelEvent) {
      e.preventDefault();
    }
    e.preventDefault();
    if (e.deltaY > 0) {
      to.scrollIntoView({
        behavior: "smooth",
      });
      to.addEventListener("wheel", prevent);
      setTimeout(() => {
        to.removeEventListener("wheel", prevent);
      }, 800);
    } else {
      from.scrollIntoView({
        behavior: "smooth",
      });
    }
  },
  800
);

export const handleTouch = throttle(
  (
    container: HTMLDivElement,
    from: HTMLDivElement,
    to: HTMLDivElement,
    touchStartEvent: TouchEvent
  ) => {
    container.addEventListener("touchend", (e) => {
      e.preventDefault();
      function prevent(e: TouchEvent) {
        e.preventDefault();
      }
      const startY = touchStartEvent.touches[0].pageY;
      const endY = e.changedTouches[0].pageY;
      if (endY < startY) {
        to.scrollIntoView({
          behavior: "smooth",
        });
        to.addEventListener("touchstart", prevent);
      setTimeout(() => {
        to.removeEventListener("touchstart", prevent);
      }, 800);
      } else {
        from.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  },
  800
);

export const handleKeyBoard = throttle(
  (e: KeyboardEvent, from: HTMLDivElement, to: HTMLDivElement) => {
    if (e.key === "ArrowUp") {
      from.scrollIntoView({
        behavior: "smooth",
      });
    }
    if (e.key === "ArrowDown") {
      to.scrollIntoView({
        behavior: "smooth",
      });
    }
  },
  800
);


export const handleSearchBarInput = asyncDebounce(
  async (
    keyWords: string,
    limit: number,
    offset: number,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (!keyWords) {
      setLoading(false);
      return;
    }
    let result;
    if(!blogConfig.static) {
      result = await getBlogByTitle({limit: limit, offset: offset, title: keyWords});
    } else {
      const res = await getStaticBlogByTitle({limit: limit, offset: offset, title: keyWords})
      if(res.length > limit) {
        res.slice(0, limit)
      }
      result = {
        data: {
          blogs: res
        }
      }
    } 
    setLoading(false);
    return result.data.blogs;
  },
  500
);
