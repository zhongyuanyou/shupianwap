<template>
  <div class="laowu">
    <!--头部Header-->
    <MyHeader
      ref="header"
      title="劳务资质"
      :fixed="false"
      head-class="head-icon"
    >
      <template v-slot:right>
        <span class="laowu-header" @click="choiceCity">
          <span class="laowu-header-text">{{ currentCity }}</span>
          <my-icon name="sear_ic_open" size="0.18rem" color="#cccccc"></my-icon>
        </span>
      </template>
    </MyHeader>
    <!--头部Header-->
    <!--导航部-金刚区-->
    <juhe-nav-bar class="laowu-navbtn"></juhe-nav-bar>
    <!--导航部-金刚区-->
    <!--轮播Banner-->
    <juhe-banner class="laowu-banner" />
    <!--轮播Banner-->
    <!--表单-->
    <juhe-form class="laowu-form" :data="formData" />
    <!--表单-->
    <!--推荐公司-->
    <juheProduct :data="productData"></juheProduct>
    <!--推荐公司-->
    <!--固定底部-->
    <FixedBottom :planner="bottomData" />
    <!--固定底部-->
    <!-- IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- IM在线咨询-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MyHeader from '~/components/common/head/header'
import juheNavBar from '~/components/spread/transaction/common/NavBar'
import juheBanner from '~/components/spread/transaction/common/Banner'
import juheForm from '~/components/spread/transaction/common/Form'
import juheProduct from '~/components/spread/transaction/common/ProductList'
import DggImCompany from '~/components/spread/DggImCompany'
import FixedBottom from '~/components/spread/common/FixedBottom'
export default {
  name: 'Index',
  components: {
    MyHeader,
    juheNavBar,
    juheBanner,
    juheForm,
    juheProduct,
    DggImCompany,
    FixedBottom,
  },
  data() {
    return {
      formData: {
        title: '只需5秒 一键为您适配公司',
        // 我需要公司类型下拉
        needList: ['有限责任公司', '股份有限公司', '无限公司'],
        buttonName: '立即获取',
        subInfo: ['价格透明', '信息安全', '官方保障'],
      },
      bottomData: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      productData: {
        tabBtnList: [
          { name: '推荐资质', type: 0, goodList: [] },
          { name: '热卖资质', type: 9, goodList: [] },
          { name: '急售', type: 1, goodList: [] },
        ],
        marks: ['特级', '一级', '二级', '三级'],
        planner: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
          imgSrc: '',
        },
      },
    }
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

<style scoped lang="less">
.laowu {
  width: @spread-page-width;
  margin: 0 auto;
  /deep/ .my-head {
    box-shadow: none;
  }
  // 自定义头部组件右侧样式
  &-header {
    display: flex;
    align-items: center;
    margin-right: 40px;
    &-text {
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }
  &-navbtn {
    margin-top: 24px;
  }
  &-banner {
    margin-top: 64px;
  }
  &-form {
    margin-top: 64px;
  }
}
</style>
