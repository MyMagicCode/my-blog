<template>
  <div class="Menu">
    <div class="MenuContext">
      <template v-for="item in menulist" :key="item.name">
        <MenuItemVue
          :title="item.tittle"
          :icon-url="item?.iconUrl"
          :background-color="item?.backgroundColor"
          @click="openApp(item.name)"
        />
      </template>
      <MenuItemVue
        @click="isShow = true"
        :title="'更多'"
        :background-color="'rgba(0,0,0,0)'"
        :iconUrl="require('../../../assets/image/more2.png')"
      />
    </div>
    <div
      v-show="isShow"
      class="allMenulist"
      @click.stop="isShow = !isShow"
      @mousedown.stop=""
    >
      <div class="menulist">
        <template v-for="(item, i) in allMenulist">
          <div class="menulistItem">
            <MenuItemVue
              :background-color="item.backgroundColor"
              :icon-url="item.iconUrl"
              @click="openApp(item.name)"
              :title="item.tittle"
            />
            <template v-if="menuIdexs.indexOf(i) != -1">
              <span class="itemBtn del" @click.stop="remove(i)">删除</span>
            </template>
            <template v-else>
              <span class="itemBtn add" @click.stop="add(i)">添加</span>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted, toRefs } from "vue";
import MenuItemVue from "./MenuItem.vue";
import { useMainStore } from "../../../pinia";
//menu的格式
interface IMenuItem {
  tittle: string;
  name: string;
  iconUrl?: string;
  backgroundColor?: string;
}
export default defineComponent({
  name: "Menu",
  components: {
    MenuItemVue,
  },
  setup() {
    const isShow = ref(false);
    const mainStore = useMainStore();
    const menuIdexs = ref<number[]>([]);
    const menulist = ref<IMenuItem[]>([]);
    const allMenulist = toRefs(mainStore.$state)["allApps"];
    const openApp = (name: string) => {
      mainStore.pushShowApp(name);
      mainStore.changeHidden(name, true);
    };
    onMounted(() => {
      menuIdexs.value.push(...[0, 1, 2, 3, 4]);
    });
    watch(menuIdexs.value, () => {
      let mid: IMenuItem[] = [];
      for (let i of menuIdexs.value) {
        mid.push(allMenulist.value[i]);
      }
      menulist.value = mid;
    });
    const remove = (item: number) => {
      menuIdexs.value.splice(menuIdexs.value.indexOf(item), 1);
    };
    const add = (item: number) => {
      menuIdexs.value.push(item);
    };
    return {
      menulist,
      allMenulist,
      isShow,
      menuIdexs,
      remove,
      add,
      openApp,
    };
  },
});
</script>

<style scoped>
.del {
  background-color: rgb(241, 102, 102);
}
.add {
  background-color: rgb(89, 198, 67);
}
.itemBtn {
  width: 80%;
  text-align: center;
  cursor: pointer;
  color: white;
  height: 26px;
  border-radius: 13px;
  line-height: 26px;
}
.menulistItem {
  z-index: 101;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  height: 100px;
}
.allMenulist {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
}
.menulist::-webkit-scrollbar {
  display: none;
}
.menulist {
  border: 1px solid #cfcfcf;
  overflow-y: scroll;
  padding-top: 10px;
  box-sizing: border-box;
  background-color: var(--menu-bg-rbga);
  position: fixed;
  right: 0px;
  width: 100px;
  height: 100vh;
}
.Menu {
  color: var(--menu-font-color);
  /* position: absolute; */
  position: fixed;
  width: 100%;
  height: 75px;
  bottom: 30px;
}
.MenuContext {
  padding: 10px 5px 10px 15px;
  height: 75px;
  width: fit-content; /*宽度自适应*/
  display: flex;
  background-color: var(--menu-bg-rbga);
  box-sizing: border-box;
  border-radius: 20px;
  margin: 0 auto;
}
</style>
