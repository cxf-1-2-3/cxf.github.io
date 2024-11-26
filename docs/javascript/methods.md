## 获取 url 参数

- 获取 url 参数

```js
function getQueryParams() {
  const result = {};
  const queryString = window.location.search;
  const reg = /[?&][^?&]+=[^?&]/g;
  const found = queryString.match(reg);
  //["?name=1", "&age=2"];
  if (found) {
    found.forEach((item) => {
      //["name", "1"];
      let temp = item.substring(1).split("=");
      console.log(temp);
      result[temp[0]] = temp[1];
    });
  }
  return result;
}
console.log(getQueryParams());
```

## 金额分段

```js
let str = "100000000000000000";
const r = str.replace(/\B(?=(\d{3})+$)/g, ",");
```

## 随机颜色

```js
console.log(`#${Math.random().toString(16).substring(2, 8).padEnd(6, "0")}`);
```

## 数组去重

- <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set?qs=Set">Set</a> 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。
  - Set 中的元素只会出现一次，即 Set 中的元素是唯一的。

```js
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
let newArr = Array.from(new Set(arr));
console.log(newArr);
//[1, 2, 3, 4, 5]
```

- 循环利用数组的 indexOf
  - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf?qs=indexOf">indexOf()</a> 方法返回在数组中可以找到给定元素的第一个索引，存在返回元素的索引，不存在返回-1
    - 语法
      - indexOf(searchElement)
      - indexOf(searchElement, fromIndex)
    - 参数
      - searchElement 要查找的元素
      - fromIndex （可选）可是查找的位置

```js
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(unique(arr));
//[1, 2, 3, 4, 5]
```

- 循环利用数组的 find
  - <a target="\_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/find">find()</a> 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

```js
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.find((item) => item == arr[i])) newArr.push(arr[i]);
  }
  return newArr;
}
console.log(unique(arr));
//[1, 2, 3, 4, 5]
```

- 循环利用数组的 includes
  - <a target="\_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/includes">includes()</a> 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回 false。

```js
let arr = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
function unique(arr) {
  var newArr = [];
  for (var i = 0; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) newArr.push(arr[i]);
  }
  return newArr;
}
console.log(unique(arr));
//[1, 2, 3, 4, 5]
```

- 利用数组的 filter 和 indexOf
  - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">filter()</a>方法创建给定数组一部分的浅拷贝，其包含通过所提供函数实现的测试的所有元素
    - 语法
      - filter((element, index, array) => { /_ … _/ } )
        - element 数组中当前正在处理的元素
        - index 正在处理的元素在数组中的索引
        - array 调用了 filter() 的数组本身
  - <a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf">indexOf()</a>

```js
let arr = [11, 22, 33, 11, 22, 33];
let nearr = arr.filter((item, index) => {
  return arr.indexOf(item, 0) === index;
});
console.log(nearr);
//[11,22,33]
```

## 类型检测

```js
(function () {
  let class2type = {};
  let toString = class2type.toString;
  let types = [
    "Boolean",
    "Number",
    "String",
    "Function",
    "Array",
    "Date",
    "RegExp",
    "Object",
    "Error",
    "Symbol",
  ];
  types.forEach((item) => {
    class2type[`[object ${item}]`] = item.toLowerCase();
  });
  function toType(obj) {
    if (obj == null) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function"
      ? class2type[toString.call(obj)]
      : typeof obj;
  }
  window.toType = toType;
})();
```

## 力扣 20 题有效的符号

```js
//符号必须成对出现 满足条件返回true 不满足返回false
let str = "(){}(]){}";
function validSymbols(s) {
  let arr = [];
  for (let i = 0; i < s.length; i++) {
    let item = s[i];
    if (item == "(" || item == "{" || item == "[") {
      arr.push(item);
    } else {
      let start = arr[arr.length - 1];
      if (
        (start == "(" && item == ")") ||
        (start == "{" && item == "}") ||
        (start == "[" && item == "]")
      ) {
        arr.pop();
      } else {
        return false;
      }
    }
  }
  return arr.length == 0;
}
console.log(validSymbols(str));
```

## 力扣 1047

```js
//给定小写字符串，删除相邻重复的项
let str = "abbaca";
function removeDuplicates(s) {
  var stack = [];
  for (let i of s) {
    let prev = stack.pop();
    if (prev != i) {
      stack.push(...[prev, i]);
    }
  }
  return stack.join("");
}

console.log(removeDuplicates(str));
```

## 力扣 71

- 简化路径
- 以/开头 结尾不能出现/ 目录之间只能有一个/ 不能包含. 或者..

```js
let str = "/../docs//css/./README.md/";
function simplifyPath(str) {
  let stack = [];
  let arr = str.split("/");
  arr.forEach((item) => {
    if (item && item != "..") {
      stack.push(item);
    }
    stack[stack.length - 1] == "." && stack.pop();
  });
  return "/" + stack.join("/");
}
console.log(simplifyPath(str));
```

## 找出数组第二大的值

```js
let arr = [1, 2, 3, 4, 5, 35, 6, 4, 6, 7, 67];
let v = [0, 0];
for (let i of arr) {
  let star = v[0];
  let end = v[1];
  if (i > star && i < end) {
    v[0] = i;
  } else if (i > end) {
    v[0] = v[1];
    v[1] = i;
  }
}
```

## 树

- 一种分层数据的抽象模型 分层级关系
- dom 虚拟 dom 都是树形结构
- 树有分为二叉树和多叉树

## 深度优先遍历

- 从根出发，尽可能深的搜索树的剧节点
- 基于递归

```js
const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        { val: "d", children: [] },
        { val: "e", children: [] },
      ],
    },
    {
      val: "c",
      children: [
        { val: "f", children: [] },
        { val: "g", children: [] },
      ],
    },
  ],
};
function fun1(root) {
  let arr = [];
  function a(root) {
    arr.push(root.val);
    root.children.forEach(a);
  }
  a(root);
  return arr;
}
console.log(fun1(tree)); // ['a', 'b', 'd', 'e', 'c', 'f', 'g']
```

## 广度优先遍历

- 基于队列 先进先出原则

```js
const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [
        { val: "d", children: [] },
        { val: "e", children: [] },
      ],
    },
    {
      val: "c",
      children: [
        { val: "f", children: [] },
        { val: "g", children: [] },
      ],
    },
  ],
};
function fun1(root) {
  let arr = [root];
  let newArr = [];
  while (arr.length > 0) {
    let o = arr.shift();
    newArr.push(o.val);
    o.children.forEach((item) => {
      arr.push(item);
    });
  }
  return newArr;
}
console.log(fun1(tree));
```

## 二叉树 力扣 144

- 除了根 其他都有两个节点 左节点和右节点
- 前序遍历
  - 根 左 右

```js
const tree = {
  val: "1",
  left: {
    val: "2",
    left: { val: "4", left: null, right: null },
    right: { val: "5", left: null, right: null },
  },
  right: {
    val: "3",
    left: { val: "6", left: null, right: null },
    right: { val: "7", left: null, right: null },
  },
};
//递归方式
function treeHandel(root) {
  let arr = [];
  var func = (node) => {
    if (node) {
      arr.push(node.val);
      //遍历左子树
      func(node.left);
      //遍历右子树
      func(node.right);
    }
  };
  func(root);
  return arr;
}
console.log(treeHandel(tree));
//栈方式 先进后出
function treeHandel(root) {
  let arr = [];
  let stack = [root];
  while (stack.length) {
    let o = stack.pop();
    arr.push(o.val);
    o.right && stack.push(o.right);
    o.left && stack.push(o.left);
  }
  return arr;
}
```

## 二叉树 力扣 94

- 中序遍历
- 左 右 根

```js
//递归版
function treeHandel(root) {
  let arr = [];
  var func = (root) => {
    if (!root) return;
    //遍历左子树
    func(root.left);
    arr.push(root.val);
    //遍历右子树
    func(root.right);
  };
  func(root);
  return arr;
}
console.log(treeHandel(tree));
//非递归
function treeHandel(root) {
  let arr = [];
  let stack = [];
  let o = root;
  while (stack.length || o) {
    while (o) {
      debugger;
      stack.push(o); //[1,2,4]
      o = o.left;
    }
    const n = stack.pop(); //4
    arr.push(n.val);
    o = n.right;
  }
  return arr;
}
console.log(treeHandel(tree));
```

## 拼接树结构

```js
let arr1 = [
  { id: 1, parent: null, text: "菜单1" },
  { id: 11, parent: 1, text: "菜单1-1" },
  { id: 12, parent: 1, text: "菜单1-2" },
  { id: 2, parent: null, text: "菜单2" },
  { id: 21, parent: 2, text: "菜单2-1" },
  { id: 22, parent: 2, text: "菜单2-2" },
];
function treeFn(rootList, id, list) {
  for (let item of rootList) {
    if (item.parent == id) {
      list.push(JSON.parse(JSON.stringify(item)));
    }
  }
  for (let i of list) {
    i.children = [];
    treeFn(rootList, i.id, i.children);
  }
  return list;
}
console.log(treeFn(arr1, null, []));
```

## 二分查找

- [必须是有序数组]

```js
const arr = [1, 2, 3, 4, 5, 6, 7, 8];
function arrSearch(target, arr) {
  let star = 0;
  let end = arr.length;
  while (star < end) {
    //数组的长度+起始位置索引 / 2 = 起始索引-》终点的中间值
    let middle = Math.floor((end + star) / 2);
    let index = arr[middle];
    if ((index = target)) {
      return middle;
    }
    if (index > target) {
      end = middle;
    }
    if (index < target) {
      star = middle;
    }
  }
}
console.log(arrSearch(5, arr));
```

## 数组排序

```js
let arr = [2, 3, 454, 23, 54, 7, 8];
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length - i; j++) {
    let ac = arr[j];
    let next = arr[j + 1];
    if (ac > next) {
      arr[j] = next;
      arr[j + 1] = ac;
    }
  }
}
console.log(arr);
```

## 快排

```js
let arr = [2, 3, 454, 23, 54, 7, 8];
function sortFn(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  let middleIndex = Math.floor(arr.length / 2);
  let middle = arr.splice(middleIndex, 1)[0];
  let left = [];
  let right = [];
  for (let i = 0; i < arr.length; i++) {
    let current = arr[i];
    current < middle ? left.push(current) : right.push(current);
  }
  return sortFn(left).concat(middle, sortFn(right));
}
console.log(sortFn(arr));
```
