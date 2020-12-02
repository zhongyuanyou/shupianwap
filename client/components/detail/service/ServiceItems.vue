<template>
  <div class="serviceItems">
    <h2 class="serviceItems-title">
      <span>服务项目</span>
      <a href="javascript:void(0)">
        查看更多
        <my-icon name="list_ic_next" size="0.26rem" />
      </a>
    </h2>
    <ul class="serviceItems-list">
      <li>
        <span>公司核名服务</span>
        <em>这是一条描述文字</em>
      </li>
      <li>
        <span>公司核名服务</span>
        <em>这是一条描述文字</em>
      </li>
    </ul>
  </div>
</template>

<script>
import MyIcon from '~/components/common/myIcon/MyIcon'
export default {
  name: 'ServiceItems',
  MyIcon,
}
</script>

<style lang="less" scoped>
.serviceItems {
  padding-top: 47px;
  padding-bottom: 40px;
  background-color: #fff;
  margin-top: 24px;
  &-title {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    display: flex;
    justify-content: space-between;
    padding: 0px 41px;
    a {
      font-size: 26px;
      font-weight: 400;
      color: #999999;
    }
  }
  &-list {
    margin-top: 16px;
    li {
      height: 88px;
      line-height: 88px;
      font-size: 26px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #f4f4f4;
      padding: 0px 41px;
      span {
        font-weight: 400;
        color: #999999;
      }
      em {
        font-weight: 400;
        color: #222222;
        font-style: normal;
      }
    }
  }
}
</style>
