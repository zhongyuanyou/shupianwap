<template>
  <div class="company-register">
    <div class="company-top" :style="{ backgroundImage: 'url(' + bgImg + ')' }">
      <span class="location" @click="onMore"
        >{{ currentCity || '成都市' }}
        <my-icon name="sear_ic_open" size="0.14rem" color="#ffffff"></my-icon>
      </span>
    </div>
  </div>
</template>
<script>
import { Icon } from '@chipspc/vant-dgg'
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  components: {
    [Icon.name]: Icon,
  },
  data() {
    return {
      bgImg: 'https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg',
    }
  },
  computed: {
    ...mapState({
      currentCity(state) {
        this.$emit('onCity', state.city.currentCity)
        return state.city.currentCity.name
      }, // 当前选择的城市
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
    height: 320px;
    background-position: center center;
    background-size: 100% 100%;
    position: relative;

    .location {
      position: absolute;
      left: 48px;
      bottom: 58px;
      padding: 0 20px;
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
      /deep/.spiconfont {
        font-weight: 400;
        display: inline-block;
        transform: translate(0, -4px);
      }
    }
  }
  .sp-hairline--bottom::after {
    border-bottom-width: 0;
  }
  .nav-back {
    font-weight: 400;
  }
}
</style>
