<template>
  <div class="report">
    <div class="report_title">
      <p class="report_title_lf">评估报告</p>
      <p class="report_title_rt">{{ MockData.values[0] }} 完成评估</p>
    </div>
    <div class="report_con">
      <div class="result">
        <p class="score">{{ MockData.values[1] }}</p>
        <p class="txt">评估结果：<span>优秀</span></p>
      </div>
      <div class="process">
        <div class="process_item" style="margin-top: 0">
          <p class="title">{{ MockData.keys[0] }}</p>
          <div class="process_item_line no_margin">
            <sp-progress :show-pivot="false" :percentage="proportion1" />
          </div>
          <p class="process_item_score">{{ MockData.values[2] }}</p>
        </div>
        <div class="process_item">
          <p class="title">{{ MockData.keys[1] }}</p>
          <div class="process_item_line">
            <sp-progress :show-pivot="false" :percentage="proportion2" />
          </div>
          <p class="process_item_score">{{ MockData.values[3] }}</p>
        </div>
        <div class="process_item">
          <p class="title">{{ MockData.keys[2] }}</p>
          <div class="process_item_line">
            <sp-progress :show-pivot="false" :percentage="proportion3" />
          </div>
          <p class="process_item_score">{{ MockData.values[4] }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Progress } from '@chipspc/vant-dgg'
import reportData from '~/mock/assessmentReport'
export default {
  name: 'Report',
  components: {
    [Progress.name]: Progress,
  },
  props: {
    classCodeDict: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      MockData: {
        // 模拟数据项名称
        keys: [null, null, null],
        // 模拟数据值
        values: ['2020/09/25', '9.0', '8.9', '9.0', '8.8'],
      },
    }
  },
  computed: {
    proportion1() {
      return this.MockData.values[2] ? this.MockData.values[2] * 10 : 0
    },
    proportion2() {
      return this.MockData.values[3] ? this.MockData.values[3] * 10 : 0
    },
    proportion3() {
      return this.MockData.values[4] ? this.MockData.values[4] * 10 : 0
    },
  },
  mounted() {
    this.getRandomData()
  },
  methods: {
    getRandomData() {
      let mockData = {
        keys: [null, null, null],
        values: [['2020/05/20', '0', '0', '0', '0']],
      }
      if (reportData[this.classCodeDict]) {
        mockData = reportData[this.classCodeDict]
      }
      let mockVal = []
      if (mockData.values.length < 2) {
        mockVal = mockData.values[0]
      } else {
        mockVal = mockData.values[Math.floor(Math.random() * 10)]
      }
      this.$set(this.MockData, 'values', mockVal)
      this.$set(this.MockData, 'keys', mockData.keys)
    },
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
