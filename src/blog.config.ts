interface config {
  static: boolean;
  homeBackground: false | string;
  homeVideo: false | string;
  blogBackground: boolean;
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
  
}

const blogConfig: config = {
  static: false,
  homeBackground: false,
  chatBox: true,
  homeVideo: '/src/assets/background.mp4',
  blogBackground: true,
  blogComment: false,
  commonTags: false,
  searchByTag: false,
  commonSites: false,
  sticker: false,
  layout: "two cols",
  avatar: "/src/assets/avatar.jpg",
  title: "柴犬的小窝",
  introduction: "她做着琉璃般的梦...当星河坠入深海之时...",
  chatWelcomeWord: "你好，我是柴犬的朋友赛博柴犬，你可以在下面的输入框里添加openAI的apiKey来与我对话，我不会收集任何apiKey"
};

export default blogConfig;
