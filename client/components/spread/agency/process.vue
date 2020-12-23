<template>
  <div class="process">
    <span class="title">服务流程</span>
    <div class="processsteps">
      <div v-for="(item, index) in steps" :key="index">
        <div>
          <div class="imgbox">
            <img :src="item.stepsimg" alt="" style="" />
          </div>
          <span>{{ item.steps }}</span>
        </div>
        <span class="stepsname">{{ item.stepsname }}</span>
        <span class="englishname">{{ item.englishname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      steps: [
        {
          code: 1,
          steps: '01',
          stepsimg: require('~/assets/spreadImages/agency/busi_img_dljzlc01@1,5x.png'),
          stepsname: '数据比对 核准信息',
          englishname: 'Data comparison',
        },
        {
          code: 2,
          steps: '02',
          stepsimg: require('~/assets/spreadImages/agency/busi_img_dljzlc02@1,5x.png'),
          stepsname: '会计做账 处理税务',
          englishname: 'Accounting',
        },
        {
          code: 3,
          steps: '03',
          stepsimg: require('~/assets/spreadImages/agency/busi_img_dljzlc03@1,5x.png'),
          stepsname: '项目质检 全程审核',
          englishname: 'Quality testing',
        },
        {
          code: 4,
          steps: '04',
          stepsimg: require('~/assets/spreadImages/agency/busi_img_dljzlc04@1,5x.png'),
          stepsname: '整理成册 装订存档',
          englishname: 'Binding and filing',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.process {
  width: 100%;
  padding: 0 40px;
  margin-top: 63px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .processsteps {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 31px;
    > div {
      // flex-basis: 48.2%;
      width: 323px;
      height: 233px;
      border: 1px solid rgba(205, 205, 205, 0.3);
      border-radius: 8px;
      padding: 32px 33px 32px 32px;
      &:nth-child(2) ~ div {
        margin-top: 25px;
      }
      > div {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        .imgbox {
          width: 80px;
          height: 80px;
          border: 1px solid rgba(205, 205, 205, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          > img {
            width: 42px;
            height: 42px;
          }
        }
        > span {
          display: block;
          font-size: 30px;
          font-family: PingFang SC;
          font-weight: 500;
          color: #999999;
          line-height: 30px;
        }
      }
      .stepsname {
        display: block;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 26px;
        margin-top: 19px;
      }
      .englishname {
        display: block;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
        line-height: 21px;
        margin-top: 22px;
      }
    }
  }
}
</style>
