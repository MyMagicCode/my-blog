const data: Array<string> = [
  `
## JavaScript创建数组
**2022/7/10**\n
创建出一个数组再进行初始化，可以嵌套使用
  \`\`\`javascript 
Array.from({ length: 10 }, (_, i) => i)
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  \`\`\`
`,
  `
## CSS设置滚动条均匀滚动
**2020/7/24**\n
作用：解决滚动条瞬间跳转。
\`\`\`css
/* .el 为目标元素 */
.el {
  scroll-behavior: smooth;
}
\`\`\`
`,
  `
## CSS 毛玻璃效果
**2020/7/24**\n
作用：利用模糊设置毛玻璃的效果，目前火狐不支持。
\`\`\`css
//.el 为目标元素
.el {
  /* 需要设置透明度才能实现 */
  background: rgba(0,0,0,0.5);
  /* 模糊 */
  backdrop-filter: blur(5px);
}
\`\`\`
`,
  `
## CSS滚动并隐藏滚动条
**2020/7/24**\n
\`\`\`css
overflow: auto; /* 显示滚动条 */
/* 隐藏滚动条 */
有滚动条的元素::-webkit-scrollbar {
 width: 0px;
}
\`\`\`
`,
];

export default data;
