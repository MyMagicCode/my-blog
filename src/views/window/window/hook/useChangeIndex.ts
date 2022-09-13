import { Ref } from "vue";

export default function (nowWindow: Ref<HTMLDivElement>) {
  const changeWin = (e: any) => {
    // 将前一个的z-index设置为：1
    if (nowWindow.value) nowWindow.value.style.zIndex = "1";
    for (let i in e.composedPath()) {
      let el = e.composedPath()[i] as HTMLElement;
      if (el.className == "Window") {
        nowWindow.value = el as HTMLDivElement;
        nowWindow.value.style.zIndex = "10";
        break;
      }
    }
  };
  return changeWin;
}
