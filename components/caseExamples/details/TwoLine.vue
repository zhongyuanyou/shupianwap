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
        {{ text
        }}<span
          style="display: inline-block; height: 1px"
          :style="{ width: collectWidth + 20 + 'px' }"
        ></span>
        <div
          v-if="MoreThanTwoLines"
          class="btns"
          :style="{ height: oneHeight + 'px', lineHeight: oneHeight + 'px' }"
        >
          <span v-if="ellipsis == true" class="fuhao">...</span>
          <span v-if="ellipsis == true" class="btn" @click="ellipsis = false">
            展开
            <my-icon name="xia" size="0.17rem" color="#999999"></my-icon>
          </span>
          <span
            v-if="ellipsis == false"
            ref="collect"
            class="btn"
            @click="ellipsis = true"
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
      default: '',
    },
  },
  data() {
    return {
      MoreThanTwoLines: false, // 超出两行

      ellipsis: false, // 是否省略

      oneHeight: '', // 单行高度
      twoHeight: '', // 两行高度px

      collectWidth: 0, // 收起按钮的宽度，用于占位
    }
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
  watch: {
    text: {
      // immediate: true,
      handler(newVal) {
        this.init()
      },
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
          this.getCollectWidth()
        })
      })
    },
    init() {
      // 获取一行文字的height 计算当前文字比较列表文字

      const oneHeight = this.$refs.more.scrollHeight

      const twoHeight = oneHeight * 2 || 40
      const txtDom = this.$refs.textContainer
      const curHeight = txtDom.scrollHeight

      this.oneHeight = oneHeight
      this.twoHeight = `${twoHeight}px`

      if (curHeight > twoHeight) {
        this.MoreThanTwoLines = true
        this.ellipsis = true
      } else {
        this.MoreThanTwoLines = false
        this.ellipsis = false
      }
    },
    getCollectWidth() {
      const collectWidth = this.$refs?.collect?.offsetWidth
      this.collectWidth = collectWidth || 0
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

.btns {
  position: absolute;
  right: 0;
  bottom: 0px;
  cursor: pointer;

  text-align: right;
  font-family: PingFangSC-Medium;
  font-size: 24px;
  // line-height: 24px;

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
    font-weight: bold;

    color: #222222;
  }
}

.more {
  position: absolute;
  visibility: hidden;
}
</style>
