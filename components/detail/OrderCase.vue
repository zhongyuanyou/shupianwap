<template>
  <div class="case">
    <h1>精选案例</h1>
    <div class="box">
      <div class="head">
        <img :src="ordercase.img" alt="" />
        <h1>{{ ordercase.name }}</h1>
        <p>{{ ordercase.time }}</p>
      </div>
      <div class="cell">
        <p>办理业务：{{ ordercase.type }}</p>
        <p>办理周期：{{ ordercase.date }}</p>
        <div>
          <p>办理经过</p>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Rate } from '@chipspc/vant-dgg'
export default {
  name: 'OrderCase',
  components: {
    [Rate.name]: Rate,
  },
  data() {
    return {
      ordercase: {
        img: 'https://cdn.shupian.cn/sp-pt/wap/images/8n7yuuz26io0000.jpg',
        name: '用户昵称',
        time: '2021.04.13',
        type: '公司注册',
        date: '七个工作日',
        list: [],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 16px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  > .box {
    margin-top: 48px;
    padding: 0 40px;
    > .head {
      display: flex;
      align-items: center;
      > img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      > h1 {
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        margin-left: 20px;
        color: #222222;
        line-height: 32px;
      }
      > p {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-left: auto;
      }
    }
    > .cell {
      margin-bottom: 12px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 26px;
      > p {
        margin-top: 28px;
      }
    }
  }
}
</style>
