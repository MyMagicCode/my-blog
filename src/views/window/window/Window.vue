<template>
  <div class="Window" ref="win" style="z-index: 1" v-show="isHidden">
    <div
      class="top"
      @mousedown="mouseDown"
      @mouseout="mouseOut"
      @mouseup="mouseUp"
      @dblclick.stop="rewin"
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
        <div class="cnt" style="background: #20a162" @click.stop="isShow">
          <span>最小化</span>
        </div>
        <div class="cnt" style="background: #1e9eb3" @click.stop="rewin">
          <span>居中</span>
        </div>
        <div class="cnt" style="background: #ee3f4d" @click.stop="close">
          <span>关闭</span>
        </div>
        <!-- <img
          src="~assets/image/icon/minimize.png"
          width="22"
          height="22"
          @click.stop="isShow"
        />
        <img
          src="~assets/image/icon/rewin.png"
          width="22"
          height="22"
          @click.stop="rewin"
        />
        <img
          src="~assets/image/icon/close.png"
          width="22"
          height="22"
          @click.stop="close"
        /> -->
      </span>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import useMove from "./hook/useMove";
export default defineComponent({
  name: "Window",
  props: {
    close: null,
    isHidden: Boolean,
    isShow: null,
  },
  setup() {
    const win = ref();
    const recenter = () => {
      const div = win.value as HTMLDivElement;
      let width = div.offsetWidth;
      let max = document.documentElement.clientWidth;
      div.style.left = (max - width) / 2 + "px";
      div.style.top = "10px";
      // if (div.style.width == "60vw" || div.style.width == "") {
      //   div.style.width = "100vw";
      //   div.style.height = "100vh";
      //   div.style.left = "0px";
      //   div.style.top = "0px";
      // } else {
      //   div.style.width = "60vw";
      //   div.style.height = "calc(100vh - 105px)";
      //   div.style.top = "0px";
      //   div.style.left = "20vw";
      // }
    };

    onMounted(() => {
      setTimeout(() => recenter(), 10);
    });

    //窗口移动hook
    const { mouseDown, mouseUp, mouseOut } = useMove(win);
    return {
      mouseDown,
      mouseUp,
      mouseOut,
      rewin: recenter,
      win,
    };
  },
});
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
