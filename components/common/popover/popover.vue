<template>
  <div v-show="isShow" class="pop-over">
    <p>{{ text }}</p>
    <!-- <span>文本文本文本文本</span> -->
    <div @click="close()">
      <my-icon
        name="login_ic_clear"
        class="close"
        color="#FFFFFF"
        size="0.20rem"
      ></my-icon>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Popover',
  props: {
    text: {
      type: String,
      default: '',
    },
    // indexData: {
    //   type: Number,
    //   default: 0,
    // },
  },
  data() {
    return {
      isShow: false,
      indexData: 0,
    }
  },
  watch: {
    isShow(value) {
      // console.log('value', value)
    },
    indexData(value) {
      // console.log('indexValue', value)
    },
  },
  mounted() {
    // console.log(this.indexData)
  },
  methods: {
    close() {
      this.$emit('closepop', this.indexData)
    },
  },
}
</script>

<style lang="less" scoped>
.pop-over {
  background: #000000;
  opacity: 0.8;
  border-radius: 8px;
  position: absolute;
  top: 150px;
  left: 54px;
  right: 41px;
  z-index: 1;
  p {
    padding: 32px 0 32px 32px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #ffffff;
    margin-right: 100px;
  }

  .close {
    position: absolute;
    right: 42px;
    top: 32px;
  }
}
.pop-over::after {
  content: '';
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid #000000;
  position: absolute;
  right: 24px;
  top: -12px;
}
</style>
