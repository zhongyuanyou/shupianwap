<template>
  <div class="choose">
    <span class="title"> 银行服务专业办理平台 </span>
    <div class="contrast">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/any2220aso8000.png"
        alt=""
      />
    </div>
    <div class="content">
      <div class="contentleft">
        <ul>
          <li v-for="(item, index) in oneself" :key="index">
            <span>{{ item }}</span>
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/97lpow21c180000.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div class="contentright">
        <ul>
          <li v-for="(item, index) in agent" :key="index">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/4v599nr8p8c0000.png"
              alt=""
            />
            <span>{{ item }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oneself: [
        '　 　低价吸引 实则有隐形收费',
        '　　工作人员少无品牌可言',
        '服务过程不可控',
        '收费后容易跑路',
      ],
      agent: [
        '价格透明　　　　　无任何隐形收费',
        '1V1专业顾问，提供 免费增值咨询服务',
        '业务细节平台可查，流程透明',
        '售后无忧，急速退款',
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.choose {
  width: 100%;
  padding: 0 40px;
  margin-top: 63px;
  margin-bottom: 33px;
  .title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 39px;
  }
  .contrast {
    padding: 0 40px;
    > img {
      display: block;
      width: 570px;
      height: 88px;
      margin: 0 auto;
      margin-top: 31px;
    }
  }
  .content {
    display: flex;
    height: 377px;
    background: #ffffff;
    border-radius: 8px;
    margin-top: 24px;
    display: flex;
    justify-content: space-between;
    > div {
      width: 327px;
      background: #f8f8f8;
      border-radius: 8px;
    }
    .contentleft {
      > ul {
        width: 100%;
        height: 100%;
        padding: 40px 32px 40px 84px;
        > li {
          display: flex;
          justify-content: flex-end;
          &:not(:first-child) {
            margin-top: 23px;
          }
          &:last-child {
            margin-top: 58px;
          }
          > span {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 25px;
            display: block;
            text-align: right;
            margin-right: 16px;
            line-height: 34px;
            margin-top: -4px;
            flex-shrink: 1;
          }
          > img {
            width: 12px;
            height: 13px;
            margin-top: 5px;
            flex-shrink: 0;
          }
        }
      }
    }
    .contentright {
      > ul {
        width: 100%;
        height: 100%;
        padding: 40px 32px 40px 32px;
        > li {
          display: flex;
          &:not(:first-child) {
            margin-top: 23px;
          }
          > span {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 25px;
            display: block;
            line-height: 34px;
            margin-top: -4px;
            margin-left: 17px;
          }
          > img {
            flex-shrink: 0;
            width: 12px;
            height: 14px;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>
