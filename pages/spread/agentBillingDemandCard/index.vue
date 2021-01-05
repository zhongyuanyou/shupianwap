<template>
  <div class="page-content">
    <Header title="轻松找服务" :fixed="false" head-class="head-icon" />
    <HeaderBg />
    <Question />
    <FixedBottomBtn />
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
    Header,
    HeaderBg,
    FixedBottomBtn,
    Question,
  },
  data() {
    return {}
  },
  head() {
    return {
      title: '代理记账需求卡',
      script: [
        {
          src: '/js/spread/businessHome-md-config.js',
        },
        {
          src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        },
      ],
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
