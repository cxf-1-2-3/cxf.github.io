## diff

- vue1.0 没有引入虚拟 dom vue2.0 引入虚拟 dom 是因为 vue1 在读取响应数据的时候会生成对应的 watcher 通过 dep 收集 watcher 出发 watcher 的更新函数达到数据驱动视图 大量的 watcher 会造成内存的浪费。vue2.0 加入了 diff 虚拟 dom 此时一个组件会对应一个 watcher 一个组件内多个数据发生改变的时候 只会收集一个 watcher 当数据发生改变的时候 会进行虚拟 dom 的对比 从而进行一次更新
- h 函数 会返回由真实 dom 转换为的 虚拟 dom 通过 path 函数进行新老节点的替换增加删除等操作 生成真实的 dom 进行渲染
- 虚拟节点是什么
  - js 对象 描述的 真实 dom

```js
  {
    children:[],
    data:[],
    elm:h1,
    key:1,
    sel:'h1'
    text:'内容'
  }
```

- 新老节点的替换规则
  - 1.节点不同直接删除老节点 替换成新节点
  - 2.key 的作用 做为唯一标识，确定是不是同一个节点
  - 3.同级比较 不能跨级
  - 4 核心
    - 会有指针 指向 当前比对的哪个
    - a)旧前 新前
    - b)旧后 新后
    - c)旧前 新后
    - d)旧后 新前
    - e)循环遍历
    - f)以上会循环比对过程
    - g)添加或删除