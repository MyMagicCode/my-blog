let nowEl: HTMLElement;
export default function (e: any) {
  // 将前一个的z-index设置为：1
  if (nowEl) nowEl.style.zIndex = "1";
  for (let i in e.composedPath()) {
    let el = e.composedPath()[i] as HTMLElement;
    if (el.className == "Window") {
      nowEl = el as HTMLDivElement;
      nowEl.style.zIndex = "10";
      break;
    }
  }
}
