## 事件

- @click() / @dblclick()
  - 单击事件 / 双击事件
- @mousedown() / @mouseup()
  - 按下触发 / 抬起触发
- @mousemove()
  - 当鼠标指针在指定的元素中移动时
- @mouseleave()
- 当鼠标指针离开被选元素时，会发生 mouseleave 事件
- @mouseout()
  - 当鼠标指针从元素上移开时，发生 mouseout 事件;
  - 与 mouseleave 事件不同，不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
- @mouseenter()
  - 当鼠标指针进入被选元素时，会发生 mouseenter 事件
- @mouseover()
  - 当鼠标指针位于元素上方时，会发生 mouseover 事件。
  - 与 mouseenter 事件不同，mouseover 事件在鼠标指针进入被选元素或任意子元素时都会被触发，mouseenter 事件只有在鼠标指针进入被选元素时被触发。

## 组件

## 修饰符

- <a target="_blank" href="https://v2.cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6">.sync</a>修饰符
  - 对一个 prop 进行“双向绑定”
  - 注意带有 .sync 修饰符 不能和表达式一起使用
  - 也无法绑定一个对象
  - 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件
  - 语法

```js
//vue2
//父组件
<text-document :title.sync="doc.title" v-model="title1"></text-document>
//子组件
this.$emit('update:title', newTitle)
this.$emit("input", "子组件的值1");

//vue3
// 父组件
//绑定多个v-mode
<vModel v-model="flag" v-model:text="text"></vModel>
//子组件
//默认值使用modelValue接收
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  text: String,
});
const emit = defineEmits(["update:modelValue", "update:text"]);
const close = () => {
  emit("update:modelValue", false);
};
const change = (v: string) => {
  emit("update:text", v);
};
```

<font color="#d63200">vue3 移除了.sync 修饰符</font>

- .native
  - 组件的根元素上直接监听一个原生事件 可以使用 v-on 的 .native
    <componentCom></componentCom>
