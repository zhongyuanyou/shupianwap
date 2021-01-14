<template>
  <div class="page-content">
    <!-- START 头部-->
    <Header title="互联网资质" />
    <!-- END   头部-->

    <!-- START Banner-->
    <Banner />
    <!-- END   Banner-->

    <!-- START 表单-->
    <Form />
    <!-- END   表单-->

    <!-- START 热门办理业务-->
    <HotBanLiYeWu class="component-margin1" />
    <!-- END   热门办理业务-->

    <!-- START 规划师-->
    <GuiHuaShiSwipe :planners-common="{ title: '' }" />
    <!-- END   规划师-->

    <!-- START 热门行业推荐-->

    <HotIndustryRecommend />
    <!-- END   热门行业推荐-->

    <!-- START 常见问题-->
    <CommonQuestion class="component-margin2" />
    <!-- END   常见问题-->

    <!-- START 免费咨询-->
    <ConsultTel title="有其他问题？免费咨询" tel="4000-962540" />
    <!-- END   免费咨询-->

    <!-- START 服务流程-->
    <ServiceProcess class="component-margin3" />
    <!-- END   服务流程-->

    <!-- START 咨询规划师-->
    <GuiHuaShiSwipe :planners-common="{ title: '咨询规划师' }" />
    <!-- END   咨询规划师-->

    <!-- START 你可能还需要办理-->
    <PossibleHandle class="component-margin4" />
    <!-- END   你可能还需要办理-->

    <!-- START 有疑问-->
    <ConsultTel title="有疑问？千万企服规划师为您免费解答" tel="4000-962540" />
    <!-- END   有疑问-->

    <!-- START 薯片找人-->
    <ShuPianZhaoRen />
    <!-- END   薯片找人-->

    <!-- START 固定底部-->
    <FixedBottom :planner="pagePlanner" :md="fixedBottomMd" />
    <!-- END   固定底部-->

    <!-- START IM在线咨询-->
    <DggImCompany></DggImCompany>
    <!-- END   IM在线咨询-->
  </div>
</template>

<script>
import Header from '~/components/common/head/header'
import Form from '@/components/spread/internetQualification/Form'
import Banner from '@/components/spread/internetQualification/Banner'
import HotBanLiYeWu from '@/components/spread/internetQualification/HotBanLiYeWu'
import CommonQuestion from '@/components/spread/internetQualification/CommonQuestion'
import ServiceProcess from '@/components/spread/internetQualification/ServiceProcess'
import PossibleHandle from '@/components/spread/internetQualification/PossibleHandle'
import HotIndustryRecommend from '@/components/spread/internetQualification/HotIndustryRecommend'
import GuiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '@/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import DggImCompany from '~/components/spread/DggImCompany'

export default {
  name: 'InternetQualification',
  components: {
    Header,
    Form,
    Banner,
    HotBanLiYeWu,
    GuiHuaShiSwipe,
    CommonQuestion,
    ServiceProcess,
    PossibleHandle,
    ConsultTel,
    ShuPianZhaoRen,
    FixedBottom,
    DggImCompany,
    HotIndustryRecommend,
  },
  data() {
    return {
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
      hotYeWuList: [
        {
          title: '增值电信业务经营许可证（ICP）',
          titleLable:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '线上交易、收费性网站需要办理',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 10000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['注册资金100万', '有安全保障措施'],
          },
        },
      ],
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      fixedBottomMd: {
        telMd: {
          name: '工商聚合页_底部_电话联系',
        },
        imMd: {
          name: '工商聚合页_底部_在线咨询',
          type: '售前',
        },
      },
      guiHuaShiList: [
        {
          id: '7862495547640840192',
          avatarImg: '',
          name: '张毅',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
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

  .component-margin1 {
    margin-top: 30px;
  }
  .component-margin2 {
    margin-top: 64px;
    margin-bottom: 60px;
  }

  .component-margin3 {
    margin-top: 30px;
  }
  .component-margin4 {
    margin-top: 30px;
  }
  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
}
</style>
