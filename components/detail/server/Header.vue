<template>
  <div class="c-header">
    <div class="header">
      <div class="bgcontent" :style="{ 'background-image': `url(${hdImg})` }">
        <sp-sticky
          z-index="5"
          :class="{
            scroTopStyle: Boolean(scrollTopY),
          }"
          @scroll="scrollHandle"
        >
          <sp-top-nav-bar
            ellipsis
            :background="
              scrollDistance > 50
                ? 'rgba(255,255,255,1)'
                : 'rgba(255,255,255,0)'
            "
            @on-click-left="onClickLeft"
          >
            <template #left>
              <div v-if="!isShare">
                <my-icon
                  name="nav_ic_back"
                  size="0.4rem"
                  color="#1A1A1A"
                ></my-icon>
              </div>
            </template>
            <template #right>
              <div>
                <my-icon
                  :class="goodDetail.isSave ? 'icon-red' : ''"
                  style="margin-right: 0.36rem"
                  :name="goodDetail.isSave ? 'shoucang_mian' : 'shoucang'"
                  size="0.4rem"
                  :color="goodDetail.isSave ? '#ec5330' : '#1A1A1A'"
                  @click.native="handleCollect"
                />
              </div>
              <div>
                <my-icon
                  style="margin-right: 0.36rem"
                  name="nav_ic_shop"
                  size="0.4rem"
                  color="#1A1A1A"
                  @click.native="addCart"
                />
              </div>
              <div>
                <my-icon
                  name="nav_ic_share"
                  size="0.4rem"
                  color="#1A1A1A"
                  @click.native="handleShare"
                />
              </div>
            </template>
          </sp-top-nav-bar>
        </sp-sticky>
        <div class="bgcontent__spaceholder"></div>
      </div>
      <div class="planner">
        <div class="planner__info">
          <div class="name">
            <div class="name__name">{{ custRecPlanner.userName }}</div>
            <div class="name__score">
              <span>{{ custRecPlanner.point }}</span
              >薯片分
            </div>
          </div>
          <div
            v-if="Array.isArray(tagNameList) && tagNameList.length"
            class="tips"
          >
            <div v-for="(item, i) in tagNameList" :key="i" class="tips__item">
              {{ item }}
            </div>
          </div>
        </div>
        <div class="planner__avatars">
          <div class="avatars">
            <img
              class="avatars__big"
              :src="custRecPlanner.portrait"
              @click="linkPlannerDetail"
            />
            <img class="avatars__star" :src="hdStarImg" />
            <img
              v-for="(item, i) in custPlanners"
              :key="i"
              class="avatars__list"
              :class="[
                i === 1
                  ? 'avatars__list--two'
                  : i === 2
                  ? 'avatars__list--three'
                  : '',
              ]"
              :src="item.portrait"
            />
          </div>
        </div>
      </div>
    </div>
    <sp-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="shareOptions"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { Sticky, TopNavBar, ShareSheet } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { copyToClipboard } from '~/utils/common'
import { shopApi } from '~/api'
import { goodDetail } from '~/utils/static/imgs.js'
import imHandle from '~/mixins/imHandle'

export default {
  name: 'GoodDetailHeader',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Sticky.name]: Sticky,
    [ShareSheet.name]: ShareSheet,
  },
  mixins: [imHandle],
  props: {
    // 钻展规划师
    recPlanner: {
      type: Object,
      default: () => {
        return {}
      },
    },
    // 多个钻展规划师
    planners: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      scrollDistance: 0,
      hdImg: goodDetail['c-header-bg'],
      hdStarImg: goodDetail['c-header-avatarStar'],
      scrollTopY: 0, // 距离顶部移动距离
      isShare: false, // 判断是否从分享页面过来,有分享页面标识;如果有,则不显示回退标识
      showShare: false, // 是否弹起分享组件
      shareOptions: [{ name: '复制链接', icon: 'link' }],
    }
  },
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      sellingDetail: (state) => state.sellingGoodsDetail.sellingGoodsData,
    }),
    // 这里有可能为服务商品,有可能为交易商品。所以在这里重新赋值
    goodDetail() {
      return this.sellingDetail
    },
    custRecPlanner() {
      return this.recPlanner
    },
    custPlanners() {
      if (Array.isArray(this.planners) && this.planners.length) {
        const temp = this.planners
        // 只取3个人
        return temp.slice(0, 3)
      } else {
        return []
      }
    },
    tagNameList() {
      // 规划师的标签优选显示这个一级分类下的二级授权范围标签，然后再依次显示其它一级产品分类的下的二级授权范围标签，最多显示2排
      if (this.custRecPlanner.mchUserBusinessCategories) {
        const classCodeOne = this.goodDetail.classCodeLevel.split(',')[0]
        const arr1 = JSON.parse(
          JSON.stringify(this.custRecPlanner.mchUserBusinessCategories)
        )
        const len = arr1.length
        // 将当前商品对应的一级分类排最前面
        const arr2 = arr1.sort((a, b) => {
          if (a.firstTypeCode === classCodeOne) {
            return -1
          }
          return 1
        })
        // 取二级分类
        const arr3 = arr2.map((item) => {
          return item.secondTypeName
        })
        // 去重
        const result = this.unique(arr3)
        console.log('result', result)
        return result
      }
      return []
    },
  },
  mounted() {
    this.isShare = this.$route.query.isShare
  },
  methods: {
    unique(arr) {
      const res = []
      const obj = {}
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = 1
          res.push(arr[i])
        }
      }
      return res
    },
    linkPlannerDetail() {
      this.$router.push({
        path: '/planner/detail',
        query: {
          mchUserId: this.custRecPlanner.mchUserId,
        },
      })
    },
    // 移动距离顶部的距离
    scrollHandle({ scrollTop }) {
      this.scrollDistance = scrollTop
      if (scrollTop > 222) {
        this.scrollTopY = 1
      } else {
        this.scrollTopY = 0
      }
    },
    onClickLeft() {
      if (this.isShare) return
      // 返回上一页
      if (history.length < 2) {
        this.$router.push({
          path: '/search/searchResult?keywords=',
        })
      } else {
        this.$router.back()
      }
    },
    // 收藏
    handleCollect() {
      if (this.goodDetail.isSave) {
        this.cancelCollect()
      } else {
        this.addCollect()
      }
    },
    // 取消收藏
    cancelCollect() {
      // 直接调商户中心接口，未经过node中间层，中间层无法处理formData
      const formData = new FormData()
      formData.append('goodsId', this.goodDetail.id)
      this.$axios
        .post(shopApi.cancelSave, formData)
        .then((res) => {
          if (res.code === 200) {
            this.$xToast.success('取消成功')
            this.goodDetail.isSave = false
          } else {
            this.$xToast.error(res.message || '操作失败')
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.error(err.message || '操作失败')
        })
    },
    // 添加收藏
    addCollect() {
      if (!this.token) {
        this.$router.push('/login')
        return
      }
      const classCodeLevel = this.goodDetail.classCodeLevel
      let codeArr = []
      if (classCodeLevel) {
        codeArr = classCodeLevel.split(',')
      }
      const params = {
        goodsDtos: [
          {
            goodsId: this.goodDetail.id,
            goodsCode: this.goodDetail.classCode,
            catalog1: codeArr.length && codeArr.length > 0 ? codeArr[0] : '',
            catalog2: codeArr.length && codeArr.length > 1 ? codeArr[1] : '',
            catalog3: codeArr.length && codeArr.length > 2 ? codeArr[2] : '',
            goodsType: 'proGoodsServer',
            ext1: 1,
          },
        ],
      }
      this.$axios
        .post(shopApi.addGoods, params)
        .then((res) => {
          console.log('res', res)
          if (res && res.code === 200) {
            this.$xToast.show({
              message: '收藏成功',
              duration: 3000,
              icon: 'toast_ic_comp',
              forbidClick: true,
            })
            this.goodDetail.isSave = true
          } else {
            this.$xToast.error(res || '收藏失败')
          }
        })
        .catch((err) => {
          console.log('err', err)
          this.$xToast.error('收藏失败')
        })
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
    handleShare() {
      this.showShare = true
    },
    onSelect() {
      const result = copyToClipboard(location.href)
      if (result) {
        this.$xToast.success('链接复制成功')
        return
      }
      this.$xToast.error('链接复制失败,请重试')
    },
  },
}
</script>

<style lang="less" scoped>
@import '~@css/pages/detail/c-header.less';
</style>
