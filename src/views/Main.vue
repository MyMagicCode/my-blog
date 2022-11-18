<template>
  <template v-for="i in 8" :key="i - 1">
    <component
      :is="showApp[i - 1] ? Test : null"
      :cname="showApp[i - 1]?.name"
      :is-hidden="showApp[i - 1]?.isHidden"
    />
  </template>

  <MenuVue />
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import MenuVue from "views/menu/Menu.vue";
import Test from "@/views/apppage/AppView.vue";
import { useMainStore } from "store/index";

const mainStore = useMainStore();
const { showApp } = toRefs(mainStore.$state);
</script>

<style scoped></style>
