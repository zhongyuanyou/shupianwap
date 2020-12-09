<template>
  <div class="protocol">
    <div class="top">
      <sp-top-nav-bar ellipsis title="薯片用户服务协议">
        <template #left>
          <sp-icon name="arrow-left" size="20" @click="onClickLeft" />
          <sp-icon name="cross" size="20" @click="onClickLeft" />
        </template>
      </sp-top-nav-bar>
    </div>
    <div class="content">
      <h3 class="title">一、适用范围</h3>
      <div class="details">
        本服务协议适用于要啦提供的各项服务，您访问要啦平台、使用要啦提供的服务包括但不限于我们提供的网站、SDK、API、组件、工具以及不断创新研发的产品和服务，均适用于本服务协议。
        需要说明的是，本服务协议不适用于展示在、链接到或再封装我们服务的那些适用于其他隐私权政策、由第三方提供的服务。
        如果您允许我们与第三方网站或服务共享的信息，则同时需受第三方网站服务
      </div>
      <h3 class="title">二、我们如何收集和使用信息</h3>
      <div class="details">
        我们收集信息是为了向您提供更优质、更个性化的服务，我们收集信息的方式如下：
        1.在您访问和浏览我要啦统计网站时收集信息 当您访问我们
        网站时，和大多数网站一样，我们会： 使用Log
        Files、WebBeacons、JS页面标记等软件技术获取网站数据；
        自动收集某些信息并存储在日志文件和数据仓库中。这些信息包括：访问终端IP地址、访问地址路径、访问来源、User
        Agent、其他定制信息等； 使用IP地址、IP+User Agent、Cookie、User
        ID等技术进行网站用户的身份识别。 2.在您使用要啦服务时收集信息
        2.1当您注册我要啦统计服务的时候，我们会要求您提供您的个人信息，包括手机号码、电子邮件地址别和某些特性，推广渠道信息等。
        我们使用这些信息是用于： 向您发送注册确认； 了解和管理账户；
        回应您的客户服务要求； 了解您的企业和产品需求以确定适用的产品和服务；
        基于市场营销和促销的目的联系您
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, TopNavBar, NavSearch, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Protocol',
  components: {
    [Toast.name]: Toast,
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
  },
  methods: {
    onClickLeft() {
      // Toast('按钮')
      this.$router.push({ name: 'login-register' })
    },
  },
}
</script>

<style lang="less" scoped>
.protocol {
  .content {
    color: #555555;
    padding: 40px 47px 0 41px;

    .details {
      font-size: 32px;
      line-height: 42px;
      text-indent: 2em;
    }
    .title {
      padding: 40px 0 24px 0;
      font-size: 30px;
      color: #222222;
    }
  }
}
</style>
