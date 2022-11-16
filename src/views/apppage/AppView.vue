<template>
  <myWindow
    :isHidden="isHidden"
    :close="deleteApp(cname ?? '')"
    :is-show="minimize"
    ref="container"
  >
    <template #title>{{ commentEl.title }} </template>
    <template #content>
      <component :is="commentEl.compute(loadCallback)"></component>
    </template>
  </myWindow>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import myWindow from "components/window/Window.vue";
import { getApp } from "./index";
import { useMainStore } from "store/index";

const props = defineProps({
  cid: { type: Number, require: true },
  cname: String,
  isHidden: Boolean,
});

const container = ref<InstanceType<typeof myWindow> | null>(null);
const mainStore = useMainStore();
const commentEl = getApp(props.cname ?? "404");

//传入回调函数
const deleteApp = (name: string) => {
  //返回一个可以调用的函数
  return () => {
    mainStore.deleteApp(name);
  };
};

// 最小化
const minimize = () => {
  mainStore.changeHidden(props.cname!, false);
};

// 初始化后居中
const loadCallback = () => {
  setTimeout(() => {
    (container.value as any)?.recenter();
  });
};
</script>

<style scoped></style>
