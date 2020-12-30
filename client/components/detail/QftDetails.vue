<template>
  <div class="qftDetails">
    <h1 class="qftDetails-title">资质信息</h1>
    <table class="qftDetails-table">
      <thead>
        <tr>
          <td>资质分类</td>
          <td>资质专业</td>
          <td>资质等级</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(list, index) in qftDetailsList" :key="index">
          <td>{{ list[0] }}</td>
          <td>{{ list[1] }}</td>
          <td>{{ list[2] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'QftDetails',
  props: {
    qftDetailsData: {
      type: Object,
      default: () => {
        return {
          fieldValueCn: '',
          fieldValue: '',
          fieldValueList: [],
        }
      },
    },
  },
  computed: {
    qftDetailsList() {
      let qftData = ''
      if (this.qftDetailsData.fieldValueCn !== '') {
        qftData = this.qftDetailsData.fieldValueCn
      } else {
        qftData = this.qftDetailsData.fieldValue
      }
      const qftDataList = qftData.split(';')
      const qftDataArr = qftDataList.map((list) => list.split(','))
      return qftDataArr
    },
  },
}
</script>

<style scoped lang="less">
.qftDetails {
  background-color: #fff;
  padding: 47px 40px 40px 40px;
  margin-bottom: 24px;
  &-title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 47px;
  }
  &-table {
    width: 100%;
    thead {
      td {
        background: #f8f8f8;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
    td {
      height: 72px;
      line-height: 70px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      border: 1px solid rgba(205, 205, 205, 0.4);
      text-align: center;
      border-collapse: collapse;
    }
  }
}
</style>
