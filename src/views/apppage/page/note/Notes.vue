<template>
  <div class="Notes">
    <a id="top"></a>
    <template v-for="i in results">
      <div v-html="i"></div>
    </template>
    <a class="menu" href="#top">TOP</a>
  </div>
</template>

<script lang="ts" setup>
import md from "utils/useMD2HTML";
import { ref } from "vue";
import("./notesdata").then((res) => {
  res["default"].forEach((val) => {
    results.value.push(md.render(val));
  });
});

const results = ref<Array<string>>([]);
</script>

<style scoped>
.menu {
  display: block;
  position: absolute;
  text-decoration: none;
  bottom: 20px;
  right: 20px;
  text-align: center;
  width: 40px;
  line-height: 40px;
  border-radius: 50%;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.595);
  color: rgba(7, 7, 7, 0.851);
}
.Notes {
  box-sizing: border-box;
  width: 800px;
  margin: 0px auto;
  height: 80vh;
  overflow-y: scroll;
  overflow-x: hidden;
  padding-left: 15px;
  padding-right: 10px;
  /* 缓慢滚动 */
  scroll-behavior: smooth;
}
.Notes::-webkit-scrollbar {
  left: 0px;
  position: fixed;
  height: 20px;
  width: 4px;
}
/* 滚动槽 */
.Notes::-webkit-scrollbar-track {
  box-shadow: rgba(0, 0, 0, 0.3);
  border-radius: 5px;
}
/* 滚动条滑块 */
.Notes::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.575);
  box-shadow: inset006pxrgba(0, 0, 0, 0.5);
}
</style>
