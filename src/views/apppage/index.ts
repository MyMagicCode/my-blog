import { defineAsyncComponent } from "vue";

interface IAppMenu {
  tittle: string;
  isHidren: boolean;
  name: string;
  iconUrl?: string;
  backgroundColor?: string;
}

class MyApp {
  tittle: string;
  isHidden: boolean;
  name: string;
  iconUrl?: string;
  backgroundColor?: string;
  fileName: string;
  constructor(
    tittle: string,
    name: string,
    fileName: string,
    iconUrl?: string,
    backgroundColor?: string
  ) {
    this.name = name;
    this.tittle = tittle;
    this.backgroundColor = backgroundColor;
    this.isHidden = true;
    this.fileName = fileName;
    this.iconUrl = iconUrl;
  }
  compute() {
    return defineAsyncComponent(() => import("./page/" + this.fileName));
  }
}

const apps: MyApp[] = [
  new MyApp("简单笔记", "myNote", "note/Notes.vue"),
  new MyApp(
    "主题设置",
    "theme",
    "theme/ThemeSetting.vue",
    require("assets/image/icon/icon0.png")
  ),
  new MyApp(
    "扫雷游戏",
    "minesweeper",
    "minesweeper/Minesweeper.vue",
    require("assets/image/icon/icon1.png")
  ),
  new MyApp(
    "个人博客",
    "test4",
    "blog/Blog.vue",
    require("assets/image/icon/icon2.png")
  ),
  new MyApp(
    "五子棋",
    "gobang",
    "gobang/Gobang.vue",
    require("assets/image/icon/icon3.png")
  ),
];
const defaultAppIndex = 4; //默认显示的app的下标
export { apps, MyApp, defaultAppIndex, IAppMenu };
