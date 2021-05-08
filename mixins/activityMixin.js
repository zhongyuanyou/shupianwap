import { mapState, mapActions } from 'vuex'
import { Toast } from '@chipspc/vant-dgg'
import { activityApi } from '~/api'
import imHandle from '@/mixins/imHandle'

export default {
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
      cityCode: (state) => state.city.currentCity.code,
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    userInfo() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
    splittedRecommendProduct() {
      // return this.activityProductList.slice(0, 3)
      return this.recommendProductList.slice(0, 3)
    },
    isNoData() {
      return !this.activityProductList.length
    },
    safeTopStyle() {
      return {
        width: '100%',
        height: this.safeTop + 'px',
        backgroundColor: '#fff',
        position: 'fixed',
        top: '0',
        zIndex: '99',
      }
    },
    terminalCode() {
      // return this.isInApp ? 'COMDIC_TERMINAL_APP' : 'COMDIC_TERMINAL_WAP'
      // 只有app有图片
      return 'COMDIC_TERMINAL_APP'
    },
    isTimerShow() {
      return this.recommendProductList.length || this.activityProductList.length
    },
    // isTrade() {
    //   return this.specType === 'HDZT_ZTTYPE_DJZS'
    // },
  },
  mixins: [imHandle],
  data() {
    return {
      endCountDownTimer: null,
      countDownTimer: null,
      defaultData: {
        index: 0,
        sort: -1, // 倒序
      },
      iconLeft: 0.35,
      loading: false,
      finished: false,
      refreshing: false,
      activityTypeOptions: [],
      activityProductList: [],
      currentIndex: 0,
      currentTab: {
        cityCode: this.cityCode,
        cityName: this.cityName,
        id: '',
        labelName: this.allText,
        specialId: '',
      },
      itemTypeOptions: '',
      productList: '',
      productRecoData: '',
      productAdvertData: '',
      page: 1,
      specType: 'HDZT_ZTTYPE_XTSF', // 活动类型code 在页面覆盖
      platformCode: 'COMDIC_PLATFORM_CRISPS', // 终端code
      specCode: '',
      defaultCityCode: '510100',
      advertCode: 'ad1314', // 广告code
      endCountDiff: 0,
      countDownDiff: 0,
      time: '',
      endTime: '',
      recommendProductList: [],
      allText: '全部',
      productType: '',
      safeTop: 0,
      headerHeight: 0,
      screenWidth: 0,
      // isNoData: false,
    }
  },
  async created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }

    await this.getMenuTabs()
    await this.getRecommendProductList()
  },
  mounted() {
    if (this.isInApp) {
      this.safeTop = this.appInfo.statusBarHeight
    }
    this.headerHeight = this.$refs.header_sticky.height
    this.chii()
    this.screenWidth = window.screen.width
  },
  beforeDestroy() {
    clearInterval(this.endCountDownTimer)
    clearInterval(this.countDownTimer)
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
      GET_ACCOUNT_INFO: 'user/GET_ACCOUNT_INFO',
    }),
    // 平台不同，跳转方式不同
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
    advertjump(item) {
      this.$router.push('/')
    },
    jumpProductDetail(item) {
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
      console.log(this.productType)
      if (!this.isInApp) {
        if (this.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
          this.$router.push({
            path: `/detail/transactionDetails`,
            query: { productId: item.skuId, type: item.classCode },
          })
        } else {
          // this.$router.push({
          //   path: `/detail/serviceDetails`,
          //   query: { productId: item.skuId },
          // })
          this.$router.push({
            path: `/detail`,
            query: { productId: item.skuId },
          })
        }
      }
    },
    jumpIM(item) {
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
      this.activityProductList = []
      this.finished = false
      this.loading = true
      // this.isNoData = false
    },

    menuTab(item, index) {
      this.init()
      this.currentIndex = index
      this.currentTab = item
      this.getProductList()
    },
    async onLoad() {
      if (this.specCode) {
        this.page++
        await this.getProductList()
      }
    },
    async onRefresh() {
      this.init()
      await this.getProductList().then(() => {
        this.loading = false
      })
    },
    async getMenuTabs() {
      const params = {
        specType: this.specType,
        platformCode: this.platformCode,
      }
      // if (this.hasCity) {
      //   params.cityCodes = this.cityCode || this.defaultCityCode
      // }
      // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
      params.cityCodes = this.cityCode || this.defaultCityCode
      // if (this.specType !== 'HDZT_ZTTYPE_XSQG') {
      //   Object.assign(params, {
      //     // cityCodes: this.cityCode || this.defaultCityCode,
      //     platformCode: this.platformCode,
      //   })
      // }
      await this.$axios
        .get(activityApi.activityTypeOptions, {
          params,
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityTypeOptions = res.data.settingVOList || []
            if (
              (this.activityTypeOptions.length === 0 &&
                this.specType !== 'HDZT_ZTTYPE_XSQG') ||
              !res.data.specCode
            ) {
              throw new Error('无活动数据')
            }
            if (res.data.endTime) {
              this.activeTimer(res.data.endTime.replace(/-/g, '/'))
            }
            if (res.data.specCode) {
              this.specCode = res.data.specCode
            }
            this.productType = res.data.productType || ''
            this.activityTypeOptions.unshift({
              cityCode: this.cityCode,
              cityName: this.cityName,
              id: '',
              labelName: this.allText,
              specialId: '',
            })
            console.log('this.specCode', this.specCode)
            if (res.data.settingVOList && res.data.settingVOList.length > 0) {
              this.itemTypeOptions = res.data.settingVOList[0]
              this.getProductList(this.itemTypeOptions, this.specCode)
            } else {
              this.loading = false
              this.finished = true
            }
          } else {
            throw new Error('服务异常，请刷新重试！')
          }
        })
        .catch((error) => {
          this.loading = false
          this.finished = true
          Toast.fail({
            duration: 2000,
            message: error.message,
            forbidClick: true,
            className: 'my-toast-style',
          })
        })
    },
    // 获取产品
    async getProductList() {
      if (
        this.activityTypeOptions.length > 0
        // && this.specType !== 'HDZT_ZTTYPE_XSQG'
      ) {
        const params = {
          specCode: this.specCode,
          page: this.page,
          limit: 15,
          terminalCode: this.terminalCode,
        }
        // if (this.hasCity) {
        //   params.cityCode = this.cityCode
        // }
        // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
        params.cityCode = this.cityCode
        if (this.currentTab.id !== '') {
          params.labelId = this.currentTab.id
        }
        await this.productMethod(params)
      } else {
        // this.isNoData = true
        this.finished = true
        this.loading = false
      }
    },
    async productMethod(param) {
      await this.$axios
        .get(activityApi.activityProductList, {
          params: param,
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityProductList = this.activityProductList.concat(
              res.data.rows
            )
            if (this.activityProductList.length === 0) {
              // this.isNoData = true
            }
            this.total = res.data.total
            this.loading = false
            if (this.page > res.data.totalPage) {
              this.finished = true
            }
          } else {
            this.loading = false
            throw new Error('服务异常，请刷新重试！')
            // Toast.fail({
            //   duration: 2000,
            //   message: '服务异常，请刷新重试！',
            //   forbidClick: true,
            //   className: 'my-toast-style',
            // })
          }
        })
        .catch((err) => {
          Toast.fail({
            duration: 2000,
            message: err.message,
            forbidClick: true,
            className: 'my-toast-style',
          })
        })
        .finally(() => {
          this.refreshing = false
        })
    },
    getRecommendProductList() {
      if (this.specCode) {
        const params = {
          specCode: this.specCode,
          isReco: 1,
          page: 1,
          limit: 10000,
          terminalCode: this.terminalCode,
        }

        // if (this.hasCity) {
        //   params.cityCode = this.cityCode
        // }
        // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
        params.cityCode = this.cityCode

        this.$axios
          .get(activityApi.activityProductList, { params })
          .then((res) => {
            if (res.code === 200) {
              this.recommendProductList = res.data.rows
            } else {
              throw new Error('服务异常，请刷新重试！')
            }
          })
          .catch((err) => {
            Toast.fail({
              duration: 2000,
              message: err.message,
              forbidClick: true,
              className: 'my-toast-style',
            })
          })
      }
    },

    getAdvertisingData() {
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            code: this.advertCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            if (res.data.sortMaterialList.length) {
              this.productAdvertData = res.data.sortMaterialList[0].materialList.slice(
                0,
                3
              )
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
          console.log(err.message)
        })
    },
    swichCityHandle() {
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
    activeTimer(endTime) {
      this.endCountDown(new Date(endTime).getTime())
      this.countDown(new Date(endTime).getTime())
    },
    endCountDown(timestamp) {
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.endCountDiff = (timestamp - nowTimeStamp) / 1000
      this.endCountDownTimer = setInterval(() => {
        let hour = Math.floor(that.endCountDiff / 3600)
        let min = Math.floor((that.endCountDiff - hour * 3600) / 60)
        let sec = Math.floor(that.endCountDiff % 60)
        if (hour < 10) hour = '0' + hour
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
        that.endTime = {
          hour,
          min,
          sec,
        }
        that.endCountDiff--
      }, 1000)
      // 每执行一次定时器就减少一秒
    },
    countDown(endTimeStamp) {
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.countDiff = (endTimeStamp - nowTimeStamp) / 1000
      this.countDownTimer = setInterval(() => {
        let day = Math.floor(that.countDiff / 86400)
        let hour = Math.floor((that.countDiff - day * 86400) / 3600)
        let min = Math.floor((that.countDiff - hour * 3600 - day * 86400) / 60)
        let sec = Math.floor(that.countDiff % 60)
        if (day < 10) day = '0' + day
        if (hour < 10) hour = '0' + hour
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
        that.time = {
          day,
          hour,
          min,
          sec,
        }
        that.countDiff--
      }, 1000)
      // 每执行一次定时器就减少一秒
    },
    getPercentage(res, total) {
      return (res / total) * 100
    },
    overflowDot(str, num) {
      if (str.length > 6) {
        return str.slice(0, num) + '...'
      } else {
        return str
      }
    },
    chii() {
      const script = document.createElement('script')
      script.src = '//172.16.132.163:9090/target.js'
      document.body.appendChild(script)
    },
    convert2vw(px) {
      px = parseFloat(px)
      return (px / this.screenWidth) * 100
    },
    parsePrice(priceStr) {
      if (priceStr > 0) {
        return {
          yuan: priceStr.split('.')[0],
          jiao: priceStr.split('.')[1],
        }
      } else {
        return '面议'
      }
    },
  },
}
