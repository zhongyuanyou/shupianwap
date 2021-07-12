<template>
  <div class="act-coupon">
    <header-slot>
      <Head ref="head" title="领券中心">
        <template #left>
          <my-icon
            class="back-icon"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="uPGoBack"
          ></my-icon>
        </template>
      </Head>
    </header-slot>
    <div v-if="productAdvertData.length > 0" class="banner">
      <sp-swipe :autoplay="3000" @change="onChange">
        <sp-swipe-item v-for="(item, index) in productAdvertData" :key="index">
          <a :href="item.materialLink" style="display: block; height: 100%">
            <sp-image
              fit="cover"
              :src="item.materialUrl"
              style="width: 100%; height: 100%"
          /></a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <div ref="scrollView" class="page-list" @scroll="scollChange">
      <div class="coupon_list">
        <div
          v-for="(item, index) in responseData"
          :key="index"
          class="coupon_item"
        >
          <div
            :class="item.couponStatus === 1 ? 'haveUse' : 'notUse'"
            class="item-lf"
          >
            <div v-if="item.couponType === 1">
              <div class="coupon_price">{{ item.reducePrice }}</div>
              <div v-if="item.fullPrice == 0" class="can_use">无门槛</div>
              <div v-else class="can_use">满{{ item.fullPrice }}元可用</div>
            </div>
            <div v-else>
              <div class="coupon_discount">
                {{ getDiscount(item.discount) }}
                <span>折</span>
              </div>
            </div>
            <div
              v-if="item.couponStatus !== 1 && item.countSum !== -1"
              class="coupon_remain"
            >
              <div class="remain_bar">
                <div
                  class="bar_inner"
                  :style="{ width: getRemainPercent(item) + '%' }"
                ></div>
              </div>
              <div class="remain_num">剩余{{ getRemainPercent(item) }}%</div>
            </div>
            <div
              v-if="item.couponStatus !== 1 && item.countSum === -1"
              class="coupon_remain"
            >
              <span class="no-num">不限量</span>
            </div>
          </div>
          <div class="item-rt">
            <!-- 气泡组件 start -->
            <Popover
              :ref="'myPop' + index"
              :text="item.remark"
              @closepop="closeBox"
            />
            <!-- 气泡组件 end-->
            <div class="title">
              <span
                :class="item.couponStatus === 1 ? 'no-coupon' : 'type-name'"
                >{{ item.couponType === 1 ? '满减券' : '折扣券' }}</span
              >
              {{ item.couponName }}
            </div>
            <div ref="textpro" class="content" @click="popOver(index)">
              <span v-if="item.useType === 1">全场通用</span>
              <span v-if="item.useType === 2">限制分类</span>
              <span v-if="item.useType === 3">限制商品</span>
            </div>
            <div class="date">{{ item.serviceLife }}</div>
            <!-- 右侧显示 end-->
          </div>
          <div class="item-btn">
            <button
              v-if="item.couponStatus === 0"
              class="my-coupon"
              @click="operation_coupon(item)"
            >
              立即领取
            </button>
            <button v-if="item.couponStatus === 1" class="no-coupon">
              已领完
            </button>
            <button v-if="item.couponStatus === 2" class="no-use">
              已领取
            </button>
          </div>
          <div v-if="item.couponStatus === 2" class="receive">
            <img
              src="https://cdn.shupian.cn/sp-pt/wap/images/1g2zj1jmy4o0000.png"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
    <div v-if="isNoData" class="no-data">
      <img
        src="https://cdn.shupian.cn/sp-pt/wap/images/dypjq91xxps0000.png"
        alt=""
        srcset=""
      />
      <p>目前没有优惠券可领哦~</p>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Image, Toast } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import Head from '@/components/common/head/header'
import Popover from '~/components/common/popover/popover_old.vue'
import { coupon, activityApi } from '@/api/index'
import { CHIPS_WAP_BASE_URL } from '@/config/constant'
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Image.name]: Image,
    [HeaderSlot.name]: HeaderSlot,
    Popover,
    Head,
  },
  data() {
    return {
      current: '',
      loading: false,
      usedCount: 0, // 已使用
      notUsedCount: 0, // 未使用
      invalidCount: 0, // 已过期
      showColorTime: true, // 是否显示红色
      nowTimeStamp: 0, // 时间戳
      responseData: [], // 请求成功返回数据
      // 请求数据格式
      formData: {}, // 请求数据
      indexNum: 0,
      couponType: 0, // 优惠券类型 未使用 已使用 已失效
      isShow: false, // 控制显示气泡
      advertCode: 'ad100501',
      productAdvertData: [],
      isNoData: false,
      page: 1,
      limit: 20,
      nomore: false,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.getAdvertisingData()
    // this.getInitCouponData()
    if (this.isInApp) {
      if (this.userInfo.userId && this.userInfo.token) {
        console.log('无token')
        this.getInitCouponData()
      } else {
        this.$appFn.dggGetUserInfo((res) => {
          console.log('调用app获取信息', res)
          if (res.code === 200) {
            // 兼容启大顺参数返回
            this.$store.dispatch(
              'user/setUser',
              typeof res.data === 'string' ? JSON.parse(res.data) : res.data
            )
            this.getInitCouponData()
          } else {
            this.getInitCouponData()
          }
        })
      }
    } else {
      this.getInitCouponData()
    }
  },
  methods: {
    getRemainPercent(data) {
      if (data.countSum > 0 && data.countSur > 0) {
        return Math.ceil((Number(data.countSur) * 100) / Number(data.countSum))
      } else {
        return 0
      }
    },
    getDiscount(count) {
      let num
      if (Number(count) > 10) {
        num = Number(count) / 100
        num = num.toFixed('1')
      } else {
        num = Number(count) / 100
        num = num.toFixed('2')
      }
      return num
    },
    uPGoBack() {
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
    scollChange() {
      const scrollTop = this.$refs.scrollView.scrollTop
      const scrollHeight = this.$refs.scrollView.scrollHeight
      const windowHeight = window.innerHeight
      // 提前100px拉取下页数据
      if (scrollTop + windowHeight > scrollHeight - 100) {
        if (!this.nomore && !this.loading) {
          this.nomore = true
          this.loading = true
          this.page++
          this.getInitCouponData()
        }
      }
    },
    operation_coupon(item) {
      if (item.countSur === 0) {
        Toast('该优惠券已领完，请领取其他优惠券！')
      }
      if (item.couponStatus === 0) {
        this.setCouponStatus(item)
      } else {
        Toast('无法领取')
      }
    },
    async setCouponStatus(item) {
      const isLogin = await this.$isLogin()
      if (isLogin === 'app_login_success') {
        this.getInitCouponData()
        return
      }
      if (!isLogin) return
      this.loading = true
      this.$axios
        .post(`${CHIPS_WAP_BASE_URL}/yk/coupon/v2/receive_coupon.do`, {
          couponId: item.id,
        })
        .then((res) => {
          if (res && res.code === 200) {
            Toast('领取成功')
            this.page = 1
            this.getInitCouponData()
            this.loading = true
            this.nomore = false
          } else {
            this.loading = false
            Toast.fail({
              duration: 2000,
              message: res.message || '领取失败',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
        .catch((err) => {
          console.log(err)
          Toast.fail({
            duration: 2000,
            message: err.message || err || '领取失败',
            forbidClick: true,
            className: 'my-toast-style',
          })
        })
    },
    onChange(index) {
      this.current = index
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
            this.productAdvertData = res.data.sortMaterialList
              ? res.data.sortMaterialList[0].materialList
              : []
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
    getInitCouponData() {
      const params = {
        orderByWhere: 'createTime=desc;',
        findType: 1,
        limit: this.limit,
        page: this.page,
      }
      this.userId ? (params.userId = this.userId) : (params.userId = '')
      this.loading = true
      coupon
        .findPage({ axios: this.$axios }, params)
        .then((result) => {
          this.loading = false
          this.isNoData = false
          if (result.length === 0 && this.page === 1) {
            this.isNoData = true
          }
          for (let i = 0, length = result.length; i < length; i++) {
            let useTime = result[i].serviceLife
            useTime = useTime.slice(11)
            const thisTime = useTime.split('.').join('-')
            const time = new Date(thisTime).getTime()
            if (time - this.nowTimeStamp < 172800000) {
              result[i].showColorTime = this.showColorTime
            }
          }
          let dataArr = []
          if (this.page === 1) {
            dataArr = result
          } else {
            const oldList = JSON.parse(JSON.stringify(this.responseData))
            dataArr = oldList.concat(result)
          }
          // this.usedCount = result.usedCount
          // this.notUsedCount = result.notUsedCount
          // this.invalidCount = result.invalidCount
          this.responseData = dataArr
          this.loading = false
          if (result.length < this.limit) {
            this.nomore = true
          } else {
            this.nomore = false
          }
          console.log('nomore', this.nomore)
        })
        .catch((e) => {
          if (e.code !== 200) {
            console.log(e)
          }
        })
    },
    popOver(index) {
      const l = this.responseData.length
      for (let i = 0; i < l; i++) {
        this.$refs['myPop' + i][0].isShow = false
      }
      // if(index)
      this.$refs['myPop' + index][0].isShow = true
      this.$refs['myPop' + index][0].indexData = index
    },
    // 关闭气泡组件
    closeBox(data) {
      this.indexNum = data
      this.$refs['myPop' + this.indexNum][0].isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.no-data {
  text-align: center;
  padding-top: 150px;
  img {
    width: 340px;
    height: 340px;
  }
  p {
    width: 100%;
    color: #222222;
    font-size: 28px;
  }
}
.lose {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/8a099vjhmbc0000.png');
}
.have_use_icon {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/29a165hg8w4k000.png');
}
.haveUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/2ozhssqe5py0000.png');
  background-size: cover;
}
.notUse {
  background-image: url('https://cdn.shupian.cn/sp-pt/wap/g4kbai7wgrk0000.png');
  background-size: cover;
}
.act-coupon {
  max-width: 7.5rem;
  margin: 0 auto;
}
.banner {
  margin-top: 88px;
  ::v-deep .sp-swipe {
    width: 100%;
    height: 300px;
    /*background-color: #999;*/
    overflow: hidden;
    position: relative;
    margin-top: -88px;
    ::v-deep .sp-swipe-item {
      height: 300px;
      a {
        width: 100%;
        height: 100%;
      }
    }
    ::v-deep .sp-image {
      height: 300px;
      width: 100%;
      > img {
        width: 100%;
        height: 100%;
        display: block;
        object-fit: fill !important;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 24px;
      bottom: 24px;
      padding: 0 28px;
      height: 44px;
      line-height: 44px;
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #ffffff;
      background: #000000;
      opacity: 0.4;
      border-radius: 24px;
    }
  }
}
.coupon_list {
  width: 100%;
  padding: 12px 40px 20px 40px;
  height: auto;
  .coupon_item {
    position: relative;
    min-height: 212px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
    background-size: 100% 100%;
    margin: 24px 0;
    position: relative;
    .item-lf {
      width: 201px;
      height: 212px;
      float: left;
      .coupon_discount {
        font-size: 72px;
        font-family: Bebas;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 44px;
        position: relative;
        padding-right: 20px;
        margin-bottom: 10px;
        span {
          position: absolute;
          font-size: 28px;
          bottom: 0;
        }
      }
      .coupon_price {
        //   height: 67px;
        font-size: 62px;
        font-family: Bebas;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 27px;
        overflow: hidden;
        position: relative;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .coupon_remain {
        font-size: 24px;
        height: 30px;
        width: 100%;
        .remain_bar {
          margin-left: 20px;
          width: 66px;
          height: 8px;
          border-radius: 4px;
          background: #ff9467;
          margin-top: 12px;
          position: relative;
          overflow: hidden;
          float: left;
          .bar_inner {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 100%;
            border-radius: 4px;
            background: #fff166;
          }
        }
        .remain_num {
          float: left;
          opacity: 0.8;
          font-size: 24px;
          color: #fffcd6;
          letter-spacing: 0;
          transform: scale(0.8);
          transform-origin: 12px 50%;
        }
        .no-num {
          text-align: center;
          color: #ffffff;
          width: 100%;
          display: inline-block;
        }
      }
      .can_use {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
      }
    }
    .item-rt {
      padding: 30px 0 0 24px;
      height: auto;
      box-sizing: border-box;
      width: auto;
      padding-left: 230px;
      position: relative;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding-left: 84px;
        padding-bottom: 12px;
        position: relative;
        span {
          position: absolute;
          border-radius: 4px;
          font-size: 24px;
          left: 0;
          top: 2px;
          line-height: 24px;
          padding: 4px;
        }
        .type-name {
          color: #ffffff;
          background-image: linear-gradient(90deg, #fa6d5a 0%, #fa5741 100%);
        }
        .no-coupon {
          background: #cccccc;
          color: #ffffff;
        }
      }
      .content {
        width: 404px;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 32px;
        margin-bottom: 30px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .date {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
      }
      .expiredate {
        font-size: 20px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #f1524e;
      }
      .sign {
        position: absolute;
        width: 90px;
        height: 84px;
        // background-image: url('https://cdn.shupian.cn/sp-pt/wap/dcdo6nc5o6g0000.png');
        background-size: 100% 100%;
        right: 0px;
        top: 0px;
      }
    }
    .receive {
      position: absolute;
      right: 0;
      top: -30px;
      z-index: 1;
      width: 90px;
      height: 90px;
      img {
        width: 90px;
        height: 90px;
      }
    }
    .item-btn {
      width: 150px;
      height: 54px;
      font-size: 24px;
      position: absolute;
      right: 20px;
      top: 50%;
      margin-top: -10px;
      button {
        display: block;
        width: 100%;
        height: 100%;
        font-size: 0.24rem;
        &.my-coupon {
          background: #ec5330;
          border-radius: 27px;
          color: #fff;
        }
        &.no-use {
          background: #fdedea;
          border: 1px solid #ec5330;
          border-radius: 27px;
          color: #ec5330;
        }
        &.no-coupon {
          background: #cccccc;
          border-radius: 27px;
          color: #ffffff;
        }
      }
    }
  }
}
.coupon_tip {
  width: 661px;
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  margin: 0 auto;
  margin-top: 24px;
  span {
    color: #4974f5;
  }
}
::v-deep .sp-tabs__line {
  width: 64px;
}
::v-deep .sp-tab--active {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #4974f5;
}
.page-list {
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
</style>
