<template>
  <div class="MenuItem">
    <span class="title">{{ title }}</span>
    <img :src="iconUrl" class="image" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
export default defineComponent({
  name: "MenuItem",
  props: {
    iconUrl: {
      type: String,
      default: require("../../../assets/image/defaultIcon.png"),
    },
    backgroundColor: {
      type: String,
      default: "white",
    },
    title: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const bgColor = ref(props.backgroundColor);
    const iconUrl = props.iconUrl;
    const title = props.title;

    return { bgColor, iconUrl, title };
  },
});
</script>

<style scoped>
.image {
  width: 100%;
}
.title {
  position: absolute;
  display: block;
  width: 100px;
  line-height: 22px;
  padding: 0px 5px;
  box-sizing: border-box;
  overflow: hidden;
  left: -22.5px;
  border-radius: 5px;
  bottom: -35px;
  text-align: center;
  visibility: hidden;
  color: var(--menu-font-color);
  background-color: var(--menu-bg-rbga);
}
.MenuItem:hover .title {
  visibility: inherit;
}
.MenuItem:hover {
  box-shadow: 0px 0px 30px 5px white;
  /* margin-left: 5px;
  margin-right: 15px;
  width: 60px;
  height: 60px; */
}
.MenuItem {
  position: relative;
  width: 55px;
  height: 55px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: v-bind(bgColor);
  cursor: pointer;
  transition: all 0.5s;
}
</style>
