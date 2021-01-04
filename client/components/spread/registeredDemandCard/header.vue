<template>
  <div class="header" :style="{ backgroundImage: 'url(' + imgSrc + ')' }">
    <!-- 头部分 -->
    <Header :title="title" />
    <div class="content">
      <a href="javascript:;" @click="chooseCity()">
        <span>{{ currentCity || '成都市' }}</span>
        <my-icon
          name="tap_ic_pen_n"
          color="#ffffff"
          size="0.14rem"
          class="icon"
        >
        </my-icon>
      </a>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import MyIcon from '../../common/myIcon/MyIcon.vue'
import Header from '@/components/common/head/header.vue'

export default {
  components: {
    Header,
    MyIcon,
  },
  data() {
    return {
      title: '',
      imgSrc: require('~/assets/spreadImages/registeredDemandCard/Step1-img-banner.jpg'),
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity.name, // 当前选择的城市
    }),
  },

  methods: {
    chooseCity() {
      this.$router.push('/city/choiceCity')
    },
  },
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 378px;
  background-size: 100% 100%;
  position: relative;
  /deep/.fixed-head {
    /deep/.my-head {
      background: transparent;
      width: 750px;
      left: 50%;
      margin-left: -375px;
      box-shadow: 0 0 0 0;
      position: absolute;
      z-index: 2;
    }
    /deep/.back-icon {
      color: #ffffff !important;
    }
  }
  .content {
    height: 290px;
    a {
      position: absolute;
      z-index: 1;
      bottom: 50px;
      display: block;
      // width: 113px;
      height: 44px;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 48px;
      margin-top: 39px;
      padding: 10px 20px;
      > span {
        display: block;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
        overflow: hidden;
      }
      .icon {
        margin-left: 12px;
      }
    }
  }
}
</style>
