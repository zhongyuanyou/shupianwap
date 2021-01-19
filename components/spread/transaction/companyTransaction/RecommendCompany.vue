<template>
  <div>
    <div class="my-component">
      <TabCurve
        ref="tabCurveRef"
        v-model="currentItem"
        class="tab-curve"
        :offset-top="searchDomHeight"
        :tab-list="tabBtnList"
        :need-fixed="true"
        :right="0.54"
        name-field="name"
        @selectTabHandle="selectTabHandle"
      ></TabCurve>

      <sp-swipe
        ref="recomRef"
        class="my-swipe"
        :show-indicators="false"
        @change="onChange"
      >
        <sp-swipe-item v-for="(item, index) in tabBtnList" :key="index">
          <div v-show="index === currentItem">
            <!-- START 推荐内容滚动区 -->
            <div
              class="scroll-recommend"
              @touchstart="preventTouch"
              @touchmove="preventTouch"
            >
              <div class="marks">
                <a
                  v-for="(mark, markIndex) in marks"
                  :key="markIndex"
                  class="mark"
                  @click="
                    () => {
                      $parent.jumpLink('')
                    }
                  "
                >
                  {{ mark }}
                </a>
              </div>
            </div>
            <!-- END   推荐内容滚动区 -->

            <!-- START 推荐商品列表 -->
            <div ref="goodList" class="goods-list">
              <sp-skeleton
                v-for="val in 10"
                :key="val + 'a'"
                avatar-shape="square"
                avatar-size="2.4rem"
                title
                title-width="100%"
                avatar
                :row="3"
                :row-width="['80%', '70%', '50%']"
                :loading="goodList.length > 0 ? false : true"
              >
              </sp-skeleton>
              <GoodItem
                v-for="(good, goodIndex) in goodList"
                :key="goodIndex"
                :good="good"
              />
            </div>
            <!-- END   推荐商品列表 -->
          </div>
        </sp-swipe-item>
      </sp-swipe>
      <div class="btn"><a>查看更多公司</a></div>
    </div>
  </div>
</template>

<script>
import { Swipe, swipeItem, Skeleton } from '@chipspc/vant-dgg'
import TabCurve from '~/components/common/tab/TabCurve'
import LoadingDown from '~/components/common/loading/LoadingDown'
import adJumpHandle from '~/mixins/adJumpHandle'

import GoodItem from '~/components/spread/transaction/companyTransaction/GoodItem'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Skeleton.name]: Skeleton,
    TabCurve,
    // LoadingDown,
    GoodItem,
  },
  mixins: [adJumpHandle],
  data() {
    return {
      tabBtn: [], // 对象有goodsList字段是商品列表
      loading: false, // 加载按钮，调接口时为true
      currentItem: 0, // 默认tabs选中第一个
      searchDomHeight: 0, // 选项卡吸顶时与顶部的距离
      params: {
        dictionaryCode: 'C-SY-RMJY-GG', // 查询数据字典的code
        findType: 0, // 查询类型：0：初始查询广告+数据字典+推荐商品  1：查询广告+推荐商品 2：只查推荐商品
        userId: '', // 用户id
        deviceId: '', // 设备ID（用户唯一标识） 0022ef1a-f685-469a-93a8-5409892207a2
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 100, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: '', // 产品类别
        limit: 10, // 分页条数
        page: 1, // 当前页
        locationCode: '', // 查询广告的位置code
      },

      tabBtnList: [
        { name: '推荐公司', type: 0, goodList: [] },
        { name: '热卖公司', type: 9, goodList: [] },
        { name: '降价急售', type: 1, goodList: [] },
      ],
      goodListParams: {
        type: 0,
        page: 1,
        limit: 10,
      },
      goodList: [],
      marks: [
        '空壳公司',
        '实体公司',
        '小规模',
        '高新技术',
        '有限公司',
        '降价',
        '带商标',
        '带专利',
        '无经营',
        '发票',
      ],
      scrollAction: { x: 'undefined', y: 'undefined' },
      scrollDirection: '',
    }
  },
  computed: {
    cityCode() {
      return this.$store.state.city.currentCity.code
    },
    isSendReq() {
      const cityCode = this.$store.state.city.currentCity.code
      if (cityCode && this.tabBtn.length && !this.tabBtn[0].goodsList.length) {
        return true
      } else {
        return false
      }
    },
  },
  watch: {},
  created() {
    if (process.client) {
      this.getGoodList({ type: 0 })
    }
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    // 滚动加载更多
    handleScroll() {
      if (
        this.tabBtn.length &&
        this.tabBtn[this.currentItem].goodsList.length &&
        !this.loading &&
        !this.tabBtn[this.currentItem].noMore
      ) {
        const pageScrollTop =
          window.pageYOffset ||
          document.documentElement.scrollTop ||
          document.body.scrollTop // 滚动条距离顶部的位置
        const pageScrollHeight = document.body.scrollHeight // 页面文档的总高度
        const pageClientHeight = window.innerHeight // 窗口文档显示区域的高度
        // 监听页面是否滚动到底部加载更多数据
        if (Math.ceil(pageScrollTop + pageClientHeight) >= pageScrollHeight) {
          this.loading = true
          this.tabBtn[this.currentItem].page += 1
          this.params.findType = 2
          this.getGoodList({})
        }
      }
    },
    // 选项卡选择某项：切换轮播，显示不同内容
    selectTabHandle({ index, type }) {
      this.goodList = []
      this.$refs.recomRef.swipeTo(index)
    },
    // 切换轮播时触发
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
      this.currentItem = index
    },
    switchHandle(index) {
      if (!this.goodList.length) {
        this.getGoodList({ type: this.tabBtnList[index].type })
      }
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 根据接口获取商品列表
    getGoodList({ type = 0, page = 1, limit = 10 }) {
      this.loading = true
      const param = `?type=${type}&page=${page}&limit=${limit}`
      const api = '/tradingApi/WapCompany/find/newList'
      const cdn = 'https://mjy.dgg.cn'
      this.$axios.get(cdn + api + param).then((res) => {
        this.loading = false
        console.log(res.data.searchList.records)
        if (res.code === 'SYS_0000') {
          // 获取商品后，处理商品数据
          this.goodList = res.data.searchList.records
          // this.goodList = this.goodList.concat(res.data.searchList.records)
        }
      })
    },
  },
}
</script>

<style scoped lang="less">
@skeleton-row-margin-top: 0;

.my-component {
  width: 100%;
  padding-bottom: 164px;
  .btn {
    margin: 0 auto;
    width: calc(100% - 80px);
    height: 0.88rem;
    background: #ebf2ff;
    opacity: 0.7;
    border-radius: 0.08rem;
    line-height: 0.88rem;
    text-align: center;
    font-size: 0.28rem;
    font-weight: 700;
    color: #387cee;
  }
}
.scroll-recommend {
  width: 100%;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  .scroll-recommend::-webkit-scrollbar {
    /*滚动条整体样式*/
    display: none;
  }

  .marks {
    width: 100%;
    display: flex;
    padding-left: 40px;
    .mark {
      flex: none;
      height: 68px;
      background: #f8f8f8;
      border-radius: 4px;
      font-size: 26px;
      line-height: 68px;
      font-weight: 400;
      color: #222222;
      padding: 0 20px;
      margin-right: 24px;
    }
  }
}
.tab-curve::after {
  display: block;
  content: '';
  width: 100%;
  height: 1px;
  background: #f4f4f4;
  margin-bottom: 24px;
  margin-top: 12px;
}

.goods-list {
  position: relative;
  width: 100%;
  padding: 0 40px;
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    img {
      width: 340px;
      height: 340px;
    }
    > p {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
.my-swipe {
  /deep/ .sp-skeleton {
    padding: 32px 0;
  }
  /deep/ .sp-skeleton__content {
    padding-top: 0;
  }
}
/deep/ .sp-sticky--fixed {
  width: @spread-page-width;
  margin: 0 auto;
}
</style>
