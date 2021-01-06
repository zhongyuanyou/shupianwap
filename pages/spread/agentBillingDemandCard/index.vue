<template>
  <div class="page-content">
    <!--    <Header title="轻松找服务" :fixed="false" head-class="head-icon" />-->

    <!-- START banner-->
    <HeaderBg />
    <!-- END banner-->

    <!-- START 问题-->
    <Question />
    <!-- END 问题-->

    <!-- START 固定按钮-->
    <FixedBottomBtn />
    <!-- END 固定按钮-->
  </div>
</template>

<script>
import HeaderBg from '@/components/spread/agentBillingDemandCard/HeaderBg'
import FixedBottomBtn from '@/components/spread/agentBillingDemandCard/FixedBottomBtn'
import Question from '@/components/spread/agentBillingDemandCard/Question'
import Header from '~/components/common/head/header'
export default {
  name: 'Index',
  components: {
    HeaderBg,
    FixedBottomBtn,
    Question,
  },
  data() {
    return {
      questionData: [
        {
          title: '您的公司注册多久了？',
          type: 'tab',
          tabWidthClass: 'tab-width-class1',
          options: ['还未注册', '1个月', '3个月', '半年以上'],
          value: '还未注册',
          noMarginRight: ['半年以上'],
        },
        {
          title: '您公司的主营业务是什么？',
          type: 'dropdown',
          options: [
            '主营业务1',
            '主营业务2',
            '主营业务3',
            '主营业务4',
            '主营业务5',
          ],
          value: '主营业务1',
        },
        {
          title: '您的公司是否支持开发票？',
          type: 'tab',
          tabWidthClass: 'tab-width-class2',
          options: ['是', '否'],
          value: '是',
        },
        {
          title: '您的公司年收入大概是多少？',
          type: 'tab',
          tabWidthClass: 'tab-width-class2',
          options: ['20-100万', '100-500万', '500-1000万', '1000-2000万'],
          value: '20-100万',
          noMarginRight: ['500-1000万'],
        },
      ],
    }
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费帮找页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  head() {
    return {
      title: '代理记账需求卡',
    }
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
}
</style>
