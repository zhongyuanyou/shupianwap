<template>
  <div class="recommend-moudle">
    <sp-sticky :offset-top="searchDomHeight" @scroll="scrollHandle">
      <div class="tab-curve" :class="[isFixed ? 'fixed-tab' : '']">
        <ul class="tab-curve-list">
          <li
            v-for="(item, index) in tabList"
            :key="index"
            style="margin-right: 0.56rem"
            @click="selectItem(item, index)"
          >
            <span :class="[index === activeIndex ? 'tab-curve-active' : '']">{{
              item.name
            }}</span>
          </li>
        </ul>
      </div>
    </sp-sticky>
    <!-- S 推荐商品列表 -->
    <div class="goods-list">
      <sp-skeleton
        v-for="val in goodsList"
        :key="val + 'a'"
        avatar-shape="square"
        avatar-size="2.4rem"
        title
        title-width="100%"
        avatar
        :row="3"
        :row-width="['80%', '70%', '50%']"
        :loading="goodsList.length > 0 ? false : true && !noData"
      >
      </sp-skeleton>
      <div
        v-for="(item, index) in goodsList"
        :key="index"
        class="goods-item"
        @click="jumpPage(item)"
      >
        <div class="goods-lable-img">
          <span v-if="false" class="lable">2千元成交礼</span>
          <sp-image :src="item.img"></sp-image>
        </div>
        <div class="goods-info">
          <p class="goods-name">
            {{ item.name }}
          </p>
          <p v-if="item.tag" class="goods-tag">
            <span
              v-if="item.salesGoodsSubVos && item.salesGoodsSubVos.length > 1"
              class="tag-item tag-tc"
              >套餐</span
            >
            <span
              v-for="(tagItem, index2) in item.tag"
              v-show="index2 < 3"
              :key="index2"
              class="tag-item"
              >{{ tagItem.tagName }}</span
            >
          </p>
          <p
            v-if="item.salesGoodsSubVos && item.salesGoodsSubVos.length === 1"
            class="goods-slogan goods-slogan1"
          >
            {{
              item.salesGoodsSubVos[0] &&
              item.salesGoodsSubVos[0].goodsSubDetailsName
            }}
          </p>
          <p v-else class="goods-slogan goods-slogan1">
            {{ item.salesGoodsOperatings && item.salesGoodsOperatings.slogan }}
          </p>
          <div class="goods-price">
            <span
              v-if="
                item.price == 0 ||
                item.price === '0.00' ||
                item.price === '0.0' ||
                item.price === '0'
              "
              class="sales-proce"
              ><span class="big-value">面议</span></span
            >
            <span v-else class="sales-proce">
              <span class="big-value"
                >{{ item.price || item.salesPrice }}元</span
              >
              <!-- <span
                v-if="priceRest(1, item.price || item.salesPrice)"
                class="small-value"
                >.{{ priceRest(1, item.price || item.salesPrice) }}</span
              >
              <span class="unit">元</span> -->
            </span>
            <!-- <span class="original-price"
              >{{ item.goodsPrice || item.price || item.salesPrice }}元</span
            > -->
          </div>
        </div>
      </div>
      <div v-if="noData" class="no-data">
        <img :src="$ossImgSet(340, 340, '3py8wghbsaq000.png')" alt="" />
        <p>暂无数据</p>
      </div>
    </div>
    <Loading-down
      v-if="goodsList.length"
      :bg-color="noData ? '#ffffff' : '#f4f4f4'"
      :loading="loading"
      :no-data="noMore"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Swipe, swipeItem, Skeleton, Image, Sticky } from '@chipspc/vant-dgg'
import getUserSign from '@/utils/fingerprint'
import { recommendApi, dict } from '@/api'
import LoadingDown from '@/components/common/loading/LoadingDown'
import adJumpHandle from '~/mixins/adJumpHandle'
export default {
  components: {
    [Swipe.name]: Swipe,
    [swipeItem.name]: swipeItem,
    [Skeleton.name]: Skeleton,
    [Image.name]: Image,
    [Sticky.name]: Sticky,
    LoadingDown,
  },
  mixins: [adJumpHandle],
  data() {
    return {
      isFixed: false,
      tabBtn: [],
      loading: false,
      curentItem: 0,
      activeIndex: '',
      searchDomHeight: 0,
      noData: true,
      noMore: false,
      tabList: [],
      params: {
        userId: '', // 用户id
        deviceId: '', // 设备ID（用户唯一标识） 0022ef1a-f685-469a-93a8-5409892207a2
        areaCode: '', // 区域编码
        sceneId: 'app-mainye-01', // 场景ID
        maxsize: 120, // 要求推荐产品的数量
        platform: 'APP', // 平台（app,m,pc）
        formatId: '', // 产品类别
        page: {
          pageNo: 1,
          pageSize: 10,
        },
        storeId: '', // 商户id
        productType: 'PRO_CLASS_TYPE_SALES',
      },
      goodsList: [],
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
    }),
    cityCode() {
      return this.$store.state.city.currentCity.code
    },
  },
  async created() {
    if (process.client) {
      this.params.deviceId = await getUserSign() // 获取用户唯一标识
    }
  },
  mounted() {
    this.getTabData()
    try {
      this.searchDomHeight =
        this.$parent.$refs.searchBannerRef.$refs.searchRef.$el.clientHeight - 1 // 获取吸顶头部搜索栏的高度
      this.$parent.$refs.homeRef.addEventListener('scroll', this.handleScroll) // 监听滚动
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    getTabData() {
      dict
        .findCmsCode(
          { axios: this.$axios },
          {
            code: 'C-SY-RMSP-GG',
          }
        )
        .then((res) => {
          this.tabList = res
          if (res.length) this.selectItem(res[0], 0)
        })
    },
    // 滚动加载更多
    handleScroll() {
      const pageScrollTop = this.$parent.$refs.homeRef.scrollTop // 滚动条距离顶部的位置
      this.$parent.pageScrollTop = pageScrollTop
      if (this.goodsList.length && !this.loading && !this.noMore) {
        const pageScrollHeight = this.$parent.$refs.homeRef.scrollHeight // 页面文档的总高度
        const pageClientHeight = this.$parent.$refs.homeRef.clientHeight // 文档显示区域的高度
        // 监听页面是否滚动到底部加载更多数据
        if (Math.ceil(pageScrollTop + pageClientHeight) >= pageScrollHeight) {
          this.loading = true
          this.params.page.pageNo++
          this.findRecomList()
        }
      }
    },
    // 滚动事件
    scrollHandle(data) {
      this.isFixed = data.isFixed
    },
    selectItem(item, index) {
      this.params.formatId = item.ext3
      this.activeIndex = index
      this.goodsList = []
      this.noData = false
      this.loading = true
      this.params.page.pageNo = 1
      this.findRecomList(index)
    },
    preventTouch(e) {
      e.stopImmediatePropagation() // 阻止冒泡
    },
    // 查询推荐商品
    findRecomList(index) {
      const params = this.params
      params.areaCode = this.cityCode || '510100'
      this.$axios.post(recommendApi.saleList, params).then((res) => {
        this.loading = false
        if (res.code === 200) {
          // 加载更多时无更多数据
          if (!res.data.records.length) {
            this.noData = true
            return
          }
          this.goodsList = this.goodsList.concat(res.data.records)
          this.noData = false
        } else {
          if (!this.goodsList.length) {
            this.noData = true
          }
          this.params.page.pageNo--
        }
      })
    },
    priceRest(index = 0, price) {
      const isFlot = price.indexOf('.')
      if (isFlot !== -1) {
        return price.split('.')[index]
      }
      return index === 0 ? price : ''
    },
    jumpPage(item) {
      this.$router.push({
        path: '/detail',
        query: {
          productId: item.id,
        },
      })
    },
  },
}
</script>

<style scoped lang="less">
@skeleton-row-margin-top: 0;
.recommend-moudle {
  margin-top: -20px;
}
.tab-curve-list {
  height: 88px;
}
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
        // border: 1px solid #cdcdcd;
        border: 1px solid rgba(205, 205, 205, 0.6);
        box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
        border-radius: 8px;
        overflow: hidden;
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
  padding: 0 20px;
  min-height: 400px;
  .goods-item {
    padding: 20px;
    background: white;
    margin: 0 auto 20px auto;
    border-radius: 24px;
  }
  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 1px;
    background: #f4f4f4;
  }
  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 20px;
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
.goods-item {
  font-size: 24px;
  width: 100%;
  padding: 32px 0;
  display: flex;
  overflow: hidden;
  .goods-lable-img {
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 22px;
    .sp-image {
      width: 100%;
      height: 100%;
    }
    &::before {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      //   background: rgba(0, 0, 0, 0.2);
    }
    > img {
      width: 100%;
      height: 100%;
    }
    > .lable {
      position: absolute;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      z-index: 2;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      height: 44px;
      padding: 0 12px;
      background: #ec5330;
      border-radius: 8px 0px 8px 0px;
    }
  }
  .goods-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    .goods-name {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 36px;
      margin-top: -3px;
      .textOverflow(2);
      .pro-lable {
        display: inline-block;
        position: relative;
        top: -2px;
        margin-right: 8px;
        background-color: #ec5330;
        border-radius: 4px;
        overflow: hidden;
        line-height: 32px;
        vertical-align: middle;
        > i {
          position: relative;
          font-style: inherit;
          display: inline-flex;
          align-items: center;
          padding: 0 7px;
          line-height: 32px;
          color: #fff;
          font-size: 20px;
          font-family: PingFang SC;
          color: #ffffff;
        }
      }
    }
    .goods-tag {
      margin: 4px 0 4px 0;
      .textOverflow(1);
      .tag-item {
        display: inline-block;
        height: 0.32rem;
        background: #f0f2f5;
        border-radius: 0.04rem;
        padding: 0 0.09rem;
        line-height: 0.32rem;
        font-size: 0.22rem;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        margin-right: 10px;
      }
      .tag-tc {
        background: #fc4e41;
        border-radius: 4px;
        color: white;
      }
    }
    .goods-slogan {
      color: #999;
    }
    .goods-slogan1 {
      .textOverflow(1);
    }
    .goods-slogan2 {
      .textOverflow(2);
    }
    .goods-lable {
      display: flex;
      flex-wrap: wrap;
      > span {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        background: #f0f2f5;
        border-radius: 4px;
        padding: 0 6px;
        margin-right: 8px;
        margin-top: 10px;
        .textOverflow(1);
      }
    }
    .goods-sku {
      display: flex;
      margin-top: 12px;
      color: #222222;
      .textOverflow(1);
      > span {
        position: relative;
        display: inline;
        align-items: center;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
        padding-right: 12px;
        margin: 8px 0 8px 0;
        &:not(:last-child) {
          &::after {
            content: '';
            position: relative;
            top: 4px;
            display: inline-block;
            margin-left: 12px;
            width: 0;
            height: 23px;
            border-right: 1px solid #222222;
          }
        }
      }
    }
    .goods-price {
      flex: 1;
      display: flex;
      line-height: 18px;
      align-items: flex-end;
      vertical-align: middle;
      .sales-proce {
        display: flex;
        align-items: baseline;
        .big-value {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        .small-value {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
        }
        .unit {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #ec5330;
          margin-left: 4px;
        }
      }
      .original-price {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-left: 16px;
        line-height: 30px;
        transform: translateY(5px);
        .textOverflow(1);
      }
    }
    .recommend {
      width: 100%;
      margin-top: 8px;
      padding-top: 16px;
      display: flex;
      align-items: center;
      border-top: 1px solid #f4f4f4;
      > span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 28px;
        height: 28px;
        background: #ffb042;
        border-radius: 4px;
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        margin-right: 13px;
      }
      > p {
        flex: 1;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        line-height: 32px;
        .textOverflow(1);
      }
    }
  }
}
.tab-curve {
  width: 100%;
  font-size: 24px;
  &-list {
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 84px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-top: 30px;
    padding-left: 40px;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }
    li {
      position: relative;
      white-space: nowrap;
      -webkit-tap-highlight-color: transparent;
      &:last-child {
        padding-right: 40px;
      }
      span {
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(153, 153, 153, 1);
        font-size: 32px;
        line-height: 32px;
        position: relative;
        z-index: 4;
      }
      .tab-curve-active {
        font-size: 34px;
        font-family: PingFang SC;
        font-weight: bold;
        color: rgba(34, 34, 34, 1);
        // & + .svg-content {
        //   display: block !important;
        // }
      }
    }
  }
}
.fixed-tab {
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.04);
  background: white;
}
</style>
