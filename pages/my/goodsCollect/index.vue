<template>
  <div ref="orderPage" class="list-page">
    <Header
      v-if="!isInApp && !isApplets"
      title="我的收藏"
      :hide-back="true"
      :hide-shadow="true"
    >
    </Header>
    <div
      class="top-nav"
      :style="{ top: !isInApp && !isApplets ? '44px' : '0' }"
    >
      <sp-tabs v-model="activeTab" @click="changeTab">
        <sp-tab title="服务商品"></sp-tab>
        <sp-tab title="交易商品"></sp-tab>
      </sp-tabs>
    </div>
    <div class="goods-list">
      <sp-skeleton
        v-for="val in 10"
        v-show="loadingList"
        :key="val + 'a'"
        avatar-shape="square"
        avatar-size="2.4rem"
        title
        title-width="100%"
        avatar
        :row="3"
        :row-width="['80%', '70%', '50%']"
      >
      </sp-skeleton>
      <sp-list
        ref="spList"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="goods-content"
        offset="30"
        @load="getList"
      >
        <section v-show="activeTab == 0">
          <div
            v-for="(item, index) in serveList"
            :key="index"
            class="goods-item"
          >
            <div class="left">
              <img :src="item.img" alt="" />
            </div>
            <div class="right">
              <h1>
                {{ item.name }}
              </h1>
              <div v-if="item.tag && item.tag.length > 0" class="tag">
                <div v-if="item.salesGoodsSubVos.length > 1">套餐</div>
                <p
                  v-for="(tagitem, tagindex) in item.tag"
                  v-show="tagitem.categoryCode === 'DSJTC20210514000042'"
                  :key="tagindex"
                >
                  {{ tagitem.tagValueName }}
                </p>
              </div>
              <p v-if="item.attr" class="describe">
                {{ item.attr }}
              </p>
              <p class="price">
                {{ item.price === '0.00' ? '面议' : item.price
                }}<span v-if="item.price !== '0.00'">元</span>
              </p>
            </div>
          </div>
        </section>
        <section v-show="activeTab == 1">
          <goods-item
            v-for="(_item, _index) in jyList"
            :key="_index"
            :item-data="_item"
            :goodstype="{ type: 'jy', typeCode: 'jy' }"
            :is-list="true"
          />
        </section>
      </sp-list>
    </div>
    <!-- <div ref="scrollView" class="page-list" @scroll="scollChange">
      <div class="scroll-inner">
        <sp-skeleton
          v-for="val in 10"
          v-show="loadingList"
          :key="val + 'a'"
          avatar-shape="square"
          avatar-size="2.4rem"
          title
          title-width="100%"
          avatar
          :row="3"
          :row-width="['80%', '70%', '50%']"
        >
        </sp-skeleton>
        <template v-if="activeTab === 0">
          <Goods
            v-for="(item, index) in list"
            :key="index"
            :item-data="item"
            :is-list="true"
            class="item"
          />
        </template>
        <template v-else>
          <goods-item
            v-for="(item, index) in jyList"
            :key="index"
            :item-data="item"
            :is-list="true"
            class="item"
        /></template>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import {
  Tab,
  Tabs,
  Loading,
  Skeleton,
  Dialog,
  Image,
  List,
} from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import orderApi from '@/api/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import GoodsItem from '@/components/common/goodsItem/GoodsItem'
export default {
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Loading.name]: Loading,
    [Skeleton.name]: Skeleton,
    [Dialog.Component.name]: Dialog.Component,
    [Image.name]: Image,
    [List.name]: List,
    GoodsItem,
    Header,
  },
  data() {
    return {
      finished: true,
      activeTab: 0,
      loadingList: false,
      page: 1,
      limit: 10,
      loading: false,
      selectedOrderStatus: '',
      orderData: {}, // 选中的订单
      serveList: [
        {
          attr: '对对对',
          classCode: 'FL20210425164348',
          classCodeLevel: 'FL20210425164346,FL20210425164347,FL20210425164348',
          classCodeLevelName: '财税/资产评估/固定资产评估',
          classCodeName: '固定资产评估',
          goodsNo: 'SG20210608006486',
          id: '1193490670105440827',
          img: 'https://cdn.shupian.cn/1623121279000_ddd.jpg',
          name: '测试',
          plannerRatio: '9000',
          price: '20.00',
          priceType: 'PRO_FIXED_PRICE',
          productAreaCode: '2147483647',
          productAreaName: '全国',
          refConfig: {
            taskType: 'PRO_ORDER_DIGEST',
            payType: 'PRO_PRE_SERVICE_FINISHED_PAY',
            quoteType: 'PRO_FIXED_PRICE',
          },
          salesGoodsOperatings: {
            createrId: '594869395679776987',
            createrName: '苏士卿/U2020000193',
            createTime: '2021-06-08 11:01:27',
          },
          salesGoodsSubVos: [
            {
              goodsId: '1193490670105440827',
              goodsSubId: '1209363770457088867',
              goodsSubName: '测试',
            },
          ],
          salesGoodsTags: [],
          salesVolume: 0,
          status: 'PRO_STATUS_PUT_AWAY',
          stock: 79,
          tag: [],
        },
      ],
      jyList: [
        {
          classCode: 'FL20201224136319',
          dzname: '**资质转让',
          fieldList: [
            {
              fiedlType: 'FIELD_TYPE_RADIO',
              fieldCode: 'company_industry',
              fieldDesc: '',
              fieldName: '公司行业',
              fieldRemark: '',
              fieldValue: '科技信息',
              fieldValueCn: '科技信息',
            },
            {
              iedlType: 'FIELD_TYPE_RADIO',
              fieldCode: 'taxpayer_type',
              fieldDesc: '',
              fieldName: '纳税人类型',
              fieldRemark: '',
              fieldValue: '小规模纳税人',
              fieldValueCn: '小规模纳税人',
            },
            {
              fiedlType: 'FIELD_TYPE_AMOUNT',
              fieldCode: 'registered_capital',
              fieldDesc: '限制12位，包含小数点',
              fieldName: '注册资金',
              fieldRemark: '限制12位，包含小数点',
              fieldValue: '1000000',
              fieldValueCn: '10000.00',
            },
          ],
          goodsImg:
            'https://cdn.shupian.cn/1621586041000_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210520095405.png',
          id: '1111688138133076977',
          name: '**资质转让',
          parentClassCode: 'FL20201224136319',
          productNo: 'GS20210521483189',
          referencePrice: '200.00',
          slogan: '交易商品111',
        },
        {
          classCode: 'FL20201224136320',
          dzname: '**康的房间',
          fieldList: [
            {
              goodsId: '1111740090057485050',
              goodsCode: 'GS20210525483286',
              fieldName: '公司行业',
              fieldValueList: ['食品农业'],
            },
            {
              goodsId: '1111740090057485050',
              goodsCode: 'GS20210525483286',
              fieldName: '纳税人类型',
              fieldValueList: ['未核税'],
            },
          ],
          goodsImg:
            'https://cdn.shupian.cn/1621906468000_%E4%BC%81%E4%B8%9A%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20210520095405.png',
          id: '1111740158776981906',
          name: '**康的房间',
          parentClassCode: 'FL20201224136319,FL20201224136320',
          productNo: 'GS20210525483286',
          referencePrice: '500.00',
          slogan: '的发图和合同是大法官',
        },
      ],
      payList: [], // 分批支付信息
      fromPage: 'orderList',
      noMore: false,
      loadingMore: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    navTop() {
      return 44
    },
  },
  methods: {
    getList() {},
    handleScollList(e) {
      this.throttle(this.scollChange(), 1000, 1000)
    },
    scollChange() {
      const scrollTop = this.$refs.scrollView.scrollTop
      const scrollHeight = this.$refs.scrollView.scrollHeight
      const windowHeight = window.innerHeight
      // 提前100px拉取下页数据
      if (scrollTop + windowHeight > scrollHeight) {
        if (!this.loading && !this.loadingMore && !this.noMore) {
          this.loadingMore = true
          this.page++
          this.getOrderList()
        }
      }
    },
    throttle(func, wait, mustRun) {
      let timeout
      let startTime = new Date()
      return function () {
        const context = this
        const args = arguments
        const curTime = new Date()
        clearTimeout(timeout)
        // 如果达到了规定的触发时间间隔，触发 handler
        if (curTime - startTime >= mustRun) {
          func.apply(context, args)
          startTime = curTime
          // 没达到触发间隔，重新设定定时器
        } else {
          timeout = setTimeout(func, wait)
        }
      }
    },
    changeTab(name) {
      console.log('name', name)
      // 初始化数据列表
      this.page = 1
      //   this.loadingMore = false
      //   this.noMore = false
      //   this.loading = true
      //   this.list = []
      this.activeTab = name
    },
    toCar() {
      this.$router.push('../shopCart/')
    },
    getOrderList() {
      this.noMore = false
      orderApi
        .list(
          { axios: this.$axios },
          {
            page: this.page,
            limit: this.limit,
            cusOrderStatusNo: this.selectedOrderStatus,
          }
        )
        .then((res) => {
          if (res.totalCount <= this.page * this.limit) {
            this.noMore = true
          }
          this.loading = false
          this.loadingMore = false
          const arr = res.records
          if (this.page === 1) {
            this.list = arr
          } else {
            const nowData = JSON.parse(JSON.stringify(this.list))
            const allData = nowData.concat(arr)
            this.list = allData
          }
          this.loadingList = false
        })
        .catch((error) => {
          console.log('error', error)
          if (this.page === 1) {
            this.list = []
          }
          this.loading = false
          this.loadingMore = false
          this.$xToast.error(error.message || '请求失败，请重试')
          this.loadingList = false
        })
    },
    handleClickItem(type, order) {
      this.initItem(order)
      switch (type) {
        case 1:
          // 取消订单 首先判断是否有关联订单
          this.opType = 'cancelOrder'
          this.getChildOrders()
          break
        case 2:
          // 申请合同
          this.toContract()
          break
        case 3:
          // 签署合同 查看合同
          this.toContract()
          break
        case 4:
          // 立即付款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders(order)
          break
        case 5:
          // 支付余款 首先判断是否有关联订单
          this.opType = 'payMoney'
          this.getChildOrders(order)
          break
        case 6:
          // 确认完成
          this.opType = 'confirmComplete'
          this.confirmOrder()
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.btn-car {
  margin-right: 40px;
}
.goods-item {
  padding: 32px 20px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  border-bottom: 1px solid #f4f4f4;
  > .left {
    width: 220px;
    height: 220px;
    > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 12px;
    }
  }
  > .right {
    margin-left: 32px;
    width: calc(100% - 240px);
    min-height: 220px;
    position: relative;
    > h1 {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #222222;
      line-height: 42px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    > .tag {
      margin-top: 16px;
      height: 33px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      box-sizing: border-box;
      > div {
        background: #ec5330;
        box-sizing: border-box;
        height: 32px;
        border-radius: 4px;
        padding: 0 9px;
        line-height: 37px;
        font-size: 22px;
        font-weight: 400;
        color: #fff;
        margin-left: 12px;
        color: #ffffff;
      }
      > p {
        display: inline-block;
        height: 32px;
        border-radius: 4px;
        padding: 0 9px;
        line-height: 32px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        background: #f0f2f5;
        border-radius: 4px;
        margin-left: 20px;
        color: #5c7499;
      }
      > p:nth-child(1) {
        margin-left: 0px;
      }
      > .act {
        background: #f1524e;
        color: #fff;
      }
    }
    > .describe {
      min-height: 20px;
      margin-top: 16px;
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 22px;
    }
    > .price {
      position: absolute;
      bottom: 0;
      margin-top: 19px;
      font-size: 36px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 600;
      color: #ec5330;
      line-height: 36px;
      align-self: flex-end;
      > span {
        font-size: 22px;
        line-height: 22px;
      }
    }
  }
}
.list-page {
  min-height: 100%;
  background: #f5f5f5;
  ::v-deep .top-nav {
    position: fixed;
    width: 100%;
    left: 0;
    height: 88px;
    z-index: 2;
    overflow: hidden;
    border-bottom: 1px solid #f0f0f0;
    .sp-tab--active {
      color: rgba(73, 116, 245, 1);
    }
    .sp-tab--active .sp-tab__text {
      color: #4974f5;
      font-weight: bold;
    }
    .sp-tabs__line {
      bottom: 40px;
      width: 32px;
    }
  }
  .goods-list {
    padding-bottom: 140px;
    margin-top: 88px;
    height: calc(100vh - 200px);
    overflow-y: scroll;
  }
}
.no-data-area {
  width: 100%;
  height: 100vh;
  background: white;
  position: fixed;
  left: 0;
  top: 0;
  img {
    width: 340px;
    height: 340px;
    margin: 20vh auto 40px auto;
    display: block;
  }
  .text {
    height: 29px;
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    text-align: center;
  }
}
.no-more {
  color: #999;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
}
.sp-loading {
  color: #999;
  font-size: 24px;
  text-align: center;
  margin-top: 40px;
}
</style>
