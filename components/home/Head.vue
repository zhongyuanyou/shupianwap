<template>
  <div class="page-head">
    <div class="bg-area">
      <span class="logo"></span>
      <span class="span-2">薯片</span>
      <span class="span-3">·企业服务大平台</span>
      <div class="btn-city" @click="swichCityHandle">
        <span class="current-city">{{ cityName ? cityName : '定位中' }}</span>
        <span class="local-icon">
          <my-icon name="sear_ic_open" size="0.04rem" color="#fff"></my-icon>
        </span>
      </div>
    </div>
    <sp-sticky>
      <Search
        ref="searchRef"
        :icon-left="0.24"
        :disabled="true"
        placeholder="搜索您想找的服务"
        @clickInputHandle="clickInputHandle"
      >
        <template v-if="pageScrollTop > 70" v-slot:center>
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
import { Sticky, Swipe, swipeItem } from '@chipspc/vant-dgg'
import { mapState, mapActions } from 'vuex'
import Search from '@/components/common/search/Search'
export default {
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  props: {
    pageScrollTop: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
    }),
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    // 滚动改变搜索栏透明度
    searchHandle() {
      const scrollTop = this.$parent.$refs.homeRef.scrollTop // 滚动条距离顶部的位置
      this.opacity = scrollTop / this.scollPercentage
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

<style lang="less">
.page-head {
  position: relative;
  .bg-area {
    background: linear-gradient(rgba(86, 126, 246, 1), rgba(73, 116, 245, 1));
    width: 100%;
    height: 104px;
    font-size: 36px;
    position: relative;
    padding: 16px 20px 0 20px;
    span {
      display: inline-block;
    }
    .logo {
      width: 40px;
      height: 40px;
      background: url(https://cdn.shupian.cn/sp-pt/wap/exhzqp9t6jk0000.png)
        no-repeat center center;
      background-size: 100% 100%;
      border-radius: 50%;
      position: absolute;
      left: 20px;
      top: 20px;
    }
    .span-2 {
      margin-left: 60px;
      color: #fff;
      font-size: 30px;
    }
    .span-3 {
      color: #dfdfdf;
      font-size: 36px;
    }
    .btn-city {
      position: absolute;
      right: 10px;
      color: white;
      font-size: 28px;
      padding-left: 30px;
      top: 20px;
      font-size: 28px;
      .local-icon {
        transform: scale(0.6);
        transform-origin: 0% 30%;
        width: 40px;
        height: 40px;
      }
      &::before {
        position: absolute;
        background: url(https://cdn.shupian.cn/sp-pt/wap/6n0g0joqn9k0000.png)
          no-repeat center center;
        background-size: 100% 100%;
        content: '';
        left: 0;
        top: 8px;
        width: 18px;
        height: 24px;
      }
    }
    &::after {
      position: absolute;
      background: white;
      content: '';
      width: 100%;
      height: 24px;
      border-radius: 30px 30px 0 0;
      bottom: 0;
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
}
</style>
