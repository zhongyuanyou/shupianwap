<template>
  <div class="container">
    <!-- S search -->
    <div>
      <header-slot>
        <sp-sticky>
          <div :class="{ positionY: positionY }" class="search">
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
                size="0.30rem"
                color="#FFFFFF"
                :style="{ marginLeft: iconLeft + 'rem' }"
              ></my-icon>
              <input
                placeholder="请输入感兴趣的内容"
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
    <div class="container-advice">
      <div class="advice-box">
        <div
          v-for="(item, index) in productAdvertData.slice(0, 1)"
          :key="index"
          class="default_s"
          @click="advertjump(item)"
        >
          <a :href="item.materialLink"
            ><img :src="item.materialUrl" alt="" srcset=""
          /></a>
        </div>
        <div>
          <div
            v-for="(item, index) in productAdvertData.slice(1, 3)"
            :key="index"
            class="other_s"
            @click="advertjump(item)"
          >
            <a :href="item.materialLink"
              ><img :src="item.materialUrl" alt="" srcset=""
            /></a>
          </div>
        </div>
      </div>
    </div>
    <div class="container-body">
      <sp-sticky :offset-top="59">
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
                      <span v-if="specTypeCode === 'HDZT_ZTTYPE_XFWHSF'"
                        >好品</span
                      ><span>千万补贴</span>
                      {{ item.skuName }}
                    </div>
                    <div v-if="item.tags.length > 0" class="rc-middle">
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
                        <div class="imm_consult">立即购买</div>
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
import HeaderSlot from '@/components/common/head/HeaderSlot'
import { activityApi } from '~/api'
import imHandle from '@/mixins/imHandle'
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
      productList: [],
      productRecoData: '',
      productAdvertData: '',
      page: 1,
      specTypeCode: 'HDZT_ZTTYPE_XFWHSF', // 活动类型code
      platformCode: 'COMDIC_PLATFORM_CRISPS', // 平台code
      specCode: '',
      defaultCityCode: '510100',
      advertCode: 'ad100043', // 广告code
      productType: '',
      fixedShow: false,
      limit: 10,
      safeTop: 0,
      isNoData: false,
      positionY: false,
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
      this.offsetTop = this.appInfo.statusBarHeight + 66 + 'px'
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
    init() {
      this.page = 1
      this.productList = []
      this.finished = false
      this.loading = true
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
            this.total = res.data.total
            this.loading = false
            this.refreshing = false
            if (this.page > res.data.totalPage) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.finished = true
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
    getAdvertisingData() {
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            locationCode: this.advertCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.productAdvertData = res.data.sortMaterialList[0].materialList
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
          console.log(err)
        })
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
        this.$appFn.dggJumpRoute({
          iOSRouter: `{"path":"CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation","parameter":{"routerPath":"cpsc/search/page"}}`,
          androidRouter: `{"path":"/flutter/main","parameter":{"routerPath":"cpsc/search/page"}}`,
        })
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
  background-position-y: -46px !important;
}
.no-data {
  text-align: center;
  padding-top: 10px;
  img {
    width: 340px;
    height: 340px;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 28px;
  }
}
.container {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  margin: 0 auto;
  background: url('https://cdn.shupian.cn/sp-pt/wap/images/eomlorriyxc0000.png')
    no-repeat;
  background-size: 100% auto;
  /deep/.fixed-head {
    height: 1.1rem !important;
    .my-head {
      height: 1.2rem !important;
      box-shadow: none !important;
      background: url('https://cdn.shupian.cn/sp-pt/wap/d6bbb4d4tqo0000.png')
        no-repeat;
      background-size: 100% auto;
    }
  }

  .search {
    display: flex;
    align-items: center;
    padding: 16px 0;
    width: 100%;
    margin: 0 auto;
    // background: url('https://cdn.shupian.cn/sp-pt/wap/images/eomlorriyxc0000.png')
    //   no-repeat;
    background-size: 100% auto;
    background-position: center 0;
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
      box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.06);
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
        line-height: 32px;
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
    // padding: 0 20px;
    width: 100%;
    height: 700px;

    position: relative;
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
      top: 164px;
      p {
        height: 20px;
        font-size: 20px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 20px;
      }
    }

    .advice-box {
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 32px;
      box-sizing: border-box;
      padding: 20px;
      width: 710px;
      height: 346px;
      left: 0;
      right: 0;
      margin: 0 auto;
      background: linear-gradient(0deg, #ffa04b, #ff8c46);
      border-radius: 24px;
      .default_s {
        width: 327px;
        height: 298px;
        overflow: hidden;
        border-radius: 12px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .other_s {
        width: 327px;
        height: 140px;
        overflow: hidden;
        //background: linear-gradient(137deg, #ffffff 0%, #fff3eb 100%);
        border-radius: 12px;
        margin-bottom: 18px;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .container-body {
    width: 100%;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    overflow: hidden;
    .tabs-box {
      display: flex;
      justify-content: space-between;
      height: 124px;
      align-items: center;
      background: #ffffff;
      padding: 0 20px;
      .tabs-box-left {
        padding: 0 20px;
        width: 160px;
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
      margin-right: 15px;
      max-width: 500px;
      overflow-x: auto;
      height: 80px;
      white-space: nowrap;
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
        font-weight: 600;
        color: #ec5330;
        line-height: 32px;
      }
    }
    .body-content {
      background: #fff;
      .line {
        width: 710px;
        height: 1px;
        background: #dcdcdc;
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
            margin-right: 8px;
          }
        }
        .rc-middle {
          display: flex;
          // justify-content: space-between;
          align-content: flex-start;
          margin-top: 12px;
          flex-wrap: wrap;
          min-height: 120px;
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
            width: 204px;
            height: 65px;
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
