<template>
  <div class="slider">
    <sp-slider
      v-model="value"
      range
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
    onInput(value) {
      const min = value[0]
      const max = value[1]
      if (this.type === 'money') {
        this.$parent.minMoney = 2 * min
        this.$parent.maxMoney = 2 * max
      } else if (this.type === 'year') {
        this.$parent.minYear = Math.round(0.2 * min)
        this.$parent.maxYear = Math.round(0.2 * max)
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
/deep/ .sp-slider {
  border-radius: 0;
}
// 让滑块层级最高
/deep/ .sp-slider__button-wrapper-left,
/deep/.sp-slider__button-wrapper-right {
  z-index: 999;
}
</style>
