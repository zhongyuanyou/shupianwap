<!--
 * @Author: ma liang
 * @Date: 2020-11-26 13:09:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 13:09:23
 * @Description: search city
 * @FilePath: /chips-wap/client/pages/city/searchCity.vue
-->
<template>
  <div class="city-search">
    <!-- <sp-sticky> -->
    <div v-if="isInApp" class="gd"></div>
    <div class="search-content">
      <Search
        ref="searchRef"
        :icon-left="0.35"
        placeholder="请输入城市名称"
        @valChangeHandle="valChangeHandle"
      >
        <template v-slot:right>
          <a class="cloose-btn" href="javascript:void(0);" @click="clooseHandle"
            >取消</a
          >
        </template>
      </Search>
    </div>
    <!-- </sp-sticky> -->
    <div v-if="searchList.length" class="search-results">
      <div
        v-for="(item, index) in searchList"
        :key="index"
        @click="swichCity(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import { homeApi } from '@/api'
export default {
  name: 'SearchCity',
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  data() {
    return {
      searchList: [],
    }
  },
  computed: {
    ...mapState({
      appInfo: (state) => state.app.appInfo, // app信息
      isInApp: (state) => state.app.isInApp, // 是否在app中打开此页
    }),
  },
  methods: {
    ...mapMutations({
      SET_CITY: 'city/SET_CITY',
    }),
    // 取消
    clooseHandle() {
      this.$router.back()
    },
    // 搜索框内容变化
    valChangeHandle(val) {
      if (val) {
        // 搜索城市
        this.$axios
          .get(homeApi.findSiteList, {
            params: {
              cityName: val,
            },
          })
          .then((res) => {
            console.log(res)
            if (res.code === 200) {
              this.searchList = res.data.cityList
            }
          })
      }
    },
    // 选择城市
    swichCity(item) {
      const data = {
        code: item.code,
        cityName: item.name,
      }
      const historyList = this.$cookies.get('cityHistory')
        ? this.$cookies.get('cityHistory')
        : []
      const isHave = historyList.findIndex((item) => {
        return item.code === data.code
      })
      if (isHave !== -1) {
        historyList.splice(isHave, 1)
      }
      historyList.unshift({
        code: data.code,
        cityName: data.cityName,
      })
      if (historyList.length > 6) {
        historyList.pop()
      }
      this.$cookies.set('cityHistory', historyList, {
        path: '/',
        maxAge: 60 * 60 * 24 * 99999, // 过期时间
        domain: 'shupian.cn',
      })
      this.SET_CITY({
        code: data.code,
        name: data.cityName,
      })
      this.$router.go(-2)
    },
  },
}
</script>

<style lang="less" scoped>
.city-search {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .search-content {
    border-bottom: 1px solid #f8f8f8;
    .cloose-btn {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-left: 40px;
    }
  }
  .gd {
    height: 40px;
    width: 100%;
    background: #fff;
  }
  .search-results {
    height: calc(100vh - 128px);
    overflow: auto;
    width: 100%;
    padding: 0 40px;
    > div {
      width: 100%;
      height: 120px;
      line-height: 120px;
      border-bottom: 1px solid #f4f4f4;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }
  }
}
</style>
