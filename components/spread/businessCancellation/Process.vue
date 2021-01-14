<template>
  <div class="process">
    <my-title title="服务流程" />
    <ul class="process-box">
      <li v-for="(item, i) of processData" :key="i" class="process-item">
        <div class="item-box">
          <img class="icon" :src="item.img" alt="" />
          <div class="text">{{ item.text }}</div>
          <!-- 标号 -->
          <div class="process-num">{{ '0' + (i + 1) }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MyTitle from '@/components/spread/businessCancellation/MyTitle'

export default {
  components: {
    MyTitle,
  },
  props: {},
  data() {
    return {
      processData: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/fuqmlyqg0oo0000.png',
          text: '资料准备',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/3a0vnvfgcs40000.png',
          text: '提交审核',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/9eq6kvw15m40000.png',
          text: '领取注销通知书',
        },
      ],
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.process {
  padding: 32px 40px;
}
.process-box {
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  list-style: none;
  .process-item {
    position: relative;
    width: 33.3333%;
    height: 175px;
    border-bottom: 1px dashed #cdcdcd;
    &:nth-child(3n) {
      .item-box {
        margin-left: auto;
      }
    }
    &:nth-child(3n + 2) {
      .item-box {
        margin: 0 auto;
      }
    }
    .item-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 215px;
      height: 148px;
      background: linear-gradient(180deg, #ffffff 0%, #f7f8fa 100%);
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 8px;
      .icon {
        display: block;
        width: 40px;
        height: 44px;
        margin-top: 32px;
      }
      .text {
        font-size: 26px;
        font-weight: bold;
        color: #222222;
        line-height: 25px;
        margin-top: 15px;
      }
      .process-num {
        display: flex;
        position: absolute;
        left: 50%;
        bottom: -16px;
        transform: translateX(-50%);
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        font-size: 20px;
        font-weight: 400;
        color: #ffffff;
        background: #4974f5;
      }
    }
  }
}
</style>
