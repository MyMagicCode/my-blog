<template>
  <div class="BlogList">
    <template v-for="i in 9">
      <!-- 将某个元素置顶 -->
      <div class="listItem" :style="{ order: i == 4 ? -1 : 0 }">
        <span class="itemTitle">0{{ i }}-关于如何使用vue添加异步组件</span>
        <div class="itemImg">
          <img src="" alt="" srcset="" />
        </div>
        <div class="itemType">#VUE,#TypeScript,#javascript,nodejs</div>
        <!-- 是否置顶 -->
        <div class="isTop" v-if="i == 4">TOP</div>
        <!-- 是否热门 -->
        <div class="isTop" v-if="i == 1">HOT</div>
        <div class="detailed" @click="clickItem(i)">
          <div class="det_centent">
            这是关于这个的详细介绍vue是什么外面输额达哇
          </div>
          <p><img src="~assets/image/icon/date.png" />2021-5-15</p>
          <p><img src="~assets/image/icon/eye.png" />100次访问</p>
          <p><img src="~assets/image/icon/message.png" />200留言</p>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "BlogList",
  props: {
    blogList: Array,
  },
  emits: ["clickItem"],
  setup(props, { emit }) {
    const blogList = props.blogList;
    const clickItem = (index: any) => {
      emit("clickItem", index);
    };
    return {
      clickItem,
    };
  },
});
</script>

<style scoped>
.isTop {
  position: absolute;
  top: 10px;
  right: -30px;
  width: 100px;
  background-color: rgb(255, 79, 79);
  color: rgb(255, 255, 255);
  text-align: center;
  transform: rotate(45deg);
  line-height: 25px;
}
.det_centent::-webkit-scrollbar {
  width: 0px;
}
.detailed img {
  width: 20px;
  vertical-align: middle;
}
.detailed p {
  font-size: 1em;
  padding-left: 10px;
  margin-top: 4px;
  line-height: 25px;
}
.det_centent {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  font-size: 0.9em;
  overflow: auto;
  height: 60%;
}
.listItem:hover .detailed {
  opacity: 1;
}
.detailed {
  color: rgb(255, 255, 255);
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  top: 0px;
  left: 0px;
  opacity: 0;
  border-radius: 10px;
  transition: all 0.5s;
  backdrop-filter: blur(5px);
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
}
.itemType {
  color: rgb(71, 71, 71);
  font-size: 1em;
  line-height: 30px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.itemImg {
  width: 100%;
  height: 170px;
  background-color: rgb(255, 148, 148);
}
.itemTitle {
  width: 100%;
  display: block;
  line-height: 35px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.BlogList {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
}
.BlogList::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.BlogList::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #ccc;
}
.BlogList::-webkit-scrollbar-track-piece {
  background-color: rgb(255, 255, 255);
}
.listItem {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 2.8%;
  padding: 5px;
  width: 28%;
  height: 230px;
  font-size: 1.1em;
  background-color: white;
  transition: all 1s;
  box-shadow: 7.9px 8.8px 2.2px rgba(0, 0, 0, 0.07),
    15.5px 17.2px 5.3px rgba(0, 0, 0, 0.05),
    23.5px 26px 10px rgba(0, 0, 0, 0.042),
    33.5px 37.2px 17.9px rgba(0, 0, 0, 0.035),
    50.5px 56px 33.4px rgba(0, 0, 0, 0.028),
    100px 111px 80px rgba(0, 0, 0, 0.02);
}
</style>
