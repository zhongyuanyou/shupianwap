<template>
  <div class="case">
    <p class="case_title">成功案例</p>
    <div class="case_con">
      <p class="case_con_title">{{ caseData.name }}</p>
      <div class="case_con_info">
        <div class="case_con_info_lf">
          {{ caseData.area }}
          <!--          <span>时间：{{ caseData.time }}</span>-->
        </div>
        <div class="case_con_info_rt">{{ caseData.time }} 成交</div>
      </div>
      <div class="case_evaluate">
        <p>{{ caseData.finalPrice }}</p>
        <div class="score">
          <sp-rate
            v-model="caseData.star"
            size="0.24rem"
            :readonly="true"
            color="#FF624F"
            void-color="#bbb"
          />
          <span>{{ caseData.star }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Rate } from '@chipspc/vant-dgg'
import caseMock from '~/mock/case'
export default {
  name: 'Case',
  components: {
    [Rate.name]: Rate,
  },
  props: {
    classCodeDict: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      caseData: {
        name: '--',
        time: '---/---/---',
        area: '--：---',
        star: 0,
        finalPrice: '-',
        originalPrice: '-',
      },
    }
  },
  mounted() {
    this.getCase()
  },
  methods: {
    //  随机抽取
    getCase() {
      const caseData = caseMock[this.classCodeDict]
        ? caseMock[this.classCodeDict]
        : [
            {
              name: '--',
              time: '---/---/---',
              area: '--：---',
              star: 0,
              finalPrice: '-',
              originalPrice: '-',
            },
          ]
      if (caseData.length < 2) {
        this.caseData = caseData[0]
      } else {
        this.caseData = caseData[Math.floor(Math.random() * caseData.length)]
      }
    },
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
