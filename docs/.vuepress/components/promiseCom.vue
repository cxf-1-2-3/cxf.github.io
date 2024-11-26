<template>
  <div id=""></div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {},
};

const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";
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

const promise = MyPromise.resolve("1");
promise
  .then((res) => {
    console.log(res);
    return "2";
  })
  .then((res) => {
    console.log(res);
  });
// const p1 = new MyPromise((resolve, reject) => {
//   resolve("2");
// });

// const p2 = new MyPromise((resolve, reject) => {
//   resolve(1);
// });

// MyPromise.all([p1, p2]).then((result) => console.log(result));
//MyPromise.all([p1, p2]).then((result) => console.log(result));
// const p11 = new Promise((resolve, reject) => {
//   resolve("hello");
// });

// const p22 = new Promise((resolve, reject) => {
//   reject(1);
// });

// Promise.all([p11, p22]).then((result) => console.log(result));
</script>

<style lang="scss" scoped></style>
