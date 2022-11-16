<template>
  <KeepAlive>
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
  </KeepAlive>
  <MenuVue />
  <component :is="null"></component>
</template>

<script lang="ts">
import { defineComponent, onUpdated, ref, toRefs } from "vue";
import myWindow from "components/window/Window.vue";
import MenuVue from "views/menu/Menu.vue";
import useChangeIndex from "components/window/hook/useChangeIndex";
import { useMainStore } from "store/index";

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
    onUpdated(() => {
      console.log("更新页面回调！");
    });
    // 异步回调函数
    const loadCallback = (index: number) => {
      return function () {
        setTimeout(() => {
          (container.value as any)?.[index].recenter();
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
