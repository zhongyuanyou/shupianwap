import { mapState, mapActions } from 'vuex'
import { Toast } from '@chipspc/vant-dgg'
import { activityApi } from '~/api'
import imHandle from '@/mixins/imHandle'
let timer

export default {
  computed: {
    ...mapState({
      cityName: (state) => state.city.currentCity.name,
      cityCode: (state) => state.city.currentCity.code,
      isInApp: (state) => state.app.isInApp,
    }),
    userInfo() {
      return JSON.parse(localStorage.getItem('myInfo'))
    },
    splittedRecommendProduct() {
      return this.recommendProductList.slice(0, 3)
    },
  },
  mixins: [imHandle],
  data() {
    return {
      defaultData: {
        index: 0,
        sort: -1, // 倒序
      },
      testItems: [
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
        {
          span1: '好品',
          span2: '千万补贴',
          title: '公司干净，成都某某国际融资租赁有限公司',
          jiangjia: '200',
          ok: '3325',
          miaosha: '98.5',
          dijia: '90',
          baifen: '75',
        },
      ],
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
      diff: 0,
      time: '',
      endTime: '',
      recommendProductList: [],
      allText: '全部',
      productType: '',
    }
  },
  async created() {
    // 初始化定位
    if (process.client && !this.cityName) {
      this.POSITION_CITY({
        type: 'init',
      })
    }

    this.getAdvertisingData()
    await this.getMenuTabs().then(this.getRecommendProductList)
  },
  mounted() {
    console.log(this.$store.state.user, 1111111111111)
  },
  beforeDestroy() {
    clearInterval(timer)
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
      console.log('jumpProductDetail', item)
      if (this.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
        this.$router.push({
          path: `/detail/transactionDetails`,
          query: { productId: item.id, type: item.type },
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
      this.activityProductList = []
      this.finished = false
      this.loading = true
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
      await this.$axios
        .get(activityApi.activityTypeOptions, {
          params: {
            cityCodes: this.cityCode || this.defaultCityCode,
            platformCode: this.platformCode,
            specType: this.specType,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityTypeOptions = res.data.settingVOList || []
            this.productType = res.data.productType || ''
            this.activityTypeOptions.unshift({
              cityCode: this.cityCode,
              cityName: this.cityName,
              id: '',
              labelName: this.allText,
              specialId: '',
            })
            if (res.data.endTime) this.activeTimer(res.data.endTime)
            if (res.data.settingVOList && res.data.settingVOList.length > 0) {
              this.itemTypeOptions = res.data.settingVOList[0]
              this.specCode = res.data.specCode
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
    // 获取产品
    getProductList() {
      const params = {
        specCode: this.specCode,
        page: this.page,
        limit: 10,
      }
      if (this.hasCity) {
        params.cityCode = this.cityCode
      }
      if (this.currentTab.id !== '') {
        params.labelId = this.currentTab.id
      }
      return this.productMethod(params)
    },
    async productMethod(param) {
      console.log('param', param)
      await this.$axios
        .get(activityApi.activityProductList, {
          params: param,
        })
        .then((res) => {
          if (res.code === 200) {
            this.activityProductList = this.activityProductList.concat(
              res.data.rows
            )
            this.total = res.data.total
            this.loading = false
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
        .finally(() => {
          this.refreshing = false
        })
    },
    getRecommendProductList() {
      const params = {
        specCode: this.specCode,
        isReco: 1,
        page: 1,
        limit: 100000,
      }

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
      if (this.isInApp) {
        this.$appFn.dggJumpRoute({
          iOSRouter: `{"path":"CPSCustomer:CPSCustomer/CPSFlutterRouterViewController///push/animation","parameter":{"routerPath":"cpsc/search/page"}}`,
          androidRouter: `{"path":"/flutter/main","parameter":{"routerPath":"cpsc/search/page"}}`,
        })
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
      this.diff = (timestamp - nowTimeStamp) / 1000
      timer = setInterval(() => {
        let hour = Math.floor(this.diff / 3600)
        let min = Math.floor((this.diff - hour * 3600) / 60)
        let sec = Math.floor(this.diff % 60)
        if (hour < 10) hour = '0' + hour
        if (min < 10) min = '0' + min
        if (sec < 10) sec = '0' + sec
        that.endTime = {
          hour,
          min,
          sec,
        }
        that.diff--
      }, 1000)
      // 每执行一次定时器就减少一秒
    },
    countDown(endTimeStamp) {
      const that = this
      const nowTimeStamp = new Date().getTime()
      // 计算时间差 秒
      this.diff = (endTimeStamp - nowTimeStamp) / 1000
      timer = setInterval(() => {
        let day = Math.floor(this.diff / 86400)
        let hour = Math.floor((this.diff - day * 86400) / 3600)
        let min = Math.floor((this.diff - hour * 3600 - day * 86400) / 60)
        let sec = Math.floor(this.diff % 60)
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
        that.diff--
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
  },
}
