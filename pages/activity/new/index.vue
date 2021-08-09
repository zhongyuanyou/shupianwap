<template>
  <div class="container">
    <div>新的</div>
    <div><nuxt-link to="/activity/seckill">直降</nuxt-link></div>
    <div><nuxt-link to="/activity/seckill2">秒杀</nuxt-link></div>
    <div><nuxt-link to="/activity/exclusive">独家专售</nuxt-link></div>
    <div><nuxt-link to="/activity/newproduct">新品</nuxt-link></div>
    <div><nuxt-link to="/activity/special">99特卖</nuxt-link></div>
    <div>
      <nuxt-link to="/activity/subsidy">官方补贴全网低价</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/activity/server">先服务后收费</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/activity/download">下载页</nuxt-link>
    </div>

    <div class="old">旧的</div>

    <div><nuxt-link to="/activity/old/seckill">直降</nuxt-link></div>
    <!-- <div><nuxt-link to="/activity/old/seckill2">秒杀</nuxt-link></div> -->
    <div><nuxt-link to="/activity/old/exclusive">独家专售</nuxt-link></div>
    <div><nuxt-link to="/activity/old/newproduct">新品</nuxt-link></div>
    <div><nuxt-link to="/activity/old/special">99特卖</nuxt-link></div>
    <div>
      <nuxt-link to="/activity/old/subsidy">官方补贴全网低价</nuxt-link>
    </div>
    <div>
      <nuxt-link to="/activity/old/server">先服务后收费</nuxt-link>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  font-size: 32px;

  .old {
    margin-top: 20px;
    border-top: 1px solid #f4f4f4;
  }
}
</style>
