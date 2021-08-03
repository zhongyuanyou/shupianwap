<template>
  <div class="time_container">
    <img
      class="time_icon"
      src="https://cdn.shupian.cn/sp-pt/wap/images/newhbdltw2o000.png"
    />

    <div class="down-time">
      <div class="time">{{ time.hour }}</div>
      <div>:</div>
      <div class="time">{{ time.min }}</div>
      <div>:</div>
      <div class="time">{{ time.sec }}</div>
    </div>

    <div class="welcome">
      <my-icon
        class="laba-icon"
        name="laba"
        size="0.24rem"
        color="#4974F5"
      ></my-icon
      >欢迎来到直降专场
    </div>
  </div>
</template>


<script>
import { Image, Icon } from '@chipspc/vant-dgg'

export default {
  name: 'CaseIntroduction',
  components: {
    [Image.name]: Image,

    // SpIcon: Icon,
  },
  props: {
    time: {
      type: [Object, String],
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    commentfn() {
      this.$emit('onComment')
    },
    jump(item) {
      this.$emit('jump', item)
    },
  },
}
</script>

<style lang="less" scoped>
.time_container {
  font-family: PingFangSC;
  margin: 24px 20px 24px;
  padding: 32px;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  align-items: center;

  font-size: 0;

  .time_icon {
    height: 28px;
  }
  .down-time {
    flex: 1;
    color: #ec5330;
    font-size: 24px;
    font-weight: bold;
    letter-spacing: 0;
    margin-left: 16px;
    & > div {
      display: inline-block;
    }
    .time {
      background: #ec5330;
      border-radius: 4px;
      font-family: BebasNeueBold;
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0;
      line-height: 32px;
      padding: 6px 8px;
    }
  }
  .welcome {
    margin-right: 48px;
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #222222;
    letter-spacing: 0;

    .laba-icon {
      margin-right: 8px;
    }
  }
}
</style>
