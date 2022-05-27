<template>
  <div class="Window" ref="win" style="z-index: 1" v-show="isHidden">
    <div
      class="top"
      @mousedown="mouseDown"
      @mouseout="mouseOut"
      @mouseup="mouseUp"
      @dblclick.stop="rewin"
    >
      <span>
        <b>
          <slot name="title">未命名</slot>
        </b>
      </span>
      <!-- 阻止冒泡事件 -->
      <span
        class="connt"
        @mousedown.stop=""
        @mousemove.stop=""
        @mouseup.stop=""
      >
        <img
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
        />
      </span>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
    const rewin = () => {
      const div = win.value as HTMLDivElement;
      if (div.style.width == "60vw" || div.style.width == "") {
        div.style.width = "100vw";
        div.style.height = "100vh";
        div.style.left = "0px";
        div.style.top = "0px";
      } else {
        div.style.width = "60vw";
        div.style.height = "calc(100vh - 105px)";
        div.style.top = "0px";
        div.style.left = "20vw";
      }
    };
    //窗口移动hook
    const { mouseDown, mouseUp, mouseOut } = useMove(win);
    return {
      mouseDown,
      mouseUp,
      mouseOut,
      rewin,
      win,
    };
  },
});
</script>

<style scoped>
.content {
  box-sizing: border-box;
  height: calc(100% - 30px);
}
.connt {
  box-sizing: border-box;
  line-height: 30px;
  display: flex;
  width: 100px;
  justify-content: space-evenly;
}
img {
  margin-top: 4px;
  display: block;
  cursor: pointer;
}
span:nth-child(1) {
  display: block;
  max-width: 200px;
  padding-left: 10px;
  width: 20%;
}
span:nth-child(1) {
  display: block;
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
  /* border: 1px solid #dcdcdc; */
  top: 0px;
  left: 20vw;
  margin: 0px;
  padding: 0px;
  width: 60vw;
  min-width: 770px;
  height: calc(100vh - 105px);
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  overflow: hidden;
}
</style>
