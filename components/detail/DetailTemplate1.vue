<template>
  <div class="template">
    <!--S 导航栏-->
    <sp-sticky
      z-index="5"
      :class="{
        scroTopStyle: Boolean(opacity),
      }"
      @scroll="scrollHandle"
    >
      <sp-top-nav-bar
        ellipsis
        :background="`rgba(255,255,255,0)`"
        @on-click-left="onClickLeft"
      >
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
        <template #right>
          <div>
            <my-icon
              style="margin-right: 0.36rem"
              name="nav_ic_shop"
              size="0.4rem"
              color="#fff"
              @click.native="addCart"
            />
          </div>
          <div>
            <my-icon
              name="nav_ic_share"
              size="0.4rem"
              color="#fff"
              @click.native="onClickRight"
            />
          </div>
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--E 导航栏-->
    <!--S banner-->
    <Banner :images="imgFileIdPaths" />
    <!--S banner-->
    <!--S 第一板块-->
    <Title :comment="commentdata[0].tit" @onComment="comment" />
    <!--E 第一板块-->
    <!--S 第二板块 领券 SKU-->
    <VouchersSelect ref="sku" />
    <!--E 第二板块 领券 SKU-->
    <!--S 第三板块 包含项目-->
    <ContainProject />
    <!--E 第三板块 包含项目-->
    <!--S 第三板块 包含服务-->
    <ContainContent />
    <!--E 第三板块 包含服务-->
    <!--S 评论-->
    <CommentBox id="comment" :list="commentdata" />
    <!--E 评论-->
    <!--S 动态 -->
    <OrderDynamic></OrderDynamic>
    <!--S 第五板块 推荐规划师-->
    <TcPlanners :im-jump-query="imJumpQuery" :recommend-planner="planners" />
    <!--E 第五板块 推荐规划师-->
    <!--S  精选案例-->
    <OrderCase></OrderCase>
    <!--E  精选案例-->
    <!--S 第十板块 服务详情-->
    <ServiceDetail
      comp-type="sc"
      :detail-data="sellingDetail.salesGoodsOperatings.clientDetails[0]"
    />
    <!--S 第十板块 服务详情-->
    <!--S 第十板块 猜你需要-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="我是有底线的"
      @load="onLoad"
    >
      <RelatedRecommend ref="remNeed" :product-data="recommendProduct" />
    </sp-list>
    <!--E 第十板块 猜你需要-->
    <bottomBar :im-jump-query="imJumpQuery" :planner-info="tcPlannerBooth" />
    <!--    分享组件-->
    <sp-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { TopNavBar, Sticky, List, ShareSheet } from '@chipspc/vant-dgg'
import { mapActions } from 'vuex'
import Banner from '~/components/detail/Banner'
import Title from '~/components/detail/Title1'
import CommentBox from '~/components/detail/CommentBox'
import OrderCase from '~/components/detail/OrderCase'
import OrderDynamic from '~/components/detail/OrderDynamic'
import VouchersSelect from '~/components/detail/VouchersSelect'
import ContainProject from '~/components/detail/ContainProject'
import ContainContent from '~/components/detail/ContainContent'
import TcPlanners from '~/components/detail/TcPlanners1'
import ServiceDetail from '~/components/detail/ServiceDetail'
import RelatedRecommend from '~/components/detail/RelatedRecommend'
import bottomBar from '@/components/detail/bottomBar/index'
import getUserSign from '~/utils/fingerprint'
import { productDetailsApi, recommendApi } from '~/api'
import MyIcon from '~/components/common/myIcon/MyIcon'
import { copyToClipboard } from '~/utils/common'
import imHandle from '~/mixins/imHandle'
export default {
  name: 'DetailTemplate',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [ShareSheet.name]: ShareSheet,
    Banner,
    Title,
    VouchersSelect,
    ContainProject,
    ContainContent,
    TcPlanners,
    ServiceDetail,
    RelatedRecommend,
    bottomBar,
    MyIcon,
    CommentBox,
    OrderCase,
    OrderDynamic,
  },
  mixins: [imHandle],
  props: {
    imJumpQuery: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },

  data() {
    return {
      opacity: 0,
      finished: false, // 停止加载更多
      loading: false,
      productPage: 1, // 推荐产品当前页
      productLimit: 10, // 推荐产品没有条数
      productCount: 0, // 推荐产品总数
      recommendProduct: [], // 推荐产品
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
      userInfoData: {
        decodePhone: null,
        fullName: null,
      }, // 个人用户数据
      planners: [], // 规划师列表
      plannerLimit: 3, // 推荐规划师每页条数
      plannerPage: 1, // 推荐规划师当前页
      tcPlannerBooth: {},
      deviceId: null, // 设备唯一码
      imgFileIdPaths: [], // 产品图片
      commentlist: [
        {
          phone: '153******67',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.10.06',
          tit: '需要办好几个业务，其中有个营业执照比较急，找了一些其他的公司咨询，要么不能在规定时间办理，要么价格贵太多，对比了以后最终选择在薯片办理，当然也不失所望，办理速度快，在承诺时间内就拿到了执照了，其他几个业务也办下来了，性价比挺高的。',
          val: 100,
        },
        {
          phone: '175******69',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.11.16',
          tit: '办理的几项业务中，对比其他公司收费不算是高，也是明码标价，关键是服务很细致没有其他的担忧，而且过程中没有任何要求额外加价的情况，省时省精力还有质量保证，其实折算下来比那些号称低价的花费更少，总之性价比很高。',
          val: 100,
        },
        {
          phone: '134******98',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: ' 2020.11.07',
          tit: '最初了解到薯片是在电梯里面，看到工商注册的广告，正好那段时间想出来创业，对注册公司不太了解，就找到薯片咨询了一下，注册公司流程繁琐。觉得还是交给代理公司去做，合作很愉快，同时也把公司其他业务交给了薯片来做，非常满意。',
          val: 100,
        },
        {
          phone: '137******49',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.11.29',
          tit: '出来创业，太多繁琐的事情不想自己搞，打算找代理公司去做，期间也比较过其他几家公司，最终决定选择薯片，也是看到薯片公司规模大，服务的人员多，最后顺利把公司办下来，刚开始做，考虑人员成本，也把公司的会计部分交给了顶呱呱来做，合作很愉快。',
          val: 100,
        },
        {
          phone: '168******86',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.12.12',
          tit: '薯片的店面很大，装修也不错，办理业务的业务人员也比较专业，他们的业务覆盖面广，种类架构也齐全，作为一家大公司，价格也是比较合理，总体来说性价比不错，当时办理的公司注册，整个服务还是感觉物超所值的。',
          val: 100,
        },
        {
          phone: '169******82',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.12.27',
          tit: '最开始只是来办理公司注册，没想到薯片提供的服务项目还挺多，大部分都是针对企业的，像我们这种规模不大的企业，简直太好了，公司注册找了他们，后面商标注册也找的薯片，现在已经将会计部分也交给了薯片，节省了不少成本。',
          val: 100,
        },
        {
          phone: '147******21',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.12.23',
          tit: '当时想注册一个商标，对商标注册流程不清楚，就打算找找能不能找人代注册，在网上找了一下，发现薯片集团还挺大的，心想这麽大的公司，应该可以信赖吧，比较其他几家公司，价格都差不多，最终还是选择了薯片，觉得放心。',
          val: 100,
        },
        {
          phone: '159******65',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.12.04',
          tit: '我当时办理的是营业执照，办理的速度艇快的，我的执照是15天就拿下来了，选择薯片是因为他们公司给我的服务体验很好，工作人员态度好，业务水平好，公司规模大。薯片的业务流程非常规范，种类也齐全，不夸张的说关于公司的所有业务他们都能办理，值得推荐。',
          val: 100,
        },
        {
          phone: '153******34',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2021.02.04',
          tit: '朋友推荐的，说是大平台做一站式企业服务的，抱着怀疑的态度来看看，果然是大平台服务态度杠杠的。',
          val: 100,
        },
        {
          phone: '132******54',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2021.01.03',
          tit: '很省心，只要是关于企业服务相关的业务都可以办理，流程也很简单。',
          val: 100,
        },
        {
          phone: '145******75',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2021.03.26',
          tit: '推荐哦，薯片作为领跑企业的一站式企业服务平台，有良好的行业地位，算正规的大平台，办理业务也比较放心。',
          val: 100,
        },
        {
          phone: '154******57',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2021.04.01',
          tit: '听说累计至今，已经服务了百余万家企业，与15000多家大中型企业签署了长期合作协议。大家都说好才是真的好。',
          val: 100,
        },
        {
          phone: '175******75',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.01.06',
          tit: '一直是薯片的忠实用户，办理了好几次业务，都非常满意，继续支持。',
          val: 100,
        },
        {
          phone: '154******78',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.05.21',
          tit: '之前在地铁还有网上看到过好几次新闻报道，好评如潮，相信在各界媒体的关注和监督下，平台会越做越好。',
          val: 100,
        },
        {
          phone: '143******79',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.07.28',
          tit: '大平台就是大平台，没有隐形消费，价格透明。以后有需要还是会选择在薯片办理。',
          val: 100,
        },
        {
          phone: '165******13',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.07.25',
          tit: '以前办理业务的时候需要自己亲自去办理，又浪费时间又麻烦，现在有了薯片省时省事多了。',
          val: 100,
        },
        {
          phone: '187******34',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.08.09',
          tit: '以前办理一个简单的业务也要3天左右才能下来，结果在薯片办理1天就搞定了，节省了我很多时间，果然懒人使社会进步。',
          val: 100,
        },
        {
          phone: '157******29',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.09.26',
          tit: '自从有了薯片这个平台，随时办理企业相关服务，方便多了。再也不用为了各种小事打电话，给我节约了很多时间。还能查看流程进度，非常开心能用到这么实用的app，希望能继续进步，加油！',
          val: 100,
        },
        {
          phone: '150******43',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.09.03',
          tit: '在薯片办理的企业服务，每每发现有问题联系到办事人员，办事人员都能抉速响应解决，服务非常满意。',
          val: 100,
        },
        {
          phone: '189******18',
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg',
          date: '2020.10.05',
          tit: '当我遇到问题顾问非常耐心的解答了我的问题，有什么意见也是及时处理了的，而且办事人员每个步骤都通知到位，资料都整理的很好，我是很满意的。',
          val: 100,
        },
      ],
      commentdata: [],
    }
  },
  computed: {
    sellingDetail() {
      // 获取客户端展示信息
      return this.$store.state.sellingGoodsDetail.sellingGoodsData
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  created() {
    for (let i = 0; i < 3; i++) {
      const val =
        this.commentlist[Math.floor(Math.random() * this.commentlist.length)]
      this.commentdata.push(val)
      for (let b = 0; b < this.commentlist.length; b++) {
        if (val.tit === this.commentlist[i].tit) {
          this.commentlist.splice(i, 1)
        }
      }
    }
    console.log(this.commentdata, 2222)
  },
  async mounted() {
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
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    comment() {
      document.querySelector('#comment').scrollIntoView(true)
      document.documentElement.scrollTop = (document.documentElement.scrollTop - 250)
    },
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 216) {
        this.opacity = 1
      } else {
        this.opacity = 0
      }
    },
    onClickLeft() {
      // 返回上一页
      if (history.length < 2) {
        this.$router.push({
          path: '/search/searchResult?keywords=',
        })
      } else {
        this.$router.back()
      }
    },
    //
    async onLoad() {
      // 假如未获取到站点信息,再获取地理位置
      if (!this.city.code) {
        await this.POSITION_CITY({ type: 'init' })
      }
      // 加载更多推荐
      this.getrecommendProduct()
    },
    // 获取推荐交易产品
    async getrecommendProduct() {
      this.loading = true
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      const formatId1 = this.sellingDetail.classCodeLevel.split(',')[0] // 产品二级分类
      const formatId2 = this.sellingDetail.classCodeLevel.split(',')[1] // 产品二级分类
      const formatId3 = this.sellingDetail.classCodeLevel.split(',')[2] // 产品三级分类
      const formatId = formatId3 || formatId2
      this.$axios
        .post(recommendApi.saleList, {
          userId: this.$cookies.get('userId', { path: '/' }), // 用户id
          deviceId: this.deviceId, // 设备ID
          formatId, // 产品三级类别,没有三级类别用二级类别（首页等场景不需传，如其他场景能获取到必传）
          classCode: formatId1,
          areaCode: this.city.code, // 区域编码
          sceneId: 'app-fwcpxq-01', // 场景ID
          productId: this.sellingDetail.id, // 产品ID（产品详情页必传）
          productType: 'PRO_CLASS_TYPE_SALES', // 产品一级类别（交易、服务产品，首页等场景不需传，如其他场景能获取到必传）
          title: this.sellingDetail.name, // 产品名称（产品详情页传、咨询页等）
          platform: 'm', // 平台（app,m,pc）
          page: { pageNo: this.productPage, pageSize: this.productLimit },
        })
        .then((res) => {
          if (res.code === 200) {
            // 关闭骨架屏
            this.$refs.remNeed.needLoading = false
            this.productPage += 1
            if (res.data.records.length === 0) {
              this.finished = true
            }
            this.productCount = res.data.totalCount // 推荐产品总条数
            this.recommendProduct = [...this.recommendProduct].concat(
              res.data.records
            ) // 推荐产品列表
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
            area: this.city.code, // 区域编码
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.sellingDetail.classCodeLevel
              ? this.sellingDetail.classCodeLevel.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.sellingDetail.id, // 产品id
          },
        })
        .then((res) => {
          if (res.code === 200) {
            console.log('推荐规划师', this.planners)
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
          area: this.city.code, // 区域编码
          deviceId, // 设备ID
          level_2_ID: this.sellingDetail.classCodeLevel
            ? this.sellingDetail.classCodeLevel.split(',')[1]
            : null, // 二级产品分类
          login_name: null, // 规划师ID(选填)
          productType: 'PRO_CLASS_TYPE_TRANSACTION', // 产品类型
          sceneId: 'app-cpxqye-02', // 场景ID
          user_id: this.$cookies.get('userId', { path: '/' }), // 用户ID(选填)
          platform: 'app', // 平台（app,m,pc）
          productId: this.sellingDetail.id, // 产品id
        },
      })
      if (plannerRes.code === 200) {
        this.tcPlannerBooth = plannerRes.data.records[0]
      }
    },
    // 购物车
    async addCart() {
      // 点击立即购买
      const isLogin = await this.judgeLoginMixin()
      if (isLogin) {
        this.$router.push({
          path: '/shopCart',
        })
      }
    },
    //  分享
    onClickRight() {
      this.showShare = true
    },
    // 点击分享
    onSelect() {
      const result = copyToClipboard(location.href)
      if (result) {
        this.$xToast.success('链接复制成功')
        return
      }
      this.$xToast.error('链接复制失败,请重试')
      // this.showShare = false
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
    // 获取手机号
    // getUserIndo() {
    //   if (this.token) {
    //     this.$axios
    //       .get(userinfoApi.info, {
    //         params: {
    //           id: this.userInfo.userId,
    //         },
    //       })
    //       .then((res) => {
    //         if (res.code === 200) {
    //           this.userInfoData = res.data
    //         } else {
    //           this.$xToast.show({
    //             message: '网络错误,请刷稍后再试',
    //             duration: 1000,
    //             icon: 'toast_ic_error',
    //             forbidClick: true,
    //           })
    //         }
    //       })
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.scroTopStyle {
  ::v-deep.sp-sticky {
    border: 1px solid #f4f4f4;
    .sp-top-nav-bar {
      background-color: #fff !important;
      .spiconfont {
        color: #1a1a1a !important;
      }
    }
  }
}

.template {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #f8f8f8;
  /*padding-bottom: 144px;*/
  ::v-deep .sp-hairline--bottom::after {
    border-bottom: none;
  }
}
.company {
  &_info {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 15px;
  }
}
::v-deep .sp-top-nav-bar__left,
::v-deep .sp-top-nav-bar__right {
  font-weight: initial;
}
</style>
