<template>
  <div class="slider">
    <sp-slider
      v-model="value"
      range
      step="0.5"
      bar-height="0.4rem"
      active-color="#4974f5"
      inactive-color="#f8f8f8"
      @input="onInput"
    >
      <template #button>
        <div class="slider-button">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/images/dq0rxv4pt9s0000.png"
            alt=""
          />
        </div>
      </template>
    </sp-slider>
    <div class="slider-white"></div>
  </div>
</template>

<script>
import { Slider, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Slider',
  components: {
    [Slider.name]: Slider,
  },
  props: {
    type: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {
      // 双滑块模式时，值必须是数组
      value: [25, 75],
    }
  },
  methods: {
    // 滑块改变时触发
    onInput(value) {
      // 获取滑块位置，不允许两个滑块重合
      let min = value[0]
      let max = value[1]
      if (min === max) {
        if (max === 100) {
          // 在最大范围重合
          value[0] = max - 0.5
        } else {
          // 一般重合
          value[1] = min + 0.5
        }
      }
      // 如果是价格滑块
      if (this.type === 'money') {
        // 让数据变化
        if (min === max) {
          if (max === 100) {
            // 在最大范围重合
            min = max - 0.5
          } else {
            // 一般重合
            max = min + 0.5
          }
        }
        let minVal = 2 * min // 获取最小值
        let maxVal = 2 * max // 获取最大值
        if (min < 1) {
          // 滑块到最小值时的数据
          minVal = 2
        }
        if (max < 1.5) {
          // 滑块到最小值时的数据
          maxVal = 3
        }
        this.$parent.minMoney = minVal
        this.$parent.maxMoney = maxVal
        // 如果是年限滑块
      } else if (this.type === 'year') {
        // 处理好滑块位置对应的值
        min = parseInt(min / 5) * 5
        max = parseInt(max / 5) * 5
        // 让数据变化
        if (min === max) {
          if (max === 100) {
            // 在最大范围重合
            min = max - 5
          } else {
            // 一般重合
            max = min + 5
          }
        }
        this.$parent.minYear = 0.2 * min
        this.$parent.maxYear = 0.2 * max
      }
    },
  },
}
</script>

<style scoped lang="less">
.slider {
  &-button {
    width: 48px;
    height: 48px;
    background: #ffffff;
    box-shadow: 0px 4px 12px 0px rgba(1, 0, 0, 0.12);
    border-radius: 4px;
    display: flex;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
    }
  }
  &-white {
    border-bottom: 32px solid transparent;
    border-left: 710px solid #ffffff;
    position: relative;
    bottom: 42px;
  }
}

// 修改滑条的圆角
::v-deep .sp-slider {
  border-radius: 0;
}
// 让滑块层级最高
::v-deep .sp-slider__button-wrapper-left,
::v-deep.sp-slider__button-wrapper-right {
  z-index: 999;
}
</style>
