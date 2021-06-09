<template>
  <div>
    <div class="status-bar" :style="{ background: status.bgColor }">
      <div class="status-bar_box">
        <slot name="icon"></slot>
        <div class="desc">
          <h3>{{ status.title }}</h3>
          <p>
            {{ status.desc }}<span v-if="status.plan">"{{ status.plan }}"</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    status: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="less" scoped>
.status-bar {
  padding: 40px 40px 0px 40px;
  padding-bottom: 68px;
  .status-bar_box {
    display: flex;
    background: #ffffff;
    border-radius: 12px;
    padding: 40px;
    .icon-box {
      width: 80px;
      height: 80px;
      background: #f2f5ff;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .desc {
      max-width: 480px;
      color: #222222;
      margin-left: 28px;
      h3 {
        font-family: PingFangSC-Medium;
        font-size: 32px;
        line-height: 40px;
      }
      p {
        margin-top: 10px;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        line-height: 34px;
        span {
          color: #4974f5 !important;
        }
      }
    }
  }
}
</style>
