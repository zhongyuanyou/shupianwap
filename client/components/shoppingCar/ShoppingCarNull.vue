<template>
  <div class="shopping-car-null">
    <div>
      <i></i>
    </div>
    <p>
      购物车空空如也~
      <nuxt-link to="/">随便看看</nuxt-link>
    </p>
  </div>
</template>
<style lang="less" scoped>
.shopping-car-null {
  //   height: 506px;
  display: block;
  padding: 108px 0 96px;
  text-align: center;
  div {
    i {
      display: inline-block;
      width: 340px;
      height: 340px;
      background: url(../../assets/images/shopping-car-null.png) no-repeat
        center center;
      background-size: 100%;
    }
  }
  p {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
    line-height: 44px;
    a {
      margin: 30px 0 0 283px;
      display: block;
      padding-top: 10px;
      width: 184px;
      height: 64px;
      background: #4974f5;
      border-radius: 4px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
    }
  }
}
</style>
