<template>
  <TsItem>
    <template #title> 导航栏设置 </template>
    <template #content>
      <div class="menu">
        <div class="menu-bg">
          <div class="menu-item">
            <img :src="iconUrl" class="image" alt="" />
          </div>
        </div>
        <span class="title">字体颜色</span>
      </div>
      <div class="option">
        <ColorPicker v-model="colorRGB" />
        <ColorPicker v-model="fontColor" />
      </div>
      <button class="btn1" @click="chnageColor">应 用</button>
    </template>
  </TsItem>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import rootStyle from "utils/useProperty";
import ColorPicker from "components/colorpicker/ColorPicker.vue";
import MenuItem from "@/views/window/menu/MenuItem.vue";
import TsItem from "./TsItem.vue";
export default defineComponent({
  name: "MenuSetting",
  components: {
    ColorPicker,
    MenuItem,
    TsItem,
  },
  setup() {
    const colorRGB = ref(rootStyle.getPropertyValue("--menu-bg-rbga"));
    const fontColor = ref(rootStyle.getPropertyValue("--menu-font-color"));
    const iconUrl: string = require("assets/image/defaultIcon.png");
    const chnageColor = () => {
      rootStyle.setProperty("--menu-bg-rbga", colorRGB.value);
      rootStyle.setProperty("--menu-font-color", fontColor.value);
    };

    return {
      chnageColor,
      colorRGB,
      iconUrl,
      fontColor,
    };
  },
});
</script>

<style scoped>
.btn1 {
  line-height: 25px;
  border: 0px;
  border-radius: 15px;
  margin-top: 10px;
  margin-left: 50px;
  cursor: pointer;
  width: 100px;
  background-color: rgba(255, 255, 255, 0.6);
}
.option {
  display: flex;
  justify-content: center;
  line-height: 25px;
}
.menu-bg {
  padding: 10px;
  border-radius: 20px;
  background-color: v-bind(colorRGB);
}
.title {
  font-size: 1em;
  color: v-bind(fontColor);
  margin-top: 5px;
  display: block;
  width: 100px;
  line-height: 22px;
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
  border-radius: 5px;
  text-align: center;
  background-color: v-bind(colorRGB);
}
.image {
  width: 100%;
  height: 100%;
}
.menu-item {
  box-sizing: border-box;
  width: 80px;
  height: 80px;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
}
.menu {
  width: 100px;
  height: 120px;
  padding: 10px;
  margin: 0 auto;
  --el-color-picker-alpha-bg-a: #ccc;
  --el-color-picker-alpha-bg-b: transparent;
  background-size: 12px 12px;
  background-position: 0 0, 6px 0, 6px -6px, 0 6px;
  /* 设置背景为格子型 */
  background-image: linear-gradient(
      45deg,
      var(--el-color-picker-alpha-bg-a) 25%,
      var(--el-color-picker-alpha-bg-b) 25%
    ),
    linear-gradient(
      135deg,
      var(--el-color-picker-alpha-bg-a) 25%,
      var(--el-color-picker-alpha-bg-b) 25%
    ),
    linear-gradient(
      45deg,
      var(--el-color-picker-alpha-bg-b) 75%,
      var(--el-color-picker-alpha-bg-a) 75%
    ),
    linear-gradient(
      135deg,
      var(--el-color-picker-alpha-bg-b) 75%,
      var(--el-color-picker-alpha-bg-a) 75%
    );
  margin-top: 10px;
}
.font-title {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 1.2em;
}
.menu-content {
  padding: 15px;
  width: 200px;
  color: rgba(0, 0, 0, 0.9);
  background-color: rgba(255, 255, 255, 0.6);
  /*毛玻璃效果*/
  backdrop-filter: blur(5px);
  border-radius: 20px;
}
</style>
