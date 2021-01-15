<template>
  <div class="system">
    <!-- S 头部分 -->
    <Header v-show="!isInApp" :title="TopTitle">
      <template #left>
        <div @click="onClickLeft">
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <!-- E 头部分 -->
    <!-- S banner轮播 -->
    <BannerSwipe :banner-images="bannerImages" />
    <!-- E banner轮播 -->
    <!-- S 表单 -->
    <Card :card-title="'体系认证 费用测算'" />
    <!-- E 表单 -->
    <!-- S 列表 -->
    <ServiceIntroduced
      class="systemList"
      :service-list="serviceList"
      :service-title="serviceTitle"
      :page-title="'体系认证'"
    />
    <!-- E 列表 -->
    <!-- S 侧边导航 -->
    <SidebarNavbar />
    <!-- E 侧边导航 -->
    <!-- S 立即咨询 -->
    <ConsultPhone :title="'有疑问？千万企服专家为您免费解答'" />
    <!-- E 立即咨询 -->
    <!-- S 认证好处 -->
    <Benefit />
    <!-- E 认证好处 -->
    <!-- S咨询规划师 -->
    <div class="refer">
      <GuiHuaShiSwipe
        :planners-data="guiHuaShiList"
        :planners-common="plannersCommon"
        md-type="new"
      ></GuiHuaShiSwipe>
    </div>
    <!-- E咨询规划师 -->
    <!-- S其他服务 -->
    <div class="service">
      <h5>您可能还需要其他服务</h5>
      <div class="serice-item">
        <a
          v-for="(item, index) of sericeImg"
          :key="index"
          v-sensorsTrack:webClick="{ name: `${item.name}` }"
          :data-name="item.name"
          @click="onService(item.url, index)"
        >
          <sp-image :src="item.img"
        /></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S免费咨询 -->
    <ConsultTel
      :title="'有疑问？千万企服规划师为您免费解答'"
      :tel="'400-962540'"
      button="免费咨询"
      md-type="售前"
      md-name="体系认证_还有疑问_立即咨询"
    />
    <ShuPianZhaoRen />
    <!-- S免费咨询 -->
    <!-- S底部咨询 -->
    <FixedBottom :planner="planner" :md="fixedMd" md-type="new" />
    <!-- E底部咨询 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { foundApi } from '~/api'
import Header from '@/components/common/head/header'
import BannerSwipe from '@/components/spread/system/BannerSwiper'
import Card from '@/components/spread/system/Card'
import ServiceIntroduced from '@/components/spread/common/ServiceIntroduced.vue'
import SidebarNavbar from '@/components/spread/system/SidebarNavbar'
import ConsultPhone from '@/components/spread/system/ConsultPhone'
import Benefit from '@/components/spread/system/Benefit'
import GuiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import ConsultTel from '@/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '@/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '@/components/spread/common/FixedBottom'
import dggImCompany from '@/components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'
export default {
  components: {
    [Image.name]: Image,
    Header,
    BannerSwipe,
    Card,
    ServiceIntroduced,
    SidebarNavbar,
    ConsultPhone,
    Benefit,
    GuiHuaShiSwipe,
    ConsultTel,
    ShuPianZhaoRen,
    FixedBottom,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    const type = 'extendSysAuth'
    const defaultRes = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendSysAuth',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-体系认证广告',
            locationId: '8027896820880179200',
            locationAddressCode: '',
            sortMaterialList: [
              {
                locationSort: 1,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '体系认证广告物料1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendSysAuth1',
                    productDetail: {
                      id: 'extendSysAuth1',
                      name: 'ISO9001质量管理体系',
                      referencePrice: 4000,
                      operating: {
                        showName: 'ISO9001质量管理体系',
                        slogan: '证明管理系统整合上已达到了国际标准',
                        productDescribe: '证明管理系统整合上已达到了国际标准',
                        actualViews: 299,
                        defaultSales: 136,
                        actualSales: 130,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 2,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '体系认证广告物料1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendSysAuth2',
                    productDetail: {
                      id: 'extendSysAuth2',
                      name: 'ISO14001 环境管理体系',
                      referencePrice: 8000,
                      operating: {
                        showName: 'ISO14001 环境管理体系',
                        slogan: '制定实施环境方针，并管理其环境因素',
                        productDescribe: '制定实施环境方针，并管理其环境因素',
                        actualViews: 138,
                        defaultSales: 76,
                        actualSales: 70,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 3,
                materialList: [
                  {
                    materialTypeCode: 'GGLX_TP',
                    materialUrl:
                      'https://img10.dgg.cn/sp/cms/5kw3il8k3h80000.jpg',
                    imgLink: '',
                    materialLink: 'https://www.baidu.com/',
                    materialCode: 'src100302',
                    materialHeight: 1334,
                    materialId: 0,
                    materialDescription: '',
                    materialName: '体系认证广告物料1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendSysAuth3',
                    productDetail: {
                      id: 'extendSysAuth3',
                      name: 'ISO50430 工程建设施工管理体系',
                      referencePrice: 8000,
                      operating: {
                        showName: 'ISO50430 工程建设施工管理体系',
                        slogan: '证明建筑施工企业质量管理水平',
                        productDescribe: '证明建筑施工企业质量管理水平',
                        actualViews: 147,
                        defaultSales: 99,
                        actualSales: 96,
                      },
                    },
                  },
                ],
              },
            ],
            locationCode: 'ad100230',
            locationCodeLocType: 2,
          },
        ],
        planlerList: [
          {
            id: 35,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13730634929',
            cvr: 0.086207,
            cvrValue: 60.206605,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 15278,
            busPerformanceValue: 90.996225,
            abilityValue: 68.653875,
            formatType: '工商',
          },
          {
            id: 6,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13350072314',
            cvr: 0.090909,
            cvrValue: 60.557728,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 7612.4,
            busPerformanceValue: 77.299492,
            abilityValue: 64.379694,
            formatType: '工商',
          },
          {
            id: 182,
            userId: '7930253930943676416',
            userCentreId: '7930253930615472128',
            loginName: '109870',
            realName: '李海怡',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13696057459',
            cvr: 0.106383,
            cvrValue: 61.705406,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 17770,
            busPerformanceValue: 93.504073,
            abilityValue: 70.2655,
            formatType: '工商',
          },
          {
            id: 169,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.162791,
            cvrValue: 65.771926,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 8544,
            busPerformanceValue: 79.535461,
            abilityValue: 68.038005,
            formatType: '工商',
          },
          {
            id: 28,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13908231675',
            cvr: 0.127273,
            cvrValue: 63.23411,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 15348,
            busPerformanceValue: 91.077286,
            abilityValue: 70.450657,
            formatType: '工商',
          },
        ],
      },
    }
    try {
      const res = await $axios.get(spreadApi.list, {
        params: {
          pageCode: type,
        },
      })
      if (res.code === 200) {
        return {
          resultData: res.data,
        }
      } else {
        return {
          resultData: defaultRes.data,
        }
      }
    } catch (error) {
      console.log(error)
      return { resultData: defaultRes.data }
    }
  },
  data() {
    return {
      TopTitle: '体系认证',
      bannerImages: [
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/8bf1vma8vqk0000.png',
        },
        {
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/262wx64wap28000.png',
        },
      ],
      // 规划师
      guiHuaShiList: [
        {
          id: '7862495547640840192',
          avatarImg:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          name: '张毅',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      // 规划师埋点
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
      },
      // 底部规划师埋点
      fixedMd: {
        telMd: {
          name: '体系认证_钻石展位_拨打电话',
          type: '售前',
        },
        imMd: {
          name: '体系认证_钻石展位_在线咨询',
          type: '售前',
        },
      },
      // 服务列表
      serviceList: [
        {
          title: '基本开户',
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '1402',
          defaultSales: '992',
          actualSales: '992',
          price: 600,
          bgImg: '',
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
            text: ['公司成立3月以上', '有营业执照'],
          },
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
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '632',
          defaultSales: '421',
          actualSales: '416',
          price: 600,
          bgImg: '',
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
            text: ['效资质证明', '临时场所清单'],
          },
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
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgImg: '',
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
            text: ['相关法律证明', '管理体系成文信息'],
          },

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
          titleContent: '企事业单位进行日常转账结算和现金收付的主板账户',
          actualViews: '152',
          defaultSales: '108',
          actualSales: '108',
          price: 600,
          bgImg: '',
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
            text: ['相关法律证明', '管理体系成文信息'],
          },

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
      serviceTitle: '服务介绍',
      // 服务列表标签
      labels: [
        ['公司成立3月以上', '有营业执照'],
        ['效资质证明', '临时场所清单'],
        ['相关法律证明', '管理体系成文信息'],
      ],
      // 服务列表标签样式+背景图
      labelStyle: {
        icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
        style: 'row',
        title: '服务介绍',
      },
      // 底部规划师
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      // 其他服务
      sericeImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/fbnkmcxvxqg0000.png',
          name: '体系认证_还需要办理_许可证办理',
          url: '/spread/licence',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2dv958uknitc000.png',
          name: '体系认证_还需要办理_工商注销',
          url: '/spread/businessCancellation',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/72gbx82vsnk0000.png',
          name: '体系认证_还需要办理_工商变更',
          url: '/spread/businessChange',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/d4jmafpuy5s0000.png',
          name: '体系认证_还需要办理_互联网资质',
          url: '/spread/internetQualification',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/elaeb6is89s0000.png',
          name: '体系认证_还需要办理_代理记账',
          url: '/spread/agency',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2ni7sgi4kii0000.png',
          name: '体系认证_还需要办理_银行服务',
          url: '/spread/bankService',
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
    }),
  },
  created() {
    if (this.resultData.length !== 0) {
      this.serverList(this.resultData || [])
      this.plannerData(this.resultData.planlerList || [])
    }
  },
  mounted() {
    const param = {
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: 'wap端体系认证推广页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
    if (this.isInApp) {
      this.$appFn.dggSetTitle({ title: '体系认证' }, () => {})
      console.log('dsdad')
    }
  },
  methods: {
    onClickLeft() {
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
    // 处理后台列表数据
    serverList(data) {
      const listAll = data.adList[0].sortMaterialList
      if (listAll.length !== 0) {
        const dataList = []
        listAll.forEach((eleme, index) => {
          // 随机下标
          const subscript = `${
            index < this.labels.length
              ? index
              : Math.floor(Math.random() * this.labels.length)
          }`
          const titleList = eleme.materialList[0].productDetail
          const obj = {
            title: titleList.operating.showName,
            titleContent: titleList.operating.slogan,
            actualViews: titleList.operating.actualViews,
            defaultSales: titleList.operating.defaultSales,
            actualSales: titleList.operating.actualSales,
            price: titleList.referencePrice,
            labelsType: 'row',
            rowLabels: {
              icon: 'https://cdn.shupian.cn/sp-pt/wap/8xzqfak5fos0000.png',
              text: this.labels[subscript],
            },
            planner: {
              id: '66475',
              name: '钟霞',
              jobNum: '38798340',
              telephone: '13730634929',
              imgSrc:
                'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            },
          }
          if (data.planlerList.length > 0) {
            const subPlanner =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ]
            obj.planner.id = subPlanner.userCentreId
            obj.planner.name = subPlanner.realName
            obj.planner.jobNum = subPlanner.loginName
            obj.planner.telephone = subPlanner.userPhone
            obj.planner.imgSrc = subPlanner.userHeadUrl
          } else {
            return null
          }
          dataList.push(obj)
        })
        this.serviceList = dataList
      }
    },
    // 处理后台规划师数据
    plannerData(data) {
      if (data.length !== 0) {
        this.planner = data[0] && {
          id: data[0].userCentreId,
          name: data[0].realName,
          jobNum: data[0].loginName,
          telephone: data[0].userPhone,
          imgSrc: data[0].userHeadUrl,
        }
        // 规划师轮播列表
        const guiHuaShiList = []
        data.forEach((item) => {
          const obj = {
            id: item.userCentreId,
            avatarImg: item.userHeadUrl,
            name: item.realName,
            shuPianFen: 22,
            serverNum: 250,
            telephone: item.userPhone,
            labels: ['工商注册', '财税咨询', '税务筹划'],
            jobNum: item.loginName,
          }
          guiHuaShiList.push(obj)
        })
        this.guiHuaShiList = guiHuaShiList
      }
    },
    // 其他服务的跳转判断
    onService(url, index) {
      if (url !== '') {
        this.$router.push({
          path: `${url}`,
        })
      } else {
        this.$root.$emit(
          'openIMM',
          this.planner.id,
          this.planner.name,
          this.planner.jobNum,
          this.planner.imgSrc
        )
      }
    },
  },
  head() {
    return {
      title: '体系认证',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
        },
        // {
        //   src: '/js/spread/companyRegister-md-config.js',
        // },
        // {
        //   src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        // },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.system {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  font-family: PingFang SC;
  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
  // 列表
  /deep/.systemList {
    .serviceList-content {
      background: url(https://cdn.shupian.cn/sp-pt/wap/1pyws4fkw79c000.png);
      background-size: 101%;
      background-position-x: -1px;
    }
    .show-more-btn {
      border: none;
      margin: 0 auto;
      padding: 0px;
      height: 26px;
      margin-top: 20px;
      line-height: 26px;
    }
  }
  // 其他服务
  .service {
    padding-top: 22px;
    margin: 0 auto;
    h5 {
      font-size: 40px;
      margin-bottom: 32px;
      margin-left: 40px;
      height: 40px;
      line-height: 40px;
    }
    .serice-item {
      margin: 0 auto;
      width: 670px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      a {
        width: 207px;
        height: 187px !important;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
        /deep/.sp-image {
          width: 208px;
          height: 188px;
        }
      }
      a:first-child {
        margin-bottom: 24px;
      }
    }
  }
  // 立即咨询title
  /deep/.cousulttel-title {
    text-align: left;
  }
}
</style>
