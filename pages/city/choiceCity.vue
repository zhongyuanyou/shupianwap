<!--
 * @Author: ma liang
 * @Date: 2020-11-26 10:13:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 10:13:23
 * @Description: Choice city
 * @FilePath: /chips-wap/client/pages/city/choiceCity.vue
-->
<template>
  <div class="city-page">
    <sp-sticky>
      <Search
        ref="searchRef"
        :disabled="true"
        :icon-left="0.35"
        placeholder="请输入城市名称"
        @clickInputHandle="clickInputHandle"
      >
        <template v-slot:left>
          <my-icon
            class="cloose-icon"
            name="bubb_ic_close"
            size="0.33rem"
            color="#1A1A1A"
            @click.native="clooseHandle"
          ></my-icon>
        </template>
      </Search>
    </sp-sticky>
    <!-- S 当前选择的城市 -->
    <div class="current-city">
      <strong>{{ currentCity }}</strong>
      <span>当前选择</span>
    </div>
    <!-- S 当前定位城市 -->
    <div class="position-city">
      <div v-if="!positionStatus" class="no-position">
        <my-icon
          name="toast_ic_remind"
          size="0.32rem"
          color="#cccccc"
        ></my-icon>
        <span>无法定位到当前城市</span>
      </div>
      <div v-else class="position-success">
        <strong @click="choosePositionCity(positionCityName)">{{
          positionCityName
        }}</strong>
        <span>GPS定位</span>
        <p v-if="positionStatus === 1">未开通服务</p>
      </div>
      <a href="javascript:void(0);" @click="positionCity">重新定位</a>
    </div>
    <!-- S 城市列表 -->
    <div>
      <div v-if="cityHistory.length" class="city-btn-list">
        <span>历史选择</span>
        <ul>
          <li
            v-for="(item, index) in cityHistory"
            :key="index"
            @click="chooseCity(item)"
          >
            {{ item.cityName }}
          </li>
        </ul>
      </div>
      <sp-index-bar
        :sticky-offset-top="searchDomHeight"
        highlight-color="#4974F5"
        :index-list="indexList"
      >
        <div v-if="false" class="city-btn-list">
          <sp-index-anchor index="热">热门城市</sp-index-anchor>
          <ul>
            <li>成都</li>
            <li>洛阳</li>
            <li>杭州</li>
            <li>杭州</li>
            <li>杭州</li>
          </ul>
        </div>
        <div v-for="(item, index) in nweCityList" :key="index">
          <sp-index-anchor :index="item.letter">{{
            item.letter
          }}</sp-index-anchor>
          <sp-cell
            v-for="(key, val) in item.data"
            :key="val"
            :title="key.cityName"
            @click="chooseCity(key)"
          />
        </div>
      </sp-index-bar>
    </div>
    <Loading-center v-show="loading" title="加载中" />
  </div>
</template>

<script>
import { Sticky, IndexBar, IndexAnchor, Cell, Toast } from '@chipspc/vant-dgg'
import { mapState, mapMutations, mapActions } from 'vuex'
import { homeApi } from '@/api'
import Search from '@/components/common/search/Search'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'ChoiceCity',
  components: {
    [Sticky.name]: Sticky,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    Search,
    LoadingCenter,
  },
  data() {
    return {
      loading: false,
      cityHistory: [], // 历史选择
      cityList: [], // 站点列表
      nweCityList: [], // 带首字母的站点列表
      indexList: [], // 首字母列表
      searchDomHeight: 0, // 头部高度
    }
  },
  computed: {
    ...mapState({
      currentCity: (state) => state.city.currentCity.name, // 当前选择的城市
      positionCityName: (state) => state.city.positionCityName, // 当前定位城市
      positionStatus: (state) => state.city.positionStatus, // 定位状态（0：定位失败 1：定位成功但未开通该城市服务 2：定位成功且有对应的城市服务）
    }),
  },
  created() {
    if (process.client) {
      // 获取城市列表
      this.loading = true
      this.$axios
        .get(homeApi.findSiteList, {
          headers: {
            'x-cache-control': 'cache',
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.cityList = res.data.cityList
            if (this.cityList.length) {
              // 格式化城市数据
              this.nweCityList = this.getBrands(this.cityList)
            }
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    }
  },
  mounted() {
    try {
      this.searchDomHeight = this.$refs.searchRef.$el.clientHeight
      // 获取历史选择
      this.cityHistory = this.$cookies.get('cityHistory')
        ? this.$cookies.get('cityHistory')
        : []
    } catch (e) {}
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    ...mapMutations({
      SET_CITY: 'city/SET_CITY',
    }),
    // 格式化城市数据
    getBrands(data) {
      // 临时对象
      const tempItem = []
      const tempTitleArray = []
      data.forEach(function (obj, index) {
        const t = {}
        t.key = obj.initial
        t.cityName = obj.name
        // t.keyword = obj.code.substring(8)
        t.code = obj.code
        tempItem.push(t)
        tempTitleArray.push(obj.initial)
      })
      // 数组去重
      const titleArray = []
      tempTitleArray.sort()
      for (let i = 0; i < tempTitleArray.length; i++) {
        if (tempTitleArray[i] !== titleArray[titleArray.length - 1]) {
          titleArray.push(tempTitleArray[i])
        }
      }
      const resultArray = []
      for (let i = 0; i < titleArray.length; i++) {
        const temp = []
        for (let j = 0; j < tempItem.length; j++) {
          const item = tempItem[j]
          if (item.key === titleArray[i]) {
            temp.push(item)
          }
        }
        const t = {}
        t.letter = titleArray[i]
        t.data = temp
        resultArray.push(t)
        this.indexList.push(t.letter)
      }
      if (resultArray.length < 1) {
        return
      }
      return resultArray
    },
    // 定位城市
    positionCity() {
      this.POSITION_CITY({
        type: 'rest',
      })
    },
    // 选择城市
    chooseCity(data) {
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
      })
      this.SET_CITY({
        code: data.code,
        name: data.cityName,
      })
      this.$router.back()
    },
    // 选择定位城市
    choosePositionCity(name) {
      if (this.currentCity === name) {
        this.$router.back()
        return
      }
      const arr = this.cityList.filter((item) => {
        return item.name === name
      })
      if (arr) {
        this.SET_CITY({
          code: arr[0].code,
          name: arr[0].name,
        })
        this.$router.back()
      }
    },
    // 返回页面
    clooseHandle() {
      this.$router.back()
    },
    // 点击搜索
    clickInputHandle() {
      this.$router.push('/city/searchCity')
    },
  },
}
</script>

<style lang="less" scoped>
.city-page {
  background-color: #f8f8f8;
  .cloose-icon {
    margin-right: 35px;
    margin-left: -4px;
  }
  .current-city {
    display: flex;
    align-items: center;
    width: 100%;
    height: 120px;
    padding: 0 40px;
    border-top: 1px solid #f8f8f8;
    background-color: #fff;
    > strong {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }
    > span {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      margin-left: 17px;
    }
  }
  .position-city {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 120px;
    background: #ffffff;
    padding: 0 40px;
    margin-top: 24px;
    .no-position {
      display: flex;
      align-items: center;
      span {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        margin-left: 9px;
      }
    }
    .position-success {
      display: flex;
      align-items: center;
      > strong {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
      }
      > span {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-left: 18px;
      }
      > p {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f1524e;
        margin-left: 17px;
      }
    }
    > a {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #4974f5;
      padding-right: 2px;
    }
  }
  .city-btn-list {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 23px 40px 24px 40px;
    background-color: #fff;
    > span {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
    }
    /deep/ .sp-index-anchor {
      font-size: 26px !important;
      font-weight: 400;
      color: #999999;
      line-height: 26px !important;
      padding: 0 !important;
      background-color: #fff;
      &::after {
        display: none;
      }
    }
    /deep/ .sp-index-anchor--sticky {
      position: relative;
      transform: none !important;
      left: auto !important;
    }
    > ul {
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;
      > li {
        margin-top: 16px;
        width: 31.64%;
        height: 64px;
        background: #f8f8f8;
        border-radius: 4px;
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        text-align: center;
        line-height: 64px;
        &:not(:nth-child(3n + 0)) {
          margin-right: 2.53%;
        }
      }
    }
  }
  /deep/ .sp-index-anchor {
    line-height: 68px !important;
    padding: 0 40px;
    background-color: #f8f8f8;
    font-size: 26px !important;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999 !important;
  }
  /deep/ .sp-cell {
    padding: 0 40px;
    line-height: 120px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #222222;
  }
  /deep/ .sp-index-bar__index {
    padding: 10px 16px 10px 5px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
  }
}
</style>
