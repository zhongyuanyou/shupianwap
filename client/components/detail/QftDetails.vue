<template>
  <div class="qftDetails">
    <h1 class="qftDetails-title">资质信息</h1>
    <table class="qftDetails-table">
      <thead>
        <tr>
          <td>资质分类</td>
          <td>资质专业</td>
          <td>资质等级</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>1</td>
          <td>1</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'QftDetails',
}
</script>

<style scoped lang="less">
.qftDetails {
  background-color: #fff;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &-table {
    td {
      height: 72px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
