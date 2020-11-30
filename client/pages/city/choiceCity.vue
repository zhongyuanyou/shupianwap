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
        <strong>{{ positionCityName }}</strong>
        <span>GPS定位</span>
        <p v-if="positionStatus === 1">未开通服务</p>
      </div>
      <a href="javascript:void(0);" @click="positionCity">重新定位</a>
    </div>
    <!-- S 城市列表 -->
    <div>
      <div class="city-btn-list">
        <span>历史选择</span>
        <ul>
          <li>成都</li>
          <li>洛阳</li>
          <li>杭州</li>
          <li>杭州</li>
        </ul>
      </div>
      <sp-index-bar
        :sticky-offset-top="searchDomHeight"
        highlight-color="#4974F5"
        :index-list="indexList"
      >
        <div class="city-btn-list">
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
  </div>
</template>

<script>
import { Sticky, IndexBar, IndexAnchor, Cell } from '@chipspc/vant-dgg'
import { mapState, mapMutations, mapActions } from 'vuex'
import Search from '@/components/common/search/Search'
export default {
  name: 'ChoiceCity',
  components: {
    [Sticky.name]: Sticky,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    Search,
  },
  data() {
    return {
      cityList: [
        {
          code: 'COMPANY_ALL',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: -1,
          name: '全国',
          id: '7872989240263901184',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '',
        },
        {
          code: 'COMPANY_CD',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 0,
          name: '成都',
          id: '7832865662955618304',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '四川省/成都市',
        },
        {
          code: 'COMPANY_BJCY',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 1,
          name: '北京',
          id: '7837857825929887744',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '北京市',
        },
        {
          code: 'COMPANY_CQ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 2,
          name: '重庆',
          id: '7832865698741420032',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '重庆市',
        },
        {
          code: 'COMPANY_SH',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 5,
          name: '上海',
          id: '7832865910562160640',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '上海市/市辖区',
        },
        {
          code: 'COMPANY_ZZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 6,
          name: '郑州',
          id: '7832866077881335808',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '河南省/郑州市',
        },
        {
          code: 'COMPANY_HZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 7,
          name: '杭州',
          id: '7832866153567551488',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '浙江省/杭州市',
        },
        {
          code: 'COMPANY_GZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 8,
          name: '广州',
          id: '7832866268457926656',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/广州市',
        },
        {
          code: 'COMPANY_FS',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 9,
          name: '佛山',
          id: '7832866333213786112',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/佛山市',
        },
        {
          code: 'COMPANY_YC',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 10,
          name: '宜昌',
          id: '7832866413467598848',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖北省/宜昌市',
        },
        {
          code: 'COMPANY_SZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 11,
          name: '深圳',
          id: '7832866460208922624',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/深圳市',
        },
        {
          code: 'COMPANY_DG',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 12,
          name: '东莞',
          id: '7832866510234386432',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '广东省/东莞市',
        },
        {
          code: 'COMPANY_CS',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 13,
          name: '长沙',
          id: '7832866586507804672',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖南省/长沙市',
        },
        {
          code: 'COMPANY_SJZ',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 14,
          name: '石家庄',
          id: '7832866898576605184',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '河北省/石家庄市',
        },
        {
          code: 'COMPANY_WH',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 15,
          name: '武汉',
          id: '7832867098456162304',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '湖北省/武汉市',
        },
      ],
      nweCityList: [],
      indexList: ['热'],
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
    this.nweCityList = this.getBrands(this.cityList)
  },
  mounted() {
    try {
      this.searchDomHeight = this.$refs.searchRef.$el.clientHeight
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
        const str = obj.code.substring(8, 9)
        const t = {}
        t.id = str
        t.cityName = obj.name
        t.keyword = obj.code.substring(8)
        t.code = obj.code
        tempItem.push(t)
        tempTitleArray.push(str)
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
          if (item.id === titleArray[i]) {
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
        cityList: this.cityList,
      })
    },
    // 选择城市
    chooseCity(data) {
      this.SET_CITY({
        code: data.code,
        name: data.cityName,
      })
      this.$router.back()
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
    padding: 15px 16px 15px 5px;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #222222;
  }
}
</style>
