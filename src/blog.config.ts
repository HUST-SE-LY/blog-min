interface config {
  static: boolean;
  homeBackground: false | string;
  mainBackground: false | string;
  homeVideo: false | string;
  avatarTags: false| [string, string?, string?, string?, string?],
  blogBackground: false| string;
  blogComment: boolean;
  commonTags: boolean;
  searchByTag: boolean;
  commonSites: boolean;
  sticker: false | Array<string>;
  layout: "one col" | "two cols";
  avatar: string;
  title: string;
  introduction: string;
  chatBox: boolean;
  chatWelcomeWord: string;
  music: boolean;

}

const blogConfig: config = {
  static: false,
  homeBackground: false,
  mainBackground: '/src/assets/mainBackground.jpg',
  chatBox: true,
  homeVideo: '/src/assets/background.mp4',
  blogBackground: '/src/assets/blogBackground.jpeg',
  blogComment: false,
  commonTags: false,
  searchByTag: false,
  commonSites: false,
  music: true,
  sticker: false,
  layout: "two cols",
  avatar: "/src/assets/avatar.jpg",
  avatarTags: ["前端", "想吃薯条", "infp", "enfp", "睡眠好差"],
  title: "柴犬的小窝",
  introduction: "她做着琉璃般的梦...当星河坠入深海之时...",
  chatWelcomeWord: "你好，我是柴犬的朋友赛博柴犬，你可以在下面的输入框里添加openAI的apiKey来与我对话，我不会收集任何apiKey"
};

export default blogConfig;
