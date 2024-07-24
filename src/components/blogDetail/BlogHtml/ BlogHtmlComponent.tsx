import { ReactNode } from "react";

interface simpleProps {
  children?: ReactNode;
}

export function BlogH1(props: simpleProps) {
  return (
    <h1 className="h leading-[64px] max-sm:leading-[48px] max-sm:text-[20px] text-[24px] font-bold">
      {props.children}
    </h1>
  );
}

export function BlogH2(props: simpleProps) {
  return (
    <h2 className="h leading-[60px] max-sm:leading-[44px] max-sm:text-[18px] text-[22px] font-bold">
      {props.children}
    </h2>
  );
}

export function BlogH3(props: simpleProps) {
  return (
    <h3 className="h leading-[56px] max-sm:leading-[40px] max-sm:text-[16px] text-[20px] font-bold">
      {props.children}
    </h3>
  );
}

export function BlogH4(props: simpleProps) {
  return (
    <h4 className="h leading-[52px] max-sm:leading-[36px] max-sm:text-[14px] text-[18px] font-bold">
      {props.children}
    </h4>
  );
}

export function BlogH5(props: simpleProps) {
  return (
    <h5 className="h leading-[48px] max-sm:leading-[32px] max-sm:text-[12px] text-[16px] font-bold">
      {props.children}
    </h5>
  );
}

export function BlogH6(props: simpleProps) {
  return (
    <h6 className="h leading-[44px] max-sm:leading-[28px] max-sm:text-[12px] text-[16px] font-bold text-gray-600">
      {props.children}
    </h6>
  );
}

export function BlogP(props: simpleProps) {
  return (
    <p className="leading-[32px] max-sm:leading-[24px] max-sm:text-[12px] my-[1rem] font-[400] font-sans">
      {props.children}
    </p>
  );
}

export function BlogCode(props: simpleProps) {
  return (
    <code className="max-sm:text-[12px] py-[2px] h-[32px] px-[10px] rounded bg-slate-100 text-[14px] font-mono">
      {props.children}
    </code>
  );
}

export function BlogPre(props: simpleProps) {
  return (
    <pre className="non-scrollbar leading-[26px] blog-html-pre bg-slate-100 p-[12px] text-[14px] rounded-md font-mono">
      {props.children}
    </pre>
  );
}

export function BlogLi(props: simpleProps) {
  return (
    <li className="list-disc max-sm:text-[12px] leading-[28px] my-[1rem] font-[400] font-sans ml-[20px]">
      {props.children}
    </li>
  );
}

export function BlogBlockQuote(props: simpleProps) {
  return (
    <div className="relative bg-blue-100/50 text-gray-500 px-[1rem]">
      {props.children}
      <div className="absolute w-[6px] bg-blue-300 top-0 left-0 h-full"></div>
    </div>
  );
}

export function BlogA(props: simpleProps) {
  return <a className="underline text-blue-400">
    {props.children}
  </a>
}
