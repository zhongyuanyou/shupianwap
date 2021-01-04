<template>
  <div class="company-register">
    <div class="company-top" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
      <sp-top-nav-bar
        background="rgba(255, 255, 255, 0)"
        ellipsis
        @on-click-left="onClickLeft"
      >
        <div slot="left" class="nav-back">
          <my-icon name="nav_ic_back" size="0.40rem" color="#ffffff"></my-icon>
        </div>
      </sp-top-nav-bar>
      <span class="location" @click="onMore"
        >{{ currentCity }}
        <my-icon name="tap_ic_pen_n" size="0.14rem" color="#ffffff"></my-icon>
      </span>
    </div>
  </div>
</template>
<script>
import { TopNavBar } from '@chipspc/vant-dgg'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
  },
  data() {
    return {
      // cityName: '成都',
      bgImg: require('~/assets/spreadImages/companyRegister/Step1-img-banner.jpg'),
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity.name, // 当前选择的城市
      positionCityName: (state) => state.city.positionCityName, // 当前定位城市
      positionStatus: (state) => state.city.positionStatus, // 定位状态（0：定位失败 1：定位成功但未开通该城市服务 2：定位成功且有对应的城市服务）
    }),
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    onMore() {
      this.$router.push({ path: '/city/choiceCity' })
    },
  },
}
</script>
<style lang="less" scoped>
.company-register {
  /deep/.company-top {
    height: 378px;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;
    .sp-hairline--bottom::after {
      border-bottom-width: 0;
    }
    .nav-back {
      font-weight: 400;
    }
    .location {
      position: absolute;
      left: 48px;
      bottom: 58px;
      width: 113px;
      height: 44px;
      line-height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 22px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      display: block;
      color: #ffffff;
      text-align: center;
      /deep/.spiconfont-tap_ic_pen_n {
        font-weight: 400;
        display: inline-block;
        transform:translate(0,-3px)
        // transform: scale(0.69);
      }
    }
  }
}
</style>
