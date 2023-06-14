import { chatResProps } from "../../../types";

export default function SingleInfoReq(props: chatResProps) {
  return <div className="animate-chatIn max-sm:text-[12px] max-sm:p-[0.5rem] max-sm:rounded-[8px_8px_8px_0] w-fit mt-[1rem] max-w-[80%] bg-blue-50 rounded-[16px_16px_16px_0px] p-[1rem]">{props.res}</div>
}