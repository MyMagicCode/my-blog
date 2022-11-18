<template>
  <myWindow :close="deleteApp(cname ?? '')" ref="container">
    <template #title>{{ commentEl.title }} </template>
    <template #content>
      <component :is="commentEl.compute(loadCallback)"></component>
    </template>
  </myWindow>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import myWindow from "components/window/Window.vue";
import { getApp } from "./index";
import { useMainStore } from "store/index";

const props = defineProps({
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

onMounted(() => {
  mainStore.addAppExample(props.cname!, container.value!);
});

// 初始化后居中
const loadCallback = () => {
  setTimeout(() => {
    (container.value as any)?.recenter();
  });
};
</script>

<style scoped></style>
