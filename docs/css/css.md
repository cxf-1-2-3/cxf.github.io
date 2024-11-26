## 盒模型

- 盒模型又被分为 IE 盒模型 和 W3C 标准盒模型 两种类型.
  - 在 IE8+ 的浏览器中要使用哪个盒模型可以由 box-sizing 控制.
  - 默认值为 content-box, 即 W3C 标准盒模型;
  - 如果将 box-sizing 设为 border-box 则用的是 IE 盒模型.
- 这两者的区别在于:
  - IE 盒模型的盒子大小为 content + padding + border.
  - W3C 标准盒模型的盒子大小为 content, 不包括 padding 和 border.
- IE 盒模型的盒子总大小就是 content 的大小, padding 和 border 会被并进 content 内一起计算, content 将会被压缩.
- W3C 标准盒模型的盒子总大小是 content 和 padding 以及 border 的总和大小, 后两者另算大小.
