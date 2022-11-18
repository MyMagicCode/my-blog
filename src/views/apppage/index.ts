import { defineAsyncComponent } from "vue";

interface IAppMenu {
  title: string;
  isHidren: boolean;
  name: string;
  iconUrl?: string;
  backgroundColor?: string;
}

class MyApp {
  title: string;
  isHidden: boolean;
  name: string;
  iconUrl?: string;
  backgroundColor?: string;
  fileName: string;
  constructor(
    title: string,
    name: string,
    fileName: string,
    iconUrl?: string,
    backgroundColor?: string
  ) {
    this.name = name;
    this.title = title;
    this.backgroundColor = backgroundColor;
    this.isHidden = true;
    this.fileName = fileName;
    this.iconUrl = iconUrl;
  }
  compute(loadCallback: () => void) {
    return defineAsyncComponent(async () => {
      // 延迟测试
      // await new Promise((resolve) => {
      //   setTimeout(resolve, 2000);
      // });
      return import("./page/" + this.fileName).then((res) => {
        // 加载完成执行回调
        loadCallback();
        // setTimeout(() => {});
        return res;
      });
    });
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
    "工具库",
    "gadget",
    "gadget/Gadget.vue",
    require("assets/image/icon/icon2.png")
  ),
  new MyApp(
    "五子棋",
    "gobang",
    "gobang/Gobang.vue",
    require("assets/image/icon/icon3.png")
  ),
];

function getApp(name: String): MyApp {
  let el: MyApp = new MyApp("未找到", "404", "./404.vue");
  for (const item of apps) {
    if (item.name == name) {
      el = item;
    }
  }
  return el;
}

const defaultAppIndex = 3; //默认显示的app的下标
export { apps, MyApp, defaultAppIndex, IAppMenu, getApp };
