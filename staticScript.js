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
    if(!fileName.endsWith(".md")) return;
    const path = `./src/blogs/${fileName}`;
    const data = fs.readFileSync(path, "utf8");
    let title = "";
    const tags = [];
    let des = "";
    let date = "";
    let picture = "";
    if (data.startsWith("---\n")) {
      const head = data.split("---\n")[1];
      const content = data.split(head + "---\n")[1];
      const html = md.render(content);
      const headOptions = head.split("\n");
      headOptions.pop();
      headOptions.forEach((option) => {
        const key = option.split(": ")[0];
        const value = option.split(": ")[1];
        if(!(value&&key)) {
          console.log(key, value);
          throw new Error(`Invalid delimiter in ${fileName}`)
        }
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
          case "picture": 
            picture = value;
            break;
          default: 
            throw new Error(`invalid option in ${fileName}, naming ${key.toString()}`);
        }
      });
      if(!(title&&des&&date&&tags)) throw new Error(`blog ${fileName} lose info`)
      blogContent.push({
        file: fileName,
        title,
        tags,
        des,
        date,
        html,
        picture
      });
    } else {
      throw new Error(`${fileName} Invalid blog file`);
    }
  });
}

const blogContent = [];
getBlogsInfo();
blogContent.forEach((item, index) => {
  item.id = index
}); 
fs.writeFileSync(
  "./public/config.json",
  JSON.stringify(blogContent),
  "utf-8"
);
console.log("success! Congratulations!")
