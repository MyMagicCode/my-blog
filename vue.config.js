module.exports = {
  // 1.配置方式一: CLI提供的属性
  outputDir: "./build",
  publicPath: "./",
  // devServer: {
  //   proxy: {
  //     "^/api": {
  //       target: "http://152.136.185.210:4000",
  //       pathRewrite: {
  //         "^/api": "",
  //       },
  //       changeOrigin: true,
  //     },
  //   },
  // },
  configureWebpack: {
    resolve: {
      alias: {
        views: "@/views",
        assets: "@/assets",
        utils: "@/utils",
        components: "@/components",
        store: "@/store",
      },
    },
  },
};
