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
      <Registerlist />
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
      <h5>咨询规划师</h5>
      <Consult />
      <!-- <Planner :planners="planners" /> -->
    </div>
    <!-- E咨询规划师 -->
    <!-- S其他服务 -->
    <div class="service">
      <h5>您可能还需要其他服务</h5>
      <div class="serice-item">
        <a v-for="(item, index) of sericeImg" :key="index" href=""
          ><span> <sp-image width="104px" height="94px" :src="item.img" /></span
        ></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <div class="help">
      <QueryPhone />
    </div>
    <div class="foot"><Bottom /></div>
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
import Consult from '@/components/spread/companyRegistry/Consult'
import QueryPhone from '@/components/spread/companyRegistry/QueryPhone'
import Bottom from '@/components/spread/companyRegistry/bottom'
import Planner from '@/components/spread/common/planner'

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
    Consult,
    QueryPhone,
    Bottom,
    // Planner,
  },
  data() {
    return {
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
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_yzkz.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_yhfw.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_dljz.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_xkzbl.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_gsbg.png'),
        },
        {
          img: require('~/assets/spreadImages/company_registry/busi_img_nkn_gsjy.png'),
        },
      ],
      // planners: [
      //   {
      //     id: 1,
      //     type: '金牌规划师',
      //     avatarImg: require('~/assets/spreadImages/home/busi_img_gscsrx01.jpg'),
      //     name: '郭亮亮',
      //     shuPianFen: 11,
      //     serverNum: 250,
      //     telephone: 12345679985,
      //     labels: ['工商注册', '财税咨询', '税务筹划'],
      //   },
      //   {
      //     id: 2,
      //     type: '金牌规划师',
      //     avatarImg: require('~/assets/spreadImages/home/busi_img_gscsrx01.jpg'),
      //     name: '郭亮亮',
      //     shuPianFen: 11,
      //     serverNum: 250,
      //     telephone: 12345679985,
      //     labels: ['工商注册', '财税咨询', '税务筹划'],
      //   },
      // ],
    }
  },
  methods: {
    onClickLeft() {
      console.log('返回')
    },
  },
}
</script>
<style lang="less" scoped>
.company-registry {
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
    padding: 64px 42px 0 42px;
    h5 {
      font-size: 40px;
      margin-bottom: 36px;
    }
  }
  .refer {
    padding: 34px 0px 0 42px;
    h5 {
      font-size: 40px;
      margin-bottom: 0px;
    }
  }
  .service {
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
