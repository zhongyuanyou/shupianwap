<template>
  <div class="question">
    <div class="question_tp">
      <p class="question_tp_title">常见问题</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Question',
}
</script>

<style lang="less" scoped>
.question {
  background-color: #fff;
  padding: 47px 40px 37px 40px;
  &_tp {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_title {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
