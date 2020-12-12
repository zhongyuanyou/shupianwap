<template>
  <div class="page-content">
    <!-- S 搜索 + 大banner -->
    <SearchBanner
      ref="searchBannerRef"
      :fiexd-banner-data="initData.fiexdBannerData"
    />
    <!-- E 搜索 + 大banner -->
    <!-- S 金刚区nav -->
    <HomeNav
      :fiexd-nav="initData.fiexdNavData"
      :roll-nav="initData.rollNavData"
    />
    <!-- E 金刚区nav -->
    <!-- S 轮播banner -->
    <SwiperBanner :swiper-data="initData.rollBannerData" />
    <!-- E 轮播banner -->
    <!-- S 帮我找服务 -->
    <Help :help-banner-data="initData.helpBannerData" />
    <!-- E 帮我找服务 -->
    <!-- S 限时特惠 -->
    <Preferential :init-data="asyncData.preferential" />
    <!-- E 限时特惠 -->
    <!-- S 资讯精选 -->
    <Information />
    <!-- E 资讯精选 -->
    <!-- S 热门服务 -->
    <HotServe />
    <!-- E 热门服务 -->
    <!-- S 推荐服务 -->
    <Recommend ref="recommendRef" />
    <!-- E 推荐服务 -->
    <!-- S 悬浮按钮 -->
    <FiexdBtn />
    <!-- E 悬浮按钮 -->
  </div>
</template>

<script>
import { CHIPS_PLATFORM_CODE, WAP_TERMINAL_CODE } from '../config/constant'
import { homeApi } from '@/api'
import SearchBanner from '@/components/home/SearchBanner'
import HomeNav from '@/components/home/HomeNav'
import SwiperBanner from '@/components/home/SwiperBanner'
import Help from '@/components/home/Help'
import Preferential from '@/components/home/Preferential'
import Information from '@/components/home/Information'
import HotServe from '@/components/home/HotServe'
import Recommend from '@/components/home/Recommend'
import FiexdBtn from '@/components/home/FiexdBtn'
export default {
  layout: 'nav',
  name: 'Home',
  components: {
    SearchBanner,
    HomeNav,
    SwiperBanner,
    Help,
    Preferential,
    Information,
    HotServe,
    Recommend,
    FiexdBtn,
  },
  async asyncData({ $axios }) {
    const fiexdAdCode = 'ad100064' // 顶部固定banner的code
    const rollAdCode = 'ad100056' // 导航下方轮播banner code
    const helpAdCode = 'ad100056' // 帮我找下方banner code
    // 首屏请求导航和广告的参数
    const initReqParams = {
      locationCodeList: [fiexdAdCode, rollAdCode], // 广告位code列表
      rollPage: 1, // 滚动导航当前页
      rollLimit: 1000, // 滚动导航每页条数
      fixedPage: 1, // 固定导航当前页
      fixedLimit: 5, // 固定导航每页条数
      fixedNavCategoryCode: 'nav100001', // 固定导航分类code
      fixedNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 固定导航平台code
      rollNavCategoryCode: 'nav100001', // 滚动导航分类code
      rollNavPlatformCode: 'COMDIC_PLATFORM_CRISPS', // 滚动导航平台code
    }
    const initData = {
      fiexdBannerData: [], // 固定广告
      rollBannerData: [], // 轮播广告
      helpBannerData: [], // 帮我找广告
      fiexdNavData: [], // 固定导航
      rollNavData: [], // 滚动导航
    }
    try {
      const res = await $axios.post(homeApi.initRequest, initReqParams)
      if (res.code === 200) {
        initData.fiexdBannerData = res.data.advertising[fiexdAdCode] || []
        initData.rollBannerData = res.data.advertising[rollAdCode] || []
        initData.helpBannerData = res.data.advertising[helpAdCode] || []
        initData.fiexdNavData = res.data.fixedNavList || []
        initData.rollNavData = res.data.rollNavList || []
      }
    } catch (error) {}
    return {
      initData,
    }
  },
  data() {
    return {
      preferentialCode: 'ad100026', // 限时特惠板块
      hotAdOne: 'ad100000', // 热门服务
      hotCodeTwo: 'ad100067', // 今日必看
      hotCodeThree: 'ad100065', // 刚需捡漏
      hotCodeFour: 'ad100058', // 其它
      asyncReqParams: {
        infoLimit: 3, // 资讯每页数量
        infoPage: 1, // 资讯当前页
        categoryCode: '', // 查询资讯的分类code
        platformCode: CHIPS_PLATFORM_CODE, // 查询资讯的平台code
        terminalCode: WAP_TERMINAL_CODE, // 查询资讯的终端code
        locationCodeList: [], // 广告编码
      },
      asyncData: {
        preferential: [], // 限时特惠
        information: [], // 资讯精选
        rotationAd: {}, // 热门服务
      },
    }
  },
  created() {
    if (process.client) {
      this.asyncReqParams.locationCodeList = [
        this.preferentialCode,
        this.hotAdOne,
        this.hotCodeTwo,
        this.hotCodeThree,
        this.hotCodeFour,
      ]
      // 获取非首屏数据（广告 + 资讯）
      this.$axios
        .post(homeApi.asyncRequest, this.asyncReqParams)
        .then((res) => {
          const data = {
            code: 200,
            message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
            data: {
              cityList: [
                {
                  id: '110100',
                  pid: '110000',
                  code: '110100',
                  name: '北京市',
                },
                {
                  id: '120100',
                  pid: '120000',
                  code: '120100',
                  name: '天津市',
                },
                {
                  id: '130400',
                  pid: '130000',
                  code: '130400',
                  name: '邯郸市',
                },
                {
                  id: '230200',
                  pid: '230000',
                  code: '230200',
                  name: '齐齐哈尔市',
                },
                {
                  id: '310100',
                  pid: '310000',
                  code: '310100',
                  name: '上海市',
                },
                {
                  id: '330300',
                  pid: '330000',
                  code: '330300',
                  name: '温州市',
                },
                {
                  id: '330400',
                  pid: '330000',
                  code: '330400',
                  name: '嘉兴市',
                },
                {
                  id: '350100',
                  pid: '350000',
                  code: '350100',
                  name: '福州市',
                },
                {
                  id: '350200',
                  pid: '350000',
                  code: '350200',
                  name: '厦门市',
                },
                {
                  id: '350300',
                  pid: '350000',
                  code: '350300',
                  name: '莆田市',
                },
                {
                  id: '350400',
                  pid: '350000',
                  code: '350400',
                  name: '三明市',
                },
                {
                  id: '370200',
                  pid: '370000',
                  code: '370200',
                  name: '青岛市',
                },
                {
                  id: '370400',
                  pid: '370000',
                  code: '370400',
                  name: '枣庄市',
                },
                {
                  id: '440100',
                  pid: '440000',
                  code: '440100',
                  name: '广州市',
                },
                {
                  id: '441400',
                  pid: '440000',
                  code: '441400',
                  name: '梅州市',
                },
                {
                  id: '500100',
                  pid: '500000',
                  code: '500100',
                  name: '重庆市',
                },
                {
                  id: '510100',
                  pid: '510000',
                  code: '510100',
                  name: '成都市',
                },
                {
                  id: '510300',
                  pid: '510000',
                  code: '510300',
                  name: '自贡市',
                },
                {
                  id: '510700',
                  pid: '510000',
                  code: '510700',
                  name: '绵阳市',
                },
                {
                  id: '610500',
                  pid: '610000',
                  code: '610500',
                  name: '渭南市',
                },
                {
                  id: '611000',
                  pid: '610000',
                  code: '611000',
                  name: '商洛市',
                },
              ],
              advertising: {
                ad100000: {
                  locationId: '8025344519233667072',
                  locationCode: 'ad100000',
                  locationCodeLocType: 1,
                  locationShowTypeCode: 'GGWZXSS_LBXS',
                  locationAddressCode: '',
                  sortMaterialList: [
                    {
                      locationSort: 1,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 2,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 4,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 5,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                  ],
                },
                ad100067: {
                  locationId: '8025262208320339968',
                  locationCode: 'ad100067',
                  locationCodeLocType: 1,
                  locationShowTypeCode: 'GGWZXSS_LBXS',
                  locationAddressCode: '',
                  sortMaterialList: [
                    {
                      locationSort: 1,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 2,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 3,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 4,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                  ],
                },
                ad100065: {
                  locationId: '8025257476717608960',
                  locationCode: 'ad100065',
                  locationCodeLocType: 1,
                  locationShowTypeCode: 'GGWZXSS_LBXS',
                  locationAddressCode: '',
                  sortMaterialList: [
                    {
                      locationSort: 1,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 2,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 3,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 4,
                      materialList: [
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8025214959594831872',
                          materialCode: 'src100099',
                          materialName: 'wap端首页大广告',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/ao1jawjnekw0000.jpg',
                          materialWidth: 750,
                          materialHeight: 750,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                  ],
                },
                ad100058: {
                  locationId: '8024616854566535168',
                  locationCode: 'ad100058',
                  locationCodeLocType: 1,
                  locationShowTypeCode: 'GGWZXSS_LBXS',
                  locationAddressCode: '',
                  sortMaterialList: [
                    {
                      locationSort: 1,
                      materialList: [
                        {
                          materialId: '8022733463155965952',
                          materialCode: 'src100071',
                          materialName: '测试图片abcd',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/6g03m49lx5g0000.png',
                          materialWidth: 658,
                          materialHeight: 411,
                          materialLink: 'ww',
                        },
                      ],
                    },
                    {
                      locationSort: 2,
                      materialList: [
                        {
                          materialId: '8022733463155965952',
                          materialCode: 'src100071',
                          materialName: '测试图片abcd',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/6g03m49lx5g0000.png',
                          materialWidth: 658,
                          materialHeight: 411,
                          materialLink: 'ww',
                        },
                      ],
                    },
                  ],
                },
                ad100026: {
                  locationId: '8022646150120013824',
                  locationCode: 'ad100026',
                  locationCodeLocType: 2,
                  locationShowTypeCode: 'GGWZXSS_LBXS',
                  locationAddressCode: 'sss',
                  sortMaterialList: [
                    {
                      locationSort: 1,
                      materialList: [
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 2,
                      materialList: [
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 4,
                      materialList: [
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                    {
                      locationSort: 5,
                      materialList: [
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                        {
                          materialId: '8022645128907653120',
                          materialCode: 'src100066',
                          materialName:
                            '测试水电费水电费地方测试水电费水电费地方测试水电费水是的的地方电费地方测试水电费水电费地方测试水电费水电费地方的',
                          materialTypeCode: 'GGLX_TP',
                          materialUrl:
                            'https://img10.dgg.cn/sp/cms/3q9gqidhel00000.png',
                          materialWidth: 100,
                          materialHeight: 100,
                          materialLink: 'https://www.baidu.com',
                        },
                      ],
                    },
                  ],
                },
              },
              information: [
                {
                  id: '8025578155790893056',
                  categoryCode: 'con100761',
                  categoryId: '8025296492578013184',
                  type: '8014312385285255168',
                  listType: 1,
                  linkType: 4,
                  publishType: 1,
                  terminalCode: 'COMDIC_TERMINAL_APP',
                  platformCode: 'COMDIC_PLATFORM_QIDASHUN',
                  platformName: '企大顺',
                  terminalName: 'APP',
                  title: '企大顺APP项目启动',
                  enTitle: '',
                  subtitle: '企大顺APP已经启动啦',
                  imageUrl: '',
                  androidRoute: '',
                  iosRoute: '',
                  wapRoute: '',
                  jumpImageUrl:
                    'https://img10.dgg.cn/sp/cms/asforb190800000.png',
                  seoTitle: '',
                  seoKeywords: '',
                  seoDescription: '',
                  description: '企大顺APP已经启动啦',
                  sort: 0,
                  newsReadAll: 0,
                  link: '',
                  isTop: 0,
                  isRecommend: 1,
                  status: 2,
                  flag: 1,
                  createrId: '1234567890123456789',
                  createrName: '系统管理员',
                  publisherId: '1234567890123456789',
                  publisherName: '系统管理员',
                  publishTime: '2020-12-11 11:26:07',
                  createTime: '2020-12-11 11:25:53',
                  updaterId: '1234567890123456789',
                  updaterName: '系统管理员',
                  updateTime: '2020-12-11 11:25:53',
                },
                {
                  id: '8025341855846432768',
                  categoryCode: 'con100014',
                  categoryId: '8025341853560537088',
                  type: '8014309601622159360',
                  listType: 1,
                  linkType: 1,
                  publishType: 2,
                  terminalCode: 'COMDIC_TERMINAL_APP',
                  platformCode: 'COMDIC_PLATFORM_QIDASHUN',
                  platformName: '企大顺',
                  terminalName: 'APP',
                  title: 'test_title_239',
                  enTitle: '',
                  subtitle: 'test_f_title_239',
                  imageUrl: '',
                  androidRoute: '',
                  iosRoute: '',
                  wapRoute: '',
                  jumpImageUrl: '',
                  seoTitle: '',
                  seoKeywords: '',
                  seoDescription: '',
                  description: 'test_Abstract_239',
                  sort: 0,
                  newsReadAll: 0,
                  link: '',
                  isTop: 0,
                  isRecommend: 0,
                  status: 2,
                  flag: 1,
                  createrId: '1234567890123456789',
                  createrName: '系统管理员',
                  publisherId: '1234567890123456789',
                  publisherName: '系统管理员',
                  publishTime: '2020-12-10 20:46:57',
                  createTime: '2020-12-10 19:46:55',
                  updaterId: '1234567890123456789',
                  updaterName: '系统管理员',
                  updateTime: '2020-12-10 19:46:55',
                },
                {
                  id: '8025298825932242944',
                  categoryCode: 'con100758',
                  categoryId: '8025296303565897728',
                  type: '8014312385285255168',
                  listType: 1,
                  linkType: 1,
                  publishType: 1,
                  terminalCode: 'COMDIC_TERMINAL_APP',
                  platformCode: 'COMDIC_PLATFORM_QIDASHUN',
                  platformName: '',
                  terminalName: '',
                  title: 'CRM规则调整了',
                  enTitle: '',
                  subtitle: 'CRM规则调整了',
                  imageUrl: 'https://img10.dgg.cn/sp/cms/5jfm8jnw5nc0000.png',
                  androidRoute: '',
                  iosRoute: '',
                  wapRoute: '',
                  jumpImageUrl: '',
                  seoTitle: '',
                  seoKeywords: '',
                  seoDescription: '',
                  description: 'CRM规则调整了',
                  sort: 6,
                  newsReadAll: 0,
                  link: '',
                  isTop: 0,
                  isRecommend: 0,
                  status: 2,
                  flag: 1,
                  createrId: '1234567890123456789',
                  createrName: '系统管理员',
                  publisherId: '1234567890123456789',
                  publisherName: '系统管理员',
                  publishTime: '2020-12-10 17:02:48',
                  createTime: '2020-12-10 16:55:56',
                  updaterId: '1234567890123456789',
                  updaterName: '系统管理员',
                  updateTime: '2020-12-10 16:55:56',
                },
              ],
            },
          }
          this.asyncData.preferential =
            data.data.advertising[this.preferentialCode].sortMaterialList
          this.asyncData.information = data.data.information
          this.asyncData.rotationAd = data.data.advertising
          console.log(res)
        })
    }
  },
  mounted() {
    console.log(this.initData)
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  /deep/ .sp-sticky--fixed {
    max-width: 1000px;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
