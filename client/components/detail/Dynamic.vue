<template>
  <div class="dynamic">
    <p class="dynamic_title">商品动态</p>
    <div class="dynamic_statistical">
      <div class="dynamic_statistical_item">
        <p class="statistical_title">近7日浏览量</p>
        <p class="statistical_num">295</p>
      </div>
      <div class="dynamic_statistical_item">
        <p class="statistical_title">近7日咨询量</p>
        <p class="statistical_num">180</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Cell } from '@chipspc/vant-dgg'
export default {
  name: 'Dynamic',
  components: {
    [Cell.name]: Cell,
  },
}
</script>

<style lang="less" scoped>
.dynamic {
  background-color: #fff;
  padding: 47px 40px 48px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_statistical {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 40px;
    .statistical_title {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
    .statistical_num {
      font-size: 44px;
      font-family: Bebas;
      font-weight: 400;
      color: #1a1a1a;
      margin-top: 27px;
    }
    &_item {
      width: 50%;
    }
  }
}
</style>
