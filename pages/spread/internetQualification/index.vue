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
    <HotBanLiYeWu class="hot-ye-wu-margin" />
    <!-- END   热门办理业务-->

    <!-- START 热门办理业务-规划师-->
    <GuiHuaShiSwipe
      class="planner-swipe"
      :planners-data="[guiHuaShiList[0]]"
      :planners-common="{
        title: '',
        imName: '互联网资质热门办理业务_规划师咨询',
        telName: '互联网资质热门办理业务_规划师电话',
      }"
    />
    <!-- END   热门办理业务-规划师-->

    <!-- START 热门行业推荐-->

    <HotIndustryRecommend class="hot-industry-margin" />
    <!-- END   热门行业推荐-->

    <!-- START 常见问题-->
    <CommonQuestion class="" />
    <!-- END   常见问题-->

    <!-- START 免费咨询-->
    <ConsultTel
      title="有其他问题？免费咨询"
      tel="4000-962540"
      md-name="其他问题_立即咨询"
    />
    <!-- END   免费咨询-->

    <!-- START 服务流程-->
    <ServiceProcess class="service-process-margin" />
    <!-- END   服务流程-->

    <!-- START 咨询规划师-->
    <GuiHuaShiSwipe
      :planners-data="guiHuaShiList"
      :planners-common="{
        title: '咨询规划师',
        imName: '互联网资质_咨询规划师_在线咨询',
        telName: '互联网资质_咨询规划师_拨打电话',
      }"
    />
    <!-- END   咨询规划师-->

    <!-- START 你可能还需要办理-->
    <PossibleHandle class="possible-margin" />
    <!-- END   你可能还需要办理-->

    <!-- START 有疑问-->
    <ConsultTel
      title="有疑问？千万企服规划师为您免费解答"
      tel="4000-962540"
      md-name="互联网资质_还有疑问_立即咨询"
    />
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
import { mapState } from 'vuex'
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
import { spreadApi } from '~/api/spread'

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
  async asyncData({ $axios }) {
    const type = 'extendNetWorkQualifications'
    // 默认数据：当请求code不为200时，都使用默认数据保证页面正常显示
    const defaultResultData = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendNetWorkQualifications',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-互联网资质广告',
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
                    materialName: '互联网资质广告物料1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications1',
                    productDetail: {
                      id: 'extendNetWorkQualifications1',
                      name: '',
                      referencePrice: 10000,
                      operating: {
                        showName: 'ICP许可证',
                        slogan: '线上交易网站需办',
                        productDescribe: '线上交易网站需办',
                        actualViews: 129,
                        defaultSales: 86,
                        actualSales: 82,
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
                    materialName: '互联网资质广告物料1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications2',
                    productDetail: {
                      id: 'extendNetWorkQualifications2',
                      name: '',
                      referencePrice: 10000,
                      operating: {
                        showName: '互联网交易处理...',
                        slogan: '线上交易网站需办',
                        productDescribe: '线上交易网站需办',
                        actualViews: 0,
                        defaultSales: 0,
                        actualSales: 0,
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
                    materialName: '互联网资质广告物料1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications3',
                    productDetail: {
                      id: 'extendNetWorkQualifications3',
                      name: '',
                      referencePrice: 10000,
                      operating: {
                        showName: 'IDC许可证',
                        slogan: '开展数据中心业...',
                        productDescribe: '开展数据中心业...',
                        actualViews: 129,
                        defaultSales: 86,
                        actualSales: 82,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 4,
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
                    materialName: '互联网资质广告物料1-4',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications4',
                    productDetail: {
                      id: 'extendNetWorkQualifications4',
                      name: '',
                      referencePrice: 15000,
                      operating: {
                        showName: 'ISP许可证',
                        slogan: '互联网信息服务...',
                        productDescribe: '互联网信息服务...',
                        actualViews: 216,
                        defaultSales: 152,
                        actualSales: 147,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 5,
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
                    materialName: '互联网资质广告物料1-5',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications5',
                    productDetail: {
                      id: 'extendNetWorkQualifications5',
                      name: '',
                      referencePrice: 1000,
                      operating: {
                        showName: 'SP许可证',
                        slogan: '互联网信息服务...',
                        productDescribe: '互联网信息服务...',
                        actualViews: 62,
                        defaultSales: 38,
                        actualSales: 32,
                      },
                    },
                  },
                ],
              },
              {
                locationSort: 6,
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
                    materialName: '互联网资质广告物料1-6',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications6',
                    productDetail: {
                      id: 'extendNetWorkQualifications6',
                      name: '',
                      referencePrice: 1000,
                      operating: {
                        showName: '网络文化经营许可证',
                        slogan: '互联网信息服务...',
                        productDescribe: '互联网信息服务...',
                        actualViews: 93,
                        defaultSales: 61,
                        actualSales: 56,
                      },
                    },
                  },
                ],
              },
            ],
            locationCode: 'ad100230',
            locationCodeLocType: 2,
          },
          {
            pageCode: 'extendNetWorkQualifications',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-互联网资质广告热门行业推荐',
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
                    materialName: '互联网资质广告物料2-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendNetWorkQualifications7',
                    productDetail: {
                      id: 'extendNetWorkQualifications7',
                      name: '',
                      referencePrice: 1000,
                      operating: {
                        showName: '增值电信业务经营许可证（ICP）',
                        slogan: '线上交易网站需办',
                        productDescribe: '线上交易网站需办',
                        actualViews: 249,
                        defaultSales: 203,
                        actualSales: 197,
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
            id: 30156,
            userId: '43999',
            userCentreId: '7704199733711282176',
            loginName: '96352931',
            realName: '岳雪冬',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13908231675',
            cvr: 0.145455,
            cvrValue: 64.543449,
            orderBus: 8,
            orderBusValue: 50.950718,
            busPerformance: 15623,
            busPerformanceValue: 91.389398,
            abilityValue: 71.329062,
            formatType: '工商',
          },
          {
            id: 30163,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13730634929',
            cvr: 0.1,
            cvrValue: 61.23349,
            orderBus: 6,
            orderBusValue: 49.807025,
            busPerformance: 15278,
            busPerformanceValue: 90.996225,
            abilityValue: 69.28084,
            formatType: '工商',
          },
          {
            id: 30134,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '13350072314',
            cvr: 0.092593,
            cvrValue: 60.683218,
            orderBus: 5,
            orderBusValue: 49.23518,
            busPerformance: 12112.4,
            busPerformanceValue: 86.575363,
            abilityValue: 67.466985,
            formatType: '工商',
          },
          {
            id: 30297,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.159091,
            cvrValue: 65.511436,
            orderBus: 7,
            orderBusValue: 50.378921,
            busPerformance: 8744,
            busPerformanceValue: 79.993572,
            abilityValue: 68.049033,
            formatType: '工商',
          },
          {
            id: 30310,
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
        ],
      },
    }
    const pagePlanner = {
      id: '7862495547640840192',
      name: '张毅',
      jobNum: '107547',
      telephone: '18402858698',
      imgSrc: 'https://cdn.shupian.cn/sp-pt/wap/images/e0hc87jr0ps0000.png',
    }
    const defaultAvatarImg =
      'https://cdn.shupian.cn/sp-pt/wap/images/e0hc87jr0ps0000.png'
    try {
      const res = await $axios.get(`${spreadApi.list}?pageCode=${type}`)
      console.log('spreadApi.list success：', res.code + '--' + res.message)
      if (res.code === 200) {
        return {
          resultData: res,
          // defaultAvatarImg,
          // pagePlanner,
        }
      } else {
        return {
          resultData: defaultResultData,
          // defaultAvatarImg,
          // pagePlanner,
        }
      }
    } catch (error) {
      console.log('spreadApi.list error：', error.message)
      // 请求出错也要保证页面正常显示
      return {
        resultData: defaultResultData,
        // defaultAvatarImg,
        // pagePlanner,
      }
    }
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
          imgSrc: '',
        },
      ],
      pagePlanner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc: '',
      },
      // @--埋点数据
      fixedBottomMd: {
        telMd: {
          name: '互联网资质_钻石展位_拨打电话',
        },
        imMd: {
          name: '互联网资质_钻石展位_在线咨询',
          type: '售前',
        },
      },
      // @--广告位数据：两个广告位
      // 热门办理业务列表
      hotBanLiYeWuList: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fekdjet6yuw0000.png',
          title: 'ICP许可证',
          desc: '线上交易网站许可',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5vuptr0suew0000.png',
          title: 'EDI许可证',
          desc: '互联网交易处理许可',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/6v2inrc3qig0000.png',
          title: 'IDC许可证',
          desc: '用于开展数据中心',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/48vf54mrq5i0000.png',
          title: 'ISP许可证',
          desc: '因特网接入服务许可',
          price: '15000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/ee2kpu2iao00000.png',
          title: 'SP许可证',
          desc: '移动信息服务业务许可',
          price: '12000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7gryolu2uns0000.png',
          title: '网络文化经营...',
          desc: '经营性互联网文化活动',
          price: '14000',
        },
      ],
      // 热门行业推荐列表
      hotIndustryRecommendList: [
        {
          title: '增值电信业务经营许可证（ICP）',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '线上交易、收费性网站需要办理',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 10000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
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
          md: {
            telMd: {
              name: '互联网资质业务介绍_ICP许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_ICP许可证_在线咨询',
              type: '售前',
            },
          },
        },
        {
          title: '网络文化经营许可证（文网文）',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '从事音乐、动漫等业务的准入资质',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 14000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['注册资金100万', '有8名以上技术人员'],
          },
          md: {
            telMd: {
              name: '互联网资质业务介绍_网络文化经营许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_网络文化经营许可证_在线咨询',
              type: '售前',
            },
          },
        },
        {
          title: 'IDC许可证',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '开展数据中心业务的资质许可',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 14000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['有充足资金', '有专业人员'],
          },
          md: {
            telMd: {
              name: '互联网资质业务介绍_IDC许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_IDC许可证_在线咨询',
              type: '售前',
            },
          },
        },
        {
          title: 'ISP许可证',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '因特网接入服务业务许可',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 10000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['有安全管理系统', '有资源和管理系统'],
          },
          md: {
            telMd: {
              name: '互联网资质业务介绍_ISP许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_ISP许可证_在线咨询',
              type: '售前',
            },
          },
        },
        {
          title: 'SP许可证',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '第二类增值电信业务经营许可证，分为全网和地网',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 12000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['注册资本100万', '三年无违法行为'],
          },
          md: {
            telMd: {
              name: '互联网资质业务介绍_SP许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_SP许可证_在线咨询',
              type: '售前',
            },
          },
        },
        {
          title: 'EDI许可证',
          titleLabel:
            'https://cdn.shupian.cn/sp-pt/wap/images/af20f9cgvc40000.png',
          titleContent: '互联网交易处理业务许可',
          actualViews: '45万+',
          defaultSales: '44万+',
          actualSales: '44万+',
          price: 12000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/fo9dtjg9pxc0000.png',
          planner: {
            id: '7862495547640840192',
            name: '张毅',
            jobNum: '107547',
            telephone: '18402858698',
            imgSrc:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          },
          labelsType: 'row',
          rowLabels: {
            icon: 'https://cdn.shupian.cn/sp-pt/wap/images/coj92paiae00000.png',
            text: ['注册资本100万', '属于内资企业'],
          },
          md: {
            telMd: {
              name: '互联网资质业务介绍_EDI许可证_拨打电话',
              type: '售前',
            },
            imMd: {
              name: '互联网资质业务介绍_EDI许可证_在线咨询',
              type: '售前',
            },
          },
        },
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  async created() {
    await this.plannerHandleData(this.resultData.data.planlerList || [])
    this.adHandleData(this.resultData.data.adList || [])
  },
  mounted() {
    // @--神策埋点-设置公共属性
    window.sensors.registerPage({
      platform_type: 'wap端', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '互联网资质',
      current_url: location.href,
      referrer: document.referrer,
    })
  },
  methods: {
    jumpLink(url) {
      if (url) {
        if (url.indexOf('http') > -1) {
          window.open(url)
        } else {
          this.$router.push(url)
        }
      } else {
        const planner = this.pagePlanner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || '',
          planner.imgSrc || ''
        )
      }
    },
    // 处理广告位数据
    adHandleData(data) {
      if (data.length === 0) return
      data.forEach((adItem, adIndex) => {
        switch (adIndex) {
          case 0: {
            adItem.sortMaterialList.forEach((item, index) => {
              this.hotBanLiYeWuList[index].title =
                item.materialList[0].productDetail.operating.showName

              this.hotBanLiYeWuList[index].desc =
                item.materialList[0].productDetail.operating.productDescribe

              this.hotBanLiYeWuList[index].price =
                item.materialList[0].productDetail.referencePrice
            })
            break
          }
          case 1: {
            // 热门行业推荐
            // 将值全部取出
            adItem.sortMaterialList.forEach((item, index) => {
              this.hotIndustryRecommendList[index].title =
                item.materialList[0].productDetail.operating.showName

              this.hotIndustryRecommendList[index].titleContent =
                item.materialList[0].productDetail.operating.productDescribe

              this.hotIndustryRecommendList[index].actualViews =
                item.materialList[0].productDetail.operating.actualViews

              this.hotIndustryRecommendList[index].defaultSales =
                item.materialList[0].productDetail.operating.defaultSales

              this.hotIndustryRecommendList[index].actualSales =
                item.materialList[0].productDetail.operating.actualSales

              this.hotIndustryRecommendList[index].price =
                item.materialList[0].productDetail.referencePrice

              // 从规划师列表随机取个规划师
              const num = Math.floor(Math.random() * this.guiHuaShiList.length)
              this.hotIndustryRecommendList[index].planner = this.guiHuaShiList[
                num
              ]
            })
            break
          }
        }
      })
    },
    // 处理规划师数据
    plannerHandleData(data) {
      if (data.length === 0) return
      // 随机取一个为页面规划师
      const num = Math.floor(Math.random() * data.length)
      this.pagePlanner = {
        id: data[num].userCentreId,
        name: data[num].realName,
        jobNum: data[num].loginName,
        telephone: data[num].userPhone,
        imgSrc: data[num].userHeadUrl,
      }

      // 规划师列表
      const guiHuaShiList = []
      data.forEach((item) => {
        const obj = {
          id: item.userCentreId,
          name: item.realName,
          jobNum: item.loginName,
          telephone: item.userPhone,
          imgSrc: item.userHeadUrl,
          avatarImg: item.userHeadUrl,
          shuPianFen: 11,
          serverNum: 250,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        }
        guiHuaShiList.push(obj)
      })
      this.guiHuaShiList = guiHuaShiList
    },
  },
  head() {
    return {
      title: '互联网资质',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
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

  .hot-ye-wu-margin {
    margin-top: 32px;
  }

  .hot-industry-margin {
    margin-top: 24px;
    margin-bottom: 64px;
  }
  .service-process-margin {
    margin-top: 28px;
  }

  .possible-margin {
    margin-top: 24px;
  }
  /deep/ .my-head {
    width: @spread-page-width !important;
    left: auto !important;
  }
  .planner-swipe {
    /deep/ .planner-right {
      width: 0;
    }
  }
  /deep/ .planner {
    height: auto;
  }
}
</style>
