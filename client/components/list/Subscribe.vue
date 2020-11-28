<template>
  <div class="subscribe">
    <div class="subscribe-title">
      <client-only>
        <my-icon
          name="toast_ic_remind"
          size="0.28rem"
          color="rgba(216, 216, 216, 1)"
        ></my-icon>
      </client-only>
      <span>没有找到到相关服务，换个搜索词试试!</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Subscribe',
}
</script>

<style lang="less" scoped>
.subscribe {
  .subscribe-title {
    display: flex;
    align-items: center;
    width: 100%;
    height: 80px;
    > span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
