<template>
  <div class="Notes">
    <a id="top"></a>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <div v-html="result"></div>
    <a class="menu" href="#top">TOP</a>
  </div>
</template>

<script lang="ts" setup>
import md from "utils/useMD2HTML";

var result = md.render(`
## JavaScript创建数组
**2022/7/10**\n
创建出一个数组再进行初始化，可以嵌套使用
  \`\`\`javascript 
Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  \`\`\`
`);
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
