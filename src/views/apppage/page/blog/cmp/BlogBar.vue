<template>
  <div class="BlogBar">
    <div class="search">
      <input type="text" placeholder="查找的内容" /><button>搜索</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlogBar",
});
</script>

<style scoped>
.search {
  border-radius: 10px;
  border: 1px solid #cdcfcf;
  overflow: hidden;
  border: 1px solid #b6b6b6;
  background-color: rgb(255, 255, 255);
}
.search input {
  border: 0px;
  outline: none;
  box-sizing: border-box;
  padding-left: 10px;
  height: 100%;
  width: 200px;
  border-right: 1px solid #cdcfcf;
}
.search button {
  box-sizing: border-box;
  cursor: pointer;
  border: 0px;
  width: 60px;
  height: 90%;
  color: rgb(51, 51, 51);
  background-color: unset;
}
.BlogBar {
  display: flex;
  justify-content: flex-end;
  align-content: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 5px 10px;
}
</style>
