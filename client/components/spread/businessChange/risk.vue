<template>
  <div class="risk">
    <span class="risk-title"> 公司不变更，风险有多大？ </span>
    <div class="risk-categories">
      <div v-for="(item, index) in riskList" :key="index">
        <div class="img-box">
          <img :src="item.img" alt="" />
        </div>
        <div class="content">
          <span>{{ item.title }}</span>
          <span> {{ item.content }}</span>
        </div>
      </div>
    </div>
    <div class="consulting-box">
      <span>我面临这些问题，我要解决</span>
      <a
        v-md-map
        v-md:WebClick
        v-md:p_IMClick
        href="JavaScript:;"
        data-im_type="售前"
        data-name="工商不变更风险_立即咨询"
        @click="call()"
        >立即咨询</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: '',
      telephone: '',
      riskList: [
        {
          code: 1,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8jxa0wdy8cg0000.png',
          title: '执照吊销',
          content: '工商变更逾期不登记，情节严重，吊销营业执照',
        },
        {
          code: 2,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3jah4ba5qmu0000.png',
          title: '高额罚款',
          content: '工商变更逾期不登记，将被处以1万～10万元罚款',
        },
        {
          code: 3,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/eemwcfmg1940000.png',
          title: '败诉风险',
          content:
            '注册及经营地址逾期不变更，可能导致接收文书地址错误，错过重要信息',
        },
        {
          code: 4,
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/c44jnqcjj2w0000.png',
          title: '收债困难',
          content:
            '注册及经营地址不一致时可能导致债务履行困难，欠款及活动款无法收回',
        },
      ],
    }
  },
  created() {
    this.telephone = this.$parent.planner.telephone
  },
  methods: {
    call() {
      window.location.href = `tel:${this.telephone}`
    },
  },
}
</script>

<style lang="less" scoped>
.risk {
  width: 100%;
  margin-top: 32px;
  padding: 31px 40px 32px;
  background: #ffffff;
  .risk-title {
    display: block;
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
  }
  .risk-categories {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    margin-top: 32px;
    > div {
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.3);
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      width: 329px;
      padding: 36px 20px 36px 20px;
      display: flex;
      align-items: flex-start;
      &:nth-child(2) ~ div {
        margin-top: 16px;
      }
      &:nth-child(2) {
        .img-box {
          padding: 1px 4px;
          > img {
            width: 40px;
            height: 46px;
          }
        }
      }
      .img-box {
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        > img {
          width: 48px;
        }
      }
      .content {
        display: flex;
        flex-direction: column;
        margin-left: 17px;
        > span {
          display: block;
        }
        > span:first-child {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 27px;
        }
        > span:last-child {
          margin-top: 14px;
          font-size: 20px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 28px;
        }
      }
    }
  }
  .consulting-box {
    height: 80px;
    display: flex;
    justify-content: space-between;
    background: #ffffff;
    border: 2px solid #4974f5;
    border-radius: 8px;
    margin-top: 40px;
    align-items: center;
    > span {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #666666;
      display: block;
      margin-left: 33px;
    }
    > a {
      width: 204px;
      height: 79px;
      background: #4974f5;
      border-radius: 0px 6px 8px 0px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 80px;
      text-align: center;
    }
  }
}
</style>
