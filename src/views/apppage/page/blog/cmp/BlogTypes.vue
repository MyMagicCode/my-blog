<template>
  <div>
    <template v-for="(i, index) in typeList">
      <div
        class="typeItem"
        @click="changeItem(i, index)"
        v-if="i"
        :key="index"
        :class="{ activity: index == activityIndex }"
      >
        {{ "# " + i }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "BlogTypes",
  props: {
    types: {
      type: Array,
      defalut: [],
    },
  },
  emits: ["changeItem"],
  setup(props, { emit }) {
    const typeList = props.types;
    const activityIndex = ref(-1);
    //点击itme触发
    const changeItem = (item: any, index: number) => {
      if (activityIndex.value != index) {
        activityIndex.value = index;
        emit("changeItem", item);
      } else {
        activityIndex.value = -1;
        emit("changeItem", null);
      }
    };
    return {
      typeList,
      changeItem,
      activityIndex,
    };
  },
});
</script>

<style scoped>
.activity {
  color: rgb(0, 0, 0);
  background-color: rgba(255, 255, 255, 0.9);
  font-weight: 600;
  box-shadow: 4.9px 11.8px 2.2px rgba(0, 0, 0, 0.07),
    9.6px 23.1px 5.3px rgba(0, 0, 0, 0.052),
    14.5px 35px 10px rgba(0, 0, 0, 0.04),
    20.8px 50px 17.9px rgba(0, 0, 0, 0.032),
    31.3px 75.2px 33.4px rgba(0, 0, 0, 0.026),
    62px 149px 80px rgba(0, 0, 0, 0.019);
}
.typeItem {
  box-sizing: border-box;
  padding-left: 10px;
  cursor: pointer;
  width: 80%;
  margin: 0px auto;
  line-height: 35px;
  font-size: 1em;
  border-radius: 5px;
}
.typeItem:hover {
  background-color: #bebebe;
}
.activity:hover {
  background-color: rgba(255, 255, 255, 0.9);
}
</style>
