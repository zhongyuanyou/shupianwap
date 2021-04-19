<template>
  <div class="container">
    <!-- <sp-sticky></sp-sticky> -->
    <div class="container-advice">
      <!-- S search -->
      <sp-sticky>
        <div class="search">
          <div class="left-back" @click="$router.back(-1)">
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
              placeholder="搜索首发商品"
              readonly
              @click="clickInputHandle"
            />
          </div>
        </div>
      </sp-sticky>
      <!-- E search -->
      <!-- <div class="rules" @click="$router.push('/')">
        <p>规则</p>
      </div> -->
      <div class="advice-box">
        <div
          v-for="(item, index) in productAdvertData"
          :key="index"
          @click="advertjump(item)"
        >
          <a :href="item.materialLink"
            ><img :src="item.materialUrl" alt="" srcset=""
          /></a>
        </div>
      </div>
    </div>
    <div class="container-body">
      <div class="tabs-box">
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
      <div class="body-content">
        <sp-pull-refresh v-model="refreshing">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
          >
            <div
              v-for="(item, index) in productList.rows"
              :key="index"
              @click="jumpProductdetail(item)"
            >
              <div class="body-content-items">
                <div class="left-content">
                  <img :src="item.imageUrl" alt="" srcset="" />
                </div>
                <div class="right-content">
                  <div class="rc-top">
                    <span v-if="specTypeCode === 'HDZT_ZTTYPE_XTSF'">新品</span>
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
                    <div class="rc-bottom-rt" @click.stop="jumpIM(item)">
                      <div class="imm_consult">立即咨询</div>
                      <div class="imm_img"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="line"></div>
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
export default {
  components: {
    [CountDown.name]: CountDown,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [WorkTabSort.name]: WorkTabSort,
    [WorkTabSortItem.name]: WorkTabSortItem,
    [PullRefresh.name]: PullRefresh,
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
      activityTypeOptions: '',
      activityProductList: '',
      currentIndex: 0,
      itemTypeOptions: '',
      productList: '',
      productRecoData: '',
      productAdvertData: '',
      page: 1,
      specTypeCode: 'HDZT_ZTTYPE_XTSF', // 活动类型code
      platformCode: 'COMDIC_PLATFORM_CRISPS', // 终端code
      specCode: '',
      defaultCityCode: '510100',
      advertCode: 'ad100043', // 广告code
      productType: '',
    }
  },
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
      code: (state) => state.city.currentCity.code,
    }),
    userInfo() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
  },
  created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }

    this.getAdvertisingData()
    this.getMenuTabs()
  },
  mounted() {
    console.log(this.$store.state.user, 1111111111111)
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
      GET_ACCOUNT_INFO: 'user/GET_ACCOUNT_INFO',
    }),
    jumpProductdetail(item) {
      if (this.type === 'PRO_CLASS_TYPE_TRANSACTION') {
        this.$router.push({
          path: `/detail/transactionDetails`,
          query: { productId: item.id },
        })
      } else {
        this.$router.push({
          path: `/detail/serviceDetails`,
          query: { productId: item.id },
        })
      }
    },
    jumpIM(item) {
      console.log(item)
      this.uPIM({
        mchUserId: this.userInfo.imUserId,
        userName: this.userInfo.userName,
        type: this.userInfo.imUserType,
      })
    },
    async uPIM(data = {}) {
      const { mchUserId, userName, type } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          await this.getUserInfo()
          this.$appFn.dggOpenIM(
            {
              name: userName,
              userId: mchUserId,
              userType: type || 'MERCHANT_B',
              requireCode: this.requireCode || '',
              requireName: this.requireName || '',
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        } catch (error) {
          console.error('uPIM error:', error)
        }
        return
      }
      const imUserType = type || 'MERCHANT_B' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      this.creatImSessionMixin({
        imUserId: mchUserId,
        imUserType,
        requireCode: this.requireCode || '',
        requireName: this.requireName || '',
      })
    },
    init() {
      this.page = 1
      this.productList = []
      this.finished = false
      this.loading = true
    },

    menuTab(item, index) {
      this.init()
      this.currentIndex = index
      this.getProductList(item, this.specCode)
    },
    getMenuTabs() {
      this.$axios
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
              this.getProductList(this.itemTypeOptions, this.specCode)
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
    },
    // 初始化获取推介商品
    // getRecProduct(item, itemSpecCode, itemReco) {
    //   const params = {
    //     specCode: itemSpecCode,
    //     cityCode: item.cityCode,
    //     isReco: itemReco,
    //   }
    //   this.productMethod(params, itemReco)
    // },
    // 获取产品
    getProductList(item, itemSpecCode) {
      const params = {
        specCode: itemSpecCode,
        cityCode: item.cityCode,
        labelId: item.id,
      }
      this.productMethod(params)
    },
    productMethod(param) {
      this.$axios
        .get(activityApi.activityProductList, {
          params: param,
        })
        .then((res) => {
          if (res.code === 200) {
            this.productList = res.data
            this.productList.rows.forEach((item) => {
              if (item.tags) {
                item.tags = item.tags.split(',')
              }
            })

            this.total = res.data.total
            this.loading = false
            this.page++
            if (this.page > res.data.totalPage) {
              this.finished = true
            }
          } else {
            this.loading = false
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
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
    // onRefresh() {
    //   // 清空列表数据
    //   this.finished = false

    //   // 重新加载数据
    //   // 将 loading 设置为 true，表示处于加载状态
    //   this.loading = true
    //   this.onLoad()
    // },
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
      this.$router.push('/search')
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.sp-sticky--fixed {
  max-width: 10rem;
  width: 100%;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background: linear-gradient(90deg, #d20001 0%, #f80302 100%);
}
.container {
  width: 7.5rem;
  overflow-x: hidden;
  margin: 0 auto;
  .container-advice {
    padding: 0 20px;
    margin-bottom: 32px;
    width: 750px;
    height: 717px;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/aey2uyjrfcg0000.png');
    position: relative;
    .rules {
      width: 68px;
      height: 36px;
      background: linear-gradient(45deg, #ffd800 0%, #ff2828 100%);
      box-shadow: 0px 0px 20px 0px #d70000;
      border-radius: 32px 0px 0px 32px;
      // opacity: 0.5;
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
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
    .search {
      display: flex;
      align-items: center;
      padding: 16px 0;
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
          font-size: 32px;
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
    .advice-box {
      position: absolute;
      display: flex;
      justify-content: space-between;
      bottom: 92px;
      div {
        margin-right: 10px;
        width: 230px;
        height: 160px;
        //background: linear-gradient(137deg, #ffffff 0%, #fff3eb 100%);
        border-radius: 12px;
        border: 5px solid #ffab6f;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .container-body {
    padding: 0 20px;
    width: 100%;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    .tabs-box {
      display: flex;
      justify-content: space-between;
      padding-top: 12px;
      height: 88px;
      align-items: center;
      .tabs-box-left {
        padding: 0 10px;
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

    .tabs-box-items {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 15px;
      max-width: 500px;
      overflow-x: auto;
      height: 40px;
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
        font-weight: 600;
        color: #ec5330;
        line-height: 32px;
      }
    }
    .body-content {
      .line {
        width: 710px;
        height: 1px;
        background: #dcdcdc;
      }
      .body-content-items {
        display: flex;
        justify-content: space-between;
        height: 324px;
        width: 100%;
        padding: 32px 0;
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
          height: 84px;
          font-size: 32px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 42px;
          white-space: nowrap;
          // overflow: hidden;
          text-overflow: ellipsis;
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
          div {
            font-size: 20px;
            margin-bottom: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #5c7499;
            line-height: 20px;
            padding: 4px 6px;
            background: #f0f2f5;
            border-radius: 4px;
            margin-right: 8px;
          }
        }
        .rc-bottom {
          display: flex;
          justify-content: space-between;
          .rc-bottom-lf {
            margin-top: 5px;
            .rc-bottom-lf-my {
              display: flex;
              flex-direction: row;
              align-content: flex-start;
              align-items: center;
              margin-top: 52px;
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
            margin-top: 56px;
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
