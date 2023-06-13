/* eslint-disable @typescript-eslint/no-explicit-any */
export function asyncDebounce<T extends any[]>(
  fn: (...args: T) => Promise<any>,
  delay: number
) {
  let timer: null | number = null;
  let result:any = null;
  const func = async function (this: unknown, ...args: T) {
    return new Promise((resolve) => {
      if (timer !== null) {
        clearTimeout(timer);
        result = null;
      }
      timer = setTimeout(async () => {
        result = await fn.apply(this, args);
        resolve(result)
      }, delay);
    })
  };
  return func;
}
