export default function getTitleTagPos(index: number) {
  const pos = {
    x: "left-0",
    y: "top-0",
  };
  switch (index) {
    case 0:
      pos.x = "left-[30px]";
      pos.y = "top-[-70px]";
      break;
    case 1:
      pos.x = "left-[-70px]";
      pos.y = "top-[-20px]";
      break;
    case 2:
      pos.x = "left-[-50px]";
      pos.y = "bottom-[-10px]";
      break;
    case 3:
      pos.x = "right-[-50px]";
      pos.y = "bottom-[-10px]";
      break;
    case 4:
      pos.x = "right-[-70px]";
      pos.y = "top-[-20px]";
      break;
  }
  return pos
}
