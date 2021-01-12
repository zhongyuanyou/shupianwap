<template>
  <div class="seal">
    <!--  头部  -->
    <Header :title="headTitle"></Header>
    <!--  头部  -->
    <!--  轮播/表单  -->
    <banner></banner>
    <!--  轮播/表单  -->
    <!--  刻章服务  -->
    <seal-serve></seal-serve>
    <!--  刻章服务  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      title=""
      button="免费咨询"
      md-type="new"
      md-name="专业刻章服务_免费咨询"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  服务介绍  -->
    <ServiceIntroduced
      :service-list="serviceList"
      :service-title="serviceTitle"
    ></ServiceIntroduced>
    <!--  服务介绍  -->
    <!--  规划师  -->
    <gui-hua-shi-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
    ></gui-hua-shi-swipe>
    <!--  规划师  -->
    <!--  服务流程  -->
    <process></process>
    <!--  服务流程  -->
    <!--  平台优势  -->
    <goods></goods>
    <!--  平台优势  -->
    <!--  可能需要  -->
    <maby></maby>
    <!--  可能需要  -->
    <!--  立即咨询  -->
    <consult-tel
      :tel="consultTel"
      title="还有疑问？企服专家为您免费解答"
      md-type="new"
      md-name="专业刻章服务_免费咨询"
    ></consult-tel>
    <!--  立即咨询  -->
    <!--  薯片找人  -->
    <shuPianZhaoRen></shuPianZhaoRen>
    <!--  薯片找人  -->
    <!--  底部咨询  -->
    <fixedBottom :planner="fixedBottomData"></fixedBottom>
    <!--  底部咨询  -->
  </div>
</template>

<script>
import Header from '~/components/common/head/header'
import banner from '~/components/spread/seal/Banner'
import sealServe from '~/components/spread/seal/SealServe'
import consultTel from '@/components/spread/common/ConsultTel'
import guiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import process from '~/components/spread/seal/Process'
import ServiceIntroduced from '@/components/spread/common/ServiceIntroduced'
import goods from '~/components/spread/seal/Goods'
import maby from '~/components/spread/seal/Maby'
import shuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import fixedBottom from '~/components/spread/common/FixedBottom'
export default {
  name: 'Idnex',
  components: {
    Header,
    banner,
    sealServe,
    consultTel,
    guiHuaShiSwipe,
    process,
    ServiceIntroduced,
    goods,
    maby,
    shuPianZhaoRen,
    fixedBottom,
  },
  data() {
    return {
      headTitle: '印章刻制',
      consultTel: '4000 - 962540',
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
      ],
      plannersCommon: {
        title: '咨询规划师',
        imName: '税务筹划_咨询规划师_在线咨询',
        telName: '税务筹划_咨询规划师_拨打电话',
      },
      // 服务列表
      serviceList: [
        {
          title: '公章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '公司对外事务时需要加盖',
          actualViews: '9万+',
          defaultSales: '8万+',
          actualSales: '8万+',
          price: 230,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
        {
          title: '法人章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '一般用于银行预留印鉴或者代替法人签名',
          actualViews: '8万+',
          defaultSales: '7万+',
          actualSales: '7万+',
          price: 120,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
        {
          title: '财务章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '公司票据、支票出具时需要财务章',
          actualViews: '8万+',
          defaultSales: '7万+',
          actualSales: '7万+',
          price: 230,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
        {
          title: '发票章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '购买和开具发票时须加盖此章',
          actualViews: '6万+',
          defaultSales: '5万+',
          actualSales: '5万+',
          price: 230,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
        {
          title: '合同章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '单位对外签订合同时使用',
          actualViews: '1万+',
          defaultSales: '8千+',
          actualSales: '8千+',
          price: 230,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
        {
          title: '遗失补办印章',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/7vjh29crwc00000.png',
          titleContent: '印章遗失后进行补办',
          actualViews: '6千+',
          defaultSales: '5千+',
          actualSales: '5千+',
          price: 230,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/8jllc0prmmw0000.jpg',
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
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/5rm0wj4crok0000.png',
            text: ['办理快至2小时', '新公司必备', '送章上门'],
          },
        },
      ],
      pageTitle: '印章刻制',
      serviceTitle: '服务介绍',
      fixedBottomData: {
        id: '',
        name: '奥特曼',
        jobNum: '',
        telephone: '18402858698',
        imgSrc: '',
      },
    }
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'Wap端印章服务推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
  },
  head() {
    return {
      title: '印章刻制',
      meta: [
        {
          name: 'keywords',
          content: '专利转让网,专利转让平台,优质专利,专利交易,顶呱呱交易平台',
        },
        {
          name: 'description',
          content:
            '顶呱呱交易平台，提供特价专利转让、精品专利交易、专利买卖出售服务。百万海量专利资源在线选购，即买即用，专业的专利买卖平台就上顶呱呱，安全放心！',
        },
      ],
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
      ],
    }
  },
}
</script>

<style scoped lang="less">
.seal {
  width: 750px;
  margin: 0 auto;
  /deep/ .my-head {
    width: 750px !important;
    left: auto !important;
  }
}
// 服务组件字体颜色
/deep/ .serviceList-content-head-title > span {
  color: #ffffff !important;
}
/deep/ .serviceList-content-head > span {
  color: #cccccc !important;
}
//咨询外边距
/deep/ .cousulttel-title {
  margin: 0 0 24px;
}
//咨询内边距
/deep/ .cousulttel {
  padding-bottom: 0;
}
//轮播规划师组件圆角
/deep/ .planner-content-item-shadow {
  border-radius: 8px;
}
// 规划师组件上边距
/deep/ .planner {
  padding-top: 64px;
}
</style>
