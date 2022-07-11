import { Ref } from "vue";

export default function (nowWindow: Ref<HTMLDivElement>) {
  const changeWin = (e: any) => {
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
