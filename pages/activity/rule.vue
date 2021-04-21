<template>
  <div class="rule">
    <Head ref="head" title="新品首发">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="uPGoBack"
        ></my-icon>
      </template>
    </Head>
    <p class="title">一、参与条件</p>
    <p class="desc">用户完成薯片实名认证，否则无法享受活动优</p>
    <p class="title">二、活动说明</p>
    <p class="desc">
      1.
      薯片千万补贴活动是在商品成本价的基础上进行官方补贴，为薯片消费者提供更优质，更实惠的商品。<br />
      2. 产品或服务是由平台或商家提供。<br />
      3.您理解并同意，为让更多消费者获益，说点保留限制单个产品的总出售数量、限制单个订单的产品购买数量、
      限制同一用户对同类产品的购买数量等，以及监控、限制异常订单、异常用户的权利。“同一用户”及“异常订单”、“异常用户”均为薯片的判定为准。<br />
      4.同一用户在单次活动中可购买的活动商品数量有限制，以实际可下单数量为准。同一用户，是指薯片帐户唯一认证账号、联系方式、IP地址等与用户身份相
      关的信息，其中任意一项或数项存在相同、相似、通过特定标记形成批量信息、或其他非真实有效等情形的，均将被认定为同一用户，按活动规则中的同一用户处理。
      <br />
      5.
      禁止使用任何插件、外挂等不正当手段参与活动。用户下单后，平台将会对订单进行审核，如果用户存在违法违规行为，或者通过插件、外挂等非正常手段参与活动
      ，平台将取消用户的活动资格、关闭相关交易订单、限制账户使用功能、收回补贴、奖励（包括已消费金额）等利益，同时依照相关规则进行处理。<br />
      6.如出现不可抗力或情势变更的情况（包括但不限与重大灾害事件、活动受政府机关指令需要停止举报或调整的、活动遭受严重网络攻击或因系统故障需要暂停举办的），则平台可依相关法律法规的规定主张免责。
    </p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Head from '@/components/common/head/header'
export default {
  components: {
    Head,
  },
  ...mapState({
    isInApp: (state) => state.app.isInApp,
  }),
  methods: {
    uPGoBack() {
      if (this.isInApp) {
        this.$appFn.dggCloseWebView((res) => {
          if (!res || res.code !== 200) {
            this.$xToast.show({
              message: '返回失败',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        return
      }

      // 在浏览器里 返回, 若没返回记录了，就跳转到首页
      if (window && window.history && window.history.length <= 1) {
        this.$router.replace('/')
        return
      }
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.rule {
  padding: 0 32px;
  padding-bottom: 20px;
}
.title {
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
  line-height: 40px;
  margin-top: 40px;
}
.desc {
  font-size: 26px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #555555;
  margin-top: 22px;
  line-height: 42px;
}
</style>
