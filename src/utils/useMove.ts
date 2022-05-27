import { Ref } from "vue";
/*
  div:移动的组件
  callback回调函数参数x,y
  mode: 1 可以上下左右移动
        2 只可以上下移动
        3 只可以左右移动
*/
export default function (
  el: Ref<HTMLElement>,
  Callback: any,
  mode: number = 1
) {
  const win = el; //需要移动的组件
  let X: number;
  let Y: number;
  let top: number;
  let left: number;
  function updateEl(e: any) {
    let div = win.value as HTMLDivElement;
    let x: number = left + e.pageX - X;
    let y: number = top + e.pageY - Y;
    // console.log(x, y);

    if (y >= 180) {
      y = 180;
    } else if (y <= 0) {
      y = 0;
    }
    if (x >= 280) {
      x = 280;
    } else if (x <= 0) {
      x = 0;
    }
    if (mode == 2) {
      div.style.top = y - 3 + "px";
      Callback(y);
    }
    if (mode == 3) {
      div.style.left = x - 3 + "px";
      Callback(x);
    }
    if (mode == 1) {
      div.style.top = y - 3 + "px";
      div.style.left = x - 3 + "px";
      Callback(x, y);
    }
  }
  function mouseDown(e: any): void {
    X = e.pageX;
    Y = e.pageY;
    top = e.offsetY;
    left = e.offsetX;
    updateEl(e);
    //取消拖动时会选中文字，不取消会出现事件无法取消bug
    document.body.onselectstart = document.body.ondrag = function () {
      return false;
    };
    window.addEventListener("mousemove", updateEl);
    window.addEventListener("mouseup", mouseUp);
  }
  function mouseUp(): void {
    //取消拖动时不会选中文字
    document.body.onselectstart = document.body.ondrag = function () {
      return true;
    };
    window.removeEventListener("mousemove", updateEl);
  }
  return {
    //需要给触发组件添加事件
    mouseDown,
  };
}
