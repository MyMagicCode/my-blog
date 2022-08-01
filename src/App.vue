<template>
  <div id="app">
    <Main />
  </div>
</template>

<script lang="ts" setup>
import { Main } from "./views";
</script>

<style>
/* 引入全局变量 */
@import url("assets/css/global.css");

#app {
  width: 100%;
  height: 100vh;
  background-image: url("assets/image/bz.png");
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
