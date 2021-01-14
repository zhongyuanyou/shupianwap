<template>
  <div class="audit-company-name">
    <!-- s 头部导航 -->
    <Header v-show="!isInApp" :title="title">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- e 头部导航 -->
    <!-- s banner -->
    <Banner :imglist="imgList"></Banner>
    <!-- e banner -->
    <!-- s 表单 -->
    <AuditCompanyNameFrom :city="cityList" />
    <!-- e 表单 -->

    <!-- s 公司起名禁忌列表 -->
    <AuditCompanyNameTaboo :audittaboo="auditTaboo" />
    <!-- e 公司起名禁忌列表 -->
    <!-- s 规划师 -->
    <GuiHuaShiSwipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
      md-type="new"
    />
    <!-- e 规划师 -->
    <DggImCompany />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import GuiHuaShiSwipe from '@/components/spread/auditCompanyName/GuiHuaShiSwipe'
import AuditCompanyNameFrom from '@/components/spread/auditCompanyName/AuditCompanyNameFrom.vue'
import Header from '@/components/common/head/header'
import AuditCompanyNameTaboo from '@/components/spread/auditCompanyName/AuditCompanyNameTaboo.vue'
import DggImCompany from '@/components/spread/DggImCompany'
import Banner from '@/components/spread/agency/banner'
export default {
  name: 'Index',
  components: {
    DggImCompany,
    Header,
    AuditCompanyNameFrom,
    AuditCompanyNameTaboo,
    GuiHuaShiSwipe,
    Banner,
  },
  props: {},
  data() {
    return {
      title: '免费核名',
      plannersData: [
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
        {
          id: '7862495547640840193',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      plannersCommon: {
        title: '咨询规划师',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
      auditTaboo: {
        title: '公司起名，这些禁忌不能犯',
        taboo: [
          {
            id: 1,
            img: 'https://cdn.shupian.cn/sp-pt/wap/4o0wkcazz0o0000.png',
            details: '与其他公司重名',
          },
          {
            id: 2,
            img: 'https://cdn.shupian.cn/sp-pt/wap/3wj2bt56z380000.png',
            details: '触犯驰名商标',
          },
          {
            id: 3,
            img: 'https://cdn.shupian.cn/sp-pt/wap/ektzb2275kg0000.png',
            details: '与知名公司混淆',
          },
          {
            id: 4,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8sg9dbf7ehw0000.png',
            details: '使用地区名及简称',
          },
          {
            id: 5,
            img: 'https://cdn.shupian.cn/sp-pt/wap/74lv2m747zw0000.png',
            details: '使用繁体/数字/英文',
          },
          {
            id: 6,
            img: 'https://cdn.shupian.cn/sp-pt/wap/8swye3g0wmc0000.png',
            details: '使用行业通用词',
          },
          {
            id: 7,
            img: 'https://cdn.shupian.cn/sp-pt/wap/86hkftm3wqs0000.png',
            details: '使用名人字号',
          },
          {
            id: 8,
            img: 'https://cdn.shupian.cn/sp-pt/wap/csc4z9bnyiw000.png',
            details: '带有宗教色彩',
          },
        ],
      },
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/591qqekl2f40000.png',
        },
      ],
      cityList: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {},
  created() {},
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费核名',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage() // 设置公共属性
  },
  methods: {
    back() {
      // 返回上一页
      console.log(window.history.length)
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      if (window.history.length <= 1) {
        this.$router.replace('/spread')
        return false
      } else {
        this.$router.back()
      }
    },
  },
  head() {
    return {
      title: '免费核名',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.audit-company-name {
  width: 750px;
  margin: 0 auto;
  position: relative;
  background-color: #ffffff;
  /deep/.fixed-head {
    .my-head {
      width: 750px;
      left: 50%;
      margin-left: -375px;
      .slot-left {
        left: 32px;
      }
    }
  }
}
</style>
