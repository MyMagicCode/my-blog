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
  new MyApp("我的博客", "test1", "blog/Blog.vue"),
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
    "应用实例4",
    "test4",
    "Test2.vue",
    require("assets/image/icon/icon2.png")
  ),
  new MyApp(
    "应用实例5",
    "test5",
    "Test2.vue",
    require("assets/image/icon/icon3.png")
  ),
];
const defaultAppIndex = 2; //默认显示的app的下标
export { apps, MyApp, defaultAppIndex, IAppMenu };
