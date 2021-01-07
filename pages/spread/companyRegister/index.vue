<template>
  <div class="company-registry">
    <sp-top-nav-bar
      title="公司注册"
      background="#FFFFFF"
      title-color="#1A1A1A"
      ellipsis
      @on-click-left="onClickLeft"
    >
      <div slot="left" class="nav-back">
        <my-icon name="nav_ic_back" size="0.40rem" color="#1a1a1a"></my-icon>
      </div>
    </sp-top-nav-bar>
    <div class="banner-img">
      <sp-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <sp-swipe-item v-for="(image, index) in bannerImages" :key="index">
          <nuxt-link :to="{ name: image.url }">
            <sp-image :src="image.img" fit="cover"
          /></nuxt-link>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div class="precontract">
      <Card />
    </div>
    <div class="introduction">
      <h5>服务介绍</h5>
      <Registerlist :list-count="listCount" :is-more="isMore" />
      <p v-show="listCount.length > 3" class="more">
        <span
          v-md-map
          v-md:webClick
          data-name="工商注册_服务介绍_展开更多"
          @click="onMore"
          >更多服务
          <my-icon
            :name="isMore ? 'tab_ic_all_s' : 'tab_ic_all_n'"
            size="13px"
            color="#555555"
          ></my-icon
        ></span>
      </p>
    </div>
    <div class="norm">
      <h5>办理标准</h5>
      <Standard />
    </div>
    <!-- S立即咨询 -->
    <div class="help"><ConsultTel :title="myTitle" :tel="tel" /></div>
    <!-- E立即咨询 -->
    <!-- S注册公司准备工作-平台优势 -->
    <RegisterReady />
    <!-- E注册公司准备工作-平台优势 -->
    <!-- S咨询规划师 -->
    <div class="refer">
      <GuiHuaShiSwipe
        :planners-data="guiHuaShiList"
        :planners-common="plannersCommon"
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
          v-md-map
          v-md:webClick
          :data-name="item.name"
          @click="onService('', index)"
        >
          <sp-image :src="item.img"
        /></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel :title="myTitle" :tel="tel" />
      <ShuPianZhaoRen />
    </div>
    <!-- E立即咨询 -->
    <div class="foot">
      <FixedBottom :planner="planner" />
    </div>
    <dgg-im-company></dgg-im-company>
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  Sticky,
} from '@chipspc/vant-dgg'
import Card from '@/components/spread/companyRegistry/Card.vue'
import Registerlist from '@/components/spread/companyRegistry/Registerlist.vue'
import Standard from '@/components/spread/companyRegistry/Standard'
import RegisterReady from '@/components/spread/companyRegistry/RegisterReady'
import FixedBottom from '@/components/spread/common/FixedBottom'
import GuiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import ConsultTel from '~/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import dggImCompany from '~/components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'
export default {
  name: 'Index',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Image.name]: Image,
    RegisterReady,
    Card,
    Registerlist,
    Standard,
    ConsultTel,
    ShuPianZhaoRen,
    GuiHuaShiSwipe,
    dggImCompany,
    FixedBottom,
  },
  async asyncData({ $axios }) {
    const type = 'extendBussineReg'
    const defaultRes = {
      code: 200,
      message: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
      data: {
        adList: [
          {
            pageCode: 'extendBussineReg',
            locationShowTypeCode: 'GGWZXSS_GDXS',
            locationName: 'wap-推广页-工商注册广告',
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
                    materialName: '工商注册广告物料1-1',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineReg1',
                    productDetail: {
                      id: 'extendBussineReg1',
                      name: '',
                      referencePrice: 888,
                      operating: {
                        showName: '有限责任公司',
                        slogan: '',
                        productDescribe: '',
                        actualViews: 6439,
                        defaultSales: 4932,
                        actualSales: 4930,
                      },
                    },
                  },
                ],
              },
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
                    materialName: '工商注册广告物料1-2',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineReg2',
                    productDetail: {
                      id: 'extendBussineReg2',
                      name: '个体注册',
                      referencePrice: 688,
                      operating: {
                        showName: '个体注册',
                        slogan: '',
                        productDescribe: '',
                        actualViews: 3291,
                        defaultSales: 1837,
                        actualSales: 1832,
                      },
                    },
                  },
                ],
              },
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
                    materialName: '工商注册广告物料1-3',
                    androidLink: '',
                    materialWidth: 750,
                    iosLink: '',
                    linkType: 2,
                    wapLink: '',
                    executeParam: '',
                    productId: 'extendBussineReg3',
                    productDetail: {
                      id: 'extendBussineReg3',
                      name: '',
                      referencePrice: 4000,
                      operating: {
                        showName: '分公司注册',
                        slogan: '',
                        productDescribe: '',
                        actualViews: 541,
                        defaultSales: 393,
                        actualSales: 387,
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
            id: 30006,
            userId: '3394',
            userCentreId: '3394',
            loginName: '2022554',
            realName: '刘琴',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/0F/72/CgAAB19ExY6EVv-6AAAAAG6SJVc351.jpg',
            userPhone: '13350072314',
            cvr: 0.0625,
            cvrValue: 58.420922,
            orderBus: 3,
            orderBusValue: 48.092239,
            busPerformance: 4412.4,
            busPerformanceValue: 68.377345,
            abilityValue: 60.176291,
            formatType: '工商',
          },
          {
            id: 30169,
            userId: '7887200447593906176',
            userCentreId: '7887200447257313280',
            loginName: '108862',
            realName: '李劲',
            userHeadUrl:
              'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
            userPhone: '18884259139',
            cvr: 0.204545,
            cvrValue: 68.643112,
            orderBus: 9,
            orderBusValue: 51.522266,
            busPerformance: 12192,
            busPerformanceValue: 86.706115,
            abilityValue: 72.060582,
            formatType: '工商',
          },
          {
            id: 30182,
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
            id: 30028,
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
            id: 30035,
            userId: '66475',
            userCentreId: '66475',
            loginName: '38798340',
            realName: '钟霞',
            userHeadUrl:
              'http://fastdfs.dggvip.net:8080/group1/M00/0F/E7/CgAAB19jRe-EZCmnAAAAAOB-9qQ642.jpg',
            userPhone: '13730634929',
            cvr: 0.152542,
            cvrValue: 65.048084,
            orderBus: 9,
            orderBusValue: 51.522266,
            busPerformance: 20770,
            busPerformanceValue: 95.658559,
            abilityValue: 73.069267,
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
          resultData: res,
        }
      } else {
        return {
          resultData: defaultRes,
        }
      }
    } catch (error) {
      console.log('error', error)
      return { resultData: defaultRes }
    }
  },
  data() {
    return {
      isMore: false,
      bannerImages: [
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/92ccqbb36mg0000.jpg',
        },
        {
          code: 1,
          url: '',
          img: 'https://cdn.shupian.cn/sp-pt/wap/fzcndei5exs0000.jpg',
        },
      ],
      // 其他服务
      sericeImg: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/f67zabgy4w00000.png',
          name: '工商注册_你可能还需要其他服务_税务筹划',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/7mdee1enz8s0000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/86kmcgq4i1s0000.png',
          name: '工商注册_你可能还需要其他服务_其他服务',
        },
      ],
      // 规划师轮播列表
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
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
      },
      // 列表
      listCount: [
        {
          pric: 4000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/a0761uxgsiw0000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 5000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/kbpgoqhkn58000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/v5qbb7umt7k000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/2d721lqgmtz4000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/9odvjxumogs0000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
        {
          pric: 7000,
          bgImg: 'https://cdn.shupian.cn/sp-pt/wap/d8yaj7dckgw0000.png',
          imgSrc:
            'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
          operating: {
            actualViews: 3291,
            defaultSales: 1837,
            actualSales: 1832,
          },
        },
      ],
      planner: {
        id: '7862495547640840192',
        name: '张毅',
        jobNum: '107547',
        telephone: '18402858698',
        imgSrc:
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png',
      },
      myTitle: '有疑问？千万企服专家为您免费解答',
      tel: '4000-962540',
    }
  },
  created() {
    if (this.resultData.data !== 0) {
      this.ListCount(this.resultData.data || [])
      this.plannerData(this.resultData.data.planlerList || [])
    }
  },
  methods: {
    // listCout列表数据处理
    ListCount(data) {
      const listAll = data.adList[0].sortMaterialList
      if (listAll.length !== 0) {
        listAll.forEach((elem, index) => {
          const priceVal = elem.materialList[0].productDetail.referencePrice
          const operatingVal = elem.materialList[0].productDetail.operating
          this.listCount[index].pric = priceVal
          this.listCount[index].operating = operatingVal
          if (data.planlerList.length > index) {
            console.log(data.planlerList)
            this.listCount[index].id =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ].userCentreId
            this.listCount[index].name =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ].realName
            this.listCount[index].jobNum =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ].loginName
            this.listCount[index].telephone =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ].userPhone
            this.listCount[index].imgSrc =
              data.planlerList[
                `${
                  index < data.planlerList.length
                    ? index
                    : Math.floor(Math.random() * data.planlerList.length)
                }`
              ].userHeadUrl
          }
        })
      }
    },
    // 规划师数据
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
            shuPianFen: 11,
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
    onClickLeft() {
      this.$router.go(-1)
    },
    onMore() {
      this.isMore ? (this.isMore = false) : (this.isMore = true)
    },
    onService(url, index) {
      if (url !== '') {
        window.location.href = url
      } else {
        this.$root.$emit(
          'openIMM',
          this.listCount[index].id,
          this.listCount[index].name,
          this.listCount[index].jobNum,
          this.listCount[index].imgSrc
        )
      }
    },
  },

  head() {
    return {
      title: '工商注册-公司注册',
      script: [
        {
          src: 'https://tgform.dgg.cn/form/new_form/promotion-sdk-v1.0.min.js',
          ssr: false,
          type: 'text/javascript',
          charset: 'utf-8',
        },
        {
          src: '/js/spread/companyRegister-md-config.js',
        },
        {
          src: 'https://ptcdn.dgg.cn/md/dgg-md-sdk.min.js',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.company-registry {
  width: @spread-page-width;
  margin: 0 auto;
  position: relative;
  font-family: PingFang SC;
  .banner-img {
    /deep/.my-swipe .sp-swipe-item {
      color: #fff;
      font-size: 20px;
      height: 392px;
      text-align: center;
      img {
        width: 100%;
        height: 392px;
      }
    }
  }
  .introduction,
  .norm,
  .service {
    padding: 24px 42px 0 38px;
    h5 {
      font-size: 40px;
      margin-bottom: 32px;
      height: 40px;
      line-height: 40px;
    }
  }
  .norm {
    padding: 64px 42px 0 38px;
    h5 {
      margin-bottom: 32px;
    }
  }
  .introduction {
    padding-top: 56px;
    h5 {
      margin-bottom: 32px;
    }
    .more {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #555555;
      line-height: 44px;
      padding: 12px 0 0 0;
    }
  }
  .service {
    padding-top: 20px;
    margin: 0 auto;
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
    }
  }
  .help {
    /deep/.cousulttel-title {
      text-align: left;
    }
  }
  .refer {
    .planner {
      padding-top: 6px;
    }
  }
}
</style>
