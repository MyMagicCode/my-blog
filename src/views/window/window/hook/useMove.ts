import { Ref } from "vue";
export default function (div: Ref<HTMLElement>) {
  const win = div; //需要移动的组件
  let top = 0;
  let left = 0;
  let t1 = -1;
  function updateEl(e: any) {
    //判断是否有延迟函数
    if (t1 != -1) {
      clearTimeout(t1);
      t1 = -1;
    }
    let clientY = e.clientY ?? e.changedTouches[0].clientY;
    let clientX = e.clientX ?? e.changedTouches[0].clientX;

    let div = win.value as HTMLDivElement;
    div.style.top = clientY - top + "px";
    div.style.left = clientX - left + "px";
  }
  function mouseDown(e: any): void {
    top = e.offsetY ?? e.changedTouches[0].clientY;
    left = e.offsetX ?? e.changedTouches[0].clientX;
    //取消拖动时会选中文字，不取消会出现事件无法取消bug
    document.body.onselectstart = document.body.ondrag = function () {
      return false;
    };
    window.addEventListener("mousemove", updateEl);
    // 适配触摸屏
    window.addEventListener("touchmove", updateEl);
  }
  function mouseUp(e: any): void {
    //取消拖动时不会选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return true;
    };
    window.removeEventListener("mousemove", updateEl);
    //适配触摸
    window.removeEventListener("touchmove", updateEl);
  }
  // window.addEventListener("touchstart", () => console.log("触摸"));
  // window.addEventListener("touchstart", () => console.log("触摸"));
  function mouseOut() {
    //解决频繁移出bug
    if (t1 != -1) return;
    //由于浏览器刷新有延迟需防抖移出
    t1 = setTimeout(() => {
      window.removeEventListener("mousemove", updateEl);
    }, 800);
  }
  return {
    //需要给触发组件添加事件
    mouseDown,
    mouseUp,
    mouseOut,
  };
}
