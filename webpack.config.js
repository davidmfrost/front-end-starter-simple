const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebPackMd5Hash = require("webpack-md5-hash");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
  entry: { main: "./src/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[chunkhash].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash:7].[ext]",
            outputPath: "fonts/"
          }
        }]
      },
      {
        test: /\.(png|svg|jpg)$/,
        use: [{
          loader: "file-loader",
          options: {
            name: "[name].[hash:7].[ext]",
            outputPath: "images/"
          }
        }]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin("dist", {} ),
    new WebPackMd5Hash(),
    new HtmlWebpackPlugin({
      inject: false,
      hash: true,
      template: "src/index.html",
      filename: "index.html"
    }),
    new MiniCssExtractPlugin ({
      filename: "style.[contenthash].css"
    })
  ]
};