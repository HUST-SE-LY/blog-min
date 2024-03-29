export default function getBlogContentTitles() {
  return new Promise<Array<blogContentTitles>>((resolve) => {
    const result: Array<blogContentTitles> = [];
    const config = { attributes: false, childList: true, subtree: true };
    const observer = new MutationObserver((mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList" && document.querySelector(".h")) {
          observer.disconnect();
          const hList = document.querySelectorAll<HTMLHeadElement>(".h");
          hList.forEach((element) => {
            const tagName = element.tagName;
            switch (tagName) {
              case "H1":
                element.id = element.innerText;
                result.push({ title: element.innerText, style: "pl-[12px]" });
                break;
              case "H2":
                element.id = element.innerText;
                result.push({ title: element.innerText, style: "pl-[24px]" });
                break;
              case "H3":
                element.id = element.innerText;
                result.push({ title: element.innerText, style: "pl-[36px]" });
                break;
              case "H4":
                element.id = element.innerText;
                result.push({ title: element.innerText, style: "pl-[48px]" });
                break;
              case "H5":
                element.id = element.innerText;
                result.push({ title: element.innerText, style: "pl-[60px]" });
                break;
              case "H6":
                element.id = element.innerText;
                result.push({
                  title: element.innerText,
                  style: "pl-[60px] text-gray-600",
                });
                break;
            }
          });
          resolve(result);
          return;
        }
      }
    });
    observer.observe(document.body, config)
  });
}
