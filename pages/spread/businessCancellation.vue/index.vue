<template>
  <div class="page-content">
    <!-- 轮播图区域 -->
    <My-swipe />
    <!-- 预约区域 -->
    <Appointment />
    <!-- 影响 -->
    <Influence />
    <!-- 业务介绍 -->
    <Introduce />
    <!-- 注销资料 -->
    <Material />
    <!-- 服务流程 -->
    <Process />
    <!-- 咨询规划师 -->
    <Consult />
    <!-- 还需办理 -->
    <You-need />
    <!-- 薯片找人 -->
    <Shu-pian />
    <!-- 固定底部-->
    <Fixed-bottom :planner="planner" md-type="new" :md="fixedMd" />
    <Dgg-im-company />
  </div>
</template>

<script>
import MySwipe from '@/components/spread/businessCancellation/MySwipe'
import Appointment from '@/components/spread/businessCancellation/Appointment'
import Influence from '@/components/spread/businessCancellation/Influence'
import Introduce from '@/components/spread/businessCancellation/Introduce'
import Material from '@/components/spread/businessCancellation/Material'
import Process from '@/components/spread/businessCancellation/Process'
import Consult from '@/components/spread/businessCancellation/Consult'
import YouNeed from '@/components/spread/businessCancellation/YouNeed'
import ShuPian from '@/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '@/components/spread/common/FixedBottom'
import DggImCompany from '@/components/spread/DggImCompany'
export default {
  components: {
    MySwipe,
    Appointment,
    Influence,
    Introduce,
    Material,
    Process,
    Consult,
    YouNeed,
    ShuPian,
    FixedBottom,
    DggImCompany,
  },
  props: {},
  data() {
    return {
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      fixedMd: {
        telMd: {
          name: '工商注销_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '工商注销_钻石展位_在线咨询',
          type: '售前',
        },
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端工商注销推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  methods: {},
  head() {
    return {
      title: '工商注销',
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
.page-content {
  width: @spread-page-width;
  margin: 0 auto;
  font-family: PingFang SC;
}
/deep/ .sp-bottombar-info__sign {
  display: flex;
  align-items: center;
}
/deep/ .cousulttel-content-left-number {
  margin-top: -7px;
}
/deep/ .cousulttel-content-left-text {
  margin-right: 16px;
}
</style>
