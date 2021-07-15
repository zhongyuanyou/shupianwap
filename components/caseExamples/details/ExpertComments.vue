<template>
  <div class="report">
    <div class="report_title">
      <p class="report_title_lf">专家点评</p>
    </div>
    <div class="report_con">
      <div class="result">
        <p class="score">{{ num }}</p>
        <p class="txt">评估结果：<span>优秀</span></p>
      </div>

      <div class="process">
        <div v-for="(item, index) of list" :key="index" class="process_item">
          <p class="title">{{ item.name }}</p>
          <div class="process_item_line no_margin">
            <sp-progress :show-pivot="false" :percentage="item.val" />
          </div>
          <p class="process_item_score">{{ item.val }}</p>
        </div>
      </div>
    </div>

    <div class="report_user"></div>
  </div>
</template>

<script>
import { Progress } from '@chipspc/vant-dgg'
export default {
  name: 'ExpertComments',
  components: {
    [Progress.name]: Progress,
  },
  data() {
    return {
      num: 99,
      list: [
        {
          name: '接单速度',
          val: 99.99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 9.1,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
      ],
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.report {
  padding: 47px 40px 40px 40px;
  border-bottom: 24px solid #f8f8f8;
  background-color: #fff;
  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  &_con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 54px;
    /*position: relative;*/
    .result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/ad51idi4arc0000.png);
      background-size: 100%;
      background-repeat: no-repeat;

      .score {
        font-size: 66px;
        font-family: Bebas;
        font-weight: 400;
        color: #4974f5;
      }
      .txt {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 32px;
        span {
          color: #4974f5;
        }
      }
    }
    // .dividing {
    //   height: 130px;
    //   border-right: 1px solid #f4f4f4;
    // }
    .process {
      width: 440px;

      &_item {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        margin-top: 27px;

        .title {
          margin-right: 20px;
        }
        &_line {
          flex: 1;
          margin-right: 22px;
        }
        &_score {
          min-width: 40px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          line-height: 22px;
        }
      }
      &_item:first-child {
        margin-top: 0;
      }
    }
  }
}
</style>
