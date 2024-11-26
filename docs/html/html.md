## font-size 影响元素高度问题

- 在 HTML 中，button 元素虽然会继承父元素的一些样式属性，如 color 和 background-color，但默认情况下不会继承父元素的 font-size 样式属性。这是因为 button 元素本身已经有一个默认的字体大小，并且该大小通常是浏览器默认字体大小的值。

```html
// button 不会继承font-size 但是div 会因为font-size 改变高度
<div class="font-size:200px">
  <button>1</button>
</div>
```

- 如果需要将 button 元素的字体大小改为与父元素相同，可以使用 CSS 的继承机制，将父元素的 font-size 属性应用到子元素上，例如：

```css
button {
  font-size: inherit;
}
```
