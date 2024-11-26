## jsx 是什么

- JSX 是一个看起来很像 XML 的 JavaScript 语法扩展。
- jsx 语法规则 ：
  - 1，定义虚拟 dom 时,不要写引号
  - 2,标签中混入 js 表达式时要用{}
  - 3,样式的类名指定不要用 class,要用 className
  - 4,内联样式要用 style=key:value 的形式去写
  - 5,虚拟 dom 必须只有一个根标签
  - 6,标签必须闭合
  - 7,标签首字母

## classname 库

- 动态添加和的 class 和以存在的拼接 会比较长 可以使用 这个库 是一个函数 classname() 将渲染的 class 或者条件传入即可

## 类组件

## 函数组件

## 自定义 ant 前缀

```js
// message 组件需要单独配置
ConfigProvider.config({
  prefixCls: 'ymx', // 4.13.0+
});
preProcessor: {
  loader: 'less-loader',
    options: {
      lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
      '@ant-prefix': 'ymx', //这个处理css 文件带有ant 的
      },
    },
  },
},
  <ConfigProvider locale={zhCN} prefixCls="ymx"> //将html class 替换为ymx
  <App />
  </ConfigProvider>
```
