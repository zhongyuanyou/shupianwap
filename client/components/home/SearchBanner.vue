<template>
  <div
    class="activity-bn"
    :style="{ height: bigBanner ? '5.52rem' : '1.28rem' }"
  >
    <img v-if="bigBanner" :src="bigBanner" alt="" />
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
            <span class="current-city">成都</span>
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
import Search from '@/components/common/search/Search'
export default {
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  data() {
    return {
      bigBanner:
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606113647248&di=9b32aeb7bfb9ef1085ce1e18e72ac28f&imgtype=0&src=http%3A%2F%2Fpic.616pic.com%2Fbg_w1180%2F00%2F22%2F41%2FXXZu5GvQAH.jpg',
      scollPercentage: 120, // 滚动多少距离，搜索栏背景色渐变
      opacity: 0,
    }
  },
  created() {
    // 存在banner大图，设置搜索栏透明度
    if (!this.bigBanner) {
      this.opacity = 1
    }
  },
  methods: {
    // 滚动改变搜索栏透明度
    searchHandle({ scrollTop }) {
      if (this.bigBanner) {
        this.opacity = scrollTop / this.scollPercentage
      }
    },
    // 选择城市
    swichCityHandle() {
      this.$router.push('/city/choiceCity')
    },
    // 搜索框点击
    clickInputHandle() {
      //   this.$router.push('/city/choiceCity')
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
