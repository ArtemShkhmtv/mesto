//подключить модуль для работы с разных ОС
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports={
  entry: "./src/pages/index.js",
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true
  },
  devServer: {
    port: 8086,
    compress: true,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/, //проверка файла с расширением js 
        use: "babel-loader",
        exclude: "/node_modules/"
      },
      {
        test: /\.css$/, //проверка файла с расширением css 
        use: [MiniCssExtractPlugin.loader, {
          loader: "css-loader",
          options: { importLoaders: 1 } 
      },
      'postcss-loader']
      },
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin()
  ]
};
