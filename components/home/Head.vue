<template>
  <div class="page-head">
    <div
      class="bg-area"
      :class="fiexdBannerData.length ? 'bg-area2' : 'bg-activity'"
    >
      <span class="logo"></span>
      <span class="span-2">薯片</span>
      <span class="span-3">·</span>
      <span class="span-4">企业服务大平台</span>
      <div class="btn-city" @click="swichCityHandle">
        <span class="current-city">{{ cityName ? cityName : '定位中' }}</span>
        <span class="local-icon">
          <!-- <my-icon
            name="nav_ic_openpoint2x"
            size="0.04rem"
            color="#fff"
          ></my-icon> -->
        </span>
      </div>
    </div>
    <div v-if="fiexdBannerData.length" class="swiper-content">
      <sp-swipe
        class="my-swipe"
        :autoplay="autoplay"
        :show-indicators="indicators"
      >
        <sp-swipe-item v-for="(item, index) in fiexdBannerData" :key="index">
          <a
            href="javascript:void(0)"
            class="swiper-box"
            @click="adJumpHandleMixin(item.materialList[0])"
          >
            <img
              :src="item.materialList[0].materialUrl + $ossImgSet(750, 552)"
              alt=""
            />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div :class="pageScrollTop < 300 ? 'search-box' : ''">
      <sp-sticky>
        <Search
          ref="searchRef"
          :icon-left="0.24"
          :disabled="true"
          :opacity="opacity"
          :class="pageScrollTop > 300 ? 'serch-area' : ''"
          placeholder="搜索您想找的服务"
          @clickInputHandle="clickInputHandle"
        >
          <template v-if="showSearchCityBtn" v-slot:center>
            <div class="city-box" @click="swichCityHandle">
              <span class="current-city">{{
                cityName ? cityName : '定位中'
              }}</span>
              <my-icon
                name="sear_ic_open"
                size="0.14rem"
                color="#1A1A1A"
              ></my-icon>
            </div>
          </template>
        </Search>
      </sp-sticky>
    </div>
  </div>
</template>

<script>
import { Sticky, Swipe, swipeItem } from '@chipspc/vant-dgg'
import { mapState, mapActions } from 'vuex'
import adJumpHandle from '~/mixins/adJumpHandle'
import Search from '@/components/home/Search'
export default {
  components: {
    [Sticky.name]: Sticky,
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    Search,
  },
  mixins: [adJumpHandle],
  props: {
    pageScrollTop: {
      type: Number,
      default: 0,
    },
    // 固定广告数据
    fiexdBannerData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      indicators: true, // 是否需要指示器
      autoplay: 5000,
      style: '',
    }
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
    }),
    opacity: {
      get() {
        if (this.fiexdBannerData.length) {
          return this.pageScrollTop / 320
        } else {
          return this.pageScrollTop / 120
        }
      },
    },
    showSearchCityBtn: {
      get() {
        return this.pageScrollTop > 120
      },
    },
  },
  created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // 选择城市
    swichCityHandle() {
      if (!this.cityName) {
        return
      }
      this.$router.push('/city/choiceCity')
    },
    // 搜索框点击
    clickInputHandle() {
      this.$router.push('/search/')
    },
    // scrollHandle({ scrollTop }) {
    //   console.log(scrollTop)
    //   // scrollTop > 300 ? (this.style = '') : ''
    // },
  },
}
</script>

<style lang="less">
.page-head {
  position: relative;
  height: 660px;
  .search-box {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 144px;
    border-radius: 24px;
    overflow: hidden;
  }
  .bg-area {
    background: linear-gradient(rgba(86, 126, 246, 1), rgba(73, 116, 245, 1));
    width: 100%;
    height: 84px;
    font-size: 36px;
    position: relative;
    padding: 51px 20px 0 20px;
    z-index: 2;
    span {
      display: inline-block;
      font-size: 30px;
      font-weight: bold;
    }
    .logo {
      width: 40px;
      height: 40px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/exhzqp9t6jk0000.png)
        no-repeat center center;
      background-size: 100% 100%;
      position: absolute;
      left: 20px;
      top: 49px;
      font-size: 36px;
      overflow: hidden;
    }
    .span-2 {
      margin-left: 60px;
      color: #ffffff;
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 36px;
    }
    .span-3 {
      color: #dfdfdf;
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      line-height: 36px;
    }
    .span-4 {
      height: 36px;
      font-size: 36px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: bold;
      color: #ffffff;
      line-height: 36px;
    }
    .btn-city {
      position: absolute;
      right: 10px;
      color: white;
      padding-left: 30px;
      top: 49px;
      font-size: 30px;
      display: flex;
      align-items: center;
      .local-icon {
        transform: scale(0.6);
        width: 0;
        height: 0;
        border-left: 12px solid transparent;
        border-right: 12px solid transparent;
        border-top: 16px solid #fff;
        margin-left: 8px;
      }
      &::before {
        position: absolute;
        background: url(https://cdn.shupian.cn/sp-pt/wap/6n0g0joqn9k0000.png)
          no-repeat center center;
        background-size: 100% 100%;
        content: '';
        left: 0;
        top: 10px;
        width: 18px;
        height: 24px;
      }
    }
  }
  .bg-area2 {
    height: 1.52rem;
    border-radius: 0;
    background: none;
    position: absolute;
    left: 0;
    top: 0;
  }
  .bg-activity {
    height: 152px;

    &::after {
      position: absolute;
      background: #f5f5f5;
      content: '';
      width: 100%;
      height: 16px;
      border-radius: 20px 20px 0 0;
      bottom: 0px;
      left: 0;
    }
  }
  .city-box {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: 32px;
    padding-right: 31px;
    &::after {
      content: '';
      width: 2px;
      height: 32px;
      background: #c5c5c5;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    .current-city {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-right: 12px;
    }
  }
  .swiper-content {
    width: 100%;
    height: 552px;
    .swiper-box {
      display: block;
      width: 100%;
      height: 552px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .sp-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .serch-area {
    background: #fff !important;
    padding: 12px 20px 12px 20px;
    /deep/.input-box {
      height: 100px;
      background: #f5f5f5;
      border-radius: 24px;
      border: none;
    }
  }
}
</style>
