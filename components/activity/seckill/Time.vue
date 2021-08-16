<template>
  <div class="time_container">
    <img
      class="time_icon"
      src="https://cdn.shupian.cn/sp-pt/wap/images/brnto466ftc0000.png"
    />

    <div class="down-time">
      <div class="time">{{ time.hour || '00' }}</div>
      <div class="colon">:</div>
      <div class="time">{{ time.min || '00' }}</div>
      <div class="colon">:</div>
      <div class="time">{{ time.sec || '00' }}</div>
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
    flex-shrink: 0;
    color: #ec5330;
    font-size: 24px;

    letter-spacing: 0;
    margin-left: 16px;
    & > div {
      display: inline-block;
    }
    .time {
      background: #ec5330;
      border-radius: 4px;
      font-family: BebasNeueBold, Bebas;
      // font-weight: bold;
      font-size: 32px;
      color: #ffffff;
      letter-spacing: 0;
      min-width: 40px;
      height: 40px;
      line-height: 40px;

      padding: 0px 7px;
      letter-spacing: 0;
    }
    .colon {
      font-weight: bold;
      transform: translateY(-7px);
    }
  }
  .welcome {
    margin-right: 28px;
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
