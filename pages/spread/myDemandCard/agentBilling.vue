<template>
  <div class="page-content">
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
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
import { mapState } from 'vuex'
import HeaderBg from '@/components/spread/myDemandCard/agentBilling/HeaderBg'
import FixedBottomBtn from '@/components/spread/myDemandCard/agentBilling/FixedBottomBtn'
import Question from '@/components/spread/myDemandCard/agentBilling/Question'
import Header from '~/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'AgentBilling',
  components: {
    HeaderBg,
    FixedBottomBtn,
    Question,
    Header,
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
            '不限',
            '科技信息',
            '广告传媒',
            '金融投资',
            '电子贸易',
            '教育培训',
            '物业地产',
            '经济中介',
            '建筑装饰',
            '家居建材',
            '通讯网络',
            '实业生产',
            '珠宝服饰',
            '文化初版',
            '印刷包装',
            '餐饮美容',
            '咨询服务',
            '食品农业',
            '会务展览',
            '物流供应链',
            '其他',
          ],
          value: '',
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
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    const formData = JSON.parse(sessionStorage.getItem('formData'))
    if (formData) {
      this.questionData[0].value =
        formData.content['注册时间'] || this.questionData[0].value
      this.questionData[1].value =
        formData.content['主营业务'] || this.questionData[1].value
      this.questionData[2].value =
        formData.content['是否支持开票'] || this.questionData[2].value
      this.questionData[3].value =
        formData.content['公司年收入'] || this.questionData[3].value
    }
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
  background-color: #fff;
}
</style>
