<template>
  <div class="recommend-moudle">
    <!-- S 推荐模块tab -->
    <TabCurve
      ref="tabCurveRef"
      v-model="curentItem"
      :offset-top="searchDomHeight"
      :tab-list="tabBtn"
      :need-fixed="true"
      :right="0.54"
      @selectTabHandle="selectTabHandle"
    ></TabCurve>
    <!-- E 推荐模块tab -->
    <sp-swipe
      ref="recomRef"
      class="my-swipe"
      :show-indicators="false"
      @change="onChange"
    >
      <sp-swipe-item v-for="(item, index) in tabBtn" :key="index">
        <!-- S 推荐内容滚动区 -->
        <div
          class="scroll-recom"
          @touchstart="preventTouch"
          @touchmove="preventTouch"
        >
          <ul>
            <li v-for="(m, i) in tabBtn" :key="i">
              <a href="javascript:void(0);">
                <strong>精选好评好赞精选好评好赞</strong>
                <p>TOP 10精选好评好赞</p>
                <img
                  src="http://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png.webp"
                  alt=""
                />
              </a>
            </li>
          </ul>
        </div>
        <!-- E 推荐内容滚动区 -->
        <!-- S 推荐商品列表 -->
        <div class="goods-list">
          <GoodsPro v-for="e in 10" :key="e" />
        </div>
        <!-- E 推荐商品列表 -->
      </sp-swipe-item>
    </sp-swipe>
  </div>
</template>

<script>
import { Swipe, swipeItem } from '@chipspc/vant-dgg'
import { homeApi } from '@/api'
import TabCurve from '@/components/common/tab/TabCurve'
import GoodsPro from '@/components/common/goodsItem/GoodsPro'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    TabCurve,
    GoodsPro,
  },
  props: {
    tabBtn: {
      type: Array,
      default: () => {
        return [
          {
            label: '公司',
            code: '0',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
          {
            label: '商标',
            code: '1',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
          {
            label: '专利',
            code: '2',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
          {
            label: '新媒',
            code: '3',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
          {
            label: '资质',
            code: '4',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
          {
            label: '网店',
            code: '5',
            formatId: 'FL20201207080003',
            limit: 10,
            page: 1,
            locationCode: 'ad100126',
            goodsList: [],
          },
        ]
      },
    },
  },
  data() {
    return {
      curentItem: 0,
      searchDomHeight: 0,
      params: {
        userId: '', // 用户id
        deviceId: '0022ef1a-f685-469a-93a8-5409892207a2', // 设备ID（用户唯一标识）
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 100, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: 'FL20201211085219', // 产品类别
        limit: 0, // 分页条数
        page: 0, // 当前页
        locationCode: '', // 查询广告的位置code
      },
    }
  },
  computed: {
    cityCode() {
      return this.$store.state.city.currentCity.code
    },
  },
  watch: {
    cityCode(newVal) {
      this.params.areaCode = newVal
      this.findRecomList()
    },
  },
  created() {
    if (process.client && this.cityCode) {
      this.params.areaCode = this.cityCode
      this.findRecomList()
    }
  },
  mounted() {
    try {
      this.searchDomHeight =
        this.$parent.$refs.searchBannerRef.$refs.searchRef.$el.clientHeight - 1 // 获取吸顶头部搜索栏的高度
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    // 选项卡选择某项
    selectTabHandle({ index }) {
      this.$refs.recomRef.swipeTo(index)
    },
    // 切换轮播
    onChange(index) {
      if (this.$refs.tabCurveRef.isFixed) {
        this.$nextTick(() => {
          const tabCurveDomHeight = this.$refs.tabCurveRef.$el.clientHeight // 获取吸顶头部tab栏高度
          this.listOffsetTop =
            this.$refs.recomRef.$el.offsetTop -
            this.searchDomHeight -
            tabCurveDomHeight // 推荐列表距离顶部的距离 - 搜索栏高度 - tab栏高度 （用于切换tab重置列表滚动位置）
          document.documentElement.scrollTop = this.listOffsetTop + 1
          document.body.scrollTop = this.listOffsetTop + 1
        })
      }
      this.curentItem = index
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 查询推荐商品
    findRecomList() {
      this.params.formatId = this.tabBtn[this.curentItem].formatId
      this.params.limit = this.tabBtn[this.curentItem].limit
      this.params.page = this.tabBtn[this.curentItem].page
      this.params.locationCode = this.tabBtn[this.curentItem].locationCode
      console.log(this.params)
      this.$axios.post(homeApi.findRecomList, this.params).then((res) => {
        console.log(11, res)
        if (res.code === 200) {
          this.tabBtn[this.curentItem].adData =
            res.data.adData[
              this.tabBtn[this.curentItem].locationCode
            ].sortMaterialList
          this.tabBtn[this.curentItem].goodsList = this.tabBtn[
            this.curentItem
          ].goodsList.concat(res.data.goodsList)
          console.log(this.tabBtn[this.curentItem])
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
.scroll-recom {
  padding: 22px 0 32px 40px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }
  ul {
    display: flex;
    li {
      margin-right: 12px;
      &:last-child {
        margin-right: 40px;
      }
      a {
        display: flex;
        flex-direction: column;
        position: relative;
        width: 262px;
        height: 144px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        padding: 26px 32px 0 32px;
        > strong {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 38px;
          .textOverflow(1);
        }
        > p {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          line-height: 34px;
          margin-top: 4px;
          .textOverflow(1);
        }
        > img {
          width: 40px;
          height: 40px;
          position: absolute;
          right: 12px;
          bottom: 12px;
        }
      }
    }
  }
}
.goods-list {
  position: relative;
  width: 100%;
  padding: 0 40px 32px 40px;
  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
}
</style>
