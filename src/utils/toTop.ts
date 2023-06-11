export default function toTop(element?: HTMLElement) {
  console.log(element)
  if(element) {
    element.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  } else {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}