<template>
  <template v-for="(item, index) in showApp" :key="item.name">
    <myWindow
      @mousedown="changeWin"
      :isHidden="item.isHidden"
      :close="removeApp(item.name)"
      :is-show="changeHidden(item.name)"
      ref="container"
    >
      <template #title>{{ item.tittle }} </template>
      <template #content>
        <component :is="item.compute(loadCallback(index))"></component>
      </template>
    </myWindow>
  </template>
  <MenuVue />
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import myWindow from "views/window/window/Window.vue";
import MenuVue from "views/window/menu/Menu.vue";
import useChangeIndex from "views/window/window/hook/useChangeIndex";
import { useMainStore } from "../pinia";

export default defineComponent({
  name: "Main",
  components: { myWindow, MenuVue },
  setup() {
    const zindex = ref("1");
    const container = ref<InstanceType<typeof myWindow> | null>(null);
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

    // 异步回调函数
    const loadCallback = (index: number) => {
      console.log("异步组件加载完毕！");
      return function () {
        setTimeout(() => {
          (container.value as any)[index].recenter();
          console.log(showApp.value[index]);
        });
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
      loadCallback,
      container,
    };
  },
});
</script>

<style scoped lang="less"></style>
