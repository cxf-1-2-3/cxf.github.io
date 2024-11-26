## 箭头函数

- 箭头函数没有 arguments（建议使用更好的语法，剩余运算符替代）
- 箭头函数没有 prototype 属性，不能用作构造函数（不能用 new 关键字调用）
- 箭头函数没有自己 this，它的 this 是词法的，引用的是上下文的 this，即在你写这行代码的时候就箭头函数的 this 就已经和外层执行上下文的 this 绑定了(这里个人认为并不代表完全是静态的,因为外层的上下文仍是动态的可以使用 call,apply,bind 修改,这里只是说明了箭头函数的 this 始终等于它上层上下文中的 this)
- 不要在可能改变 this 指向的函数中使用箭头函数，类似 Vue 中的 methods,computed 中的方法,生命周期函数，Vue 将这些函数的 this 绑定了当前组件的 vm 实例，如果使用箭头函数会强行改变 this，因为箭头函数优先级最高

## let const var

- var
  - 声明变量存在变量提升
  - 能够对一个变量进行多次声明。后面的会覆盖前面的
  - 函数哪的 var 是局部变量 没有 var 的时全局
- let
  - 不存在变量提升，具有块级作用域。
  - 块级的 let 不受外部影响
  ```js
  var a = 123;
  if (true) {
    a = "abc"; // ReferenceError
    let a;
  }
  ```
  - 相同的作用域不可以重复声明 会报错
- const
  - 常量，一旦声明 值就不能改变，声明就必须立即赋值 不可重复声明变量名称
  - 实际上并不是值不得改动，而是变量指向的那个地址不能发生变化
- 总结
  - 变量提升方面
    - var 变量存在变量提升，及变量可以在声明之前调用，值为 undefined
    - let 和 const 不存在变量提升，声明的变量一定要在声明后使用，否则报错
  - 暂时性死区
    - var 不存在
    - let const 只有执行到声明变量的那一行代码 才可以获取和使用变量
  - 块作用域
    - var 不存在块级作用域
    - let const 存在块级作用域
  - 重复声明
    - var 允许重复声明变量
    - let const 在同一个作用域不允许重复声明变量
  - 修改
    - var let 声明后可以修改
    - const 是一个只读常量，不可以修改

## Es6 数组新增的扩展

### 一、展开运算符

- 作用于普通数组 将转换为参数序列
- 作用于类数组可以转换为真实数组
- 可以实现数组的拷贝和合并
- 可以和解构运算符结合起来，用于生成新的数组 扩展运算符只能放在结构的最后 否则报错

```js
const [first, ...rest] = [1, 2, 3, 4, 5];
```

- 可以将字符串转为数组
- 定义了遍历器（Iterator）接口的对象，都可以用扩展运算符转为真正的数组 如果对没有 Iterator 接口的对象，使用扩展运算符，将会报错

```js
const obj = { a: 1, b: 2 };
let arr = [...obj]; // TypeError: Cannot spread non-iterable object
```

### 二、构造函数新增方法

- Array.from([],fn)
  - 将两类对象转为真正的数组：类似数组的对象和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map
  - 第二个参数，用来对每个元素进行处理。返回处理后的值
  ```js
  Array.from([1, 2, 3], (x) => x * x);
  // [1, 4, 9]
  ```
- Array.of()
  - 用于将一组值，转换成数组，参数的不同情况看例子
  ```js
  Array.of(); // []
  Array.of(3); // [3]
  Array.of(3, 11, 8); // [3, 11, 8]
  ```

### 二、实例对象新增方法

- find()
  - 返回数组中满足测试函数的第一个元素的值，否则返回 undefined
  - value =》当前遍历的值、 index =》当前值的索引、 arr=》原数组
  ```js
  [1, 2, 3, 4].find((value, index, arr) => {
    return value > 3;
  }); //4
  ```
- findIndex()
  - 返回数组中满足测试函数的第一个元素的索引，否则返回-1
  ```js
  [1, 2, 3, 4].find((value, index, arr) => {
    return value > 3;
  }); //3
  ```
  - find 和 findIndex 都接受第二个参数 用来绑定回调函数的 this
  ```js
  function f(v) {
    return v > this.age;
  }
  let person = { name: "John", age: 20 };
  [10, 12, 26, 15].find(f, person); // 26
  ```
- fill()
  - 使用给定的值填充数组
  ```js
  [1, 2, 3].fill(7); // [7,7,7]
  ```
  - 接受第二个参数和第三个参数，用于指定填充的开始位置和结束位置
  ```js
  ["a", "b", "c"].fill(7, 1, 2); // ['a', 7, 'c']
  ```
- entries()，keys()，values()

  - 返回的是新的数组迭代器对象 Array Iterator 对象，
  - entries 该对象包含数组中的每个索引的键/值对
  - keys 每个索引键的对象
  - values 每个索引值的对象

  ```js
  for (let index of ["a", "b"].keys()) {
    console.log(index);
  }
  // 0
  // 1

  for (let elem of ["a", "b"].values()) {
    console.log(elem);
  }
  // 'a'
  // 'b'

  for (let [index, elem] of ["a", "b"].entries()) {
    console.log(index, elem);
  }
  ```

- includes()
  - 用于判断数组是否包含给定的值
  ```js
  [1, 2, 3]
    .includes(2) // true
    [(1, 2, 3)].includes(4) // false
    [(1, 2, NaN)].includes(NaN); // true
  ```
- flat()，flatMap()
- flat 将数组扁平化处理，返回一个新数组，对原数据没有影响 默认拉平一层
- flatMap()方法对原数组的每个成员执行一个函数相当于执行 Array.prototype.map()，然后对返回值组成的数组执行 flat()方法。该方法返回一个新数组，不改变原数组

```js
// 相当于 [[2, 4], [3, 6], [4, 8]].flat()
[2, 3, 4].flatMap((x) => [x, x * 2]);
// [2, 4, 3, 6, 4, 8]
```

## 怎么理解 Promise

- 异步编程的一种解决方案。比传统的解决方案（回掉函数）更加合理和更加强大
  - 1.链式操作降低了代码的难度
  - 2.代码可读性明显增强
  - 3.promise 内部发生错误不会中断进程。浏览器会报错提示，也可以通过 catch 方法捕获。
  - 丰富的 api
    - 实例方法
      - then
        - 参数 1 resolved 的回到函数 返回一个 新的 Promise 实例
        - 参数 2 rejected 状态的回调函数
      - cath
        - 用于指定发生错误时的回调函数
      - finally
        - 方法用于指定不管 Promise 对象最后状态如何，都会执行的操作
    - 构造函数方法
      - all
        - 用于将多个 Promise 实例，包装成一个新的 Promise 实例
        - 状态分为两种
          - const p = Promise.all([p1, p2, p3]);
          - 1.所有的实例都变成 成功 返回所有成功的 promise 组成的新数组。
          - 2.一个失败 返回失败的 reject 实例的返沪值
          - 3.p.catch 是否会进入 取决于 p1,p2,p3 是否定义了 catch 有不进 没有则进
      - race
        - const p = Promise.race([p1, p2, p3]);
        - 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例
        - 返回的时 率先改变状态的实例
      - allSettled
        - const promises = [fetch('/api-1'),fetch('/api-2'),fetch('/api-3')];await Promise.allSettled(promises);
        - 1.可以确保所有的实例都执行完在进行下一步操作
        - 所有的实例都执行完 不管成功还是失败 返回成功的包含所有实例的返回值 格式。
        - 【{ status: 'fulfilled', value: 42 },
        - { status: 'rejected', reason: -1 }】
      - any
        - 该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。
        - 有一个实例变成 成功返回成功的 所有的失败 才会返回失败的。

## 闭包

- mdn 的描述为一个函数和对其周围状态的引用捆绑在一起，这样的组合就是闭包。
- 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域
- 每当创建一个函数，闭包就会在函数创建的同时被创建出来，作为函数内部与外部连接起来的一座桥梁
- 使用场景
  - 1.创建私有变量
  - 2.延长变量的声明周期
  - 一般函数的词法环境在函数返回后就被销毁，但是闭包会保存对创建时所在词法环境的引用。可以讲到垃圾回收机制标记清除法。会根据目标值是否能访问到根（root）访问不到修改标记。可以访问标记不变。最后清除修改标记的内存也就是声明的数据
  - 所以造成内存泄漏要看闭包函数（内部函数）使用的场景 是在全局中引用 还是指在外层函数中调用。函数内使用执行完引用消除可以清除。全局使用可以关联到根的引用，不会被清除。

## 原型-原型链

- JavaScript 中，万物皆对象！但对象也是有区别的。分为普通对象和函数对象
- 原型 就是原型对象 其实就是普通对象。但是 Function.prototype 除外 他是一个函数 对象
- 每个函数对象都有一个 prototype 属性，这个属性指向函数的原型对象。
- **proto**
- JS 在创建对象（不论是普通对象还是函数对象）的时候，都有一个叫做**proto** 的内置属性，用于指向创建它的构造函数的原型对象。

```js
// 我们要记住两个概念（构造函数，实例）：
// person1 是 构造函数 Person 的实例 person1为函数对象
// 一个公式：
// 实例的构造函数属性（constructor）指向构造函数。
function Person(name, age, job) {
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function () {
    alert(this.name);
  };
}
var person1 = new Person("Zaxlct", 28, "Software Engineer");
console.log(person1.constructor == Person);
// 那 Person.prototype 为什么有 constructor 属性
// 也就是在 Person 创建的时候，创建了一个它的实例对象并赋值给它的 prototype
//原型对象（Person.prototype）是 构造函数（Person）的一个实例
Person.prototype.constructor == Person;
```

## a==1==2==3

- 进行比较的时候会优先调用 valueOf
- 如果不重写 <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/toString?qs=toS">toString</a>、 <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/valueOf?qs=value">valueOf</a> ,valueOf 返回的不是原始类型的值 会继续调用 toString

```js
const a = {
  current: 1,
  toString() {
    console.log("toString");
    return this.current++;
  },
  valueOf() {
    console.log("valueOf");
    return this.current++;
  },
};
if (a == 1 && a == 2 && a == 3) {
  console.log("a");
}
```

## add(1)(2)(3,4)

- 函数在做运算 会自动调用 toString

```js
function add() {
  let args = [].slice.call(arguments);
  function fn(...innerArg) {
    if (innerArg.length > 0) {
      [].push.apply(args, innerArg);
      return fn;
    } else {
      return args.reduce((a, b) => a + b, 0);
    }
  }
  fn.toString = function () {
    return args.reduce((a, b) => a + b, 0);
  };
  return fn;
}
console.log(add(1)(2)(3, 4)());
console.log(add(1)(2)(3, 4) + 0);
//10
function add(a) {
  function sum(b) {
    // 使用闭包
    a = a + b; // 累加
    return sum;
  }
  sum.toString = function () {
    // 重写toString()方法
    return a;
  };
  return sum; // 返回一个函数
}
```

## 浅拷贝

- 浅拷贝是创建一个新对象，这个对象有着原始对象属性值的一份精确拷贝。如果属性是基本类型，拷贝的就是基本类型的值，如果属性是引用类型，拷贝的就是内存地址 ，所以如果其中一个对象改变了这个地址，就会影响到另一个对象。
  - 方法 1
    - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign">Object.assign()</a>从一个或多个源对象复制到目标对象，返回修改后的对象
  - 方法 2
    - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat">Array.prototype.concat()</a>方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组
  - 方法 3
    - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice">Array.prototype.slice()</a>方法返回一个新的数组对象，这一对象是一个由 begin 和 end 决定的原数组的浅拷贝,（包括 begin，不包括 end）。原始数组不会被改变。
  - 方法 4
    - 展开运算符...
  ```js
  //1
  let obj1 = { person: { name: "kobe", age: 41 }, sports: "basketball" };
  let obj2 = Object.assign({}, obj1);
  obj2.person.name = "wade";
  obj2.sports = "football";
  console.log(obj1);
  // { person: { name: 'wade', age: 41 }, sports: 'basketball' }
  //2
  let obj = { a: 1, b: 2 };
  function shallowClone(source) {
    let target = {};
    for (let i in source) {
      if (source.hasOwnProperty(i)) {
        target[i] = source[i];
      }
    }
    return target;
  }
  let shallowCloneObj = shallowClone(obj);
  ```

## 深拷贝

- 深拷贝是将一个对象从内存中完整的拷贝一份出来,从堆内存中开辟一个新的区域存放新对象,且修改新对象不会影响原对象。

## 判断是不是 Array 类型

```js
let arr = [];
arr instanceof Array; //true
arr.constranctor == Array; //true
Object.prototype.toString.call(arr) //'[object Array]'
Array.isArray（arr）//true
```

## null 和 undefined

- null 是一个表示无的对象（空对象指针），转为数值时为 0，undefined 是一个表示无的原始值，转换为数值为 NaN。typeof null = object 、typeof undefined = undefined

## 延迟加载 js

- GPU 渲染进程和 js 引擎线程是互斥的，当 js 引擎执行时 GPU 线程会被挂起，GPU 更新会被保存在一个队列中等待 js 引擎空闲时立即被执行，如果 js 执行的时间过长，会导致页面渲染被阻塞。
- 1.async
- 2.defer
- 相同点
  - 只用于外联 script，script 下载和 html 解析并行
- 不同点
  - 执行时机
    - async
      - 并行下载，下载完成后执行脚本，可能会在 html 解析完之前执行，操作了 dom 可能会出错，多个 async 会并行下载，先执行下载的部分
    - defer
      - 并行下载，html 解析完执行脚本，多个 defer 脚本并行下载，执行顺序按照 html 出现的顺序执行
  - 使用场景
    - async
      - 脚本不需要操作 dom，并且不互相依赖
    - defer
      - 需要操作 dom。
  - 优先级
    - async 比 defer 优先级高

## parseInt

- <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt">parseInt(string, radix) 解析一个字符串并返回指定基数的十进制整数，radix 是 2-36 之间的整数，表示被解析字符串的基数。</a>
- parseInt 返回整数 接受两个参数 第一个参数为处理的值 第二个参数为处理第一个参数的基数 所以会把 index 默认传入

```js
const res1 = [1, 2, 3, 4].map(parseInt);
console.log(res1); //[1,NaN,NaN,NaN]
```

## promise

<a target="_blank" href="https://juejin.cn/post/6945319439772434469">promise 手写</a>

```js
class MyPromise {
  status = PENDING;
  value = null; //成功的值
  reason = null; //失败的值
  onFulfilledCallback = [];
  onRejectedCallback = [];
  constructor(executor) {
    try {
      executor(this.resolve, this.reject);
    } catch (error) {
      // 如果有错误，就直接执行 reject
      this.reject(error);
    }
  }
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      this.onFulfilledCallback.forEach((callback) => callback(value));
    }
  };
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      this.onRejectedCallback.forEach((callback) => callback(reason));
    }
  };
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
      if (this.status === FULFILLED) {
        queueMicrotask(() => {
          try {
            let x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
      if (this.status === REJECTED) {
        onRejected(this.reason);
      }
    });
    return promise2;
  }
  static resolve(parameter) {
    // 如果传入 MyPromise 就直接返回
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    // 转成常规方式
    return new MyPromise((resolve) => {
      resolve(parameter);
    });
  }
  static all(promiseArr) {
    let result = [];
    let re = null;
    promiseArr.forEach((item) => {
      item.then(
        (res) => {
          result.push(res);
        },
        (err) => {
          re = err;
        }
      );
    });
    if (re) {
      console.log(re, "err");
      return new MyPromise((res, rej) => {
        res(re);
      });
    } else {
      return new MyPromise((res) => {
        res(result);
      });
    }
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(
      new TypeError("Chaining cycle detected for promise #<Promise>")
    );
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject);
  } else {
    // 普通值
    resolve(x);
  }
}
```

## html 渲染

- 1.构建 DOM 树
  - 将 html 解析成 DOM 树
- 2.构建 CSSOM 树
  - 解析 css，构建一个 CSSOM 树
  - 解析中遇到 link 标签时会请求对应的 css 文件，当 css 文件下载完成后便开始解析。（如果到 style 行内样式，则直接解析），这一过程和构建 DOM 同时进行
- 3.构建 Render Tree
  - 结合 DOM 和 CSSOM 构建一颗 Render 树
  - 只构建屏幕上显示的部分，head meta 等标签无需构建
  - display:none 不出现在 render tree 中，这也是为什么 display 会导致 重绘，visibility：hidden 会出现在树中
  - 过程 遍历每一个可见的节点。对于每个节点，在 CSSOM 上找到匹配的样式并应用 最后生成 Render Tree
- 4.Layout
  - 计算出元素相对于 viewport 的相对位置
- 5.Paint 绘制
  - 将 render tree 转换成像素，显示到屏幕上

## 输出多少

- 1

```js
var length = 88;
function test() {
  console.log(this.length);
}
var obj = {
  length: 99,
  action: function (test) {
    test();
    arguments[0]();
  },
};
obj.action(test, [1, 2, 3, 4, 5]);
// 88 2
```

## 数组删除重复的项

```js
const yourArray = [1, 1, 1, 1, 2, 3, 4, 5, 5, 1, 1, 5, 1];
var removeDuplicates = function (nums) {
  let slow = 0;
  let fast = 1;
  nums = nums.sort((a, b) => a - b);
  while (fast < nums.length) {
    if (nums[slow] === nums[fast]) {
      nums.splice(fast, 1);
    } else {
      slow = fast++;
    }
  }
  return nums;
};

console.log(removeDuplicates(yourArray));
```

## new 操作符具体做了什么

- 1.创建了一个新对象

```js
function Fun() {}
let cFun = new Fun();
//相当于 let cFun = {}
```

- 2.将创建的对象的原型指向了构造函数的原型

```js
console.log(cFun.__proto__ === Foo.prototype); //true
```

- 3.将创建的对象作为 this 的上下文
  ```js
  //Constructor 代表的是构造函数 如何手写的话 会传入构造函数
  var ret = Constructor.apply(obj, arguments);
  ```
- 4.如果函数没有返回对象 则返回 this
  ```js
  //判断构造函数是否有返回值 有则返回 没有返回this
  return typeof ret === "object" ? ret : obj;
  ```

## new 实现

```js
function Parent() {
  this.name = name || "Annie";
  this.sleep = function () {
    console.log(this.name + "正在睡觉");
  };
}
function objectFactory() {
  //创建空对象
  var obj = new Object();
  //获取构造函数
  var fnConstructor = [].shift.call(arguments);
  //改变obj的指针
  obj.__proto__ = fnConstructor.prototype;
  //执行构造函数 修改this 传入剩余参数
  var ret = fnConstructor.apply(obj, arguments);
  //返回值判断
  return typeof ret === "object" ? ret : obj;
}
let neObj = objectFactory(Parent, "你好");
console.log(neObj.__proto__ === Parent.prototype);
```

## 继承

- 原型链继承
- 父类的实例作为子类的原型
  - 优点
    - 易于实现 只需要修改子构造函数的 prototype 的指向
  - 缺点
    - 原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。
  ```js
  function SuperType() {
    this.property = true;
  }
  SuperType.prototype.getSuperValue = function () {
    return this.property;
  };
  function SubType() {
    this.subproperty = false;
  }
  // 这里是关键，创建 SuperType 的实例，并将该实例赋值给 SubType.prototype
  SubType.prototype = new SuperType();
  SubType.prototype.getSubValue = function () {
    return this.subproperty;
  };
  var instance = new SubType();
  console.log(instance.getSuperValue()); // true
  ```
- 构造函数继承

  - 核心代码是 SuperType.call(this)，创建子类实例时调用 SuperType 构造函数，于是 SubType 的每个实例都会将 SuperType 中的属性复制一份
  - 优点
    修改原型上的属性 各各子类直接不回影响
  - 缺点
    - 只能继承父类的实例属性和方法，不能继承原型属性/方法
    - 无法实现复用，每个子类都有父类实例函数的副本，影响性能

  ```js
  function SuperType() {
    this.color = ["red", "green", "blue"];
  }
  function SubType() {
    //继承自SuperType
    SuperType.call(this);
  }
  var instance1 = new SubType();
  instance1.color.push("black");
  alert(instance1.color); //"red,green,blue,black"

  var instance2 = new SubType();
  alert(instance2.color); //"red,green,blue"
  ```

- 组合继承

  - https://juejin.cn/post/6844903696111763470

  ```js
  function SuperType(name) {
    this.name = name;
    this.colors = ["red", "blue", "green"];
  }
  SuperType.prototype.sayName = function () {
    alert(this.name);
  };

  function SubType(name, age) {
    // 继承属性
    // 第二次调用SuperType()
    SuperType.call(this, name);
    this.age = age;
  }

  // 继承方法
  // 构建原型链
  // 第一次调用SuperType()
  SubType.prototype = new SuperType();
  // 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
  SubType.prototype.constructor = SubType;
  SubType.prototype.sayAge = function () {
    alert(this.age);
  };

  var instance1 = new SubType("Nicholas", 29);
  instance1.colors.push("black");
  alert(instance1.colors); //"red,blue,green,black"
  instance1.sayName(); //"Nicholas";
  instance1.sayAge(); //29

  var instance2 = new SubType("Greg", 27);
  alert(instance2.colors); //"red,blue,green"
  instance2.sayName(); //"Greg";
  instance2.sayAge(); //27
  ```

## 树结构 传入某个字符串 返回路径

```js
function findPath(tree, key) {
  for (let i = 0; i < tree.length; i++) {
    // 如果当前节点就是要查找的节点，则返回节点对应的路径
    if (tree[i].key === key) {
      return tree[i].title;
    }
    // 否则递归查找子节点
    if (tree[i].children) {
      const path = findPath(tree[i].children, key);
      if (path) {
        return `${tree[i].title}/${path}`;
      }
    }
  }
  return null;
}

// 测试代码
const tree = [
  {
    title: "规范问题",
    value: "1",
    key: "1",
    selectable: false,
    children: [
      {
        title: "规范要求反馈",
        value: "11",
        key: "11",
        children: [
          {
            title: "反馈有误",
            value: "111",
            key: "111",
          },
        ],
      },
      {
        title: "规范未定义",
        value: "12",
        key: "12",
      },
    ],
  },
];

console.log(findPath(tree, "111")); // 输出：规范问题/规范要求反馈/反馈有误
```

## 大整数相加

- <javascriptCom></javascriptCom>
