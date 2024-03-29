import { mapState, mapActions, mapMutations } from 'vuex'
import { Toast } from '@chipspc/vant-dgg'
import { activityApi } from '~/api'

export default {
  computed: {
    ...mapState({
      cityName: (state) => state.city1.currentCity.name || '成都市',
      cityCode: (state) => state.city1.currentCity.code || '510100', // 专题页定位
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
    userInfo() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },

    isNoData() {
      return !this.activityProductList.length
    },

    terminalCode() {
      // return this.isInApp ? 'COMDIC_TERMINAL_APP' : 'COMDIC_TERMINAL_WAP'
      // 只有app有图片
      return 'COMDIC_TERMINAL_APP'
    },
    isTimerShow() {
      return this.recommendProductList.length || this.activityProductList.length
    },

    // 是否是服务商品
    isService() {
      return this.productType === 'PRO_CLASS_TYPE_SERVICE'
    },
  },
  data() {
    return {
      // const cityCode = window.sessionStorage.getItem('cityCode')
      // const cityName = window.sessionStorage.getItem('cityName')
      changeTab: false, // 是否初始化
      endCountDownTimer: null,
      countDownTimer: null,

      loading: false,
      finished: false,

      refreshDisabled: false,
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
      banner: '',
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

      headerHeight: 0,
      ClassState: 1,
    }
  },
  watch: {
    ClassState() {
      this.setTopColor()
    },
  },

  async mounted() {
    // 初始化定位
    this.setTopColor()
    this.getAdvertisingData()
    await this.getMenuTabs() // 获取tab
    await this.getRecommendProductList() // 获取推荐商品
  },
  beforeDestroy() {
    clearInterval(this.endCountDownTimer)
    clearInterval(this.countDownTimer)
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapMutations({
      SET_CITY1: 'city1/SET_CITY',
    }),
    ...mapActions({
      POSITION_CITY1: 'city1/POSITION_CITY',
      GET_ACCOUNT_INFO: 'user/GET_ACCOUNT_INFO',
    }),
    setTopColor() {
      if (this.isInApp) {
        this.$appFn.dggChangeTopColor(
          {
            flags: this.ClassState === 1 ? 'light' : 'dark',
          },
          (res) => {
            console.log('DGGSetColorRes', res)
          }
        )
      }
    },
    // 平台不同，跳转方式不同
    uPGoBack() {
      this.SET_CITY1({
        code: '',
        name: '',
      })
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {
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
          this.$router.push({
            path: `/detail`,
            query: { productId: item.skuId },
          })
        }
      }
    },

    init() {
      this.page = 1
      this.activityProductList = []
      this.finished = false
      this.loading = true
    },

    menuTab(item, index) {
      this.page = 1
      this.loading = true
      this.changeTab = true
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
      //   params.cityCodes = this.cityCode || this.defaultCityCode || this.defaultCityCodeCode
      // }
      // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
      params.cityCodes = this.cityCode || this.defaultCityCode

      await this.$axios
        .get(activityApi.activityTypeOptions, {
          params,
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityTypeOptions = res.data.settingVOList || []
            if (
              (res.data.settingVOList.length === 0 &&
                this.specType !== 'HDZT_ZTTYPE_XSQG') ||
              !res.data.specCode
            ) {
              // throw new Error('无活动数据')
              this.loading = false
              this.finished = true
              this.refreshDisabled = true
              return
            }
            if (res.data.endTime) {
              this.activeTimer(res.data.endTime.replace(/-/g, '/'))
            }
            if (res.data.specCode) {
              this.specCode = res.data.specCode
            }
            this.productType = res.data.productType || ''

            this.activityTypeOptions.unshift({
              cityCode: this.cityCode || this.defaultCityCode,
              cityName: this.cityName,
              id: '',
              labelName: this.allText,
              specialId: '',
            })
            console.log('this.specCode', this.specCode)
            if (res.data.settingVOList && res.data.settingVOList.length > 0) {
              this.itemTypeOptions = res.data.settingVOList[0]
              this.getProductList()
            } else {
              this.loading = false
              this.finished = true
            }
          } else {
            throw new Error(res.message)
            // throw new Error('服务异常，请刷新重试！')
          }
        })
        .catch((error) => {
          this.loading = false
          this.finished = true
          this.refreshDisabled = true
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
      if (this.activityTypeOptions.length > 0) {
        const params = {
          specCode: this.specCode,
          page: this.page,
          limit: 15,
          terminalCode: this.terminalCode,
        }
        // if (this.hasCity) {
        //   params.cityCode = this.cityCode || this.defaultCityCode
        // }
        // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
        params.cityCode = this.cityCode || this.defaultCityCode
        if (this.currentTab.id !== '') {
          params.labelId = this.currentTab.id
        }

        if (
          this.currentTab.labelName !== '' &&
          this.currentTab.labelName !== '全部' &&
          this.currentTab.labelName !== '全部服务'
        ) {
          params.labelName = this.currentTab.labelName
        }
        await this.productMethod(params)
      } else {
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
          console.log('productMethod', param, res)
          this.refreshing = false
          if (res.code === 200) {
            if (this.changeTab) {
              this.activityProductList = []
              this.changeTab = false
            }
            this.activityProductList = this.activityProductList.concat(
              res.data.rows
            )

            this.total = res.data.total
            this.loading = false
            if (this.page > res.data.totalPage || res.data.rows.length < 15) {
              this.finished = true
            }
          } else {
            this.loading = false
            this.finished = true
            this.refreshDisabled = true
            throw new Error(res.message)
            // throw new Error('服务异常，请刷新重试！')
          }
        })
        .catch((err) => {
          this.loading = false
          this.finished = true
          this.refreshDisabled = true
          this.refreshing = false
          Toast.fail({
            duration: 2000,
            message: err.message,
            forbidClick: true,
            className: 'my-toast-style',
          })
        })
    },

    // 获取推荐产品
    getRecommendProductList() {
      if (this.specCode) {
        const params = {
          specCode: this.specCode,
          isReco: 1, // 是否需要推荐商品
          page: 1,
          limit: 10000,
          terminalCode: this.terminalCode,
        }
        // 前端放开，后台校验城市，如果是交易产品后台就不带城市查询
        params.cityCode = this.cityCode || this.defaultCityCode

        this.$axios
          .get(activityApi.activityProductList, { params })
          .then((res) => {
            if (res.code === 200) {
              if (res.data.rows.length) {
                this.recommendProductList = res.data.rows.slice(0, 3)
              } else {
                this.recommendProductList = []
              }
            } else {
              throw new Error(res.message)
              // throw new Error('服务异常，请刷新重试！')
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
    // 通过广告位获取banner图
    getAdvertisingData() {
      if (this.imageHead) {
        return
      }

      if (!this.advertCode) {
        console.log('未配置广告位')
        this.imageHead = this.imageHead || this.imageHeadDefault
        return
      }
      this.$axios
        .get(activityApi.activityAdvertising, {
          params: {
            locationCode: this.advertCode,
          },
        })
        .then((res) => {
          // 这个接口被uc浏览器拦截了，uc会返回空数据

          if (res.code === 200) {
            if (
              res.data.sortMaterialList.length &&
              res.data.sortMaterialList[0].materialList.length
            ) {
              this.imageHead =
                res.data.sortMaterialList[0].materialList[0].materialUrl
            } else {
              this.imageHead = this.imageHead || this.imageHeadDefault
            }
          } else {
            this.imageHead = this.imageHead || this.imageHeadDefault
          }
        })
        .catch((err) => {
          console.log(err.message)
          this.imageHead = this.imageHead || this.imageHeadDefault
        })
    },

    swichCityHandle() {
      this.$router.push({
        path: '/city/choiceCity',
        query: {
          type: 1,
        },
      })
    },
    // 搜索框点击
    clickInputHandle() {
      if (this.isInApp) {
        const iOSRouter = {
          path: 'CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation',
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

    parsePrice(priceStr) {
      if (priceStr && priceStr > 0) {
        priceStr = priceStr.toString()
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
