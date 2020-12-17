<template>
  <div class="serviceDetails">
    <!-- 导航栏-->
    <sp-sticky z-index="5" @scroll="scrollHandle">
      <sp-top-nav-bar ellipsis :background="`rgba(255,255,255,${opacity})`">
        <template #left>
          <div>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
          </div>
        </template>
        <template #right></template>
      </sp-top-nav-bar>
    </sp-sticky>
    <!--   banner -->
    <Banner :images="info.images" />
    <!--   BasicInfo(基本信息)-->
    <BasicInfo
      :base-data="scProductDetailData.baseData"
      :operating-data="scProductDetailData.operating"
      :tags-data="scProductDetailData.tags"
    />
    <!--    服务项目-->
    <ServiceItems :normal-item-list-data="scProductDetailData.normalItemList" />
    <!--    服务详情-->
    <ServiceInfo :client-details-data="scProductDetailData.clientDetails" />
    <!--    推荐规划师-->
    <div class="planners-box">
      <Planners :info="planners" />
      <div class="planners-box-quiz">
        <h2>您的疑问，第一时间为您解答</h2>
        <div>
          <input placeholder="输入您想咨询的问题" type="text" />
          <sp-button type="primary">提问</sp-button>
        </div>
      </div>
    </div>
    <!--    猜你喜欢-->
    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Need :info="{ ...info }" />
    </sp-list>
  </div>
</template>

<script>
import { Sticky, TopNavBar, Button, List, PullRefresh } from '@chipspc/vant-dgg'
import Banner from '~/components/detail/Banner'
import BasicInfo from '~/components/detail/service/BasicInfo'
import ServiceItems from '~/components/detail/service/ServiceItems'
import ServiceInfo from '~/components/detail/service/ServiceInfo'
import Planners from '~/components/detail/Planners'
import Need from '~/components/detail/Need'
import getUserSign from '@/utils/fingerprint'
import { productDetailsApi } from '~/api'
export default {
  name: 'ServiceDetails',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [Button.name]: Button,
    [List.name]: List,
    [PullRefresh.name]: PullRefresh,
    Banner,
    BasicInfo,
    ServiceItems,
    ServiceInfo,
    Planners,
    Need,
  },
  async asyncData({ $axios, params }) {
    try {
      const res = await $axios.post(productDetailsApi.scProductDetail, {
        productId: params.id,
        serviceItem: 'true',
        showClient: 'COMDIC_TERMINAL_WAP',
        needServiceItem: true,
        needOperating: 'true',
        needRefConfig: 'true',
        needSkuAttr: 'true',
        needAttr: 'true',
        needTag: 'true',
      })
      if (res.code === 200) {
        return { scProductDetailData: res.data }
      }
    } catch (err) {
      console.log('错误信息：', err)
    }
  },
  layout: 'productDetail',
  data() {
    return {
      opacity: 0,
      // 服务详情数据
      scProductDetailData: {
        baseData: {}, // 基本信息
        attrs: [], // 产品属性
        tags: {}, // 产品标签
        operating: {}, // 运营信息
        clientDetails: {}, // 客户端展示数据
        refConfig: [],
        skuAttrs: [], // sku属性
        normalItemList: [], // 基本服务项
      },
      planners: [],
      info: {
        images: [
          'https://img.yzcdn.cn/vant/cat.jpeg',
          'https://img.yzcdn.cn/vant/cat.jpeg',
        ],
        planners: [
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
          {
            name: '郑凯元',
            avatar: 'https://img.yzcdn.cn/vant/cat.jpeg',
          },
        ],
      },
      card: {
        imgSrc: 'http://pic.sc.chinaz.com/files/pic/pic9/202009/hpic2975.jpg',
        cardName: '王深林',
        cardSign: '金牌规划师',
        round: true,
        avatarSize: 40,
      },
      consultText1: '在线咨询',
      consultText2: '电话咨询',
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      plannerLimit: 5,
      page: 1,
      deviceId: null, // 用户唯一标识
    }
  },
  computed: {
    city() {
      //  因为要做修改 num 的值  所以放在 计算属性里
      return this.$store.state.city.currentCity
    },
  },
  mounted() {
    this.handleGetRecPlanner()
  },
  methods: {
    scrollHandle({ scrollTop }) {
      // 滚动事件
      this.opacity = scrollTop / 120
    },
    onClickButton() {
      console.log('点击按钮')
    },
    onLoad() {
      console.log('加载更多')
    },
    async handleGetRecPlanner() {
      // 获取用户唯一标识
      if (!this.deviceId) {
        this.deviceId = await getUserSign()
      }
      console.log(this.scProductDetailData.baseData)
      this.$axios
        .get(productDetailsApi.recPlanner, {
          params: {
            limit: 3,
            page: 1,
            area: this.city.code, // 区域编码
            deviceId: this.deviceId, // 设备ID
            level_2_ID: this.scProductDetailData.baseData.parentClassCode
              ? this.scProductDetailData.baseData.parentClassCode.split(',')[1]
              : null, // 二级产品分类
            login_name: null, // 规划师ID(选填)
            productType: 'FL20201116000002', // 产品类型
            sceneId: 'app-cpxqye-01', // 场景ID
            user_id: this.$cookies.get('userId'), // 用户ID(选填)
            platform: 'app', // 平台（app,m,pc）
            productId: this.$route.params.id, // 产品id
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
  },
}
</script>

<style lang="less" scoped>
.serviceDetails {
  background: #f8f8f8;
  /deep/ .sp-hairline--bottom::after {
    border-bottom: none;
  }
  .planners-box {
    margin-bottom: 24px;
    /deep/.planners {
      border-bottom: none;
      padding-bottom: 64px;
    }
    &-quiz {
      border-top: 1px solid #f4f4f4;
      background-color: #fff;
      padding-left: 40px;
      padding-right: 40px;
      padding-bottom: 40px;
      h2 {
        font-size: 36px;
        font-weight: bold;
        color: #1a1a1a;
        height: 40px;
        line-height: 40px;
        margin-top: 38px;
        margin-bottom: 39px;
      }
      div {
        display: flex;
        input {
          flex: 1;
          font-size: 28px;
          font-weight: 400;
          border: 1px solid #4974f5;
          border-radius: 4px 0px 0px 4px;
          padding-left: 25px;
          color: #1a1a1a;
          &::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #cccccc;
          }
          &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #cccccc;
          }
          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #cccccc;
          }
          &:-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #cccccc;
          }
        }
        button {
          width: 144px;
          height: 80px;
          background: #4974f5;
          border-radius: 0px 4px 4px 0px;
        }
      }
    }
  }
}
</style>
