import throttle from "./throttle";

export const handleScroll = throttle(
  (e: WheelEvent, from: HTMLDivElement, to: HTMLDivElement) => {
    if (e.deltaY > 0) {
      to.scrollIntoView({
        behavior: "smooth",
      });
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
      const startY = touchStartEvent.touches[0].pageY;
      const endY = e.changedTouches[0].pageY;
      if (endY < startY) {
        to.scrollIntoView({
          behavior: "smooth",
        });
      } else {
        from.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
    setTimeout(() => {
      container.removeEventListener("touchend", (e) => {
        e.preventDefault();
        const startY = touchStartEvent.touches[0].pageY;
        const endY = e.changedTouches[0].pageY;
        console.log(startY, endY);
        if (endY < startY) {
          to.scrollIntoView({
            behavior: "smooth",
          });
        } else {
          from.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    }, 800);
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
