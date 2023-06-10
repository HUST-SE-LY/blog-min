import { ReactNode } from "react";

interface simpleProps {
  children?: ReactNode;
}

export function BlogH1(props: simpleProps) {
  return <h1 className="leading-[64px] text-[24px] font-bold">{props.children}</h1>
}

export function BlogH2(props: simpleProps) {
  return <h2 className="leading-[60px] text-[22px] font-bold">{props.children}</h2>
}

export function BlogH3(props: simpleProps) {
  return <h3 className="leading-[56px] text-[20px] font-bold">{props.children}</h3>
}

export function BlogH4(props: simpleProps) {
  return <h4 className="leading-[52px] text-[18px] font-bold">{props.children}</h4>
}

export function BlogH5(props: simpleProps) {
  return <h5 className="leading-[48px] text-[16px] font-bold">{props.children}</h5>
}

export function BlogH6(props: simpleProps) {
  return <h6 className="leading-[44px] text-[16px] font-bold text-gray-600">{props.children}</h6>
}

export function BlogP(props: simpleProps) {
  return <p  className="leading-[32px] my-[1rem] font-[400] font-sans">{props.children}</p>;
}

export function BlogCode(props: simpleProps) {
  return <code className="leading-[32px] py-[2px] h-[32px] px-[10px] rounded bg-slate-100 text-[14px] font-mono">{props.children}</code>
}

export function BlogPre(props: simpleProps) {

  return <pre className="non-scrollbar blog-html-pre leading-[32px] bg-slate-100 p-[12px] text-[14px] rounded-md font-mono">{props.children}</pre>
}

