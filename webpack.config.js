const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');
const webpackbar = require("webpackbar"); // 进度条
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HappyPack = require("happypack"); // 多线程编译
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: "inline-source-map",
  entry: {
    home: __dirname + '/src/home/index.ts',
    live: __dirname + '/src/live/index.ts',
  },
  output: {
    filename: '[name].[chunkhash:8].js',
    path: __dirname + '/dist',
  },
  resolve: {
    extensions: [".js", ".ts", ".jsx", ".scss"], // 后缀名自动补全
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
      {
        test: /\.(ts|tsx)?$/i,
        use: [{
            loader: 'ts-loader',
        }],
        exclude: /node_modules/
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          // // 将 JS 字符串生成为 style 节点
          // "style-loader",
          // 将 CSS 转化成 CommonJS 模块
          "css-loader",
          // 将 Sass 编译成 CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpackbar(),
    new MiniCssExtractPlugin({
      experimentalUseImportModule: true,
      filename: "dist/[name].[chunkhash:8].css", // 生成的文件名
    }),
    new HappyPack({
      loaders: ["babel-loader"],
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
    liveReload: false,
  },
};