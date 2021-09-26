/**
 *
 * @author tangdaibing
 * @since 2021/09/06
 * @lastEditDate 2021/09/10
 * @param description 服务商品详情页公共js，包含IT互联网，法律，知识产权，融资和通用详情页
 * */
import { mapActions } from 'vuex'
import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi, evaluateApi } from '~/api'
export default {
  async asyncData({ $axios, query, store }) {
    try {
      let sellingGoodsDetailData = {}
      const { code, message, data } = await $axios.post(
        productDetailsApi.sellingGoodsDetail,
        {
          id: query.productId,
          configFlg: 1,
          floatingFlg: 1,
          withSalesSubsFlg: 1,
          withTagsFlg: 1,
          withGoodsSubFlg: 1,
          withOperatingsFlg: 1,
          clientType: 'COMDIC_TERMINAL_APP',
        },
      )
      if (code === 200) {
        sellingGoodsDetailData = data
        store.commit('sellingGoodsDetail/SET_SELLING_GOODS_DETAIL', data)
      } else {
        throw message
      }
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    city() {
      return this.$store.state.city.currentCity
    },
    sellingDetail() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
  },
  data() {
    return {
      sellingGoodsDetailData: {},
      finished: false, // 停止加载更多
      loading: false,
      productPage: 1, // 推荐产品当前页
      productLimit: 10, // 推荐产品没有条数
      productCount: 0, // 推荐产品总数
      recommendProduct: [], // 推荐产品
      userInfoData: {
        decodePhone: null,
        fullName: null,
      }, // 个人用户数据
      planners: [], // 规划师列表
      plannerLimit: 3, // 推荐规划师每页条数
      plannerPage: 1, // 推荐规划师当前页
      tcPlannerBooth: {}, // 钻展规划师
      deviceId: null, // 设备唯一码
      imgFileIdPaths: [], // 产品图片
      // 评论字段
      comments: {
        totalCount: 0, // 初始化评论字段,防止程序报错
        records: [],
      },
    }
  },
  async mounted() {
    this.isShare = this.$route.query.isShare
    // 假如未获取到站点信息,再获取地理位置
    if (!this.city.code) {
      await this.POSITION_CITY({ type: 'init' })
    }
    // 获取商品图片
    this.getSellingImg()
    // 获取推荐产品
    this.getrecommendProduct()
    // 推荐规划师
    this.getRecommendPlanner()
    // 获取钻展
    this.getRecPlanner()
    // 获取评价
    this.getCommentsApi()
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    commentHandler() {
      const user = navigator.userAgent.toLowerCase()
      if (
        user.match(/huawei/i) === 'huawei' ||
        user.match(/honor/i) === 'honor'
      ) {
        document.querySelector('#comment').scrollIntoView(true)
        document.body.scrollTop = document.body.scrollTop - 250
      } else {
        document.querySelector('#comment').scrollIntoView(true)
        document.documentElement.scrollTop =
          document.documentElement.scrollTop - 250
      }
    },
    async onLoad() {
      // 假如未获取到站点信息,再获取地理位置
      if (!this.city.code) {
        await this.POSITION_CITY({ type: 'init' })
      }
      // 加载更多推荐
      this.getrecommendProduct()
    },
    // 获取推荐交易产品
    getrecommendProduct() {
      this.loading = true
      // 获取用户唯一标识
      // if (!this.deviceId) {
      //   this.deviceId = await getUserSign()
      // }

      let formatId1 = '' // 产品二级分类
      let formatId2 = '' // 产品二级分类
      let formatId3 = '' // 产品三级分类
      if (this.sellingDetail?.classCodeLevel) {
        formatId1 = this.sellingDetail.classCodeLevel.split(',')[0] // 产品二级分类
        formatId2 = this.sellingDetail.classCodeLevel.split(',')[1] // 产品二级分类
        formatId3 = this.sellingDetail.classCodeLevel.split(',')[2] // 产品三级分类
      }
      // const params = {
      //   userId: this.$cookies.get('userId', { path: '/' }), // 用户id
      //   deviceId: this.deviceId, // 设备ID
      //   formatId: formatId2 || formatId3 || formatId1, // 产品二级类别,没有二级类别用三级类别（首页等场景不需传，如其他场景能获取到必传）
      //   classCode: formatId1,
      //   areaCode: this.$store.state.city.currentCity.code || '510100', // 区域编码
      //   sceneId: 'app-fwcpxq-01', // 场景ID
      //   productId: this.sellingDetail.id, // 产品ID（产品详情页必传）
      //   productType: 'PRO_CLASS_TYPE_SALES', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
      //   title: this.sellingDetail.name, // 产品名称（产品详情页传、咨询页等）
      //   platform: 'm', // 平台（app,m,pc）
      //   formatIdOne: formatId1,
      //   page: { pageNo: this.productPage, pageSize: this.productLimit },
      // }
      const params = {
        sceneType: 2,
        formatIdOne: formatId1,
        formatId: formatId2,
        productId: this.sellingDetail.id,
        title: this.sellingDetail.name,
        start: 1,
        limit: this.productLimit,
      }
      let areaCode
      const cityCode = this.$cookies.get('currentCity', {
        path: '/',
      })
      if (cityCode && cityCode !== '{}') {
        areaCode = JSON.parse(cityCode).code
      } else {
        areaCode = this.$store.state.city.defaultCity.code
      }
      this.$axios
        .post(recommendApi.saleListApp, params, {
          headers: {
            terminalCode: 'COMDIC_TERMINAL_APP',
            'X-Device-Code': this.deviceId,
            'X-Req-Area': areaCode,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            console.log('res', res)
            // 关闭骨架屏
            this.$refs.remNeed.needLoading = false
            this.productPage += 1
            if (res.data.length === 0) {
              this.finished = true
            }
            this.recommendProduct = [...this.recommendProduct].concat(res.data) // 推荐产品列表
            // 推荐产品最多加载30条
            if (this.recommendProduct.length >= 30) {
              this.finished = true
            }
          }
          this.finished = true
        })
        .catch((err) => {
          this.finished = true
          console.log(err)
        })
    },
    //  获取推荐规划师
    async getRecommendPlanner() {
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      this.$axios
        .get(productDetailsApi.recPlanner, {
          params: {
            limit: this.plannerLimit,
            page: this.plannerPage,
            area: this.$store.state.city.currentCity.code || '510100',
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.sellingDetail.classCodeLevel
              ? this.sellingDetail.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
            platform: 'm', // 平台（app,m,pc）
            productId: this.sellingDetail.id, // 产品id
            firstTypeCode: this.sellingDetail.classCodeLevel
              ? this.sellingDetail.classCodeLevel.split(',')[0]
              : null,
          },
        })
        .then((res) => {
          if (res.code === 200) {
            this.planners = res.data.records
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    // 获取钻展规划师
    async getRecPlanner() {
      // 获取用户唯一标识
      const deviceId = await getUserSign()
      const plannerRes = await this.$axios.get(productDetailsApi.recPlanner, {
        params: {
          limit: 1,
          page: 1,
          area: this.$store.state.city.currentCity.code || '510100',
          deviceId, // 设备ID
          level_2_ID: this.sellingDetail.classCodeLevel
            ? this.sellingDetail.classCodeLevel.split(',')[1]
            : null, // 二级产品分类
          login_name: null, // 规划师ID(选填)
          productType: 'PRO_CLASS_TYPE_SERVICE', // 产品类型
          sceneId: 'app-cpxqye-02', // 场景ID
          user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
          platform: 'm', // 平台（app,m,pc）
          productId: this.sellingDetail.id, // 产品id
          firstTypeCode: this.sellingDetail.classCodeLevel
            ? this.sellingDetail.classCodeLevel.split(',')[0]
            : null,
        },
      })
      if (plannerRes.code === 200) {
        this.tcPlannerBooth = plannerRes.data.records[0]
        this.$store.dispatch(
          'planner/setRecPlanner',
          plannerRes.data.records[0]
        )
      }
    },
    // 获取商品图片
    getSellingImg() {
      // 获取客户端展示信息
      const clientDetails =
        this.sellingDetail.salesGoodsOperatings.clientDetails
      // 获取商品图片集合
      this.imgFileIdPaths = clientDetails.length
        ? clientDetails[0].imgFileIdPaths
        : []
      // 返回图片地址集合
    },
    // 得到评价内容
    async getCommentsApi() {
      try {
        const params = {
          start: 1,
          limit: 10,
          ext1: this.sellingDetail.id, // 商品id
        }
        const { data, code, message } = await this.$axios.post(
          evaluateApi.getGoodsEvaluate,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        this.comments = data
      } catch (e) {
        console.log(e)
      }
    },
  },
  watchQuery: ['productId'],
}
