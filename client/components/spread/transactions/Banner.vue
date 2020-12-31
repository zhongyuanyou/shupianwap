<template>
  <div class="banner" :style="{ backgroundImage: 'url(' + bg + ')' }">
    <!--  头部  -->
    <sp-top-nav-bar
      title=""
      background="transparent"
      title-color="#1A1A1A"
      ellipsis
      @on-click-left="onClickLeft"
    >
      <div slot="left" class="banner-head">
        <my-icon name="nav_ic_back" size="0.40rem" color="#e5e8fa"></my-icon>
      </div>
    </sp-top-nav-bar>
    <!--  城市按钮  -->
    <button class="banner-button" @click="tabCity">
      {{ city }}
      <my-icon
        name="tap_ic_pesSn_n"
        color="#ffffff"
        size="0.14rem"
        class="icon banner-button-icon"
      ></my-icon>
    </button>
  </div>
</template>

<script>
import { TopNavBar } from '@chipspc/vant-dgg'
export default {
  name: 'Banner',
  components: { [TopNavBar.name]: TopNavBar },
  data() {
    return {
      city: '成都',
      bg: require('../../../assets/spreadImages/transactions/Step1-img-banner.jpg'),
    }
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
.banner {
  height: 378px;
  font-size: 0;
  position: relative;
  background-position: center center;
  background-size: 100% 100%;
  &-head {
    font-weight: lighter;
  }
  &-button {
    width: 113px;
    height: 44px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 22px;
    padding: 0;
    position: absolute;
    left: 48px;
    bottom: 58px;
    font-size: 24px;
    font-weight: bold;
    color: #ffffff;
    &-icon {
      margin-left: 10px;
    }
  }
}
// 头部组件多出线条的修改
/deep/ .sp-hairline--bottom::after {
  border: none;
}
</style>
