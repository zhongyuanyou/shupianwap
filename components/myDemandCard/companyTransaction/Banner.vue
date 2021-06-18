<template>
  <div class="banner">
    <!--    城市按钮  -->
    <div class="banner-button" @click="tabCity">
      <div class="banner-button-city">{{ currentCity.name || '成都市' }}</div>
      <my-icon
        name="sear_ic_open"
        color="#ffffff"
        size="0.14rem"
        class="icon banner-button-icon"
      ></my-icon>
    </div>
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
export default {
  name: 'Banner',
  components: { [TopNavBar.name]: TopNavBar },
  data() {
    return {
      city: '成都',
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity,
    }),
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    tabCity() {
      this.$router.push({ path: '/city/choiceCity' })
    },
  },
}
</script>

<style scoped lang="less">
.head {
  font-weight: lighter;
}
.banner {
  height: 320px;
  font-size: 0;
  position: relative;
  background-position: center center;
  background-size: 100% 100%;
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/13zjhce6649s000.jpg');
  &-button {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 22px;
    position: absolute;
    left: 48px;
    bottom: 58px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    display: flex;
    align-items: center;
    line-height: 24px;
    height: 44px;
    &-icon {
      margin-left: 12px;
    }
  }
}
//::v-deep .sp-top-nav-bar--fixed {
//  width: 750px;
//  margin-left: 50%;
//  transform: translateX(-375px);
//}
//// 头部组件多出线条的修改
//::v-deep .sp-hairline--bottom::after {
//  border: none;
//}
</style>
