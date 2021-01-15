<template>
  <div class="center">
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
    <!--  banner  -->
    <banner></banner>
    <!--  banner  -->
    <!--  表单  -->
    <my-form></my-form>
    <!--  表单  -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Banner from '~/components/spread/myDemandCard/companyTransaction/Banner'
import MyForm from '~/components/spread/myDemandCard/companyTransaction/MyForm'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'CompanyTransaction',
  components: { Banner, MyForm, Header },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
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
      title: '公司交易',
    }
  },
}
</script>

<style scoped>
.center {
  width: 750px;
  margin: 0 auto;
  background-color: #fff;
}
</style>
