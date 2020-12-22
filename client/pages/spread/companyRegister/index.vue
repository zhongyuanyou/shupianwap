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
    <!-- S注册公司准备工作-平台优势 -->
    <!-- <div class="register-ready"></div> -->
    <RegisterReady />
    <!-- E注册公司准备工作-平台优势 -->
    <!-- S咨询规划师 -->
    <div class="refer">
      <Planner :planners="planners" />
    </div>
    <!-- E咨询规划师 -->
    <!-- S其他服务 -->
    <div class="service">
      <h5>您可能还需要其他服务</h5>
      <div class="serice-item">
        <a href=""
          ><span>
            <sp-image
              width="104px"
              height="94px"
              :src="
                require('~/assets/spreadImages/company_registry/busi_img_nkn_swch.png')
              "
            /> </span
        ></a>
        <a href="">
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
        <a href="">
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
    <div class="help">
      <QueryPhone />
    </div>
    <div class="foot"><Bottom /></div>
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
import Standard from '@/components/spread/companyRegistry/standard.vue'
import RegisterReady from '@/components/spread/companyRegistry/RegisterReady'
import QueryPhone from '@/components/spread/companyRegistry/QueryPhone'
import Bottom from '@/components/spread/companyRegistry/bottom'
import Planner from '~/components/spread/common/GuiHuaShiSwipe'
import dggImCompany from '@/components/spread/dggImCompany'
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
    QueryPhone,
    Bottom,
    Planner,
    dggImCompany,
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
          avatarImg: require('~/assets/spreadImages/home/busi_img_gscsys04.png'),
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        },
        {
          id: 2,
          type: '金牌规划师',
          avatarImg: require('~/assets/spreadImages/home/busi_img_gscsys04.png'),
          name: '郭亮亮',
          shuPianFen: 11,
          serverNum: 250,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
        },
      ],
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
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
    onMore() {
      this.isMore ? (this.isMore = false) : (this.isMore = true)
    },
  },
}
</script>
<style lang="less" scoped>
.company-registry {
  width: 750px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 196px;
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
    padding-top: 50px;
    .more {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      color: #555555;
      line-height: 44px;
      padding: 8px 0 40px 0;
      padding-bottom: 24px;
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
  .help,
  .foot {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 40px 0 40px;
  }
}
</style>
