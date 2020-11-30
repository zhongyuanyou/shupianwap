<template>
  <div class="report">
    <div class="report_title">
      <p class="report_title_lf">评估报告</p>
      <p class="report_title_rt">2020.08.12 完成评估</p>
    </div>
    <div class="report_con">
      <div class="result">
        <p class="score">8.9</p>
        <p class="txt">评估结果：<span>优秀</span></p>
      </div>
      <div class="process">
        <div class="process_item" style="margin-top: 0">
          <p class="title">资料完整</p>
          <div class="process_item_line no_margin">
            <sp-progress :show-pivot="false" :percentage="50" />
          </div>
          <p class="process_item_score">8.3</p>
        </div>
        <div class="process_item">
          <p class="title">资料完整</p>
          <div class="process_item_line">
            <sp-progress :show-pivot="false" :percentage="50" />
          </div>
          <p class="process_item_score">8.3</p>
        </div>
        <div class="process_item">
          <p class="title">资料完整</p>
          <div class="process_item_line">
            <sp-progress :show-pivot="false" :percentage="50" />
          </div>
          <p class="process_item_score">8.3</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from '@chipspc/vant-dgg'
export default {
  name: 'Report',
  components: {
    [Progress.name]: Progress,
  },
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
    &_rt {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
  &_con {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: row;
    margin-top: 54px;
    position: relative;
    .result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
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
        span {
          color: #4974f5;
        }
      }
    }
    .process {
      width: 450px;
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
        .score {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        .title {
          margin-right: 20px;
        }
        &_line {
          width: 261px;
          margin-right: 22px;
        }
      }
    }
  }
}
</style>
