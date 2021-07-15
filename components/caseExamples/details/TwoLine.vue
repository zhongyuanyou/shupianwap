<template>
  <div>
    <div ref="more" class="text more" :style="fontStyle">占位</div>
    <div class="text" :style="fontStyle">
      <div
        ref="textContainer"
        class="show_text"
        :class="{ retract: MoreThanTwoLines && ellipsis }"
        :style="{ 'max-height': MoreThanTwoLines && ellipsis ? twoHeight : '' }"
      >
        {{ text }}
        <div
          v-if="MoreThanTwoLines"
          class="btns"
          :style="{ height: oneHeight + 'px', lineHeight: oneHeight + 'px' }"
        >
          <span v-if="ellipsis == true" class="fuhao">...</span>
          <span class="btn" v-if="ellipsis == true" @click="ellipsis = false">
            展开
            <my-icon name="xia" size="0.17rem" color="#999999"></my-icon>
          </span>
          <span class="btn" v-if="ellipsis == false" @click="ellipsis = true"
            >收起
            <my-icon name="shang" size="0.17rem" color="#999999"></my-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem, Rate } from '@chipspc/vant-dgg'
export default {
  name: 'TwoLine',
  components: {},
  props: {
    fontsize: {
      type: String,
      default: '0.26rem',
    },
    text: {
      type: String,
      default:
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
  },
  data() {
    return {
      MoreThanTwoLines: false, // 超出两行

      ellipsis: false, // 是否省略

      oneHeight: '', // 单行高度
      twoHeight: '', // 两行高度px
    }
  },
  watch: {
    text: {
      // immediate: true,
      handler(newVal) {
        this.init()
      },
    },
  },
  computed: {
    fontStyle() {
      const info = {}
      if (this.fontsize) {
        info.fontSize = this.fontsize
      }
      if (this.lineHeight) {
        info.lineHeight = this.lineHeight
      }

      return info
    },
  },
  mounted() {
    this.init()
    window.addEventListener('resize', this.resize)
  },
  destroyed() {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.$nextTick(() => {
        this.ellipsis = false

        this.$nextTick(() => {
          this.init()
        })
      })
    },
    init() {
      // 获取一行文字的height 计算当前文字比较列表文字

      const oneHeight = this.$refs.more.scrollHeight
      console.log('oneHeight', oneHeight)
      const twoHeight = oneHeight * 2 || 40
      const txtDom = this.$refs.textContainer
      const curHeight = txtDom.scrollHeight

      this.oneHeight = oneHeight
      this.twoHeight = `${twoHeight}px`

      console.log(curHeight, twoHeight)

      if (curHeight > twoHeight) {
        this.MoreThanTwoLines = true
        this.ellipsis = true
      } else {
        this.MoreThanTwoLines = false
        this.ellipsis = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.text {
  font-size: 0.3rem;
}
.show_text {
  position: relative;
}
.retract {
  overflow: hidden;
}

// .retract:after {
//   content: '...';
//   color: #000000;
//   position: absolute;
//   bottom: 0;
//   right: 0.6rem;
//   width: 0.6rem;
//   padding-left: 30px;
//   background: linear-gradient(to right, transparent, #fff 45%);
//   // background: #fff;
// }

.btns {
  position: absolute;
  right: 0;
  bottom: 0px;
  cursor: pointer;

  text-align: right;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  // line-height: 24px;

  color: #222222;
  letter-spacing: 0;

  > span {
    float: left;
  }
  .fuhao {
    padding-left: 15px;
    padding-right: 90px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.4), #fff 15px);
  }
  .btn {
    background: #fff;
  }
}

.more {
  position: absolute;
  visibility: hidden;
}
</style>
