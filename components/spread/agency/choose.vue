<template>
  <div class="choose">
    <span class="title"> 代理记账服务优势 </span>
    <div class="contrast">
      <div>自己记账</div>
      <div>专业代理</div>
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/5ldzblot0280000.png"
        alt=""
      />
    </div>
    <div class="content">
      <div class="contentleft">
        <ul>
          <li v-for="(item, index) in oneself" :key="index">
            <span>{{ item }}</span
            ><img
              src="https://cdn.shupian.cn/sp-pt/wap/images/97lpow21c180000.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div class="line"></div>
      <div class="contentright">
        <ul>
          <li v-for="(item, index) in agent" :key="index">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/4v599nr8p8c0000.png"
              alt=""
            /><span>{{ item }}</span>
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
        '配置专职多人，成本高',
        '人为处理容易出错',
        ' 政策信息了解延误容易失去机会',
        '财务税务问题可能影响经营',
      ],
      agent: [
        '成本低，提供增值服务',
        '服务流程透明',
        '政策信息及时更新，不会错失优惠政策',
        '财税风险预警',
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
    display: flex;
    position: relative;
    margin-top: 31px;
    > div {
      flex: 1;
      height: 80px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      line-height: 80px;
      text-align: center;
      &:first-child {
        background: #cccccc;
        border-radius: 8px 0px 0px 8px;
        color: #555555;
      }
      &:nth-child(2) {
        background: #dbe3fd;
        border-radius: 0px 8px 8px 0px;
        color: #4974f5;
      }
    }
    > img {
      position: absolute;
      width: 80px;
      height: 80px;
      left: 50%;
      margin-left: -40px;
    }
  }
  .content {
    display: flex;
    height: 341px;
    background: #f8f8f8;
    border-radius: 8px;
    .line {
      width: 4px;
      height: 341px;
      background: #ffffff;
    }
    .contentleft {
      flex-basis: 49.7%;
      > ul {
        padding: 39px 16px 0px 34px;
        > li {
          display: flex;
          justify-content: flex-end;
          &:not(:first-child) {
            margin-top: 30px;
          }
          > span {
            display: block;
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #555555;
            line-height: 34px;
            text-align: right;
            margin-right: 12px;
            margin-top: -6px;
          }
          > img {
            width: 10px;
            height: 10px;
            margin-top: 8px;
          }
        }
      }
    }
    .contentright {
      flex-basis: 49.7%;
      > ul {
        padding: 39px 33px 0px 16px;
        > li {
          &:not(:first-child) {
            margin-top: 30px;
          }
          display: flex;
          > img {
            width: 10px;
            height: 10px;
            margin-top: 8px;
          }
          > span {
            font-size: 26px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #4974f5;
            line-height: 34px;
            display: block;
            margin-left: 13px;
            margin-top: -6px;
          }
        }
      }
    }
  }
}
</style>
