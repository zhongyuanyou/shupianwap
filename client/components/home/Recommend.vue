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
        <div v-if="index === curentItem">
          <!-- S 推荐内容滚动区 -->
          <div
            v-if="item.adData.length"
            class="scroll-recom"
            @touchstart="preventTouch"
            @touchmove="preventTouch"
          >
            <ul>
              <li v-for="(key, v) in item.adData" :key="v">
                <a
                  v-if="key.materialList.length"
                  :href="key.materialList[0].materialLink"
                >
                  <img
                    class="recom-img"
                    :src="key.materialList[0].materialUrl"
                    alt=""
                  />
                </a>
              </li>
            </ul>
          </div>
          <!-- E 推荐内容滚动区 -->
          <!-- S 推荐商品列表 -->
          <div class="goods-list">
            <GoodsPro
              v-for="(goodsitem, sub) in item.goodsList"
              :key="sub"
              :goods-data="goodsitem"
            />
          </div>
          <!-- E 推荐商品列表 -->
        </div>
        <div v-else class="plashold" :style="{ height: height }"></div>
      </sp-swipe-item>
    </sp-swipe>
    <div class="loading-content">
      <sp-loading
        v-show="loading && !tabBtn[curentItem].noMore"
        size="20px"
        color="#4974f5"
        >正在加载...</sp-loading
      >
      <p v-if="tabBtn[curentItem].noMore" class="no-data">没有更多了</p>
    </div>
  </div>
</template>

<script>
import { Swipe, swipeItem, Loading } from '@chipspc/vant-dgg'
import { homeApi } from '@/api'
import TabCurve from '@/components/common/tab/TabCurve'
import GoodsPro from '@/components/common/goodsItem/GoodsPro'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Loading.name]: Loading,
    TabCurve,
    GoodsPro,
  },
  data() {
    return {
      tabBtn: [
        {
          label: '公司',
          code: '0',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
        {
          label: '商标',
          code: '1',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
        {
          label: '专利',
          code: '2',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
        {
          label: '新媒',
          code: '3',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
        {
          label: '资质',
          code: '4',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
        {
          label: '网店',
          code: '5',
          formatId: 'FL20201207080003',
          limit: 5,
          page: 1,
          locationCode: 'ad100126',
          adData: [],
          goodsList: [],
          noMore: false,
        },
      ],
      loading: false,
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
      height: '',
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
      this.findRecomList(this.curentItem)
    },
  },
  created() {
    if (process.client && this.cityCode) {
      this.findRecomList(this.curentItem)
    }
  },
  mounted() {
    try {
      this.searchDomHeight =
        this.$parent.$refs.searchBannerRef.$refs.searchRef.$el.clientHeight - 1 // 获取吸顶头部搜索栏的高度
      const h =
        document.documentElement.clientHeight || document.body.clientHeight // 获取屏幕视口高度
      this.height = h + 'px'
      window.addEventListener('scroll', this.handleScroll, true) // 监听滚动
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    handleScroll() {
      const pageScrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 滚动条距离顶部的位置
      const pageScrollHeight = document.body.scrollHeight // 页面文档的总高度
      const pageClientHeight = document.body.clientHeight + 1 // 页面视口的高度
      // 监听页面是否滚动到底部加载更多数据
      if (Math.ceil(pageScrollTop + pageClientHeight) >= pageScrollHeight) {
        if (!this.loading && !this.tabBtn[this.curentItem].noMore) {
          this.loading = true
          this.tabBtn[this.curentItem].page += 1
          this.findRecomList(this.curentItem, 'more')
        }
      }
    },
    // 选项卡选择某项
    selectTabHandle({ index }) {
      this.$refs.recomRef.swipeTo(index)
    },
    // 切换轮播
    onChange(index) {
      this.switchHandle(index)
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
    switchHandle(index) {
      // 切换没有数据时加载数据
      if (
        !this.tabBtn[index].goodsList.length &&
        !this.tabBtn[index].adData.length
      ) {
        this.findRecomList(index)
      }
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 查询推荐商品
    findRecomList(index, type = 'init') {
      console.log(index)
      if (!this.params.areaCode) {
        this.params.areaCode = this.cityCode
      }
      this.params.formatId = this.tabBtn[index].formatId
      this.params.limit = this.tabBtn[index].limit
      this.params.page = this.tabBtn[index].page
      if (type !== 'more') {
        this.params.locationCode = this.tabBtn[index].locationCode
      }
      this.$axios.post(homeApi.findRecomList, this.params).then((res) => {
        console.log(index, res.data.goodsList)
        if (!res.data.goodsList.length) {
          this.tabBtn[index].noMore = true
          return
        }
        if (res.code === 200) {
          const obj = {
            goodsList: this.tabBtn[index].goodsList.concat(res.data.goodsList),
          }
          if (type !== 'more') {
            obj.adData =
              res.data.adData[this.tabBtn[index].locationCode].sortMaterialList
          }
          this.$set(this.tabBtn, index, Object.assign(this.tabBtn[index], obj))
          this.loading = false
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
        // background: #ffffff;
        // border: 1px solid #cdcdcd;
        // box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        // border-radius: 8px;
        // padding: 26px 32px 0 32px;
        // > strong {
        //   font-size: 28px;
        //   font-family: PingFang SC;
        //   font-weight: bold;
        //   color: #222222;
        //   line-height: 38px;
        //   .textOverflow(1);
        // }
        // > p {
        //   font-size: 24px;
        //   font-family: PingFang SC;
        //   font-weight: 400;
        //   color: #555555;
        //   line-height: 34px;
        //   margin-top: 4px;
        //   .textOverflow(1);
        // }
        // > img {
        //   width: 40px;
        //   height: 40px;
        //   position: absolute;
        //   right: 12px;
        //   bottom: 12px;
        // }
        .recom-img {
          width: 100%;
          height: 100%;
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
.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  .no-data {
    font-size: 24px;
    color: #333;
  }
}
</style>
