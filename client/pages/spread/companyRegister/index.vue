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
        <span @click="onMore"
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
        :plannersdata="planners"
        :title="plannersTitle"
      ></GuiHuaShiSwipe>
    </div>
    <!-- E咨询规划师 -->
    <!-- S其他服务 -->
    <div class="service">
      <h5>您可能还需要其他服务</h5>
      <div class="serice-item">
        <a @click="onService('')"
          ><span>
            <sp-image
              width="104px"
              height="94px"
              :src="
                require('~/assets/spreadImages/company_registry/busi_img_nkn_swch.png')
              "
            /> </span
        ></a>
        <a @click="onService('')">
          <span>
            <sp-image
              width="104px"
              height="94px"
              :src="
                require('~/assets/spreadImages/company_registry/busi_img_nkn_dljz.png')
              "
            />
          </span>
        </a>
        <a @click="onService('')">
          <span>
            <sp-image
              width="104px"
              height="94px"
              :src="
                require('~/assets/spreadImages/company_registry/busi_img_nkn_qtfw.png')
              "
            />
          </span>
        </a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S立即咨询 -->
    <div class="help">
      <ConsultTel :title="myTitle" :tel="tel" />
      <ShuPianZhaoRen />
    </div>
    <!-- E立即咨询 -->
    <div class="foot"><FixedBottom :data="data" /></div>
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
} from '@chipspc/vant-dgg'
import Card from '@/components/spread/companyRegistry/Card.vue'
import Registerlist from '@/components/spread/companyRegistry/Registerlist.vue'
import Standard from '@/components/spread/companyRegistry/Standard.vue'
import RegisterReady from '@/components/spread/companyRegistry/RegisterReady'
import FixedBottom from '@/components/spread/common/FixedBottom'
import GuiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import ConsultTel from '~/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import dggImCompany from '~/components/spread/DggImCompany'
export default {
  name: 'CompanyRegistry',
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
  data() {
    return {
      isMore: false,
      bannerImages: [
        {
          code: 1,
          url: '',
          img: require('~/assets/spreadImages/company_registry/busi_img_gszcbanner01.jpg'),
        },
        {
          code: 1,
          url: '',
          img: require('~/assets/spreadImages/company_registry/busi_img_gszcbanner02.jpg'),
        },
      ],
      sericeImg: [
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_swch.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_dljz.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_qtfw.png'),
        },
      ],
      planners: [
        {
          id: 1,
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 138,
          serverNum: 258,
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
      plannersTitle: '咨询规划师',
      listCount: [
        {
          pric: 4000,
          bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_yxze.png'),
        },
        {
          pric: 5000,
          bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_gtzc.png'),
        },
        {
          pric: 7000,
          bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_fgs.png'),
        },
        {
          pric: 7000,
          bgImg: require('~/assets/spreadImages/company_registry/busi_img_fwjs_fgs.png'),
        },
      ],
      data: {
        show: {
          imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
          cardName: '王深林',
          cardSign: '金牌规划师',
          icon: '',
          round: true,
          avatarSize: 40,
        },
        info: {
          id: '7862495547640840192',
          name: '张毅',
          jobNum: '107547',
          telephone: '18402858698',
        },
      },
      myTitle: '有疑问？千万企服专家为您免费解答',
      tel: '4000-535800',
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
    onMore() {
      this.isMore ? (this.isMore = false) : (this.isMore = true)
    },
    onService(url) {
      if (url !== '') {
        window.location.href = url
      } else {
        this.$root.$emit('openIMM', '7862495547640840192', '张毅', '107547')
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
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.company-registry {
  width: 750px;
  margin: 0 auto;
  position: relative;
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
    }
  }
  .introduction {
    padding-top: 64px;
    .more {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #555555;
      line-height: 44px;
      padding: 8px 0 40px 0;
    }
  }
  .service {
    padding-top: 14px;
    margin: 0 auto;
    .serice-item {
      margin: 0 auto;
      width: 670px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      span {
        width: 207px;
        height: 187px;
        background: #ffffff;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.08);
      }
    }
  }
  .help {
    /deep/.cousulttel-bottom {
      text-align: left;
    }
  }
}
</style>
