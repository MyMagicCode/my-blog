<template>
  <div class="Test1">
    <button @click="chnageColor">修改css-root</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import rootStyle from "../../../utils/useProperty";

export default defineComponent({
  name: "Test1",
  setup() {
    const chnageColor = () => {
      rootStyle.setProperty("--menu-color", "0");
      let x = rootStyle.getPropertyValue("--menu-color");
      console.log(x);
    };
    return { chnageColor };
  },
});
</script>

<style scoped lang="less"></style>
