<template>
  <div class="merchantsShop">
    <div class="head">
      <Header title="商户店铺" :fixed="true">
        <template #left>
          <div v-if="urlData.isShare !== '1'">
            <sp-icon
              class-prefix="spiconfont"
              name="nav_ic_back"
              size="0.4rem"
              color="#1A1A1A"
              style="margin-left: 0.32rem"
              @click.native="onClickLeft"
            />
          </div>
          <div v-if="urlData.isShare === '1'">
            <sp-icon
              class-prefix="spiconfont"
              name="xiaochengxuzhuye"
              size="0.4rem"
              color="#1A1A1A"
              style="margin-left: 0.36rem"
              @click.native="gohome"
            />
          </div>
        </template>
        <template v-if="isInApp" #right>
          <sp-icon
            class-prefix="spiconfont"
            class="head__icon-share"
            name="fenxiang"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-right: 0.4rem"
            @click.native="onClickRight"
          />
        </template>
      </Header>
    </div>

    <div id="group" class="bg-group">
      <sp-skeleton
        title
        avatar
        avatar-size="1.2rem"
        :row="2"
        :loading="loading"
      >
        <div class="footer">
          <img :src="detailData.mchBaseInfo.logo" alt="" />
          <div class="footertext">
            <p>{{ detailData.mchBaseInfo.name }}</p>
            <p v-show="false">
              <img
                src="https://cdn.shupian.cn/sp-pt/wap/images/7mruoa3go2c0000.png"
                alt=""
              />
              <span>2级商户</span>
            </p>
          </div>
        </div>
      </sp-skeleton>
    </div>

    <div
      class="bg-group-fixed"
      :style="{
        opacity: floatview ? '1' : '0',
        top: isInApp
          ? `${Number(appInfo.statusBarHeight) / 100 + 1.18}rem`
          : '0.88rem',
      }"
    >
      <div class="footer">
        <img :src="detailData.mchBaseInfo.logo" alt="" />
        <div class="footertext">
          <p>{{ detailData.mchBaseInfo.name }}</p>
          <p v-show="false">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/7mruoa3go2c0000.png"
              alt=""
            />
            <span>2级商户</span>
          </p>
        </div>
      </div>
      <div class="tabs">
        <sp-tabs v-model="headActive" @click="headTabsClick">
          <sp-tab
            v-for="(item, index) in headTabs"
            :key="index"
            :title="item.label"
            :name="item.value"
          >
          </sp-tab>
        </sp-tabs>
      </div>
    </div>
    <div class="body">
      <div
        v-if="detailData.banners && detailData.banners.length > 0"
        class="swipe"
      >
        <sp-swipe class="my-swipe" :autoplay="3000" indicator-color="#4974F5">
          <sp-swipe-item
            v-for="(item, index) in detailData.banners"
            :key="index"
          >
            <img :src="item" alt="" />
          </sp-swipe-item>
        </sp-swipe>
      </div>
      <div class="body-content" style="padding-top: 0.56rem">
        <sp-skeleton title :row="4" :loading="loading">
          <p class="title" style="margin-top: 0">商户服务</p>
          <div class="sp-score">
            <div class="sp-score__score">
              <div>
                <p class="sp-score__title">
                  <span>{{ detailData.mchService.personNum }}</span>
                  <span>人</span>
                </p>
                <p>
                  <span>商户人数</span>
                </p>
              </div>
              <div>
                <p class="sp-score__title">
                  <span>{{ detailData.mchService.customerNum }}</span>
                  <span>位</span>
                </p>
                <p>
                  <span>服务客户</span>
                </p>
              </div>
              <!-- <div>
                <p class="sp-score__title">
                  <span>{{ detailData.mchService.maintenanceNum }}</span>
                  <span>个</span>
                </p>
                <p>
                  <span>维护商品</span>
                </p>
              </div> -->
            </div>
            <div class="sp-score__satisfaction">
              <p>客户满意</p>
              <div class="satisfactiontext">
                <p>1分钟响应率：{{ detailData.mchService.consultResponse }}</p>
                <p>电话接通率：{{ detailData.mchService.callThroughRate }}</p>
              </div>
            </div>
          </div>
        </sp-skeleton>
      </div>
      <sp-skeleton title :row="12" :loading="loading"> </sp-skeleton>
      <div v-if="goodsRecommend.length > 0" class="body-content recommended">
        <p class="title" style="margin-top: 0.56rem; margin-bottom: 0.08rem">
          为您推荐
        </p>
        <div class="tabs">
          <ul>
            <li
              v-for="(item, index) in goodsRecommend"
              :key="index"
              :class="active === item.id ? 'tab_active' : ''"
              @click="tabsActive(item.id)"
            >
              <span>{{ item.name }}</span>
              <span v-if="active === item.id" class="tabs_line"></span>
            </li>
          </ul>
        </div>
        <ul class="list-data">
          <li
            v-for="(data, dataIndex) in detailData.goods"
            :key="dataIndex"
            @click="linkGood(data)"
          >
            <img :src="data.img" alt="" />
            <div>
              <p class="title" style="margin: 0; font-size: 0.32rem">
                <span>{{ data.name }}</span>
              </p>
              <p class="label">
                <span v-for="(ta, taindex) in data.tags" :key="taindex">{{
                  ta
                }}</span>
              </p>
              <p class="type">
                <span
                  v-for="(de, deindex) in data.desc && data.desc.split('|')"
                  :key="deindex"
                  >{{ de }}</span
                >
              </p>
              <p class="moneysee">
                <span>{{ data.price }}</span>
                <span>元</span>
              </p>
            </div>
          </li>
        </ul>
        <button v-if="detailData.goods.length > 0" @click="moreRem">
          更多优惠
        </button>
      </div>
      <div
        v-if="!loading && detailData.planners.length > 0"
        class="body-content recommendedPlanner"
      >
        <p class="title">推荐规划师</p>
        <div class="planner">
          <ul>
            <li
              v-for="(item, index) in detailData.planners"
              :key="index"
              @click="linkPlanner(item)"
            >
              <img :src="item.img" alt="" />
              <p class="name">
                <span
                  style="
                display:inline-block
            margin-top: 0.56rem;
            width: 1.64rem;
            overflow: hidden;
            white-space: normal;
            white-space: nowrap;
            text-overflow: ellipsis;
          "
                >
                  {{ item.name }}
                </span>
              </p>
              <div class="line">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p class="score">
                <span> 薯片分{{ item.score }} </span>
              </p>
              <p class="job">
                <span>
                  {{ item.category }}
                </span>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <sp-share-sheet
      v-model="showShare"
      title="分享"
      :options="shareOptions"
      @select="onSelect"
    />
    <sp-toast ref="spToast" class="detail-toast" />
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import {
  Bottombar,
  BottombarButton,
  ShareSheet,
  Icon,
  Tabs,
  Toast,
  Tab,
  Swipe,
  SwipeItem,
  Skeleton,
} from '@chipspc/vant-dgg'
import { planner } from '@/api'
import { storeApi } from '@/api/store'
import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
import { callPhone, copyToClipboard, setUrlParams } from '@/utils/common'
import imHandle from '@/mixins/imHandle'
export default {
  components: {
    [Icon.name]: Icon,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [ShareSheet.name]: ShareSheet,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Skeleton.name]: Skeleton,
    Header,
    SpToast,
    SpTabs: Tabs,
    SpTab: Tab,
  },
  mixins: [imHandle],
  data() {
    return {
      loading: true,
      active: '', // tab状态
      urlData: this.$route.query,
      headActive: 'index',
      detailData: {
        mchService: {},
        mchBaseInfo: {},
      },
      floatview: false, // 滚动置顶
      opacity: 1,
      headTabs: [
        {
          value: 'index',
          label: '主页',
        },
        {
          value: 'rememded',
          label: '热门推荐',
        },
      ],
      tabsData: [],
      tabsListData: [],
      shareOptions: [],
      showShare: false,
      goodsRecommend: [],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
      userInfo: (state) => state.user.userInfo,
      isApplets: (state) => state.app.isApplets,
    }),
    formatTagList() {
      const tagList = this.detailData.tagList
      if (!Array.isArray(tagList)) return []
      const formatData = tagList.slice(0, 5)
      return formatData
    },
    formatServeAgeText() {
      const serveAge = this.detailData.serveAge
      if (serveAge == null) {
        return '--'
      }
      if (serveAge < 1) {
        return '小于1年'
      }
      if (serveAge >= 1 && serveAge < 2) {
        return '1-2年'
      }
      if (serveAge >= 2 && serveAge < 3) {
        return '2-3年'
      }
      if (serveAge >= 3 && serveAge < 4) {
        return '3-4年'
      }
      if (serveAge >= 4 && serveAge < 5) {
        return '4-5年'
      }
      if (serveAge >= 5) {
        return '5年以上'
      }
      return ''
    },
    formatShowPoint() {
      const { show } = this.detailData || {}
      // 分享的页面需要 show:1 才展示薯片分
      if (this.isShare && show !== 1) {
        return false
      }
      return true
    },
    city() {
      return this.$store.state.city.currentCity
    },
  },
  created() {
    // if (process && process.client) {
    //   // notice:
    //   // store中的用户信息默认来自cookie，会从cookie中获取；因为在wap中， userInfo中的token与userId等 保存在cookie中，
    //   // 但是在app中登录等，登录信息cookie中的没有更新，导致直接从store中获取到的信息无效
    //   // 所以在app中进入此页面，先清除userInfo,获取最新的userInfo
    //   this.isInApp && this.clearUserInfo()
    //   this.getDetail().finally(() => {
    //     this.loading = false
    //   })
    // }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
    if (this.isInApp) {
      if (this.userInfo.userId && this.userInfo.token) {
        this.getDetail().finally(() => {
          this.loading = false
        })
      } else {
        this.$appFn.dggGetUserInfo((res) => {
          if (res.code === 200) {
            // 兼容启大顺参数返回
            this.$store.dispatch(
              'user/setUser',
              typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            )
          }
          this.getDetail().finally(() => {
            this.loading = false
          })
        })
      }
    } else {
      this.getDetail().finally(() => {
        this.loading = false
      })
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    ...mapActions({
      POSITION_CITY: 'city/POSITION_CITY',
    }),
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
      clearUserInfo: 'user/CLEAR_USER',
    }),
    handleScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop // 滚动条偏移量
      const group = document.getElementById('group') // 要滚动到顶部吸附的元素的偏移量
      const height = group && group.offsetHeight
      if (scrollTop > height) {
        this.floatview = true
      } else {
        this.floatview = false
      }
    },
    tabsActive(item) {
      this.active = item
      this.getList()
    },
    // 获取详情数据
    async getDetail() {
      try {
        const { storeId, pageStatus = '' } = this.$route.query
        if (storeId == null) {
          this.$xToast.show({
            message: '缺少店铺参数!',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_error',
          })
          return
        }
        const params = { storeId, type: pageStatus, ignoreDataScope: 'goods' }
        const data = await this.$axios.get(storeApi.mchStoreInfo, { params })
        if (data.code !== 200) {
          throw new Error(data.message)
        }
        if (this.isInApp) {
          this.mdAppViewScreen(data.data)
        }
        data.data.planners.forEach((item) => {
          if (item) {
            this.mdPlannerStore(item)
          }
        })
        // MCH_SERVICE_DATA 商户服务数据
        // PLANNER_RECOMMEND 规划师推荐
        // MCH_BASE_INFO 商户基础信息
        // GOODS_RECOMMEND 商品推荐
        // SWIPER_IMAGE 轮播图
        this.detailData = data.data || {}
        const res = await this.$axios.post(storeApi.recommendGoodsClassify, {
          goodsRecommend: data.data.goodsRecommend,
          storeId,
          type: pageStatus,
        })
        if (res.code === 200) {
          this.goodsRecommend = res.data
        }
        if (this.goodsRecommend.length > 0) {
          this.active = this.goodsRecommend[0].id
        } else {
          this.active = ''
        }

        this.getList()
        return data
      } catch (error) {
        console.error('getDetail:', error)
        this.$xToast.show({
          message: error.message || '请求失败！',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return Promise.reject(error)
      }
    },
    // 获取列表数据
    async getList() {
      if (!this.active) {
        return
      }
      const { storeId, pageStatus = '' } = this.$route.query
      try {
        const params = {
          storeId,
          typeId: this.active,
          type: pageStatus,
          page: 1,
          limit: 4,
        }
        const { data, code, message } = await this.$axios.post(
          storeApi.recommendGoods,
          params
        )
        if (code !== 200) {
          throw new Error(message)
        }
        this.detailData.goods = data.records.filter(
          (item) => Number(item.state) === 1
        )
        return data
      } catch (error) {
        console.error('getDetail:', error)
        this.$xToast.show({
          message: error.message || '请求失败！',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return Promise.reject(error)
      }
    },
    handleCall() {
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggBindHiddenPhone(
          {
            plannerId: this.detailData.id,
            requireCode: this.requireCode,
            requireName: this.requireName,

            customerId: this.$store.state.user.customerID || '',
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) this.$xToast.error('拨号失败！')
          }
        )
        return
      }
      this.bindhidden()
    },

    handleIM() {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      this.uPIM({
        mchUserId: this.detailData.id,
        userName: this.detailData.userName,
        type: this.detailData.mchClass,
      })
      // } else {
      //   Toast({
      //     message: '请先登录账号',
      //     iconPrefix: 'sp-iconfont',
      //     icon: 'popup_ic_fail',
      //   })
      // }
    },
    async bindhidden() {
      try {
        // const isLogin = await this.judgeLoginMixin()
        // if (isLogin) {
        this.$xToast.show({
          message: '为了持续为您提供服务，规划师可能会主动联系您',
          duration: 2000,
          forbidClick: true,
        })
        await planner.awaitTip()
        const telData = await planner.newtel({
          areaCode: this.city.code,
          areaName: this.city.name,
          customerUserId: this.$store.state.user.userId,
          customerId: this.$store.state.user.customerID || '',
          plannerId: this.detailData.id,
          customerPhone:
            this.$store.state.user.mainAccountFull ||
            this.$cookies.get('mainAccountFull', { path: '/' }) ||
            '',
          requireCode: this.requireCode,
          requireName: this.requireName,
          // id: mchUserId,
          // sensitiveInfoType: 'MCH_USER',
        })
        // 解密电话
        if (telData.status === 1) {
          this.uPCall(telData)
        } else if (telData.status === 0) {
          Toast({
            message: '当前人员已禁用，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          return ''
        } else if (telData.status === 3) {
          Toast({
            message: '当前人员已离职，无法拨打电话',
            iconPrefix: 'sp-iconfont',
            icon: 'popup_ic_fail',
          })
          return ''
        }
        // } else {
        //   Toast({
        //     message: '请先登录账号',
        //     iconPrefix: 'sp-iconfont',
        //     icon: 'popup_ic_fail',
        //   })
        // }
      } catch (err) {
        Toast({
          message: '未获取到划师联系方式',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_fail',
        })
      }
    },
    // 拨打电话号码
    uPCall(telNumber) {
      // 浏览器中调用的
      callPhone(telNumber.phone)
    },
    onClickLeft() {
      this.$back()
    },
    onClickRight() {
      console.log('nav onClickRight')
      this.uPShareOption()
    },
    onSelect(option) {
      this.uPShare(option)
    },
    uPShare(option) {
      if (this.isInApp) {
        this.showShare = false
        return
      }
      const url = window && window.location.href
      const sharedUrl = setUrlParams(url, { isShare: 1 })
      console.log('sharedUrl:', sharedUrl)

      const isSuccess = copyToClipboard(sharedUrl)
      if (isSuccess) {
        this.$xToast.show({
          message: '复制成功',
          duration: 1500,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
      }
      this.showShare = false
    },
    // 分享
    uPShareOption() {
      if (this.isInApp) {
        const url = window && window.location.href
        const sharedUrl = setUrlParams(url, { isShare: 1 })
        console.log('sharedUrl:', sharedUrl)
        this.$appFn.dggShare(
          {
            image:
              'https://cdn.shupian.cn/sp-pt/wap/images/2cjrp1v1q8sg000.png',
            title: '商户店铺',
            subTitle: `优选商户 - ${this.detailData.mchBaseInfo.name}的店铺`,
            url: sharedUrl,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$xToast.show({
                message: '分享失败！',
                duration: 1500,
                forbidClick: false,
                icon: 'toast_ic_remind',
              })
            }
          }
        )
        return
      }

      this.shareOptions = [{ name: '复制链接', icon: 'link' }]
      this.showShare = true
    },
    headTabsClick() {
      if (this.headActive === 'rememded') {
        const { pageStatus = '' } = this.$route.query
        this.$router.push({
          path: '/store/hotRecommended',
          query: {
            active: this.active,
            storeId: this.detailData.id,
            pageStatus,
          },
        })
      }
    },
    linkPlanner(item) {
      // 处理规划师展位点击
      window.spptMd.spptTrackRow('p_plannerBoothClick', {
        track_code: this.isInApp ? 'SPP001156' : 'SPW000155',
        planner_name: item.name,
        crisps_fraction: item.point,
      })
      this.urlData.pageStatus !== 'preview' &&
        this.$router.push({
          path: '/planner/detail',
          query: {
            mchUserId: item.plannerId,
          },
        })
    },
    linkGood(item) {
      if (item.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
        this.urlData.pageStatus !== 'preview' &&
          this.$router.push({
            path: '/detail/transactionDetails',
            query: {
              type: item.typeCode,
              productId: item.id,
            },
          })
      } else {
        this.urlData.pageStatus !== 'preview' &&
          this.$router.push({
            path: '/detail',
            query: {
              productId: item.id,
            },
          })
      }
    },
    gohome() {
      this.$router.push('/')
    },
    moreRem() {
      const { pageStatus = '' } = this.$route.query
      this.$router.push({
        path: '/store/hotRecommended',
        query: {
          active: this.active,
          storeId: this.detailData.id,
          pageStatus,
        },
      })
    },
    mdAppViewScreen(info) {
      // 处理埋点逻辑
      window.spptMd.spptTrackRow('$AppViewScreen', {
        track_code: 'SPP001154',
        content_type: '店铺',
        planner_shop_id: info.id,
      })
    },
    mdPlannerStore(info) {
      // 处理曝光埋点
      window.spptMd.spptTrackRow('p_plannerBoothVisit', {
        track_code: this.isInApp ? 'SPP001155' : 'SPW000154',
        planner_name: info.name,
        crisps_fraction: info.score,
      })
    },
  },
  head() {
    return {
      title: '',
      meta: [
        {
          name: 'spptmd-track_code',
          content: this.isInApp ? 'SPP000019' : 'SPW000019',
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.merchantsShop {
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  ::v-deep .sp-skeleton {
    margin: 16px 0 0 0;
    padding: 0;
  }
  .bg-group {
    padding: 60px 40px 84px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/aicz8hyty0c0000.png')
      no-repeat;
    background-size: 100% 100%;
    font-family: PingFangSC-Regular;
    font-size: 44px;
    color: #ffffff;
    letter-spacing: 0;
    line-height: 28px;
    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > img {
        width: 120px;
        height: 120px;
        background: url('https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png')
          no-repeat;
        background-size: 100% 100%;
        border: 1px solid #ffffff;
        border-radius: 50%;
      }
    }
    .footertext {
      margin: 0 32px 0 20px;
      p {
        &:first-of-type {
          line-height: 62px;

          font-family: PingFangSC-Regular;
          font-size: 44px;
          color: #ffffff;
          font-weight: bold;
          letter-spacing: 0;
        }
        &:last-of-type {
          display: inline-block;
          padding: 5px 8px;
          margin: 20px 0 0 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 22px;
          font-weight: bold;
          font-size: 22px;
          color: #ffffff;
          letter-spacing: 0;
          text-align: center;
          img {
            width: 31px;
            height: 34px;
            box-shadow: 0 3px 5px 0 rgba(73, 116, 245, 0.16);
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
  }
  .bg-group-fixed {
    position: fixed;
    top: 48px;
    width: 100%;
    padding: 40px 40px 10px;
    background: #fff;
    background-size: 100% 100%;
    font-family: PingFangSC-Regular;
    font-size: 28px;
    color: #000;
    letter-spacing: 0;
    line-height: 28px;
    z-index: 2;
    opacity: 0;
    transition: opacity 0.5s;
    border-top: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
    .footer {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      > img {
        width: 120px;
        height: 120px;
        background: url('https://cdn.shupian.cn/sp-pt/wap/images/9zzzas17j8k0000.png')
          no-repeat;
        background-size: 100% 100%;
        border: 1px solid #ffffff;
        border-radius: 50%;
      }
    }
    .footertext {
      margin: 0 32px 0 20px;
      p {
        &:first-of-type {
          line-height: 62px;

          font-family: PingFangSC-Regular;
          font-size: 44px;
          color: #000;
          font-weight: bold;
          letter-spacing: 0;
        }
        &:last-of-type {
          display: inline-block;
          padding: 5px 8px;
          margin: 20px 0 0 0;
          background: rgba(73, 116, 245, 0.1);
          border-radius: 22px;
          font-size: 22px;
          color: #4974f5;
          letter-spacing: 0;
          text-align: center;
          font-weight: bold;
          img {
            width: 31px;
            height: 34px;
            box-shadow: 0 3px 5px 0 rgba(73, 116, 245, 0.16);
            vertical-align: middle;
          }
          span {
            vertical-align: middle;
          }
        }
      }
    }
    ::v-deep .sp-tab {
      color: #999999;
    }
    ::v-deep .sp-tab__text {
      font-family: PingFangSC-Regular;
      font-size: 32px;
    }
    ::v-deep .sp-tabs__wrap {
      margin: 0 0 0 -40px;
      width: 40vw;
    }
    ::v-deep .sp-tab--active {
      font-size: 30px;
      color: #222222;
      font-weight: bold;
    }
    ::v-deep .sp-tabs__line {
      width: 24px;
      height: 6px;
      background: #4974f5;
      border-radius: 3px;
      bottom: 40px;
    }
  }
  .body {
    position: relative;
    margin: -24px 0 0 0;
    padding: 0 40px 64px;

    background-color: #fff;
    border-top-right-radius: 24px;
    border-top-left-radius: 24px;
    z-index: 1;
    .swipe {
      margin: 64px 0 0 0;
      border-radius: 8px;
      .my-swipe {
        ::v-deep .sp-swipe-item {
          text-align: center;
          background: #dddddd;
          border-radius: 8px;
          img {
            width: 670px;
            height: 214px;
            border-radius: 8px;
          }
        }
      }
      ::v-deep .sp-swipe__indicator {
        width: 12px;
        height: 12px;
      }
    }
    .sp-score {
      width: 100%;
      padding: 40px 40px 34px;
      background: #ffffff;
      border: 1px solid #dddddd;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      &__score {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: PingFangSC-Regular;
        font-size: 24px;
        color: #999999;
        letter-spacing: 0;
        > div {
          box-sizing: border-box;
          width: 285px;
          height: 140px;
          padding: 14px 32px;
          background: #f8f8f8;
          border-radius: 8px;
          &:first-of-type {
            background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/65ie49d8a8o0000.png');
            background-repeat: no-repeat;
            background-size: 80px 80px;
            background-position: center right 20px;
          }
          &:last-of-type {
            background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/7lc1ert8stg0000.png');
            background-repeat: no-repeat;
            background-size: 80px 80px;
            background-position: center right 20px;
          }
        }
      }
      &__title {
        span {
          margin-left: -3px;
          &:first-of-type {
            font-family: Bebas;
            font-size: 56px;
            color: #222222;
            letter-spacing: 0;
          }
          &:last-of-type {
            font-size: 24px;
            color: #222222;
            font-weight: bold;
            letter-spacing: 0;
          }
        }
      }
      &__satisfaction {
        > p {
          font-weight: bold;
          font-size: 32px;
          color: #222222;
          letter-spacing: 0;
          margin: 37px 0 15px 0;
        }
        .satisfactiontext {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: PingFangSC-Regular;
          font-size: 28px;
          color: #222222;
          letter-spacing: 0;
        }
      }
    }
    .body-content {
      .title {
        margin: 32px 0;

        font-size: 40px;
        font-weight: bold;
        color: #222222;
      }
    }
    .recommended {
      .recommendedtitle {
        font-weight: bold;
        font-size: 40px;
        color: #222222;
      }
      .tabs {
        margin: 8px 0 12px 0;
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #999999;
        ul {
          display: flex;
          justify-content: flex-start;
          line-height: 80px;
          li {
            position: relative;
            margin: 0 56px 0 0;
            span {
              max-width: 192px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            .tabs_line {
              position: absolute;
              bottom: 8px;
              left: 0;
              right: 0;
              margin: 0 auto;
              display: block;
              width: 28px;
              height: 6px;
              background: #4974f5;
              border-radius: 3px;
            }
          }
          .tab_active {
            font-weight: bold;
            font-size: 32px;
            color: #222222;
          }
        }
      }
      .list-data {
        li {
          display: flex;
          justify-content: flex-start;
          align-items: flex-start;
          padding: 22px 0 28px;
          img {
            width: 160px;
            height: 160px;
            margin: 0 28px 0 0;
            border-radius: 12px;
          }
          div {
            .recommendedtitle {
              font-weight: bold;
              font-size: 32px;
              color: #222222;
              line-height: 42px;
            }
            .label {
              margin: 12px 0 0 0;
              font-weight: bold;
              font-size: 22px;
              color: #5c7499;
              line-height: 22px;
              span {
                display: inline-block;
                margin: 0 12px 12px 0;
                padding: 5px 8px;
                background: #f0f2f5;
                border-radius: 4px;
              }
            }
            .type {
              margin: 0 0 20px 0;
              font-family: PingFangSC-Regular;
              font-size: 22px;
              color: #1a1a1a;
              letter-spacing: 0;
              line-height: 22px;
              span {
                display: inline-block;
                width: 450px;
                padding: 0 8px 0 8px;
                border-right: 1px solid #1a1a1a;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                &:first-of-type {
                  padding-left: 0;
                }
                &:last-child {
                  border: none;
                }
              }
            }
            .moneysee {
              font-size: 36px;
              span {
                display: inline-block;
                &:first-of-type {
                  font-size: 36px;
                  font-weight: bold;
                  color: #ec5330;
                  line-height: 36px;
                }
                &:last-of-type {
                  margin: 0 0 0 -10px;
                  font-size: 22px;
                  font-weight: bold;
                  color: #ec5330;
                  letter-spacing: 0;
                  line-height: 22px;
                }
              }
            }
          }
        }
      }
      button {
        width: 100%;
        height: 96px;
        line-height: 96px;
        font-weight: bold;
        font-size: 32px;
        color: #4974f5;
        text-align: center;
        line-height: 32px;
        background: #f2f5ff;
        border-radius: 8px;
        border: none;
      }
      ::v-deep .sp-tabs__wrap {
        margin: 0 0 0 -40px;
        width: 80vw;
      }
      ::v-deep .sp-tab {
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #999999;
      }
      ::v-deep .sp-tab--active {
        font-size: 32px;
        font-weight: bold;
        color: #222222;
      }
      ::v-deep .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
    .recommendedPlanner {
      .planner {
        width: 100%;
        padding: 40px 40px;
        background: #ffffff;
        border: 1px solid #dddddd;
        overflow: scroll;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
        border-radius: 12px;

        ul {
          display: flex;
          align-items: center;
          li {
            margin: 0 50px 0 0;
            text-align: center;
            &:last-of-type {
              margin: 0;
            }
            img {
              width: 96px;
              height: 96px;
              border-radius: 50%;
            }
            .name {
              margin: 26px 0 8px 0;
              font-weight: bold;
              font-size: 26px;
              color: #222222;
              text-align: center;
            }
            .line {
              display: flex;
              justify-content: space-between;
              align-items: center;
              span {
                display: inline-block;
                vertical-align: middle;
                &:first-of-type {
                  width: 72px;
                  height: 2px;
                  background-image: linear-gradient(
                    270deg,
                    #dddddd 0%,
                    rgba(221, 221, 221, 0.1) 100%
                  );
                  border-radius: 1px;
                }
                &:nth-of-type(2) {
                  width: 4px;
                  height: 4px;
                  margin: 0 8px;
                  background: #dddddd;
                  border-radius: 50%;
                }
                &:last-of-type {
                  width: 72px;
                  height: 2px;
                  background-image: linear-gradient(
                    270deg,
                    rgba(221, 221, 221, 0.1) 0%,
                    #dddddd 100%
                  );
                  border-radius: 1px;
                }
              }
            }
            .score {
              margin: 11px 0 7px 0;
              font-weight: bold;
              font-size: 24px;
              color: #222222;
              text-align: center;
            }
            .job {
              font-weight: bold;
              font-size: 24px;
              color: #999999;
              text-align: center;
              span {
                max-width: 168px;
                display: inline-block;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
  .footer {
    .phone {
      font-size: 24px;
      margin: 0 44px 0 0;
    }
    ::v-deep .sp-bottombar {
      z-index: 100;
    }
    ::v-deep .sp-button--info {
      background-color: #24ae68;
      border: 1px solid #24ae68;
    }
  }
}
</style>
