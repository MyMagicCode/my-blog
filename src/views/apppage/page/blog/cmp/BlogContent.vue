<template>
  <div class="BlogContent" v-if="isShow">某个需要显示的博客</div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "BlogContent",
  setup() {
    const isShow = ref(false);
    const changeShow = () => {
      isShow.value = !isShow.value;
    };
    return { isShow, changeShow };
  },
});
</script>

<style scoped>
.BlogContent {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: white;
}
</style>
