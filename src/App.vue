<template>
  <div id="app">
    <Main />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Main } from "./views";

export default defineComponent({
  name: "App",
  components: { Main },
  setup() {
    return {};
  },
});
</script>

<style>
/* 引入全局变量 */
@import url("assets/css/global.css");

#app {
  width: 100%;
  height: 100vh;
  background-image: url("assets/image/bz.png");
  background-size: 100%;
}
</style>
