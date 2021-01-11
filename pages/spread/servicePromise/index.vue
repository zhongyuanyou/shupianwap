<template>
  <div class="page-content">
    <div v-if="hideHeader !== 'true'" class="header">
      <sp-top-nav-bar
        title="服务承诺"
        left-arrow
        ellipsis
        @on-click-left="onClickLeft"
      />
    </div>
    <div class="content">
      <div class="content-all">
        <div class="content-all-items">
          <div
            v-for="(item, index) in data"
            :key="item.title"
            class="content-item"
            :style="{
              borderBottom:
                index == data.length - 1 ? 'none' : '1px solid #f4f4f4',
            }"
          >
            <div class="content-item-left-img">
              <img class="content-item-img" :src="item.img" />
            </div>
            <div>
              <div class="content-item-title">{{ item.title }}</div>
              <div class="context-item-text">{{ item.text }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-bg"></div>
    </div>
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'

export default {
  name: 'Index',
  components: {
    [TopNavBar.name]: TopNavBar,
  },
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/2ghq925qumv4000.png',
          title: '专属服务',
          text:
            '每个订单有顾问专人负责，让客户全程无忧，保证7×24小时的专业客户服务，让用户在这里享受到更愉快的交易体验，安全、高效、专业、贴心的服务质量。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ezlqqoptops0000.png',
          title: '极速响应',
          text: '一站式全方位服务，第一时间响应客户需求。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/10kp9fkwckhc000.png',
          title: '无理由退款',
          text:
            '您在我们网站购买产品并付款后未服务，30天您可以向客服申请退款，平台将全额退款给您。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fpeuc9bgvwg0000.png',
          title: '信息安全',
          text:
            '薯片平台将运用各种安全技术和程序建立完善的管理制度加密保障您的信息安全，以免遭受未经授权的访问、使用或披露。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3sdp1fzbfrc0000.png',
          title: '价格合理',
          text: '无隐形消费，价格合理透明，线上随时查业务进度。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/afgity7a9nc0000.png',
          title: '资金保障',
          text:
            '为保障用户的资金安全，薯片内部制定了严格的资金管理流程和完善的系统，进行监督监控，降低操作风险。在交易过程中，资金全程在我平台担保，确保资金的安全问题，交易完成确认一切妥当无误之后放款于卖家。',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/50qymkl81pg0000.png',
          title: '售后无忧',
          text:
            '服务交付结果有任何不满意的地方，请联系客服反映您的诉求，或拨打24小时投诉热线。平台24小时投诉热线：400-1616902，100%受理，100%解决。',
        },
      ],
    }
  },
  computed: {
    hideHeader() {
      return this.$route.query.hideHeader
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  .header {
    height: 88px;
    /deep/ .sp-top-nav-bar {
      width: @spread-page-width;
      position: fixed;
      height: 88px;
    }
  }

  .content {
    position: relative;
  }
  .content-bg {
    width: 100%;
    height: 226px;
    background-color: #f8f8f8;
  }

  .content-all {
    background-color: #f8f8f8;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/3w2e4zavu8e0000.png');
    background-repeat: no-repeat;
    background-size: 100% 300px;
  }
  .content-all-items {
    width: calc(100% - 80px);
    border-radius: 8px;
    box-shadow: 0px 0px 8px rgba(87, 130, 230, 0.08);
    margin: 0 auto;
    background: #ffffff;
    position: relative;
    top: 186px;
    .content-item {
      margin: 0 40px;
      padding: 48px 0;
      border-bottom: 2px solid #f4f4f4;
      display: flex;
      align-items: flex-start;
      .content-item-left-img {
        width: 88px;
        height: 88px;
        margin-right: 32px;
      }
      .content-item-img {
        width: 88px;
        height: 88px;
      }
      .content-item-title {
        font-size: 32px;
        line-height: 32px;
        font-weight: bold;
        color: #222222;
        margin-bottom: 13px;
      }
      .context-item-text {
        font-size: 26px;
        font-weight: 400;
        color: #555555;
        line-height: 40px;
      }
    }
  }
}
</style>
