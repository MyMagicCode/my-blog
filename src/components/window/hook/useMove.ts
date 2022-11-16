import { Ref } from "vue";
export default function (div: Ref<HTMLElement>) {
  const refEl = div; //需要移动的组件
  let top = 0;
  let left = 0;
  let t1 = -1;
  function updateEl(e: any) {
    if (t1 != -1) {
      //判断是否有延迟函数
      clearTimeout(t1);
      t1 = -1;
    }
    let clientY = e.clientY ?? e.touches[0].clientY;
    let clientX = e.clientX ?? e.touches[0].clientX;

    let div = refEl.value as HTMLDivElement;
    div.style.top = clientY - top + "px";
    div.style.left = clientX - left + "px";
  }
  function mouseDown(e: any): void {
    // 移动端无法获取与父元素的位置信息，所以需要减去父元素与页面的位置：parseInt(win.value.style.top)
    top =
      e.offsetY ?? e.touches[0].pageY - parseInt(refEl.value.style.top || "0");
    left =
      e.offsetX ?? e.touches[0].pageX - parseInt(refEl.value.style.left || "0");
    //取消拖动时会选中文字，不取消会出现事件无法取消bug
    document.body.onselectstart = document.body.ondrag = function () {
      return false;
    };
    window.addEventListener("mousemove", updateEl);
    // 适配触摸屏
    window.addEventListener("touchmove", updateEl);
  }
  function mouseUp(): void {
    //取消拖动时不会选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return true;
    };
    window.removeEventListener("mousemove", updateEl);
    //适配触摸
    window.removeEventListener("touchmove", updateEl);
  }

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
