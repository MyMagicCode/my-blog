<template>
  <template v-for="i in 8" :key="i - 1">
    <component
      :is="showApp[i - 1] ? Test : null"
      :cname="showApp[i - 1]?.name"
      :is-hidden="showApp[i - 1]?.isHidden"
    />
  </template>

  <div class="a" ref="test"></div>

  <MenuVue />
</template>

<script lang="ts" setup>
import { onMounted, ref, toRefs } from "vue";
import html2canvas from "html2canvas";
import MenuVue from "views/menu/Menu.vue";
import Test from "@/views/apppage/AppView.vue";
import { useMainStore } from "store/index";

const mainStore = useMainStore();
const { showApp } = toRefs(mainStore.$state);
const test = ref(null);

onMounted(() => {
  html2canvas(test.value! as HTMLElement).then((res: any) => {
    console.log(res);
  });
});
</script>

<style scoped>
.a {
  width: 100px;
  height: 100px;
  background-color: red;
}
</style>
