<defineProperty></defineProperty>

## toString

- <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString?qs=toS">toString()</a> 方法返回一个表示该对象的字符串。

  - 数组
    - 数组返回的是值类型 因为数组原型有自定义的 toString

  ```js
  let arr = [1, 2, 3];
  arr.toString();
  let typeString = Object.prototype.toString.call(1); //'[object Number]'
  let type = type.substring(8, typeString.length - 1); // 'Number'
  //'1,2,3'
  ```

  - 对象

  ```js
  let obj = {};
  obj.toString();
  //'[object Object]'
  ```

  - 函数
    - 函数原型有自定义的 toString

  ```js
  function fun() {}
  fun.toString();
  //'function fun(){}'
  ```

  - Date
    - Date 原型有自定义的 toString

  ```js
  let date = new Date();
  date.toString();
  //'Thu Dec 01 2022 20:30:41 GMT+0800 (中国标准时间)'
  ```

## valueOf

- <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString?qs=toS">valueOf()</a> 方法将对象转换为一个原始值

  - 对象

  ```js
  let obj = { a: 1 };
  obj.valueOf();
  //'{a:1}'
  ```

  - 数组

  ```js
  let arr = [1, 2, 3];
  arr.valueOf();
  //[1, 2, 3]
  ```

  - 函数

  ```js
  function fun() {}
  fun.valueOf();
  //function fun(){}
  ```

  - Date

  ```js
  let date = new Date();
  date.valueOf();
  //1669898324698
  ```

## typeof

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof">typeof</a>运算符返回一个字符串，表示操作数的类型。
  - 基于计算机底层数据类型的值 二进制 进行检测

```js
typeof NaN; //"number"
typeof null; //"object 都是以二进制000 存储，所以检测出来是对象
typeof 1; //"number"
typeof ""; //"string"
typeof {}; //'object'
typeof []; //'object'
```

## instanceof

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof">instanceof</a>运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上示操作
- 语法
  - object instanceof constructor
  - instanceof 检测右边的构造函数的 prototype 是否出现在左边对象的原型链上
  - 由于我们可以修改原型的指向 所以检测出来是不准的
  - 因为检测的是原型 所以不能检测 基本数据类型

```js
let arr = [];
arr instanceof Array; //true
arr instanceof Object; //true
let obj = {};
obj instanceof Array; //false
obj instanceof Object; //true
obj.__proto__ = Array.prototype;
obj instanceof Array; //true
```

## constructor

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor">constructor</a>constructor 属性返回 Object 的构造函数
- constructor 也是可以修改的 所以 也不准

```js
let arr1 = [];
let num = 1;
arr1.constructor === Array; //true
arr1.constructor === Object; //false
num.constructor === Number; //true
arr1.constructor = Object; //true
```

## defineProperty

- <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty" target="_blank">Object.defineProperty()</a> 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
- 语法

  - Object.defineProperty(obj, prop, descriptor)

- 参数
  - obj 要定义属性的对象
  - prop 要定义或修改的属性的名称
  - descriptor 要定义或修改的属性描述符。
    - writable 表示是否可写 默认为 false 不可修改
    - configurable 是否可以被删除 默认为 false 不可删除
      - configurable 特性表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改。
    - enumerable 是否可枚举 //默认是 false 不可枚举
  - get 和 set 不能和 value writable 共存 会抛出异常

## promise

<!-- <promise-com></promise-com> -->
