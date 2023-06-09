import { chatResProps } from "../../../types";

export default function SingleInfoReq(props: chatResProps) {
  return <div className="w-fit mt-[1rem] max-w-[80%] bg-blue-50 rounded-[16px_16px_16px_0px] p-[1rem]">{props.res}</div>
}