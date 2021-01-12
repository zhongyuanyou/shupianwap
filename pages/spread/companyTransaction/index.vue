<template>
  <div class="page-content">
    <!-- START 头部Header-->
    <MyHeader title="公司交易" :fixed="true" head-class="head-icon">
      <template v-slot:right>
        <span class="my-customize-header" @click="choiceCity">
          <span class="my-customize-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </MyHeader>
    <!-- END   头部Header-->

    <NavBtns />

    <Banner />

    <Form />

    <HotIndustry />

    <WithAssetsType />

    <RecommendCompany />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '@/components/common/head/header'
import NavBtns from '@/components/spread/companyTransaction/NavBtns'
import Banner from '@/components/spread/companyTransaction/Banner'
import Form from '@/components/spread/companyTransaction/Form'
import HotIndustry from '@/components/spread/companyTransaction/HotIndustry'
import WithAssetsType from '@/components/spread/companyTransaction/WithAssetsType'
import RecommendCompany from '@/components/spread/companyTransaction/RecommendCompany'
export default {
  name: 'Index',
  components: {
    MyHeader,
    NavBtns,
    Banner,
    Form,
    HotIndustry,
    WithAssetsType,
    RecommendCompany,
  },
  computed: {
    // 将接受的state混合进组件局部计算属性
    // 监听接受的state值
    ...mapState({
      currentCity: (state) => state.city.currentCity.name || '成都',
    }),
  },
  methods: {
    // 选择城市
    choiceCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
  },
}
</script>

<style lang="less" scoped>
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
  // 自定义头部组件右侧样式
  .my-customize-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    .my-customize-header-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }

  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}
</style>
