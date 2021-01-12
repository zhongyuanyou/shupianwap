<template>
  <div class="page-content">
    <Header title="互联网资质" />
    <Banner />
    <Form />
    <HotBanLiYeWu />
    <GuiHuaShiSwipe title="" />
    <Service
      :servicelist="servicelist"
      :lables="lables"
      :label-style="labelStyle"
    >
    </Service>
  </div>
</template>

<script>
import Service from '../../../components/spread/common/ServiceIntroduced'
import Header from '~/components/common/head/header'
import Form from '@/components/spread/internetQualification/Form'
import Banner from '@/components/spread/internetQualification/Banner'
import HotBanLiYeWu from '@/components/spread/internetQualification/HotBanLiYeWu'
import GuiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'

export default {
  name: 'InternetQualification',
  components: {
    Header,
    Form,
    Banner,
    HotBanLiYeWu,
    GuiHuaShiSwipe,
    Service,
  },
  data() {
    return {
      // 服务列表
      servicelist: [
        {
          title: '增值电信业务经营许可证（ICP）',
          titlelable: '',
          titleContent: '线上交易、收费性网站需要办理',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 10000,
          bgimg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        },
      ],
      // 服务列表标签
      lables: [['注册资金100万', '有安全保障措施']],
      // 服务列表标签样式+背景图
      labelStyle: {
        icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
        style: 'row',
        title: '热门行业推荐',
      },
      data: [
        {
          title: '基本开户',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          colLabels: [
            {
              icon: '',
              title: '',
              content: [],
            },
          ],
          rowLabels: [
            {
              icon: '',
              text: '',
            },
          ],
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

  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }

  /deep/ .sp-overlay {
    width: @spread-page-width;
    left: auto;
    right: auto;
  }
}
</style>
