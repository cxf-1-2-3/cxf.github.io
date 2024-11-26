# vue3+ts+vite+pinia

## 一.创建项目

1.创建方法1

```
1.npm init vite@latest
2.OK to proceed? y
3.Project name: 项目名
4.select a framework:Vue
5.Select a variant: TypeScript
6.创建完成
```

2.创建方法2

```
1.npm init vue@latest
2.Ok to proceed? y
3.请输入项目名称： » 项目名
4.
√ 是否使用 TypeScript 语法？ 是
√ 是否启用 JSX 支持？ 是
√ 是否引入 Vue Router 进行单页面应用开发？ 是
√ 是否引入 Pinia 用于状态管理？ 是
√ 是否引入 Vitest 用于单元测试？ 是
√ 是否要引入一款端到端（End to End）测试工具？不需要
√ 是否引入 ESLint 用于代码质量检测？ 是
√ 是否引入 Prettier 用于代码格式化？ 是
√ 是否引入 Vue DevTools 7 扩展用于调试? (试验阶段) 否
```

## 二、语法介绍

​	1.Vue3书写风格

​		1.1方法1

```
<template>
  <div>
    {{ name }}
  </div>
</template>
<script>
export default {
  setup() {
    const name = '123'
    return {
      name
    }
  },
}
</script>

<style scoped></style>
```

​	1.2方法2

```
<template>
  <div>
    {{ name }}
  </div>
</template>
<script setup lang="ts">
const name: string = '123'

</script>

<style scoped></style>

```

## 三、声明Vue

```
1.在env.d.ts中
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}

```

## 四、代码规范

#### 1.集成editorconfig配置

```js
1.1介绍
Editorconfig有助于为不同IDE编辑器上处理同一项目的多个开发人员维护一致的编码风格

1.2vscode插件为：Editorconfig for VS Code

1.3配置
# http://editorconfig.org

root = true

[*] # 表示所有文件适用
charset = utf-8 # 设置文件字符集为 utf-8
indent_style = space # 缩进风格（tab | space）
indent_size = 2 # 缩进大小
end_of_line = lf # 控制换行类型(lf | cr | crlf)
trim_trailing_whitespace = true # 去除行尾的任意空白字符
insert_final_newline = true # 始终在文件末尾插入一个新行

[*.md] # 表示仅 md 文件适用以下规则
max_line_length = off
trim_trailing_whitespace = false

```

#### 2.使用prettier工具

Prettier 是一款强大的代码格式化工具，支持 JavaScript、TypeScript、CSS、SCSS、Less、JSX、Angular、Vue、GraphQL、JSON、Markdown 等语言，基本上前端能用到的文件格式它都可以搞定，是当下最流行的代码格式化工具。

1.安装prettier

```shell
npm install prettier -D
```

2.配置.prettierrc文件：

* useTabs：使用tab缩进还是空格缩进，选择false；
* tabWidth：tab是空格的情况下，是几个空格，选择2个；
* printWidth：当行字符的长度，推荐80，也有人喜欢100或者120；
* singleQuote：使用单引号还是双引号，选择true，使用单引号；
* trailingComma：在多行输入的尾逗号是否添加，设置为 `none`，比如对象类型的最后一个属性后面是否加一个，；
* semi：语句末尾是否要加分号，默认值true，选择false表示不加；

```json
{
  "useTabs": false,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": true,
  "trailingComma": "none",
  "semi": false
}
```

3.创建.prettierignore忽略文件

```
/dist/*
.local
.output.js
/node_modules/**

**/*.svg
**/*.sh

/public/*
```

4.VSCode需要安装prettier的插件：Prettier - Code formatter

5.测试prettier是否生效

* 测试一：在代码中保存代码；
* 测试二：配置一次性修改的命令；

在package.json中配置一个scripts：

```json
    "prettier": "prettier --write ."
```

6.修改settings中的Editor default format为：Prettier-Code formatter

7.修改settings中的format on save：勾选上

#### 3. 使用ESLint检测

1.在前面创建项目的时候，我们就选择了ESLint，所以Vue会默认帮助我们配置需要的ESLint环境。

2.VSCode需要安装ESLint插件：ESLint

3.解决eslint和prettier冲突的问题：

安装插件：（vue在创建项目时，如果选择prettier，那么这两个插件会自动安装）

```shell
npm install eslint-plugin-prettier eslint-config-prettier -D
```

添加prettier插件：

```json
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
    'plugin:prettier/recommended'
  ],
```

4.VSCode中eslint的配置

```json
  "eslint.lintTask.enable": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
```

## 五、css样式的重置

```js
1.对默认CSS样式进行重置
  1.1 下载依赖
    npm i normalize.css
  1.2在main.js中引入
  	import 'normalize.css'
	import './reset.css'
  1.3创建重置文件	reset.css
  	/* reset.css样式重置文件 */
	/* margin/padding重置 */
	body, h1, h2, h3, ul, ol, li, p, dl, dt, dd 	{
 	 	padding: 0;
 	 	margin: 0;
	}

	/* a元素重置 */
	a {
	  text-decoration: none;
	  color: #333;
	}

	/* img的vertical-align重置 */
	img {
  		vertical-align: top;
	}

	/* ul, ol, li重置 */
	ul, ol, li {
	  list-style: none;
	}

	/* 对斜体元素重置 */
	i, em {
	  font-style: normal;
	}
```

## 六、路由管理

``` 
1.下载依赖
npm i vue-router -D
2.配置router.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //创建hash模式
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/Main.vue')
    },
    // 无对应路由跳转的页面
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})

// 导航守卫
// 参数：to 表示跳转的位置  from表示哪跳转来的位置
// 返回值表示决定调转的路径
router.beforeEach((to, from) => {
  const token = loaclCache.getCache(LOGIN_TOKEN)
  if (to.path === '/main' && !token) {
    return '/login'
  }
})

export default router

3.main.js 引入
import { createApp } from 'vue'
import router from './router'
const app = createApp(App)
app.use(router)

4.使用App.vue
<template>
    <router-link to="/main">主要</router-link>
    <router-link to="/login">登录</router-link>
    <router-view></router-view>
</template>

5.跳转某个页面main.vue中
<template>
  <div class="main">
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
const handleExitClick = () => {
  // 跳转登录页面
  router.push('/login')
}
</script>

6.在login.ts中使用跳转页面
import router from '@/router'
 router.push('/main')

7.创建动态路由
  7.1介绍
   根据用户权限信息，动态的添加路由
  7.2下载依赖(用于同时创建vue组件及路由文件)
  npm i coderwhy -g
  coderwhy  add3page_setup    department  -d src/views/main/system/department
		    添加vue3+setup文件  文件名       添加的位置
  7.3动态创建组件
  import type { RouteRecordRaw } from 'vue-router'
  import router from '@/router'
  // 1.动态获取所有路由对象，放到数组中
  const localRouters: RouteRecordRaw[] = [
 		 {
          path: '/main/analysis/overview',
          component: () =>
            import('../views/main/analysis/overview/overview.vue')
        },
        {
          path: '/main/analysis/dashboard',
          component: () =>
            import('../views/main/analysis/dashboard/dashboard.vue')
        },
        {
          path: '/main/system/user',
          component: () => import('../views/main/system/user/user.vue')
        },
        {
          path: '/main/system/role',
          component: () => import('../views/main/system/role/role.vue')
        }
  ]
  localRouters.forEach((route) => router.addRoute('main', route))
```

## 七、pinia使用

```javascript
1.下载依赖
npm i pinia
2.在\store\index.ts创建pinia
import { createPinia } from 'pinia'
const pinia = createPinia()
export default pinia
3.在main.ts中引入
import { createApp } from 'vue'
import pinia from './store'
const app = createApp(App)
app.use(pinia)
4.存储数据\store\counter.ts
import { defineStore } from 'pinia'
const useCounterStore = defineStore('counter', {
	//定义数据
  state: () => ({
    counter: 100,
    usersList:[]
  }),
 	//定义计算属性
  getters: {
    doubleCounter(state) {
      return state.counter * 2
    }
  },
  //定义方法
  actions: {
    changeCounterAction(newCounter: number) {
      this.counter = newCounter
    },
    async postUsersListAction() {
      const data = {
        offset: 0,
        size: 10
      }
      //请求数据
      const userListResult = await postUsersListData(data)
      const { list } = userListResult.data
      this.usersList = list
    }
  }
})

export default useCounterStore

5.使用
<template>
  <div class="main">
    <h2>main: {{ counterStore.counter }}-{{ counterStore.doubleCounter }}</h2>
    <button @click="changeCounter">修改counter</button>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import useCounterStore from '@/store/counter'

const counterStore = useCounterStore()

function changeCounter() {
  counterStore.changeCounterAction(999)
  //请求数据
  counterStore.postUsersListAction()
  //获取异步加载的数据
  const { usersList } = storeToRefs(counterStore)
}
</script>

6.监听action
	6.1介绍
    你可以通过 store.$onAction() 来监听 action 和它们的结果。传递给它的回调函数会在 action 本身之前执行。after 表示在 promise 解决之后，允许你在 action 解决后执行一个回调函数。同样地，onError 允许你在 action 抛出错误或 reject 时执行一个回调函数。这些函数对于追踪运行时错误非常有用
    6.2使用
    import useCounterStore from '@/store/counter'
	const counterStore = useCounterStore()
    counterStore.$onAction(
 	 ({
        name, // action 名称
        store, // store 实例，类似 `someStore`
        args, // 传递给 action 的参数数组
        after, // 在 action 返回或解决后的钩子
        onError, // action 抛出或拒绝的钩子
      }) => {
        // 这将在 action 成功并完全运行后触发。
        // 它等待着任何返回的 promise
        after((result) => {
          console.log(
            `Finished "${name}" after ${
              Date.now() - startTime
            }ms.\nResult: ${result}.`
          )
        })

        // 如果 action 抛出或返回一个拒绝的 promise，这将触发
        onError((error) => {
          console.warn(
            `Failed "${name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
          )
        })
      }
    )
    
	// 此订阅器即便在组件卸载之后仍会被保留
	counterStore.$onAction(callback, true)
```

## 
