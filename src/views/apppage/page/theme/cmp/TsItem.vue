<template>
  <div class="menu-content">
    <span class="font-title">
      <b>
        <slot name="title">未添加title插槽</slot>
      </b>
    </span>
    <slot name="content">没有内容</slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TsItem",
});
</script>

<style scoped>
.font-title {
  width: 100%;
  display: block;
  text-align: center;
  font-size: 1.2em;
}
.menu-content {
  margin: 5px;
  padding: 15px;
  width: 200px;
  height: 240px;
  color: rgba(0, 0, 0, 0.9);
  background-color: rgba(255, 255, 255, 0.6);
  /*毛玻璃效果*/
  backdrop-filter: blur(5px);
  border-radius: 20px;
}
</style>
