<template>
  <div class="system">
    <!-- S 头部分 -->
    <Header :title="TopTitle" />
    <!-- E 头部分 -->
    <!-- S banner轮播 -->
    <BannerSwipe :banner-images="bannerImages" />
    <!-- E banner轮播 -->
    <!-- S 表单 -->
    <Card :card-title="'体系认证 费用测算'" />
    <!-- E 表单 -->
    <!-- S 列表 -->
    <!-- <SystemList /> -->
    <!-- <ServiceIntroduced /> -->
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
          @click="onService(item.url, index)"
        >
          <sp-image :src="item.img"
        /></a>
      </div>
    </div>
    <!-- E其他服务 -->
    <!-- S立即咨询 -->
    <ConsultTel
      :title="'有疑问？千万企服规划师为您免费解答'"
      :tel="'4000 - 535800'"
    />
    <ShuPianZhaoRen />
    <!-- S立即咨询 -->
    <!-- S底部咨询 -->
    <FixedBottom :planner="planner" />
    <!-- E底部咨询 -->
    <dgg-im-company></dgg-im-company>
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import BannerSwipe from '@/components/spread/system/BannerSwiper'
import Card from '@/components/spread/system/Card'
// import SystemList from '@/components/spread/system/ListSystem'
// import ServiceIntroduced from '@/compnents/spread/common/ServiceIntroduced'
import SidebarNavbar from '@/components/spread/system/SidebarNavbar'
import ConsultPhone from '~/components/spread/system/ConsultPhone'
import Benefit from '~/components/spread/system/Benefit'
import GuiHuaShiSwipe from '~/components/spread/common/GuiHuaShiSwipe'
import ConsultTel from '~/components/spread/common/ConsultTel'
import ShuPianZhaoRen from '~/components/spread/common/ShuPianZhaoRen'
import FixedBottom from '@/components/spread/common/FixedBottom'
import dggImCompany from '~/components/spread/DggImCompany'
import { spreadApi } from '@/api/spread'

export default {
  components: {
    [Image.name]: Image,
    Header,

    BannerSwipe,
    Card,
    // SystemList,
    // ServiceIntroduced,
    SidebarNavbar,
    ConsultPhone,
    Benefit,
    GuiHuaShiSwipe,
    ConsultTel,
    ShuPianZhaoRen,
    FixedBottom,
    dggImCompany,
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
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注册_咨询规划师_在线咨询',
        telName: '工商注册_咨询规划师_电话',
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
          name: '工商注册_你可能还需要其他服务_税务筹划',
          url: 'https://shupian.dgg.cn/spread/tax',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2dv958uknitc000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: 'https://shupian.dgg.cn/spread/agency/',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/72gbx82vsnk0000.png',
          name: '工商注册_你可能还需要其他服务_其他服务',
          url: '',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/d4jmafpuy5s0000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: 'https://shupian.dgg.cn/spread/agency/',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/elaeb6is89s0000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: 'https://shupian.dgg.cn/spread/agency/',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/2ni7sgi4kii0000.png',
          name: '工商注册_你可能还需要其他服务_代理记账',
          url: 'https://shupian.dgg.cn/spread/agency/',
        },
      ],
    }
  },
  methods: {
    onService(url, index) {
      if (url !== '') {
        window.location.href = url
      } else {
        this.$root.$emit(
          'openIMM',
          '7862495547640840192',
          '张毅',
          '107547',
          'https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/my/trueAndFalse/gw_defult.png'
          // this.listCount[index].id,
          // this.listCount[index].name,
          // this.listCount[index].jobNum,
          // this.listCount[index].imgSrc
        )
      }
    },
  },
}
</script>

<style lang="less" scoped>
.system {
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
    }
  }
  // 立即咨询title
  /deep/.cousulttel-title {
    text-align: left;
  }
}
</style>
