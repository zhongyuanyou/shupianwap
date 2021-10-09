<template>
  <div v-if="custDetail && custDetail.clientDetail" class="container">
    <p class="container_title">
      {{ title }}
    </p>
    <div
      ref="containerHtmlRef"
      class="container_html"
      :style="{ height: heightContainer, overflow: overflowContainer }"
      v-html="custDetail.clientDetail"
    ></div>
    <div v-if="showContainer" class="container_handle">
      <div class="open" @click="trigger">
        {{ triggerContainer ? '收起' : '展开' }}
      </div>
      <my-icon
        :name="triggerContainer ? 'shangla' : 'xiala'"
        size="0.24rem"
        color="#4974F5"
      ></my-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ServiceDetail',
  components: {},
  props: {
    detailData: {
      type: Object,
      default: () => {
        return {}
      },
    },
    title: {
      type: String,
      default: '产品详情',
    },
  },
  data() {
    return {
      containerLoading: true,
      showContainer: false, // 显示内容,收起内容
      triggerContainer: false, // 展开内容,收起内容
      heightContainer: 'unset',
      overflowContainer: 'unset',
    }
  },
  computed: {
    custDetail() {
      return this.detailData
    },
  },
  mounted() {
    try {
      // 防止程序报错
      this.$nextTick(() => {
        const containerRefHeight = this.$refs.containerHtmlRef.offsetHeight
        if (containerRefHeight > 200) {
          this.showContainer = true
          this.heightContainer = '200px'
          this.overflowContainer = 'hidden'
        }
      })
    } catch (e) {}
  },
  methods: {
    trigger() {
      this.triggerContainer = !this.triggerContainer
      if (this.triggerContainer) {
        this.heightContainer = this.overflowContainer = 'unset'
        return
      }
      this.heightContainer = '200px'
      this.overflowContainer = 'hidden'
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding: 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &_html {
    font-size: 26px;
    color: #595959;
    ::v-deep img {
      max-width: 100%;
    }
  }
  &_handle {
    margin-top: 40px;
    display: flex;
    bottom: 40px;
    align-items: center;
    justify-content: center;
    .open {
      font-size: 32px;
      line-height: 44px;
      font-weight: bold;
      color: #4974f5;
      text-align: center;
      margin-right: 18px;
    }
  }
}
</style>
