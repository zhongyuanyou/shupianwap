<template>
  <div>
    <!--    头部  -->
    <!--    <sp-top-nav-bar-->
    <!--      title="轻松找服务"-->
    <!--      background="#ffffff"-->
    <!--      title-color="#1A1A1A"-->
    <!--      ellipsis-->
    <!--      :fixed="true"-->
    <!--      :placeholder="true"-->
    <!--      z-index="999"-->
    <!--      @on-click-left="onClickLeft"-->
    <!--    >-->
    <!--      <div slot="left" class="head">-->
    <!--        <my-icon name="nav_ic_back" size="0.4rem" color="#1a1a1a"></my-icon>-->
    <!--      </div>-->
    <!--    </sp-top-nav-bar>-->
    <div class="banner">
      <!--    城市按钮  -->
      <div class="banner-button" @click="tabCity">
        <div class="banner-button-city">{{ currentCity.name || '成都市' }}</div>
        <my-icon
          name="tap_ic_pen_n"
          color="#ffffff"
          size="0.14rem"
          class="icon banner-button-icon"
        ></my-icon>
      </div>
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
///deep/ .sp-top-nav-bar--fixed {
//  width: 750px;
//  margin-left: 50%;
//  transform: translateX(-375px);
//}
//// 头部组件多出线条的修改
///deep/ .sp-hairline--bottom::after {
//  border: none;
//}
</style>
