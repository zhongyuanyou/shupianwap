<template>
  <div class="m-evaluate success">
    <Header :hide-back="true">
      <template #right><div>完成</div></template>
    </Header>
    <div class="content-wrap">
      <sp-image round class="img" fit="cover" />
      <div class="tile">感谢您的评价~</div>
      <div class="desc">
        非常感谢您的评价，为我们服务质量的提升提供了宝贵意见！
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'

export default {
  name: 'EvaluateSucccess',
  components: {
    Header,
    [Image.name]: Image,
  },
}
</script>

<style lang="less" scoped>
.m-evaluate.success {
  @img-size: 140px;
  @font-regular: PingFangSC-Regular, PingFang SC;
  @font-medium: PingFangSC-Medium, PingFang SC;

  ::v-deep.slot-right {
    color: #222222;
    font-size: 32px;
    padding-right: 40px;
    font-family: @font-regular;
    font-weight: 400;
  }
  .content-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .img {
      height: @img-size;
      width: @img-size;
      margin-top: 112px;
      margin-bottom: 56px;
    }
    .tile {
      font: @font-medium;
      font-size: 44px;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
      margin-bottom: 32px;
    }
    .desc {
      font-size: 28px;
      font-family: @font-regular;
      font-weight: 400;
      color: #999999;
      line-height: 40px;
      text-align: center;
      margin: 0 80px;
    }
  }
}
</style>
