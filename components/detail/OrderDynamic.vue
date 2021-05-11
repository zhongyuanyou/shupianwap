<template>
  <div class="dynamic">
    <h1>动态信息</h1>
    <div class="box">
      <div class="item">
        <p>今日浏览</p>
        <h1>{{ dynamic.visit }}</h1>
      </div>
      <div class="item">
        <p>今日咨询</p>
        <h1>{{ dynamic.consult }}</h1>
      </div>
      <div class="item">
        <p>今日下单</p>
        <h1>{{ dynamic.order }}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamic: {},
      dynamicList: [
        { visit: '254', consult: '45', order: '15' },
        { visit: '452', consult: '58', order: '24' },
        { visit: '325', consult: '132', order: '35' },
        { visit: '645', consult: '193', order: '49' },
        { visit: '401', consult: '184', order: '28' },
        { visit: '258', consult: '105', order: '19' },
        { visit: '502', consult: '144', order: '40' },
        { visit: '149', consult: '39', order: '12' },
        { visit: '365', consult: '88', order: '133' },
        { visit: '345', consult: '71', order: '36' },
        { visit: '246', consult: '50', order: '18' },
        { visit: '227', consult: '54', order: '20' },
        { visit: '156', consult: '40', order: '23' },
        { visit: '334', consult: '100', order: '62' },
        { visit: '487', consult: '123', order: '81' },
        { visit: '416', consult: '109', order: '64' },
        { visit: '625', consult: '245', order: '124' },
        { visit: '689', consult: '210', order: '113' },
        { visit: '610', consult: '189', order: '102' },
        { visit: '771', consult: '248', order: '133' },
        { visit: '752', consult: '261', order: '145' },
        { visit: '735', consult: '252', order: '125' },
        { visit: '748', consult: '213', order: '119' },
        { visit: '886', consult: '275', order: '120' },
        { visit: '812', consult: '300', order: '100' },
        { visit: '168', consult: '65', order: '20' },
        { visit: '387', consult: '140', order: '88' },
        { visit: '472', consult: '122', order: '65' },
        { visit: '553', consult: '138', order: '38' },
        { visit: '570', consult: '177', order: '62' },
        { visit: '369', consult: '115', order: '90' },
        { visit: '905', consult: '374', order: '192' },
        { visit: '910', consult: '365', order: '187' },
        { visit: '943', consult: '420', order: '210' },
        { visit: '867', consult: '310', order: '162' },
        { visit: '756', consult: '294', order: '105' },
        { visit: '637', consult: '183', order: '78' },
        { visit: '581', consult: '332', order: '72' },
        { visit: '468', consult: '146', order: '68' },
        { visit: '842', consult: '266', order: '189' },
      ],
    }
  },
  created() {
    this.dynamic = this.dynamicList[
      Math.floor(Math.random() * this.dynamicList.length)
    ]
  },
}
</script>

<style lang="less" scoped>
.dynamic {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 48px 0;
  > h1 {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  > .box {
    display: flex;
    > .item {
      margin-top: 40px;
      width: 33%;
      padding: 0 40px;
      > p {
        font-size: 26px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
        margin-bottom: 28px;
      }
      > h1 {
        font-size: 44px;
        font-family: Bebas;
        color: #222222;
        line-height: 44px;
      }
    }
  }
}
</style>
