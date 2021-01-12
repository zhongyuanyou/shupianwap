<template>
  <div class="bankService">
    <!-- 头部导航 -->
    <Header :title="title" />
    <!-- banner图 -->
    <Banner :imglist="imgList" />
    <!-- 表单 -->
    <From />
    <!-- 服务列表 -->
    <Service
      :servicelist="servicelist"
      :lables="lables"
      :label-style="labelStyle"
    >
    </Service>
    <!-- 为什么选择薯片平台 -->
    <Choose />
    <!-- 咨询规划师  -->
    <Planner :planners-data="plannersList" :planners-common="plannersTitle" />
    <!-- 您可能还需要办理 -->
    <Need />
    <!-- 底部导航 -->
    <Bottom :planner="planner" />
    <!-- im对话框 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>

<script>
import Header from '../../../components/common/head/header'
import Banner from '../../../components/spread/bankService/bannerSwipe'
import From from '../../../components/spread/bankService/form'
import Service from '../../../components/spread/common/ServiceIntroduced'
import Choose from '../../../components/spread/bankService/choose'
import Planner from '../../../components/spread/common/GuiHuaShiSwipe'
import Need from '../../../components/spread/bankService/mayNeed'
import Bottom from '../../../components/spread/common/FixedBottom'
import dggImCompany from '../../../components/spread/DggImCompany'
export default {
  components: {
    Header,
    Banner,
    From,
    Service,
    Choose,
    Planner,
    Need,
    Bottom,
    dggImCompany,
  },
  data() {
    return {
      title: '银行服务',
      // banner图列表
      imgList: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/3g7zzv8ntk80000.jpg',
        },
        {
          code: 2,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/1o0vmlzd6ef4000.jpg',
        },
      ],
      // 服务列表
      servicelist: [
        {
          title: '基本开户',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgimg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        },
        {
          title: '一般户开户',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '632',
          defaultSales: '421',
          actualSales: '416',
          price: 600,
          bgimg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
          planner: {
            id: '7862495547640840192',
            name: '李劲',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
        },
        {
          title: '银行销户',
          titlelable:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgimg: 'https://cdn.shupian.cn/sp-pt/wap/images/62j4vzw5ivk0000.png',
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
      lables: [
        {
          title: '注意事项',
          content: [
            '要求法人到场面核，需要全体股东身份证原件',
            '合作银行不同，所需资料及流程不同',
          ],
        },
        {
          title: '所需资料',
          content: ['营业执照正副本原件，三章', '法人、经办人身份证原件'],
        },
        {
          title: '所需资料',
          content: [
            '由法人代表及直接出具销户报告',
            '各种未使用的重要空白票据及结算凭证',
          ],
        },
      ],
      // 服务列表标签样式+背景图
      labelStyle: {
        icon: 'https://cdn.shupian.cn/sp-pt/wap/images/f48bh6kpgm80000.png',
        style: 'col',
        title: '银行服务介绍',
      },
      // 规划师title
      plannersTitle: {
        title: '咨询规划师',
        imName: '银行服务咨询规划师_在线咨询',
        telName: '银行服务咨询规划师_拨打电话',
      },
      // 规划师列表
      plannersList: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
        {
          id: 1,
          type: '金牌规划师',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '李劲',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 18402858698,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7887200447257313280',
            name: '李劲',
            num: '108862',
          },
        },
      ],
      // 底部规划师
      planner: {
        id: '7862495547640840192',
        name: '李劲',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
    }
  },
  methods: {
    // 跳转判断
    openIM(url) {
      if (url) {
        window.location.href = url
      } else {
        const planner = this.planner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
        )
      }
    },
  },
  head() {
    return {
      title: '银行服务',
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
.bankService {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  /deep/.my-head {
    width: @spread-page-width;
    position: fixed;
    left: 50%;
    margin-left: calc(-@spread-page-width / 2);
  }
  /deep/.sp-popup--round {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
  /deep/.sp-overlay {
    width: 750px;
    left: 50%;
    margin-left: -375px;
  }
  .servicelist {
    margin-top: 63px;
    .servicelist-title {
      padding-left: 40px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      display: block;
    }
  }
}
</style>
