<template>
  <div
    class="activity-bn"
    :style="{ height: fiexdBannerData.length ? '5.52rem' : '1.28rem' }"
  >
    <a
      v-if="fiexdBannerData.length"
      href="javascript:void(0)"
      @click="adJumpHandleMixin(fiexdBannerData[0].materialList[0])"
    >
      <img
        :src="
          fiexdBannerData[0].materialList[0].materialUrl + $ossImgSet(750, 552)
        "
        alt=""
      />
    </a>
    <sp-sticky @scroll="searchHandle">
      <Search
        ref="searchRef"
        :icon-left="0.24"
        :disabled="true"
        :opacity="opacity"
        placeholder="搜索您想找的服务"
        @clickInputHandle="clickInputHandle"
      >
        <template v-slot:center>
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
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import { mapState, mapActions } from 'vuex'
import Search from '@/components/common/search/Search'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  mixins: [adJumpHandle],
  props: {
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
      scollPercentage: 120, // 滚动多少距离，搜索栏背景色渐变
      opacity: 0,
    }
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
    }),
  },
  created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }
    // 存在banner大图，设置搜索栏透明度
    if (!this.fiexdBannerData.length) {
      this.opacity = 1
    }
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // 滚动改变搜索栏透明度
    searchHandle({ scrollTop }) {
      if (this.fiexdBannerData.length) {
        this.opacity = scrollTop / this.scollPercentage
      }
    },
    // 选择城市
    swichCityHandle() {
      if (!this.cityName) {
        return
      }
      this.$router.push('/city/choiceCity')
    },
    // 搜索框点击
    clickInputHandle() {
      this.$router.push('/search')
    },
  },
}
</script>

<style scoped lang="less">
.activity-bn {
  font-size: 24px;
  position: relative;
  width: 100%;
  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 552px;
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
</style>
