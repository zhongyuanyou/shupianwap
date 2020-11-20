<template>
  <div class="msg_item">
    <div class="slider">
      <div
        class="slider_con"
        :style="deleteSlider"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
      >
        <div class="slider_con_avatar"></div>
        <div class="slider_con_content">
          <div class="slider_con_content_top">
            <div class="name_dep">
              {{ info.name }}<span>{{ info.department }}</span>
            </div>
            <div class="time">{{ info.time }}</div>
          </div>
          <div class="slider_con_content_txt">
            {{ info.content }}
          </div>
        </div>
      </div>
      <div ref="btns" class="slider_btns">
        <div
          v-for="(item, index) in btns"
          :key="index"
          class="slider_btns_item"
          :style="{ backgroundColor: item.bgColor, color: item.txtColor }"
          @click="handleClick(item)"
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
            fn: () => {
              alert(111)
            },
          },
          {
            title: '编辑',
            txtColor: '#333',
            bgColor: '#f5f5f5',
            fn: () => {
              alert(222)
            },
          },
        ]
      },
    },
    info: {
      type: Object,
      default: () => {
        return {}
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
    handleClick(item) {
      // 点击按钮
      item.fn()
      this.deleteSlider = 'transform:translateX(0px)'
    },
  },
}
</script>

<style scoped lang="less">
.slider {
  width: 100%;
  height: 148px;
  position: relative;
  &_con {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 148px;
    background: #fff;
    z-index: 100;
    //    设置过渡动画
    transition: 0.3s;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: nowrap;
    &_avatar {
      width: 100px;
      height: 100px;
      border-radius: 50px;
      background-color: #f5f5f5;
      margin-left: 40px;
    }
    &_content {
      display: flex;
      flex: 1;
      background-color: #fff;
      height: 148px;
      margin-left: 32px;
      padding: 38px 40px 38px 0;
      border-bottom: 1px solid #f4f4f4;
      justify-content: space-between;
      align-items: flex-start;
      flex-direction: column;
      &_top {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: row;
        .name_dep {
          font-size: 32px;
          font-weight: bold;
          color: #222;
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          span {
            font-size: 24px;
            color: #999;
            margin-left: 12px;
            font-weight: normal;
          }
        }
        .time {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          font-size: 22px;
          color: #999;
        }
        .txt {
          width: 100%;
          font-size: 24px;
          color: #999;
        }
      }
    }
  }
  &_btns {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    overflow: hidden;
    padding: 0;
    margin: 0;
    &_item {
      width: 120px;
      text-align: center;
      font-size: 16px;
      line-height: 148px;
    }
  }
}
</style>
