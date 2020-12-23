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
export default {
  name: 'Report',
  components: {
    [Progress.name]: Progress,
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
      const mockData = this.getMockData(this.$route.query.type)
      let mockVal = []
      if (mockData.values.length < 2) {
        mockVal = mockData.values[0]
      } else {
        mockVal = mockData.values[Math.floor(Math.random() * 10)]
      }
      this.$set(this.MockData, 'values', mockVal)
      this.$set(this.MockData, 'keys', mockData.keys)
    },
    getMockData(classCode) {
      switch (classCode) {
        case 'FL20201207080003':
          return {
            keys: ['资料完整', '税务情况', '经营情况'],
            values: [
              ['2020/09/25', '9.0', '8.9', '9.0', '8.8'],
              ['2020/10/12', '9.5', '9.3', '9.2', '9.5'],
              ['2020/09/10', '9.1', '9.0', '8.8', '9.1'],
              ['2020/08/30', '8.8', '8.8', '9.0', '8.8'],
              ['2020/12/22', '9.3', '9.3', '9.0', '9.2'],
              ['2020/11/02', '8.7', '8.9', '8.8', '8.8'],
              ['2020/07/17', '8.8', '8.8', '9.0', '8.9'],
              ['2020/11/16', '9.0', '9.0', '9.2', '8.9'],
              ['2020/10/08', '9.2', '9.0', '9.1', '8.9'],
              ['2020/12/12', '8.9', '8.8', '8.8', '9.2'],
            ],
          }
        case 'FL20201202065056':
          return {
            keys: ['资料完整', '类目齐全', '商标价值'],
            values: [
              ['2020/05/12', '8.6', '8.8', '8.5', '8.6'],
              ['2020/10/08', '8.7', '8.9', '8.6', '8.8'],
              ['2020/12/14', '8.8', '8.9', '9.0', '8.8'],
              ['2020/11/23', '8.9', '8.9', '8.9', '9.2'],
              ['2020/09/25', '9.0', '8.9', '9.0', '9.2'],
              ['2020/10/13', '9.1', '8.9', '9.0', '9.2'],
              ['2020/10/05', '9.2', '9.2', '9.0', '9.3'],
              ['2020/12/22', '9.3', '9.3', '9.2', '9.2'],
              ['2020/09/01', '9.4', '8.9', '9.5', '9.5'],
              ['2020/12/09', '9.5', '9.2', '9.5', '9.4'],
            ],
          }
        case 'FL20201202065055':
          return {
            keys: ['自身价值', '专家评分', '资料完整'],
            values: [
              ['2020/09/18', '9.3', '9.0', '9.4', '9.3'],
              ['2020/08/24', '8.9', '9.0', '9.3', '8.9'],
              ['2020/11/15', '9.0', '8.9', '9.0', '9.2'],
              ['2020/06/28', '8.6', '8.8', '9.0', '8.7'],
              ['2020/10/17', '9.5', '9.5', '9.2', '9.4'],
              ['2020/12/16', '8.8', '8.8', '9.0', '8.9'],
              ['2020/08/25', '9.2', '8.9', '9.4', '9.0'],
              ['2020/11/08', '9.4', '9.4', '9.0', '9.2'],
              ['2020/10/24', '9.8', '9.5', '9.8', '9.8'],
              ['2020/12/15', '8.7', '8.9', '9.0', '8.7'],
            ],
          }
        case 'FL20201202065054':
          return {
            keys: ['资料完整', '资质价值', '运营情况'],
            values: [
              ['2020/05/20', '8.5', '8.5', '8.6', '8.4'],
              ['2020/05/30', '8.6', '8.9', '8.5', '8.6'],
              ['2020/06/14', '8.7', '9.0', '8.6', '8.7'],
              ['2020/06/19', '8.8', '8.8', '9.0', '9.0'],
              ['2020/07/05', '8.9', '8.9', '9.0', '9.2'],
              ['2020/07/13', '9.0', '9.1', '9.0', '8.9'],
              ['2020/08/25', '9.1', '9.0', '9.5', '8.8'],
              ['2020/08/11', '9.2', '9.5', '9.0', '8.8'],
              ['2020/09/06', '9.3', '8.9', '9.5', '9.2'],
              ['2020/09/28', '9.4', '9.2', '9.5', '9.3'],
            ],
          }
        default:
          return {
            keys: [null, null, null],
            values: [['2020/05/20', '0', '0', '0', '0']],
          }
      }
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
