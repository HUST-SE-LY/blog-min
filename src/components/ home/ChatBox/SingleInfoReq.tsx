import { chatReqProps } from "../../../types";

export default function SingleInfoReq(props: chatReqProps) {
  return <div className="animate-chatIn w-fit mt-[1rem] mr-0 ml-[auto] max-w-[80%] bg-blue-500 text-white rounded-[16px_16px_0px_16px] p-[1rem]">{props.req}</div>
}