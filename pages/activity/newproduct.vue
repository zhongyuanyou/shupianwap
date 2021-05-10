<template>
  <div class="container">
    <!-- S search -->
    <div>
      <header-slot>
        <sp-sticky>
          <!-- <div
          v-if="isInApp"
          :style="{ height: appInfo.statusBarHeight + 'px' }"
        ></div> -->
          <div class="search">
            <div class="left-back" @click="uPGoBack">
              <my-icon
                name="nav_ic_back"
                class="back_icon"
                size="0.4rem"
                color="#FFFFFF"
              ></my-icon>
            </div>
            <div class="search-box">
              <my-icon
                class="search-icon"
                name="sear_ic_sear"
                size="0.31rem"
                color="#FFFFFF"
                :style="{ marginLeft: iconLeft + 'rem' }"
              ></my-icon>
              <input
                placeholder="搜索商品"
                readonly
                @click="clickInputHandle"
              />
            </div>
          </div>
        </sp-sticky>
      </header-slot>
    </div>
    <!-- E search -->
    <!-- <sp-sticky></sp-sticky> -->
    <div class="container-advice" :class="{ positionY: positionY }">
      <div
        class="rules"
        @click="$router.push('/login/protocol?categoryCode=protocol100035')"
      >
        <p>规则</p>
      </div>
    </div>
    <div class="advice-box">
      <div v-for="(item, index) in productAdvertData" :key="index">
        <a :href="item.materialLink"
          ><img :src="item.materialUrl" alt="" srcset=""
        /></a>
      </div>
    </div>
    <div class="container-body">
      <sp-sticky :offset-top="offsetTop">
        <div ref="menu" class="tabs-box">
          <div class="tabs-box-left">
            <div @click="swichCityHandle">
              {{ cityName ? cityName : '定位中' }}
            </div>
            <div></div>
          </div>
          <ul class="tabs-box-items">
            <li
              v-for="(item, index) in activityTypeOptions"
              :key="index"
              :class="{ active: index === currentIndex }"
              @click="menuTab(item, index)"
            >
              {{ item.labelName }}
            </li>
          </ul>
        </div>
      </sp-sticky>
      <div class="body-content">
        <sp-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div v-if="productList && productList.length > 0">
              <div
                v-for="(item, index) in productList"
                :key="index"
                @click="jumpProductdetail(item)"
              >
                <div class="body-content-items">
                  <div class="left-content">
                    <img :src="item.imageUrl" alt="" srcset="" />
                  </div>
                  <div class="right-content">
                    <div class="rc-top">
                      <span v-if="specTypeCode === 'HDZT_ZTTYPE_XTSF'"
                        >新品</span
                      >
                      <span>千万补贴</span>
                      {{ item.skuName }}
                    </div>
                    <div class="rc-middle">
                      <div v-for="(item2, index2) in item.tags" :key="index2">
                        {{ item2 }}
                      </div>
                    </div>
                    <div class="rc-bottom">
                      <div class="rc-bottom-lf">
                        <div class="rc-bottom-lf-my">
                          <div>{{ item.specialPrice }}</div>
                          <div>元</div>
                        </div>
                        <div class="bf-my">原价{{ item.skuPrice }}元</div>
                      </div>
                      <div class="rc-bottom-rt">
                        <div class="imm_consult">查看详情</div>
                        <div class="imm_img"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="line"></div>
              </div>
            </div>
            <div v-if="isNoData" class="no-data">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/bzre7lw14o00000.png"
                alt=""
                srcset=""
              />
            </div>
          </sp-list>
        </sp-pull-refresh>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {
  CountDown,
  Sticky,
  List,
  WorkTabSort,
  WorkTabSortItem,
  PullRefresh,
  Toast,
} from '@chipspc/vant-dgg'
import { activityApi } from '~/api'
import imHandle from '@/mixins/imHandle'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [WorkTabSort.name]: WorkTabSort,
    [WorkTabSortItem.name]: WorkTabSortItem,
    [PullRefresh.name]: PullRefresh,
    [HeaderSlot.name]: HeaderSlot,
  },
  mixins: [imHandle],
  data() {
    return {
      defaultData: {
        index: 0,
        sort: -1, // 倒序
      },
      iconLeft: 0.35,
      loading: false,
      finished: false,
      refreshing: false,
      activityTypeOptions: [],
      activityProductList: '',
      currentIndex: 0,
      itemTypeOptions: '',
      productRecoData: '',
      productAdvertData: '',
      page: 1,
      specTypeCode: 'HDZT_ZTTYPE_XTSF', // 活动类型code
      platformCode: 'COMDIC_PLATFORM_CRISPS', // 平台code
      specCode: '',
      defaultCityCode: '510100',
      advertCode: 'ad100043', // 广告code
      productType: '',
      fixedShow: false,
      limit: 10,
      safeTop: 0,
      isNoData: false,
      offsetTop: 0,
      positionY: false,
      productList: [],
    }
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
      code: (state) => state.city.currentCity.code,
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    userInfo() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
  },
  async created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }
    this.getAdvertisingData()
    await this.getMenuTabs().then(this.getProductList)
  },
  mounted() {
    if (this.isInApp) {
      this.offsetTop = this.appInfo.statusBarHeight + 64 + 'px'
      this.positionY = true
    } else {
      this.offsetTop = 59 + 'px'
    }
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
      GET_ACCOUNT_INFO: 'user/GET_ACCOUNT_INFO',
    }),
    jumpProductdetail(item) {
      if (this.isInApp) {
        if (this.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
          this.$appFn.dggJumpRoute({
            iOSRouter: `{"path":"CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation","parameter":{"routerPath":"cpsc/goods/details/trade","parameter":{"productId":"${item.skuId}"}}}`,
            androidRouter: `{"path":"/flutter/main","parameter":{"routerPath":"cpsc/goods/details/trade","parameter":{"productId":"${item.skuId}"}}}`,
          })
        } else {
          this.$appFn.dggJumpRoute({
            iOSRouter: `{"path":"CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation","parameter":{"routerPath":"cpsc/goods/details/service","parameter":{"productId":"${item.skuId}"}}}`,
            androidRouter: `{"path":"/flutter/main","parameter":{"routerPath":"cpsc/goods/details/service","parameter":{"productId":"${item.skuId}"}}}`,
          })
        }
      }

      if (!this.isInApp) {
        if (this.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
          this.$router.push({
            path: `/detail/transactionDetails`,
            query: { productId: item.skuId, type: item.classCode },
          })
        } else {
          this.$router.push({
            path: `/detail`,
            query: { productId: item.skuId },
          })
        }
      }
    },
    init() {
      this.page = 1
      this.productList = []
      this.finished = false
      this.loading = true
      this.isNoData = false
    },
    onRefresh() {
      if (this.itemTypeOptions) {
        this.finished = false
        this.loading = true
        this.page = 1
        this.onLoad()
      } else {
        this.loading = false
        this.finished = true
        this.refreshing = false
      }
    },
    async onLoad() {
      if (this.specCode) {
        this.page++
        await this.getProductList()
      }
    },
    menuTab(item, index) {
      this.init()
      this.currentIndex = index
      this.itemTypeOptions = item
      this.getProductList()
    },
    async getMenuTabs() {
      await this.$axios
        .get(activityApi.activityTypeOptions, {
          params: {
            cityCodes: this.code || this.defaultCityCode,
            platformCode: this.platformCode,
            specType: this.specTypeCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityTypeOptions = res.data.settingVOList
            if (res.data.settingVOList && res.data.settingVOList.length > 0) {
              this.itemTypeOptions = res.data.settingVOList[0]
              this.specCode = res.data.specCode
              this.productType = res.data.productType
            } else {
              this.loading = false
              this.finished = true
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
        .catch((err) => {
          this.loading = false
          this.finished = true
          console.log(err)
        })
    },
    // 获取产品
    getProductList() {
      const params = {
        specCode: this.specCode,
        cityCode: this.itemTypeOptions.cityCode,
        labelId: this.itemTypeOptions.id,
        limit: this.limit,
        page: this.page,
      }
      if (this.activityTypeOptions.length > 0) {
        this.productMethod(params)
      } else {
        this.isNoData = true
        this.finished = true
        this.loading = false
      }
    },
    productMethod(param) {
      this.$axios
        .get(activityApi.activityProductList, {
          params: param,
        })
        .then((res) => {
          if (res.code === 200) {
            res.data.rows.forEach((item) => {
              if (item.tags) {
                item.tags = item.tags.split(',')
              }
            })
            this.productList = this.productList.concat(res.data.rows)
            if (this.productList.length === 0) {
              this.isNoData = true
            }
            this.refreshing = false
            this.total = res.data.total
            this.loading = false
            if (this.page > res.data.totalPage) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.finished = true
            this.productList = []
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
        .catch((err) => {
          this.loading = false
          this.finished = true
          this.productList = []
          console.log(err)
        })
    },
    getAdvertisingData() {
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            locationCode: this.advertCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.productAdvertData = res.data.sortMaterialList[0].materialList.slice(
              0,
              3
            )
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    handlerItemChange(action, index) {
      console.log(action, index)
    },
    swichCityHandle() {
      if (!this.cityName) {
        return
      }
      this.$router.push({
        path: '/city/choiceCity',
      })
    },
    // 搜索框点击
    clickInputHandle() {
      if (this.isInApp) {
        const iOSRouter = {
          path:
            'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const androidRouter = {
          path: '/flutter/main',
          parameter: {
            routerPath: 'cpsc/search/page',
          },
        }
        const iOSRouterStr = JSON.stringify(iOSRouter)
        const androidRouterStr = JSON.stringify(androidRouter)
        this.$appFn.dggJumpRoute(
          {
            iOSRouter: iOSRouterStr,
            androidRouter: androidRouterStr,
          },
          (res) => {
            console.log(res)
          }
        )
      } else {
        this.$router.push('/search')
      }
    },
    uPGoBack() {
      if (this.isInApp) {
        this.$appFn.dggCloseWebView((res) => {
          if (!res || res.code !== 200) {
            this.$xToast.show({
              message: '返回失败',
              duration: 1000,
              icon: 'toast_ic_error',
              forbidClick: true,
            })
          }
        })
        return
      }

      // 在浏览器里 返回, 若没返回记录了，就跳转到首页
      if (window && window.history && window.history.length <= 1) {
        this.$router.replace('/')
        return
      }
      this.$router.back(-1)
    },
  },
}
</script>

<style lang="less" scoped>
.positionY {
  margin-top: -150px !important;
}
.no-data {
  text-align: center;
  padding-top: 10px;
  img {
    display: block;
    width: 340px;
    height: 340px;
    margin: 0 auto;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 28px;
  }
}
.safe_top {
  padding-top: 20px;
}
.container {
  max-width: 8.12rem;
  height: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  ::v-deep.fixed-head {
    height: 0.92rem !important;
    .my-head {
      margin: 0 auto;
      right: 0;
      left: 0;
      max-width: 812px;
      height: 1.2rem !important;
      box-shadow: none !important;
      background: url('https://cdn.shupian.cn/sp-pt/wap/8j0v9fa82uo0000.png')
        no-repeat;
      background-size: 100% 100%;
    }
  }
  .search {
    display: flex;
    align-items: center;
    padding: 16px 0;
    // width: 750px;
    width: 100%;
    margin: 0 auto;
    background-size: 100% auto;
    .left-back {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 32px;
      .back_icon {
        width: 40px;
        height: 40px;
      }
    }
    .search-box {
      margin-right: 40px;
      height: 88px;
      border-radius: 8px;
      background: #000000;
      border-radius: 8px;
      background-color: rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      flex: 1;
      .search-icon {
        margin: 29px 12px 28px 32px;
      }
      input {
        border: none;
        font-size: 30px;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        background: transparent;
        display: flex;
        align-items: center;
        &::placeholder {
          /* Internet Explorer 10+ */
          color: #ffffff !important;
        }
      }
    }
  }
  .container-advice {
    width: 100%;
    height: 460px;
    position: relative;
    background: url('https://cdn.shupian.cn/sp-pt/wap/fe7bmr53zfs0000.png')
      no-repeat;
    background-size: 100% 4.6rem;
    margin-top: -140px;
    background-position-y: 5px;
    .rules {
      position: fixed;
      width: 68px;
      height: 36px;
      background: linear-gradient(45deg, #ffd800 0%, #ff2828 100%);
      box-shadow: 0px 0px 20px 0px #d70000;
      border-radius: 32px 0px 0px 32px;
      // opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      right: -4px;
      top: 200px;
      p {
        height: 20px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
    }
  }
  .advice-box {
    display: flex;
    justify-content: space-between;
    height: 260px;
    width: 100%;
    box-sizing: border-box;
    align-items: center;
    padding: 0 20px;
    background: #f60001;
    div {
      width: 230px;
      height: 160px;
      //background: linear-gradient(137deg, #ffffff 0%, #fff3eb 100%);
      border-radius: 12px;
      border: 5px solid #ffab6f;
      margin-top: -18px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .container-body {
    position: relative;
    width: 100%;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    overflow: hidden;
    margin-top: -20px;
    z-index: 9;
    .tabs-box {
      width: 100%;
      height: 124px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background: #ffffff;
      padding: 0 20px;
      box-sizing: border-box;
      .tabs-box-left {
        padding: 0 20px;
        max-width: 200px;
        overflow: hidden;
        height: 56px;
        background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
        border-radius: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        div:nth-child(1) {
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          padding: 8px 0;
        }
        div:nth-last-child(1) {
          // width: 15px;
          // height: 10px;
          // background: #ffffff;
          margin-left: 8px;
          width: 0;
          height: 0;
          border-left: 10px solid transparent;
          border-right: 10px solid transparent;
          border-top: 12px solid #ffffff;
        }
      }
    }
    .tabs-box-items::-webkit-scrollbar {
      display: none;
    }
    .tabs-box-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 500px;
      overflow-x: auto;
      height: 80px;
      white-space: nowrap;
      margin-left: 20px;
      // padding: 22px 10px 0 10px;
      li {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #555555;
        line-height: 32px;
        margin-left: 48px;
      }
      li.active {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: bold;
        color: #ec5330;
        line-height: 32px;
      }
    }
    .body-content {
      background: #fff;
      .line {
        width: 710px;
        height: 1px;
        background: #f4f4f4;
        margin: 0 20px;
      }
      .body-content-items {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 32px 20px;
      }
      .left-content {
        position: relative;
        margin-right: 32px;
        width: 260px;
        height: 260px;
        background: linear-gradient(
          180deg,
          #46494d 0%,
          #797d83 0%,
          #414347 100%
        );
        border-radius: 12px;
        background-size: 100% 100%;
        -moz-background-size: 100% 100%;
        img {
          width: 100%;
          height: 100%;
        }
        .left-span {
          position: absolute;
          border-radius: 12px 0 0 0;
          background: linear-gradient(90deg, #ffb132 0%, #ff8208 100%);
          font-size: 20px;
          font-weight: 500;
          color: #ffffff;
          top: -6px;
          left: 0;
          padding: 12px 6px 16px 6px;
        }
      }
      .right-content {
        width: 418px;
        display: flex;
        align-content: flex-start;
        flex-direction: column;
        .rc-top {
          width: 378px;
          min-height: 90px;
          max-height: 90px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 46px;
          overflow: hidden;
          span {
            background: #ec5330;
            border-radius: 4px;
            padding: 8px;
            font-size: 20px;
            font-weight: 500;
            color: #ffffff;
            margin-top: 6px;
          }
        }
        .rc-middle {
          display: flex;
          // justify-content: space-between;
          align-content: flex-start;
          margin-top: 12px;
          flex-wrap: wrap;
          min-height: 80px;
          div {
            font-size: 20px;
            margin-bottom: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #5c7499;
            line-height: 20px;
            padding: 6px 6px;
            background: #f0f2f5;
            border-radius: 4px;
            margin-right: 8px;
          }
        }
        .rc-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .rc-bottom-lf {
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              div {
                color: #ec5330;
              }
              div:nth-of-type(1) {
                font-size: 40px;
                font-weight: 500;
                line-height: 40px;
              }
              div:nth-of-type(2) {
                font-size: 22px;
                font-weight: 500;
                margin: 13px 0 0 2px;
                line-height: 22px;
              }
            }
            .bf-my {
              display: flex;
              flex-direction: row;
              margin-top: 4px;
              font-size: 22px;
              font-weight: 400;
              color: #999999;
              line-height: 22px;
              margin-left: 2px;
            }
          }
          .rc-bottom-rt {
            width: 192px;
            height: 80px;
            background: linear-gradient(270deg, #f3363f 0%, #ec5330 100%);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            .imm_consult {
              height: 30px;
              font-size: 30px;
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;
              color: #ffffff;
              line-height: 30px;
            }
            .imm_img {
              width: 32px;
              height: 32px;
              background-size: 100% 100%;
              -moz-background-size: 100% 100%;
              background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/625y4ztzqec0000.png');
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
}
</style>
