## 状态码

- 304 协商缓存

## url

<a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Identifying_resources_on_the_Web">统一资源标识符的语法 (URI)</a>

- 协议

  - http://
  - http://告诉浏览器使用何种协议 http|https|ftp|mailto|ws/wss

- 主机
  www.example.com 既是一个域名，也代表管理该域名的机构。它指示了需要向网络上的哪一台主机发起请求。

- 端口
  - :80
    - 如果访问的该 Web 服务器使用 HTTP 协议的标准端口（HTTP 为 80，HTTPS 为 443）授予对其资源的访问权限，则通常省略此部分。否则端口就是 URI 必须的部分。
- 路径
  - /path/to/index.html
    - /path/to/index.html 是 Web 服务器上资源的路径
- 查询
  - ?key=1&value=2
    - ?key1=&value2 是提供给 Web 服务器的额外参数

## http 概述

- 无状态的超文本传输协议
- http 是一种能够获取像 html 这样的网络资源的（通讯协议），是在 web 上进行数据交换的基础，是一种 client-serve 协议，也就是说通常由客户端这样的接受方发起的。客户端和服务端通过交换各自的消息进行交互。客户端发出的消息叫 request，服务端响应的消息叫 response，
- http 是应用层的协议，通过 TCP 或者 TLS 一种加密的 TCP 连接来发送。
- 1.<a target="_blank" href="https://developer.mozilla.org/zh-CN/docs/Glossary/TCP">>TCP </a>是传输控制协议，TCP 确保数据传输的可靠性并且保证每一个字节在接收时维持它们的发送顺序。TCP 使用三次握手来建立一个连接和四次握手来中断一个连接。
- 2.TCP 是面向连接的。客户端和服务端之间建立连接，然后才能发送数据。
- http 是无状态的。
  - http 是无状态的
  - 也就是说在同一个连接中，两个执行成功之间没有联系。这就带来一个问题，用户没有办法在一个网站中进行连续的交互。比如加入一个产品到购物车，在切换另一个页面再次添加商品，这两次商品请求之间没有关联，浏览器无法知道用户最终选择了哪些商品。使用 HTTP Cookies 就可以解决这个问题。把 Cookies 添加到头部中，创建一个会话让每次请求都能共享相同的上下文信息，达成相同的状态。
  - 注意，HTTP 本质是无状态的，使用 Cookies 可以创建有状态的会话。

## http 和连接

- 一个连接是由传输层来控制的，有两个最常用的传输层协议：TCP 是可靠的，而 UDP 不是。因此，HTTP 依赖于面向连接的 TCP 进行消息传递，

## http1.0

- 短连接模型
- 因为 http 依赖于 TCP 来创建连接。每发起一个请求就会创建一个新的连接，并在收到应答后立即关闭。这个模型的效率低下
- 当 Connection 通常设置为 retry-after 可以让其保持为长连接
- 长连接也还是有缺点的；就算是在空闲状态，它还是会消耗服务器资源，而且在重负载时，还有可能遭受 DoS attacks 攻击

## http1.1

- 诞生了两个新模型
  - 1.长连接模型，他会保持连接去完成多次的连续请求。减少了不断重新打开连接的时间。
  - 2.HTTP 流水线模型，多个连续请求不需要等待立即返回就可以被发送
- 当 Connection 设置为 close 会用短连接模型 http1.0 的默认模型

## HTTP/2 在 HTTP/1.1 有几处基本的不同：

- HTTP/2 是二进制协议而不是文本协议。不再可读，也不可无障碍的手动创建，改善的优化技术现在可被实施。
- 这是一个复用协议。并行的请求能在同一个链接中处理，移除了 HTTP/1.x 中顺序和阻塞的约束。
- 压缩了 headers。因为 headers 在一系列请求中常常是相似的，其移除了重复和传输重复数据的成本。
- 其允许服务器在客户端缓存中填充数据，通过一个叫服务器推送的机制来提前请求。

## http 报文格式

- 1 起始行
  - GET/index.html/HTTP/1.1 请求
  - HTTP/1.1/ 200 ok 响应
- 2 头部字段集合
- 3 空行
- 4 消息正文

## 缓存

<a target="_blank" href="https://mp.weixin.qq.com/s/Wvc0lkLpgyEW_u7bbMdvpQ">HTTP 缓存</a>

- 协商缓存：如果命中，则返回 304
  - Last-Modified，If-Modified-Since
    - 浏览器第一次请求资源的时候，服务器返回的 header 上会带有一个 Last-Modified 字段，表示资源最后修改的时间。
    - 当浏览器再次请求该资源时，请求头中会带有一个 If-Modified-Since 字段，这个值是第一次请求返回的 Last-Modified 的值。服务器收到这个请求后，If-Modified-Since 和当前的 Last-Modified 进行对比。如果相等，则说明资源未修改，返回 304，浏览器使用本地缓存。
  - 问题 最小单位是秒。也就是说如果我短时间内资源发生了改变，Last-Modified 并不会发生变化；周期性变化。如果这个资源在一个周期内修改回原来的样子了，我们认为是可以使用缓存的，但是 Last-Modified 可不这样认为。所以，后来又引入一个 Etag。
  - Etag
    - Etag 一般是由文件内容 hash 生成的，也就是说它可以保证资源的唯一性，资源发生改变就会导致 Etag 发生改变。
    - 同样地，在浏览器第一次请求资源时，服务器会返回一个 Etag 标识。当再次请求该资源时， 会通过 If-no-match 字段将 Etag 发送回服务器，然后服务器进行比较，如果相等，则返回 304 表示未修改。
    - Last-Modified 和 Etag 是可以同时设置的，服务器会优先校验 Etag，如果 Etag 相等就会继续比对 Last-Modified，最后才会决定是否返回 304。\*\*
- 强制缓存：
  - 查看 header 头中的 Expire 和 Cache-control 来判断是否满足规则；
  - Expire
    - 这个字段包含了一个时间，过了这个时间，响应将会失效。
    - 这个是个绝对时间，也就是说，如果我修改了客户端的本地时间，是不是就会导致判断缓存失效了呢。
  - Cache-Control
  - 在 HTTP/1.1 中，增加了一个字段 Cache-Control ，它包含一个 max-age 属性，该字段表示资源缓存的最大有效时间，这就是一个相对时间。
- 强制缓存在缓存数据未失效的情况下，即 Cache-Control 的 max-age 没有过期或者 Expires 的缓存时间没有过期，那么就会直接使用浏览器的缓存数据，不会再向服务器发送任何请求。强制缓存生效时，HTPP 的状态码为 200。
- 静态的 HTML 页面想要设置缓存的话，可以通过 HTTP 的 META 设置 expires 和 cache-control。

```js
  <meta http-equiv="Cache-Control" content="max-age=7200" />
  <meta http-equiv="Expires" content="Mon, 20 Jul 2013 23:00:00 GMT" />
```

## 缓存

- 状态码
- 2 开头的为成功类型状态码
- 3 开的为重定向状态码
- 4 客户端错误状态码
- 5 服务端错误状态码
  toPrimitive
