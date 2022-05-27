<template>
  <div class="Blog">
    <div class="blog_left">
      <span class="left_title">博客标签</span>
      <hr />
      <div class="left_content">
        <!-- 标签内容 -->
        <BlogTypes :types="bolgTypes" @change-item="changeType" />
      </div>
    </div>
    <div class="blog_right">
      <!-- 搜索框 -->
      <div class="top_bar">
        <BlogBar />
      </div>
      <!-- 博客展示面 -->
      <div class="blogcontent">
        <BlogList @click-item="clickItem" />
      </div>
    </div>
    <BlogContent ref="blogContent" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BlogTypes from "./cmp/BlogTypes.vue";
import BlogList from "./cmp/BlogList.vue";
import BlogBar from "./cmp/BlogBar.vue";
import BlogContent from "./cmp/BlogContent.vue";
export default defineComponent({
  name: "Blog",
  setup() {
    const blogContent = ref();
    const bolgTypes = ref([
      "VUE学习笔记",
      "TypeScript笔记",
      "Nodejs笔记",
      "算法研究",
      "日常记录",
    ]);
    //改变类型后执行函数
    const changeType = (item: any) => {
      // item==null时代表取消选定类型
      if (item) console.log(item);
    };
    // 点击blog简介后显示详细blog信息
    const clickItem = (item: any) => {
      console.log(item, "blog");
      blogContent.value.changeShow();
    };
    return {
      bolgTypes,
      blogContent,
      changeType,
      clickItem,
    };
  },
  components: { BlogTypes, BlogList, BlogBar, BlogContent },
});
</script>

<style scoped>
.Blog {
  --bg-color: rgba(255, 255, 255, 0.6);
}

.left_content {
  width: 100%;
  height: calc(100% - 40px);
  overflow: hidden;
  margin-top: 5px;
  overflow: auto; /*示滚动条 */
}
/* 隐藏滚动条 */
.left_content::-webkit-scrollbar {
  color: aliceblue;
  width: 10px;
}
.left_title {
  height: 20px;
  display: block;
  width: 100%;
  text-align: center;
  margin-bottom: 5px;
}
.Blog {
  position: relative;
  height: 100%;
  box-sizing: border-box;
  max-width: 920px;
  margin: 0px auto;
  padding: 10px;
}
.blog_left {
  display: inline-block;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 10px;
  width: 220px;
  height: 100%;
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px #828282;
}
.blog_right {
  box-sizing: border-box;
  vertical-align: top;
  margin-left: 20px;
  display: inline-block;
  border-radius: 20px;
  width: calc(100% - 240px);
  height: 100%;
}
.top_bar {
  height: 45px;
  width: 100%;
  border-radius: 10px;
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px #828282;
}
.blogcontent {
  box-sizing: border-box;
  padding: 10px;
  width: 100%;
  margin-top: 20px;
  height: calc(100% - 65px);
  background-color: var(--bg-color);
  box-shadow: 0px 0px 5px #828282;
  border-radius: 20px;
}
</style>
