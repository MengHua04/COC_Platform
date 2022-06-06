const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = env => {
  return merge(common(env), {
    mode: 'development',
    output: {
      filename: "js/[name].js",
    },
    cache: {
      type: 'filesystem',
      // 可选配置
      buildDependencies: {
        config: [__filename],  // 当构建依赖的config文件（通过 require 依赖）内容发生变化时，缓存失效
      },
      name: 'development-cache',  // 配置以name为隔离，创建不同的缓存文件，如生成PC或mobile不同的配置缓存
    },
    devServer: {
      port: 8081,
      host: '127.0.0.1',
      proxy: {
        '/api': {
          target: 'http://localhost:8082',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        },
      },
    },
    optimization: {
      moduleIds: "deterministic",
    },
  });
}
