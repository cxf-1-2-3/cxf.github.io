## useState

- 异步
  - 1 在正常的 react 的事件流里（如 onClick 等）
  - 2 setState 和 useState 是异步执行的（不会立即更新 state 的结果）
  - 3 多次执行 setState 和 useState，只会调用一次重新渲染 render
  - 4 不同的是，setState 会进行 state 的合并，而 useState 则不会
- 同步
- 1 在 setTimeout，Promise.then 等异步事件中
- 2 setState 和 useState 是同步执行的（立即更新 state 的结果）
- 3 多次执行 setState 和 useState，每一次的执行 setState 和 useState，都会调用一次 render
- 避免在同步的时候多次 render 可以将多个 state 合并成一个处理更新
  - 会产生一个问题 react 不会主动将数据进行合并，每次所有的数据都要传入，否则会造成数据丢失
  - 可以自定义更新 state 的 hook
- 原因 异步代码和同步代码执行的分支不同 异步中不会设置 excutionContext 会进入 NoContext 进行同步 同步中会设置 excutionContext

- 在 react18 中所有事件中多次 setState 会被合并为 1 次执行

```js
// 也可以通过内置函数 unstable_batchedUpdates 包裹
//自定义合并hook
const useMergeState = (initialState) => {
  const [state, setState] = useState(initialState);
  const setMergeState = (newState) =>
    setState((prevState) => ({ ...prevState, newState }));
  return [state, setMergeState];
};

const [request, setRequest] = useMegeState({ loading: false, data: null });
useEffect(async () => {
  const res = await axios.get("xxx");
  setRequest({ loading: true, data: res });

  // ...

  setRequest({ data: { a: 1 } }); // loading 状态不会丢失，还是 true
}, []);
```

## useReducer

- useState 的替代方案 可以执行复杂的逻辑
- useReducer 返回一个数组,数组两个元素分别 state 和 dispatch 方法，dispatch 接收一个参数，执行对应的 action，state 改变后 组件会重新 render
- 1 可以添加多个 state 属性
- useState 和 useReducer 如何选择
- 1 如果 state 的类型为 Number, String, Boolean 建议使用 useState，如果 state 的类型 为 Object 或 Array，建议使用 useReducer
- 2 如果 state 变化非常多，也是建议使用 useReducer，集中管理 state 变化，便于维护
- 3 如果 state 关联变化，建议使用 useReducer
- 4 业务逻辑如果很复杂，也建议使用 useReducer
- 5 如果 state 只想用在 组件内部，建议使用 useState
- 或者这次修改的 state 需要依赖之前的 state 时，也可以使用；
- 相同的 reducer 数据是不会共享的，它们只是使用了相同的处理的函数而已。

```js
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      console.log(state)// state 为更新之前的值
      return { name: 'bbb' }
    case 'DECREMENT':
      return { name: 'ccc' }
    default:
      return state
  }
}
const [state, dispatch] = useReducer(reducer, { name: 'vvv' })
 <h2>{state.name}</h2>
 <button onClick={() => { dispatch({ type: 'ADD' }) }}>加加</button>
 <button onClick={() => { dispatch({ type: 'DECREMENT' }) }}>减减</button>
```

## useContext

- 1.解决数据层级较深的传递 避免传统 props 方案一层一层传递 可以直接传递给使用此数据的子组件。

```js
import { createContext } from "react";
//创建一个 Context 对象
export const NameContext = createContext();
const Index = () => {
  const name = "你好啊";
  const add = () => {
    console.log(111);
  };
  return (
    <>
      <NameContext.Provider value={{ name, add }}>
        <ChildrenCom />
      </NameContext.Provider>
    </>
  );
};
import { NameContext } from "./index";
export default function ChildrenCom(props) {
  const theme = useContext(NameContext);
  return <div>{theme.name}</div>;
}
```

## useCallback

- 缓存函数
- 主要用于性能优化
- 当我们一个组件 应用了多个子组件，子组件传递了相同的函数 props， 当父组件状态发生变化的时候 所有的组件都是重新 render。
- 解决子组件并不会依赖某个变化的时候 可以通过 react.memo()将组件包裹 通过 useCallback 将包裹函数。此时 memo 的组件就会对 props 进行浅比较 不会出发更新 会读取缓存的值。
- 事实上，经过一些测试，并没有更加节省内存，优化是需要和 memo 结合来使用。决定自组件是否需要重新渲染

## useMemo

- 缓存函数的返回值
- 当我们的一个值的修改 组件重新渲染的时候 默认执行的函数 包含大量逻辑 会造成页面加载缓慢。但是函数并不依赖变化的值。这个时候 可以将函数用 useMemo 包裹 当某个变量发生变化的时候 在进行执行
- useMemo 在性能优化中的作用。通过缓存函数的返回值，避免不必要的调用，从而避免了组件 rerender。

## useRef

- 可以用于获取 dom 或者缓存数据
- useRef 返回一个可变的 ref 对象。
- useRef 变化不会主动使页面渲染

## ts antd

- 级联组件 Cascader 在 onChange 回调函数中 value 官方例子的参数类型发现为 string[],在项目中发现会有类型报错 不能将 string[] 类型进行分配
- 解决办法 在官方 Cascader 组件中找到了明确定义 需要定义类型为(string | number)[]

- 覆盖 antd 样式

```css
.wordsTips {
  :global {
    .ant-collapse-header {
      width: 150px;
    }
  }
}
```

- 通过自定义属性 来修改样式

```css
.questionBtn[dataType="create"] {
  &:hover {
    color: initial;
    background: initial;
    border-color: transparent;
  }
}
```

## react

- useEffect 和 useMemo 的执行顺序 useMemo 会先于 useEffect
- use-immer
  - import { useImmer } from 'use-immer';
  - 用法和 useState 一样 解决在修改数据的时候 去手动合并
- json-bigint
  - 解决 大整数精度丢失问题
  ```js
  const str = '{"id":1253585734669959168}';
  JSON.parse(str); //{id: 1253585734669959200}
  request.defaults.transformResponse = [
    (data) => {
      return JSONBig.parse(data);
    },
  ];
  ```
- uuidjs
  - npm i uuidjs
  - const str: string = UUID.generate();
- 获取所有子孙节点 组成的一个数组
  var all = document.querySelectorAll("#main \*");

mac 强制刷新：command+shift+r

mac 普通刷新：command+r

在 Chrome 的开发者工具中，可以使用快捷键 Ctrl + P（Windows / Linux）或 Command + P（Mac）来在 Sources 面板中快速查找文件。
