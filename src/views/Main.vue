<template>
  <template v-for="item in showApp" :key="item.name">
    <Window
      @mousedown="changeWin"
      :isHidden="item.isHidden"
      :close="removeApp(item.name)"
      :is-show="changeHidden(item.name)"
    >
      <template #title>{{ item.tittle }} </template>
      <template #content>
        <component :is="item.compute()"></component>
      </template>
    </Window>
  </template>
  <MenuVue />
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import Window from "views/window/window/Window.vue";
import MenuVue from "views/window/menu/Menu.vue";
import useChangeIndex from "views/window/window/hook/useChangeIndex";
import { useMainStore } from "../pinia";

export default defineComponent({
  name: "Main",
  components: { Window, MenuVue },
  setup() {
    const zindex = ref("1");
    const mainStore = useMainStore();
    const { showApp } = toRefs(mainStore.$state);
    const nowWindow = ref();
    //传入回调函数
    const changeHidden = (name: string) => {
      return () => {
        mainStore.changeHidden(name, false);
      };
    };
    const removeApp = (name: string) => {
      //返回一个可以调用的函数
      return () => {
        mainStore.removeApp(name);
      };
    };
    //切换z-index
    const changeWin = useChangeIndex(nowWindow);
    return {
      changeWin,
      showApp,
      zindex,
      removeApp,
      changeHidden,
    };
  },
});
</script>

<style scoped lang="less"></style>
