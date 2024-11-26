## 图片资源的处理

- 在 webpack5 以前，通常使用 file-loader 和 url-loader 来处理图片和字体文件等资源

```js
{
test: /\.(png|jpe?g|gif|webp|svg)$/,
use: [
  {
    loader: 'url-loader',
    options: {
      limit: 4096,
      fallback: {
        loader: 'file-loader',
        options: {
          name: 'img/[name].[hash:8].[ext]'
        }
      }
    }
  }
]
}
```

- webpack5 提供了一个新特性叫作 Asset Modules，在内部实现了对资源模块的支持。Asset Modules 提供了 4 种资源模块的类型，而无需再额外配置其他的 loader 来对资源模块进行处理，分别是
  - asset/resource ：构建出一个单独的文件并导出 URL。相当于以前的 file-loader。
  - asset/inline ：导出资源模块的 Data URI 内嵌到 html 或 css 文件。相当于以前的 url-loader。
  - asset/source ：导出资源模块的源代码。相当于以前的 raw-loader。
  - asset ：在导出 Data URI 和导出一个单独文件之间自动进行选择。以前可以通过使用 url-loader 的 limit 配置项来实现。

```js
{
        test: /\.(png|jpg|gif|jpeg|bmp|ttf|svg|eot|woff)$/i,
        type: "asset",
        parser: {
          // 生成Data URI 的条件
          dataUrlCondition: {
            // 当资源模块不超过 4kb 时，生成 DataURI，超过 4kb 时，单独打包成文件
            maxSize: 4 * 1024, // 4b
          },
        },
        generator: {
          filename: "img/[name].[hash:8][ext]", //打包输出的目录
        },
}
```

## HtmlWebpackPlugin

- 它可以根据模板文件生成 HTML 文件，并自动将打包后的 JS 和 CSS 文件引入 HTML 文件中。

```js
  // 更多选项
  // title：设置 HTML 文件的标题；
  //  meta：设置 HTML 文件的元数据；
  // chunks：指定哪些 JS 文件需要被插入到 HTML 中；
  //  minify：压缩生成的 HTML 文件，减小文件大小等等
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html', //template 表示模版文件的路径
    filename: 'index.html',      //filename  表示生成文件的名称  默认为index.html
  }),
],
```

## CleanWebpackPlugin

- 它可以在每次打包之前先清空输出目录，避免旧的文件影响新的构建结果。

```js
// 更多选项
//cleanOnceBeforeBuildPatterns：指定哪些文件需要被删除；
//dry：一般情况下是 false，表示删除文件；true 表示不删除，只是打印一下将要删除哪些文件。
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin(),
  ],
```

## MiniCssExtractPlugin

- 可以将 CSS 代码从打包的 JavaScript 文件中分离出来，并以单独的 CSS 文件形式进行打包输出

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
  // ...其它配置...
  plugins: [
    module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, //MiniCssExtractPlugin.loader 替换 style-loader
          'css-loader',
        ],
      },
      // 其它 loader 配置...
    ],
  },
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};
```

## CopyWebpackPlugin

- 用于将文件或目录从源位置复制到目标位置。它可以在打包构建过程中，将一些静态资源（如图片、字体、HTML 文件等）复制到输出目录中，以便在运行时加载这些资源。

```js
const CopyPlugin = require("copy-webpack-plugin");
new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "../src/mce"),
      to: path.resolve(__dirname, "../dist/mce"),
    },
  ],
});
```

## webpack-merge

- 在 Webpack 中，通常会将配置拆分成多个文件进行管理，例如将通用配置和开发环境配置分别编写到不同的文件中。这时就需要使用 merge 方法将不同的配置文件合并到一起，以生成最终的配置。

```js
const { merge } = require("webpack-merge");
const commonConfig = require("./webpack.base.js");

module.exports = merge(commonConfig, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  // ...其它开发环境配置...
});
```
