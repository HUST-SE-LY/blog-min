/* eslint-disable @typescript-eslint/no-explicit-any */
export default function throttle(fn: (...args:any[]) => any,delay: number) {
  let time = false;
  return function(this:unknown,...args: any[]) {
    if(time) return
    time = true
    setTimeout(() => {
      time = false;
    },delay)
    fn.apply(this, args);
  }
}


