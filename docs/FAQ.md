# 常见问题处理（Frequently Asked Questions）

### 1. 在 ios 中，使用 popup 全屏遮挡，但只遮挡部分

原因： 若弹出元素在滚动区域里面，将导致 popup 弹出只能遮挡到滚动区，不能达到全覆盖

方法：

```html
<div class="example">
  <div class="example__head">头</div>
  <div class="example__body">
    <!-- 当显示全屏遮罩层，可以使用 sp-overflow-hidden ， 设置overflow:hidden, 修复此问题 -->
    <div class="example__body-container" :class="{'sp-overflow-hidden':show}">
      <sp-popup v-model="show"> popup content </sp-popup>
      <div class="example__list">list content</div>
    </div>
  </div>
  <div class="example__foot">底部</div>
</div>
```

```less
.example {
  height: 100%;
  display: flex;
  flex-direction: column;
  &__head {
    height: 88px;
  }
  &__body {
    flex: 1;
    padding: 0;
    position: relative;
    &-container {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow-x: hidden;
      overflow-y: scroll;
      -webkit-overflow-scrolling: touch;
      background-color: #f8f8f8;
    }
  }
  &__list {
    height: 20000px;
  }
  &__foot {
    height: 90px;
  }
}
```
