<template>
  <div class="page-content">
    <HeaderBg />
    <Question />
    <FixedBottomBtn />
  </div>
</template>

<script>
import HeaderBg from '@/components/spread/agentBillingDemandCard/HeaderBg'
import FixedBottomBtn from '@/components/spread/agentBillingDemandCard/FixedBottomBtn'
import Question from '@/components/spread/agentBillingDemandCard/Question'
export default {
  name: 'Index',
  components: {
    HeaderBg,
    FixedBottomBtn,
    Question,
  },
  data() {
    return {}
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
