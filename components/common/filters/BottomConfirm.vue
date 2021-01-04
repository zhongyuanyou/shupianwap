<template>
  <div class="bottom-confirm">
    <div class="reset-btn" @click="resetFilters">
      <client-only>
        <my-icon name="tab_ic_redu" size="0.40rem" color="#1A1A1A"></my-icon>
        <p>重置</p>
      </client-only>
    </div>
    <div class="confirm-btn" @click="confirmFilters">确定</div>
  </div>
</template>

<script>
export default {
  name: 'BottomConfirm',
  mounted() {
    this.$emit('bottomConfirmHeight', this.$el.getBoundingClientRect().height)
  },
  methods: {
    resetFilters() {
      this.$emit('resetFilters')
    },
    confirmFilters() {
      this.$emit('confirmFilters')
    },
  },
}
</script>

<style lang="less" scoped>
.bottom-confirm {
  display: flex;
  width: 100%;
  height: 160px;
  align-items: center;
  .reset-btn {
    text-align: center;
    margin: 0 45px;
    > p {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
    }
  }
  .confirm-btn {
    width: 574px;
    height: 96px;
    background: #4974f5;
    border-radius: 8px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-align: center;
    line-height: 96px;
  }
  .iconfont-box {
    text-align: center;
  }
  .reset-btn {
    font-size: 24px;
  }
}
</style>
