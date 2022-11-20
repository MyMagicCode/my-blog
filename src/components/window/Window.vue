<template>
  <div @mousedown="changeZIndex" class="Window" ref="el" style="z-index: 1">
    <div
      class="top"
      @mousedown="mouseDown"
      @mouseout="mouseOut"
      @mouseup="mouseUp"
      @dblclick.stop="recenter"
      @touchstart="mouseDown"
      @touchend="mouseUp"
    >
      <span class="title">
        <b>
          <slot name="title">未命名</slot>
        </b>
      </span>
      <!-- 阻止冒泡事件 -->
      <span class="connt" @mousedown.stop="" @mouseup.stop="">
        <div class="cnt" style="background: #20a162" @click.stop="minimize">
          <span>最小化</span>
        </div>
        <div class="cnt" style="background: #1e9eb3" @click.stop="recenter">
          <span>居中</span>
        </div>
        <div class="cnt" style="background: #ee3f4d" @click.stop="close">
          <span>关闭</span>
        </div>
      </span>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, nextTick } from "vue";
import html2canvas from "html2canvas";
import useMove from "./hook/useMove";
// 切换优先显示的窗口
import changeZIndex from "./hook/useChangeIndex";

defineProps({
  close: null,
});
const el = ref();

// 将当前页面转换为图片
const getImage = (imgEL: HTMLImageElement) => {
  html2canvas(el.value! as HTMLElement).then((canvas: any) => {
    let dataUrl = canvas.toDataURL("image/png");
    imgEL.src = dataUrl;
    imgEL.style.display = "block";
  });
};

// 最小化窗口
const minimize = () => {
  const div = el.value as HTMLDivElement;
  div.style.transition = "0.5s all";
  div.style.top = window.innerHeight + 10 + "px";
  setTimeout(() => {
    div.style.transition = "";
  }, 500);
};

// 居中
const recenter = () => {
  const div = el.value as HTMLDivElement;
  let width = div.offsetWidth;
  let max = document.documentElement.clientWidth;
  div.style.transition = "0.5s all";
  div.style.left = (max - width) / 2 + "px";
  div.style.top = "10px";
  setTimeout(() => {
    div.style.transition = "";
  }, 500);
};

// 暴露接口
defineExpose({
  recenter,
  minimize,
  getImage,
});

//窗口移动hook
const { mouseDown, mouseUp, mouseOut } = useMove(el);
</script>

<style scoped>
.cnt span {
  width: 42px;
  font-size: 0.7em;
  bottom: -25px;
  text-align: center;
  line-height: 20px;
  border-radius: 5px;
  color: rgb(235, 235, 235);
  background-color: rgba(0, 0, 0, 0.374);
  left: -10px;
  position: absolute;
  display: none;
}
.cnt {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  cursor: pointer;
  /* box-shadow: 0px 2px 5px rgb(145, 145, 145); */
  box-shadow: -2px -2px 5px rgba(255, 255, 255, 0.859),
    3px 3px 5px rgba(0, 0, 0, 0.299);
  transition: all 0.3s;
  position: relative;
}
.cnt:hover span {
  display: block;
}
.content {
  box-sizing: border-box;
  height: calc(100% - 30px);
}
.connt {
  box-sizing: border-box;
  line-height: 30px;
  display: flex;
  align-items: center;
  width: 100px;
  justify-content: space-evenly;
}
img {
  margin-top: 4px;
  display: block;
  cursor: pointer;
}
.title {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: block;
  max-width: 200px;
  padding-left: 10px;
  width: auto;
  padding-right: 50px;
}
.top {
  user-select: none;
  line-height: 30px;
  /* box-shadow: 0px 1px 0px #cfcfcf; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 0.4);
  /*毛玻璃效果*/
  backdrop-filter: blur(5px);
}
.Window {
  box-sizing: border-box;
  position: fixed;
  box-shadow: 0px 0px 1px 1px #cdcdcd;
  padding: 0px;
  width: auto;
  height: auto;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(15px);
  overflow: hidden;
}
</style>
