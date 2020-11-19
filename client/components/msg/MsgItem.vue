<template>
  <div class="delete">
    <div class="slider">
      <div
        class="content"
        :style="deleteSlider"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      ></div>
      <div ref="btns" class="btns">
        <div
          v-for="(item, index) in btns"
          :key="index"
          class="btns_item"
          :style="{ backgroundColor: item.bgColor, color: item.txtColor }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    btns: {
      type: Array,
      default: () => {
        return [
          {
            title: '删除',
            txtColor: '#fff',
            bgColor: 'red',
            fn: () => {},
          },
          {
            title: '编辑',
            txtColor: '#333',
            bgColor: '#f5f5f5',
            fn: () => {},
          },
        ]
      },
    },
  },
  data() {
    return {
      startX: 0, // 触摸位置
      endX: 0, // 结束位置
      moveX: 0, // 滑动时的位置
      disX: 0, // 移动距离
      deleteSlider: '', // 滑动时的效果,使用v-bind:style="deleteSlider"
    }
  },
  methods: {
    touchStart(ev) {
      ev = ev || event
      // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕

      if (ev.touches.length === 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX
      }
    },
    touchMove(ev) {
      ev = ev || event
      // 获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      const wd = this.$refs.btns.offsetWidth
      if (ev.touches.length === 1) {
        // 滑动时距离浏览器左侧实时距离
        this.moveX = ev.touches[0].clientX

        // 起始位置减去 实时的滑动的距离，得到手指实时偏移距离
        this.disX = this.startX - this.moveX
        // 如果是向右滑动或者不滑动，不改变滑块的位置
        if (this.disX < 0 || this.disX === 0) {
          this.deleteSlider = 'transform:translateX(0px)'
          // 大于0，表示左滑了，此时滑块开始滑动
        } else if (this.disX > 0) {
          // 具体滑动距离我取的是 手指偏移距离*5。
          this.deleteSlider =
            'transform:translateX(-' + (this.disX * 5) / 100 + 'rem)'

          // 最大也只能等于删除按钮宽度
          if (this.disX * 5 >= wd) {
            this.deleteSlider = 'transform:translateX(-' + wd / 100 + 'rem)'
          }
        }
      }
    },
    touchEnd(ev) {
      ev = ev || event
      const wd = this.$refs.btns.offsetWidth
      if (ev.changedTouches.length === 1) {
        const endX = ev.changedTouches[0].clientX

        this.disX = this.startX - endX
        // 如果距离小于删除按钮一半,强行回到起点

        if (this.disX * 5 < wd / 2) {
          this.deleteSlider = 'transform:translateX(0px)'
        } else {
          // 大于一半 滑动到最大值
          this.deleteSlider = 'transform:translateX(-' + wd + 'px)'
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.slider {
  width: 100%;
  height: 148px;
  position: relative;
  user-select: none;
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: green;
    z-index: 100;
    //    设置过渡动画
    transition: 0.3s;
  }
  .btns {
    position: absolute;
    height: 148px;
    right: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_item {
      width: 120px;
      height: 148px;
      text-align: center;
      font-size: 16px;
      line-height: 148px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
