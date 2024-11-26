## apply

- apply() 方法调用一个具有给定 this 值的函数，以及以一个数组（或一个类数组对象）的形式提供的参数
  - 语法
    - apply(thisArg, argsArray)

```js
let obj = { name: 111 };
function fn(arg) {
  console.log(obj);
  return arg.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
}
Function.prototype.myApply = function (context, args) {
  let obj = context || window;
  obj.f = this;
  let result = obj.f(args);
  return result;
};

let res1 = fn.myApply(obj, [1, 2, 3, 4, 5]);
console.log(res1);
```

## call

- call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
  - 语法
    - function.call(thisArg, arg1, arg2, ...)

```js
let obj = { name: 111 }
function fn(a, b) {
  console.log(this)
  return a + b
}
Function.prototype.myCall = function (context, ...args) {
  let obj = context || window
  obj.f = this
  let result = obj.f(...args)
  Delete obj.f
  return result
}

let res1 = fn.myCall(obj, 1, 2)
console.log(res1)
```

## bind

- bind() 方法创建一个新的函数，在 bind() 被调用时，这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
  - 语法
    - function.bind(thisArg[, arg1[, arg2[, ...]]])

```js
let obj = { name: 111 };
function fn(...arg) {
  //console.log(this);
  return arg.reduce((prev, cur) => {
    return prev + cur;
  }, 0);
}
Function.prototype.myBind = function (context, arg) {
  let that = this;
  return (args) => {
    let newArr = arg.concat(args);
    return that.apply(context, newArr);
  };
};
let fn1 = fn.myBind(obj, [1, 2, 3, 4, 5]);
console.log(fn1([6, 7]));
```

## instanceof

```js
const instanceofs = (target, obj) => {
  let p = target;
  while (p) {
    if (p == obj.prototype) {
      return true;
    }
    p = p.__proto__;
  }
  return false;
};
```

## Array flat

```js
let arr = [1, 2, 3, [3, 4, 5], [5, 6, 7, [56, 7, [123]]]];
//递归版
function flat(arr) {
  let newArr = [];
  arr.forEach((i) => {
    if (Array.isArray(i)) {
      newArr = newArr.concat(flat(i));
    } else {
      newArr.push(i);
    }
  });
  return newArr;
}
let newArr = arr
  .toString()
  .split(",")
  .map((i) => +i);
console.log(flat(newArr));
console.log(flat(arr));
// call 版
```

## Array filter

```js
const arr = [1, 2, 3, 4];
Array.prototype.filters = function (cb) {
  let newArr = [];
  let arr = [...this];
  for (let i in arr) {
    if (arr.hasOwnProperty(i)) {
      cb(arr[i], i, arr) && newArr.push(arr[i]);
    }
  }
  return newArr;
};
let a = arr.filters((i, index, arr) => {
  return i > 1;
});
console.log(a);
```
