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
    <div v-if="responseData.length > 0">
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
            <div class="coupon_price">{{ item.reducePrice }}</div>
            <div v-if="item.useType === 1" class="can_use">无门槛</div>
            <div v-else class="can_use">满{{ item.fullPrice }}元可用</div>
          </div>
          <div class="item-rt">
            <!-- 气泡组件 start -->
            <Popover @closepop="closeBox" />
            <!-- 气泡组件 end-->
            <!-- 右侧显示 start-->
            <!-- <div
            class="sign"
            :class="
              couponType === 1
                ? 'have_use_icon'
                : couponType === 0
                ? ''
                : 'lose'
            "
          ></div> -->
            <div class="title" @click="goDetailPage(item)">
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
      advertCode: 'ad100043',
      productAdvertData: [],
      isNoData: false,
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
    this.getInitCouponData()
    this.getAdvertisingData()
  },
  methods: {
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
    operation_coupon(item) {
      if (item.status === 1) {
        this.setCouponStatus(item)
      } else {
        this.$router.push('/')
      }
    },
    async setCouponStatus(item) {
      const result = await this.$isLogin()
      if (result === 'app_login_success') {
        return
      }
      this.loading = true
      this.$axios
        .post(`${CHIPS_WAP_BASE_URL}/yk/coupon/v2/receive_coupon.do`, {
          couponId: item.id,
        })
        .then((res) => {
          if (res.code === 200) {
            this.responseData = []
            Toast('领取成功')
            this.getInitCouponData()
            this.loading = false
          } else {
            this.loading = false
            Toast.fail({
              duration: 2000,
              message: res.message,
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
        .catch((err) => {
          console.log(err)
        })
      // coupon
      //   .receiveCoupon({ axios: this.$axios }, { couponId: item.id })
      //   .then((result) => {
      //     if (result.code === 200) {
      //       this.responseData = []
      //       this.getInitCouponData()
      //       this.loading = false
      //     }
      //   })
      //   .catch((e) => {
      //     if (e.code !== 200) {
      //       this.responseData = []
      //       console.log(e)
      //     }
      //   })
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
            this.productAdvertData = res.data.sortMaterialList[0].materialList
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
        limit: '10',
        page: '1',
      }
      this.userId ? (params.userId = this.userId) : (params.userId = '')
      this.loading = true
      coupon
        .findPage({ axios: this.$axios }, params)
        .then((result) => {
          this.loading = false
          this.responseData = result
          this.isNoData = false
          if (this.responseData.length === 0) {
            this.isNoData = true
          }
          for (let i = 0, length = this.responseData.length; i < length; i++) {
            let useTime = this.responseData[i].serviceLife
            useTime = useTime.slice(11)
            console.log('useTime', useTime)
            const thisTime = useTime.split('.').join('-')
            const time = new Date(thisTime).getTime()
            if (time - this.nowTimeStamp < 172800000) {
              this.responseData[i].showColorTime = this.showColorTime
            }
          }
          this.usedCount = result.usedCount
          this.notUsedCount = result.notUsedCount
          this.invalidCount = result.invalidCount
          console.log('this.responseData', this.responseData)
          this.loading = false
        })
        .catch((e) => {
          if (e.code !== 200) {
            this.responseData = []
            console.log(e)
          }
        })
    },
    popOver(index) {
      console.log(index)
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
    min-height: 212px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    // background-image: url('https://cdn.shupian.cn/sp-pt/wap/8ef4u05rpn8000.png');
    background-size: 100% 100%;
    margin: 24px 0;
    display: flex;
    position: relative;
    overflow: hidden;
    .item-lf {
      width: 201px;
      height: 212px;
      .coupon_price {
        //   height: 67px;
        font-size: 72px;
        font-family: Bebas;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 27px;
        overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
      }
      .can_use {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 15px;
      }
    }
    .item-rt {
      padding-left: 24px;
      height: auto;
      width: 300px;
      box-sizing: border-box;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
        margin: 36px 0 24px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      font-size: 24px;
      min-width: 150px;
      margin-left: auto;
      text-align: right;
      align-items: center;
      display: flex;
      font-size: 24px;
      margin-right: 10px;
      button {
        display: block;
        width: 150px;
        height: 54px;
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
</style>
