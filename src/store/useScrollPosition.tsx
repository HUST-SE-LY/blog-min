import { useContext } from "react"
import { ScrollPositionContext } from "./scrollPositionStore"

export const useScrollPosition = () => {
  const context = useContext(ScrollPositionContext);
  if(!context) {
    throw new Error('context is null!')
  }
  return context
}