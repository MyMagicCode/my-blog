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
    let div = win.value as HTMLDivElement;
    div.style.top = e.clientY - top + "px";
    div.style.left = e.clientX - left + "px";
  }
  function mouseDown(e: any): void {
    top = e.offsetY;
    left = e.offsetX;
    //取消拖动时会选中文字，不取消会出现事件无法取消bug
    document.body.onselectstart = document.body.ondrag = function () {
      return false;
    };
    window.addEventListener("mousemove", updateEl);
  }
  function mouseUp(e: any): void {
    //取消拖动时不会选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return true;
    };
    window.removeEventListener("mousemove", updateEl);
  }
  function mouseOut() {
    //由于浏览器刷新有延迟需防抖移出
    t1 = setTimeout(() => {
      window.removeEventListener("mousemove", updateEl);
    }, 300);
  }
  return {
    //需要给触发组件添加事件
    mouseDown,
    mouseUp,
    mouseOut,
  };
}
