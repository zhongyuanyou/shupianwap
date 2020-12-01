<template>
  <div class="case">
    <p class="case_title">成功案例</p>
    <div class="case_con">
      <p class="case_con_title">山东科技信息咨询信息咨询技术有限公司</p>
      <div class="case_con_info">
        <div class="case_con_info_lf">
          地区：四川省<span>时间：2020.8.12</span>
        </div>
        <div class="case_con_info_rt">2020.7.20 成交</div>
      </div>
      <div class="case_evaluate">
        <p>22.5元</p>
        <div class="score">
          <sp-rate
            v-model="value"
            size="0.24rem"
            :readonly="true"
            color="#FF624F"
            void-color="#bbb"
          />
          <span>{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Rate } from '@chipspc/vant-dgg'
export default {
  name: 'Case',
  components: {
    [Rate.name]: Rate,
  },
  data() {
    return {
      value: 3.5,
    }
  },
}
</script>

<style lang="less" scoped>
.case {
  background-color: #fff;
  padding: 47px 40px 37px 40px;
  border-bottom: 24px solid #f8f8f8;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
  }
  &_con {
    margin-top: 39px;
    &_title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 40px;
    }
    &_info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: row;
      margin-top: 24px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 36px;
      &_lf {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        span {
          margin-left: 34px;
        }
      }
    }
  }
  &_evaluate {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 22px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ec5330;
    .score {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-direction: row;
      span {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ff624f;
        margin-left: 16px;
        vertical-align: bottom;
      }
    }
  }
}
</style>
