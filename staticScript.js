/* eslint-disable no-empty */
import fs from "fs";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
const md = new MarkdownIt({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<pre class="hljs"><code>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          "</code></pre>"
        );
      } catch (__) {}
    }
    return (
      '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + "</code></pre>"
    );
  },
});
function getBlogsInfo() {
  const blogFiles = fs.readdirSync("./src/blogs/");
  blogFiles.forEach((fileName) => {
    const path = `./src/blogs/${fileName}`;
    const data = fs.readFileSync(path, "utf8");
    let title = "";
    const tags = [];
    let des = "";
    let date = "";
    if (data.startsWith("---\n")) {
      const head = data.split("---\n")[1];
      const content = data.split(head + "---\n")[1];
      const html = md.render(content);
      const headOptions = head.split("\n");
      headOptions.forEach((option) => {
        const key = option.split(": ")[0];
        const value = option.split(": ")[1];
        switch (key) {
          case "title":
            title = value;
            break;
          case "tags":
            tags.push(...value.split(" "));
            break;
          case "des":
            des = value;
            break;
          case "date":
            date = value;
            break;
        }
      });
      blogContent.push({
        title,
        tags,
        des,
        date,
        html,
      });
    } else {
      throw new Error("Invalid blog file");
    }
  });
}

const blogContent = [];
getBlogsInfo();
console.log(blogContent);