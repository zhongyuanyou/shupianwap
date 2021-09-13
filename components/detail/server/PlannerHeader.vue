<template>
  <section>
    <sp-sticky
      z-index="5"
      :class="{
        scroTopStyle: Boolean(scrollTopY),
      }"
      @scroll="scrollHandle"
    >
      <sp-top-nav-bar
        ellipsis
        :background="`rgba(255,255,255,0)`"
        @on-click-left="onClickLeft"
      >
        <template #left>
          <div v-if="!isShare">
            <my-icon name="nav_ic_back" size="0.4rem" color="#fff"></my-icon>
          </div>
        </template>
        <template #right>
          <div>
            <my-icon
              :class="goodDetail.isSave ? 'icon-red' : ''"
              style="margin-right: 0.36rem"
              :name="goodDetail.isSave ? 'shoucang_mian' : 'shoucang'"
              size="0.4rem"
              :color="goodDetail.isSave ? '#ec5330' : '#fff'"
              @click.native="handleCollect"
            />
          </div>
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
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { shopApi } from '~/api'

export default {
  name: 'GoodDetailPlannerHeader',
  data() {
    return {
      scrollTopY: 0, // 距离顶部移动距离
      isShare: false, // 判断是否从分享页面过来,有分享页面标识;如果有,则不显示回退标识
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
  },
  mounted() {
    this.isShare = this.$route.query.isShare
  },
  methods: {
    // 移动距离顶部的距离
    scrollHandle({ scrollTop }) {
      if (scrollTop > 216) {
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
      .icon-red {
        color: #ec5330 !important;
      }
    }
  }
}
</style>
