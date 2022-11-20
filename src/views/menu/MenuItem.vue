<template>
  <div class="MenuItem" @mouseenter="showAppImg" @mouseover="hideAppImg">
    <span class="title">{{ title }}</span>
    <img :src="iconUrl" class="image" alt="" />
    <div id="appImg">
      <img
        src=""
        width="100"
        style="display: none; margin: 5px"
        ref="imgSrc"
        alt="image"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useMainStore } from "store/index";
export default defineComponent({
  name: "MenuItem",
  props: {
    iconUrl: {
      type: String,
      default: require("../../assets/image/defaultIcon.png"),
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
    const mainStore = useMainStore();
    const imgSrc = ref(null);

    // 鼠标移入显示App状态
    const showAppImg = (e: Event) => {
      const div = e.target as HTMLDListElement;
      const AppName = div.dataset.name!; // 获取组件名字
      if (!AppName) return;
      let img = imgSrc.value! as HTMLImageElement;
      // 设置图片的dataUrl
      mainStore.getMapAppImg(AppName, img);
    };

    // 鼠标移出隐藏
    const hideAppImg = () => {
      let img = imgSrc.value! as HTMLImageElement;
      img.style.display = "none";
    };

    return { bgColor, iconUrl, title, imgSrc, showAppImg, hideAppImg };
  },
});
</script>

<style scoped>
#appImg {
  width: 110px;
  background-color: rgba(0, 0, 0, 0.238);
  position: absolute;
  bottom: 70px;
  left: -22px;
  border-radius: 5px;
  visibility: hidden;
}
.MenuItem:hover #appImg {
  visibility: visible;
}
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
  filter: drop-shadow(0px 0px 10px white);
  /* box-shadow: 0px 0px 30px 5px white; */
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
