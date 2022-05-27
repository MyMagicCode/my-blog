<template>
  <div class="ThemeSetting">
    <MenuSetting />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MenuSetting from "./cmp/MenuSetting.vue";
import ColorPicker from "@/components/colorpicker/ColorPicker.vue";
export default defineComponent({
  name: "ThemeSetting",
  components: {
    MenuSetting,
    ColorPicker,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.ThemeSetting {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
}
</style>
