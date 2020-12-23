<template>
  <div class="page-content">
    <Header title="工商财税" />
    <!-- START 轮播图-->
    <Banner :images="images" />
    <!-- END 轮播图-->
    <!-- START 导航-->
    <Nav />
    <!-- END 导航-->
    <!-- START 热销专区-->
    <HotSale />
    <!-- END 热销专区-->
    <!-- START 快速查询-->
    <KuaiSuChaXun />
    <!-- END 快速查询-->
    <!-- START 初创必备-->
    <ChuChuang />
    <!-- END 初创必备-->
    <!-- END 经营必备-->
    <JingYing />
    <!-- END 经营必备-->
    <!-- START 实用工具-->
    <ShiYong />
    <!-- END 实用工具-->
    <!-- START 企服规划师-->
    <GuiHuaShiSwipe :planners-data="guiHuaShiList" title="企服规划师" />
    <!-- END 企服规划师-->
    <!-- START 平台优势-->
    <PingTaiYouShi />
    <!-- END 平台优势-->
    <!-- START 薯片找人-->
    <ShuPianZhaoRen />
    <!-- END 薯片找人-->
    <!-- START 固定底部-->
    <FixedBottom :planner="pagePlanner" />
    <!-- END 固定底部-->
    <!-- START IM在线咨询-->
    <dgg-im-company></dgg-im-company>
    <!-- END IM在线咨询-->
  </div>
</template>

<script>
import dggImCompany from '~/components/spread/DggImCompany'
import Header from '@/components/common/head/header'
import Banner from '@/components/spread/home/Banner'
import Nav from '@/components/spread/home/Nav'
import HotSale from '@/components/spread/home/HotSale1'
import ChuChuang from '@/components/spread/home/ChuChuang'
import JingYing from '@/components/spread/home/JingYing'
import ShiYong from '@/components/spread/home/ShiYong'
import PingTaiYouShi from '@/components/spread/home/PingTaiYouShi'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '~/components/spread/common/FixedBottom'
import KuaiSuChaXun from '@/components/spread/home/KuaiSuChaXun'
import GuiHuaShiSwipe from '@/components/spread/common/GuiHuaShiSwipe'
import { spreadApi } from '@/api/spread'
export default {
  name: 'Index',
  components: {
    Banner,
    Header,
    Nav,
    HotSale,
    ChuChuang,
    JingYing,
    ShiYong,
    PingTaiYouShi,
    ShuPianZhaoRen,
    FixedBottom,
    KuaiSuChaXun,
    GuiHuaShiSwipe,
    dggImCompany,
  },
  async asyncData({ $axios }) {
    console.log('111')
    console.log('111')
    const type = 'extendBussineHome'
    try {
      const res = await $axios.get(`${spreadApi.list}pageCode=${type}`)
      console.log(res)
      return {
        resultData: res,
      }
    } catch (error) {
      console.log('error', error)
      // 请求出错也要保证页面正常显示
      return {
        resultData: {
          code: 200,
          message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
          data: {
            adList: [
              {
                pageCode: 'extendBussineHome',
                locationShowTypeCode: 'GGWZXSS_GDXS',
                locationName: 'wap-推广页-工商首页热销专区',
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
                        materialName: '工商首页广告1-1',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeHot1',
                        productDetail: {
                          id: 'extendBussineHomeHot1',
                          name: '',
                          referencePrice: 1800,
                          operating: {
                            showName: '食品经营许可证',
                            slogan: '食品行业所需资质官方保障',
                            productDescribe: '食品行业所需资质官方保障',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页广告1-2',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeHot2',
                        productDetail: {
                          id: 'extendBussineHomeHot2',
                          name: '',
                          referencePrice: 488,
                          operating: {
                            showName: '经营范围变更',
                            slogan: '资深团队 一步到位',
                            productDescribe: '资深团队 一步到位',
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
                        materialName: '工商首页广告1-3',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeHot3',
                        productDetail: {
                          id: 'extendBussineHomeHot3',
                          name: '',
                          referencePrice: 600,
                          operating: {
                            showName: '银行变更',
                            slogan: '专业团队 省时高效',
                            productDescribe: '专业团队 省时高效',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页广告1-4',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeHot4',
                        productDetail: {
                          id: 'extendBussineHomeHot4',
                          name: '',
                          referencePrice: 1500,
                          operating: {
                            showName: '个体户代理记账',
                            slogan: '全程监理 极速办理',
                            productDescribe: '全程监理 极速办理',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页广告1-5',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeHot5',
                        productDetail: {
                          id: 'extendBussineHomeHot5',
                          name: '',
                          referencePrice: null,
                          operating: {
                            showName: '企业核名',
                            slogan: '极速办理 一步到位',
                            productDescribe: '极速办理 一步到位',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                pageCode: 'extendBussineHome',
                locationShowTypeCode: 'GGWZXSS_GDXS',
                locationName: 'wap-推广页-工商首页初创必备',
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
                        materialName: '工商首页2-1',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeStart1',
                        productDetail: {
                          id: 'extendBussineHomeStart1',
                          name: '',
                          referencePrice: 888,
                          operating: {
                            showName: '有限公司注册',
                            slogan: '新手创业必备，专业平台，省心 更省钱',
                            productDescribe:
                              '新手创业必备，专业平台，省心 更省钱',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页2-2',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeStart2',
                        productDetail: {
                          id: 'extendBussineHomeStart2',
                          name: '',
                          referencePrice: 580,
                          operating: {
                            showName: '印章服务',
                            slogan: '极速出章，享终生免费售后',
                            productDescribe: '极速出章，享终生免费售后',
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
                        materialName: '工商首页2-3',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeStart3',
                        productDetail: {
                          id: 'extendBussineHomeStart3',
                          name: '',
                          referencePrice: 600,
                          operating: {
                            showName: '银行开户',
                            slogan: '安全高效，服务快 捷无忧',
                            productDescribe: '极速出章，享终生免费售后',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页2-4',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeStart4',
                        productDetail: {
                          id: 'extendBussineHomeStart4',
                          name: '',
                          referencePrice: 688,
                          operating: {
                            showName: '无地址注册',
                            slogan: '一站式服务，轻松 拿证',
                            productDescribe: '一站式服务，轻松 拿证',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页2-5',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeStart5',
                        productDetail: {
                          id: 'extendBussineHomeStart5',
                          name: '',
                          referencePrice: 0,
                          operating: {
                            showName: '定制代账方案',
                            slogan: '资深会计服务，安 全放心',
                            productDescribe: '资深会计服务，安 全放心',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                pageCode: 'extendBussineHome',
                locationShowTypeCode: 'GGWZXSS_GDXS',
                locationName: 'wap-推广页-工商首页初创必备',
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
                        materialName: '工商首页3-1',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage1',
                        productDetail: {
                          id: 'extendBussineHomeManage1',
                          name: '',
                          referencePrice: 2000,
                          operating: {
                            showName: '合伙企业注册',
                            slogan: '专业办理 安全高效',
                            productDescribe: '专业办理 安全高效',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页3-2',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage2',
                        productDetail: {
                          id: 'extendBussineHomeManage2',
                          name: '',
                          referencePrice: 3488,
                          operating: {
                            showName: '代理记账',
                            slogan: '极速办理 官方保障',
                            productDescribe: '极速办理 官方保障',
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
                        materialName: '工商首页3-3',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage3',
                        productDetail: {
                          id: 'extendBussineHomeManage3',
                          name: '',
                          referencePrice: 3488,
                          operating: {
                            showName: '互联网资质',
                            slogan: '专业 过审有保障',
                            productDescribe: '专业 过审有保障',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页3-4',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage4',
                        productDetail: {
                          id: 'extendBussineHomeManage4',
                          name: '',
                          referencePrice: 888,
                          operating: {
                            showName: '分公司注册',
                            slogan: '官方直营 平台担保',
                            productDescribe: '官方直营 平台担保',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页3-5',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage5',
                        productDetail: {
                          id: 'extendBussineHomeManage5',
                          name: '',
                          referencePrice: 300,
                          operating: {
                            showName: '一般纳税人代理记账',
                            slogan: '会计做账 口碑推荐',
                            productDescribe: '会计做账 口碑推荐',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                        materialName: '工商首页3-6',
                        androidLink: '',
                        materialWidth: 750,
                        iosLink: '',
                        linkType: 2,
                        wapLink: '',
                        executeParam: '',
                        productId: 'extendBussineHomeManage6',
                        productDetail: {
                          id: 'extendBussineHomeManage6',
                          name: '',
                          referencePrice: 200,
                          operating: {
                            showName: '年报公示',
                            slogan: '性价比高 数据安全',
                            productDescribe: '性价比高 数据安全',
                            actualViews: 0,
                            defaultSales: 0,
                            actualSales: 0,
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
                id: 30312,
                userId: '7930253930943676416',
                userCentreId: '7930253930615472128',
                loginName: '109870',
                realName: '李海怡',
                userHeadUrl:
                  'http://fastdfs.dggvip.net:8080/group1/M00/0F/60/CgAAB18_I3GEbQtUAAAAAF_T27Q303.jpg',
                userPhone: '13696057459',
                cvr: 0.146341,
                cvrValue: 64.606717,
                orderBus: 6,
                orderBusValue: 49.807025,
                busPerformance: 13492,
                busPerformanceValue: 88.692524,
                abilityValue: 70.319713,
                formatType: '工商',
              },
              {
                id: 30136,
                userId: '3394',
                userCentreId: '3394',
                loginName: '2022554',
                realName: '刘琴',
                userHeadUrl:
                  'http://fastdfs.dggvip.net:8080/group1/M00/0F/72/CgAAB19ExY6EVv-6AAAAAG6SJVc351.jpg',
                userPhone: '13350072314',
                cvr: 0.06383,
                cvrValue: 58.521736,
                orderBus: 3,
                orderBusValue: 48.092239,
                busPerformance: 4412.4,
                busPerformanceValue: 68.377345,
                abilityValue: 60.229761,
                formatType: '工商',
              },
              {
                id: 30299,
                userId: '7887200447593906176',
                userCentreId: '7887200447257313280',
                loginName: '108862',
                realName: '李劲',
                userHeadUrl:
                  'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
                userPhone: '18884259139',
                cvr: 0.209302,
                cvrValue: 68.96185,
                orderBus: 9,
                orderBusValue: 51.522266,
                busPerformance: 12192,
                busPerformanceValue: 86.706115,
                abilityValue: 72.229634,
                formatType: '工商',
              },
              {
                id: 30158,
                userId: '43999',
                userCentreId: '7704199733711282176',
                loginName: '96352931',
                realName: '岳雪冬',
                userHeadUrl:
                  'http://fastdfs.dggvip.net:8080/group1/M00/02/C0/wKiyYlubWPyEbXyQAAAAAH6D3Zw879.jpg',
                userPhone: '13908231675',
                cvr: 0.140625,
                cvrValue: 64.197653,
                orderBus: 9,
                orderBusValue: 51.522266,
                busPerformance: 24742,
                busPerformanceValue: 97.482166,
                abilityValue: 73.212083,
                formatType: '工商',
              },
              {
                id: 30165,
                userId: '66475',
                userCentreId: '66475',
                loginName: '38798340',
                realName: '钟霞',
                userHeadUrl:
                  'http://fastdfs.dggvip.net:8080/group1/M00/0F/E7/CgAAB19jRe-EZCmnAAAAAOB-9qQ642.jpg',
                userPhone: '13730634929',
                cvr: 0.157895,
                cvrValue: 65.427034,
                orderBus: 9,
                orderBusValue: 51.522266,
                busPerformance: 20770,
                busPerformanceValue: 95.658559,
                abilityValue: 73.270253,
                formatType: '工商',
              },
            ],
          },
        },
      }
    }
  },
  data() {
    return {
      images: [
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
        require('~/assets/spreadImages/home/busi_img_gscsbanner01.jpg'),
      ],
      guiHuaShiList: [
        {
          id: 1,
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          id: 2,
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
          },
        },
        {
          id: 3,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          im: {
            id: '7862495547640840192',
            name: '张毅',
            num: '107547',
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
      // @--广告位数据
      hotSaleProductList: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx01.jpg'),
          imgWidth: 225,
          imgHeight: 348,
          marginRight: true,
          url: '',
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx02.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: true,
          price: 500,
          url: '',
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx03.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: true,
          price: 1500,
          url: '',
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx04.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: false,
          price: 600,
          url: '',
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscsrx05.jpg'),
          imgWidth: 210,
          imgHeight: 168,
          marginRight: false,
          price: 0,
          url: '',
        },
      ],
      chuChuangProductList: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscscc01.png'),
          imgWidth: 329,
          imgHeight: 188,
          marginRight: true,
          price: 888,
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscscc02.png'),
          imgWidth: 329,
          imgHeight: 188,
          marginRight: false,
          price: 580,
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscscc03.png'),
          imgWidth: 215,
          imgHeight: 188,
          marginRight: true,
          price: 600,
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscscc04.png'),
          imgWidth: 215,
          imgHeight: 188,
          marginRight: true,
          price: 688,
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscscc05.png'),
          imgWidth: 215,
          imgHeight: 188,
          marginRight: false,
          price: 0,
        },
      ],
      jingYingProductList: [
        {
          id: 1,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy01.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 2000,
          url: '',
        },
        {
          id: 2,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy02.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 3488,
          url: '',
        },
        {
          id: 3,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy03.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: false,
          price: 200,
          url: '',
        },
        {
          id: 4,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy04.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 888,
          url: '',
        },
        {
          id: 5,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy05.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: true,
          price: 300,
          url: '',
        },
        {
          id: 6,
          img: require('~/assets/spreadImages/home/busi_img_gscsjy06.png'),
          imgWidth: 215,
          imgHeight: 170,
          marginRight: false,
          price: 200,
          url: '',
        },
      ],
    }
  },
  created() {
    this.adHandleData(this.resultData.data.adList || [])
    this.plannerHandleData(this.resultData.data.planlerList || [])
  },
  methods: {
    jumpLink(url) {
      if (url) {
        window.open(url, '_blank')
      } else {
        const planner = this.pagePlanner
        this.$root.$emit(
          'openIMM',
          planner.id,
          planner.name || '',
          planner.jobNum || ''
        )
      }
    },
    // 处理广告位数据
    adHandleData(data) {
      console.log(data)
      data.forEach((adItem, adIndex) => {
        adItem.sortMaterialList.forEach((item, index) => {
          // 热销专区
          if (adIndex === 0) {
            this.hotSaleProductList[index].price =
              item.materialList[0].productDetail.referencePrice
          }
          // 初创必备
          if (adIndex === 1) {
            this.chuChuangProductList[index].price =
              item.materialList[0].productDetail.referencePrice
          }
          // 经营必备
          if (adIndex === 2) {
            this.jingYingProductList[index].price =
              item.materialList[0].productDetail.referencePrice
          }
        })
      })
    },
    // 处理规划师数据
    plannerHandleData(data) {
      if (data.length === 0) return
      // 默认第一个为页面规划师
      const defaultPlanner = {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
      }
      this.pagePlanner =
        (data[0] && {
          id: data[0].userId,
          name: data[0].realName,
          jobNum: data[0].loginName,
          telephone: data[0].userPhone,
          imgSrc: data[0].userHeadUrl,
        }) ||
        defaultPlanner

      // 规划师列表
      const guiHuaShiList = []
      data.forEach((item) => {
        const obj = {
          id: item.userId,
          avatarImg: item.userHeadUrl,
          name: item.realName,
          shuPianFen: 11,
          serverNum: 250,
          telephone: item.userPhone,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: item.loginName,
        }
        guiHuaShiList.push(obj)
      })
      this.guiHuaShiList = guiHuaShiList
    },
  },
  head() {
    return {
      title: '工商首页',
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
  width: 750px;
  margin: 0 auto;
  font-family: PingFang SC;
}
</style>
