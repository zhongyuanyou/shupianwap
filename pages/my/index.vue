<template>
  <div class="my">
    <!--S 顶部-->
    <div class="my_tp">
      <div class="my_tp_info">
        <sp-image
          round
          width="1.06rem"
          height="1.06rem"
          fit="cover"
          class="my_tp_info_img"
          :src="info.url ? info.url : $ossImgSetV2(imgList.tx)"
          @click="handleAvatar"
        />
        <div class="icon_edit">
          <img :src="$ossImgSetV2(imgList.edit)" alt="" />
        </div>

        <span class="txt" @click="handleAvatar">
          <span class="nickName">{{
            userId ? nickName || '' : '登录/注册'
          }}</span>
          <img
            v-if="userId"
            class="icon-plus"
            :src="$ossImgSetV2(imgList.plus)"
            alt=""
          />
        </span>
        <div v-if="userId" class="right" @click="toKnownHome">
          <span class="home">个人主页</span>
          <my-icon
            name="order_ic_listnext"
            size="0.24rem"
            color="#CCCCCC"
            class="myIcon"
          />
        </div>
      </div>
    </div>
    <!--E 顶部-->

    <!--收藏、合同、优惠券-->
    <div class="my_order">
      <div class="my_order_type">
        <div
          v-for="(item, index) in CollectionTabs"
          :key="index"
          class="my_order_type_list"
          @click="clickServiceTabs(item)"
        >
          <div class="icon">
            <img v-if="item.img" class="icon_img" :src="item.img" alt="" />
            <my-icon
              v-else-if="item.iconName"
              :name="item.iconName"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--收藏、合同、优惠券-->

    <!--S 我的订单-->
    <div class="my_order">
      <div class="my_order_title">我的订单</div>
      <div class="my_order_type">
        <div
          v-for="(item, index) in orderTabs"
          :key="index"
          class="my_order_type_list"
          @click="clickTab(++index)"
        >
          <div class="icon">
            <my-icon :name="item.iconName" color="#4E78F5" size="0.44rem">
            </my-icon>
            <span
              v-if="item.type === 'daipingjia' && evaluateNumFlag !== 'none'"
              class="icon_daipingjia"
              :class="[
                evaluateNumFlag === 'small'
                  ? 'icon_daipingjia_small'
                  : evaluateNumFlag === 'med'
                  ? 'icon_daipingjia_med'
                  : 'icon_daipingjia_lar',
              ]"
              >{{ evaluateNum }}</span
            >
          </div>
          <div class="order_text">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--E 我的订单-->

    <!--S 我的服务-->
    <div class="my_order">
      <div class="my_order_title">我的服务</div>
      <div class="my_order_type">
        <div
          v-for="(item, index) in ServiceTabs"
          :key="index"
          class="my_order_type_list"
          @click="clickServiceTabs(item)"
        >
          <div class="icon">
            <img v-if="item.img" class="icon_img" :src="item.img" alt="" />
            <my-icon
              v-else-if="item.iconName"
              :name="item.iconName"
              color="#4E78F5"
              size="0.44rem"
            ></my-icon>
          </div>
          <div class="order_text regular">
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <!--E 我的服务-->

    <!--S 按钮区-->

    <!--S 按钮区-->
    <!--S 退出登录-->
    <div class="exit_btn">
      <sp-button v-if="userId" type="default" @click="showExit"
        >退出登录</sp-button
      >
    </div>
    <client-only>
      <DownLoadArea
        v-if="!userId"
        :ios-link="iosLink"
        :androd-link="androdLink"
      />
    </client-only>

    <!--E 退出登录-->
    <!--S 弹框-->
    <sp-center-popup
      v-model="loginStatus"
      :field="Field7"
      button-type="confirm"
      @confirm="exitConfirm"
    />
    <!--E 弹框-->
    <Loading-center v-show="loading" />
  </div>
</template>

<script>
import { Button, Image, CenterPopup } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { userinfoApi, evaluateApi } from '@/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
// import { GOODSLIST } from '~/config/constant'
import { imInit } from '@/utils/im'
import getUserSign from '~/utils/fingerprint'
import imHandle from '~/mixins/imHandle'
import DownLoadArea from '@/components/common/downLoadArea.vue'

export default {
  layout: 'nav',
  name: 'Index',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [CenterPopup.name]: CenterPopup,
    LoadingCenter,
    DownLoadArea,
  },
  mixins: [imHandle],
  data() {
    return {
      iosLink: 'cpsccustomer://',
      androdLink: 'cpsccustomer://',
      // isShare: true,
      orderTabs: [
        {
          iconName: 'per_ic_payment',
          name: '待付款',
        },
        {
          iconName: 'per_ic_handle',
          name: '办理中',
        },
        {
          iconName: 'per_ic_complete',
          name: '已完成',
        },
        {
          iconName: 'per_ic_cancel',
          name: '已取消',
        },
        {
          iconName: 'daipingjia',
          name: '待评价',
          type: 'daipingjia',
        },
      ],
      imgList: {
        tx: '2exrifx8gxes000.png',
        edit: '72tvzeql0iw0000.png',
        plus: '895bdylh5rg000.png',

        contract: '2ghw6duy8l0k000.png', // 合同
        collection: 'axvqykli9yg0000.png', // 收藏
        coupon: '1gw9pvueyc68000.png', // 优惠券

        mianTanJiLu: '714jp73eal40000.png', // 面谈记录
        real: 'f9q1kjsywx40000.png', // 实名认证
        help: 'g956fupye1c00.png', // 帮助中心
        complain: '6v7la4yubzk0000.png', // 我要吐槽
        about: 'ea2fs9wtslk0000.png', // 关于我们
      },

      info: {
        fullName: '', // 用户昵称
        nickName: '',
        url: '', // 头像
      }, // 用户信息
      loginStatus: false, // 弹框显示状态
      Field7: {
        type: 'functional',
        title: '确定退出吗？',
      },
      loading: false,
      userName: '',
      realStatus: 'NO_AUTHENTICATION',
      evaluateNumFlag: 'none', // 评论标识状态
      evaluateNum: 0, // 评价数量
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userId,
      token: (state) => state.user.token,
      userPhone: (state) => state.user.userPhone,
    }),

    nickName() {
      if (this.info.nickName) {
        if (this.info.nickName.indexOf('****') !== -1) {
          const arr = this.info.nickName.split('')
          arr.splice(2, 7, '****') // .join('')
          return arr.join('')
        } else {
          return this.info.nickName
        }
      }
      return ''
    },
    CollectionTabs() {
      return [
        {
          // iconName: 'gerenzhongxin_hetongicon',
          name: '合同',
          img: this.$ossImgSetV2(this.imgList.contract),
          url: '/contract/contractList',
        },
        {
          // iconName: 'shoucang',
          name: '收藏',
          img: this.$ossImgSetV2(this.imgList.collection),
          url: '/my/collection',
        },
        {
          // iconName: 'gerenzhongxin_youhuiquanicon',
          name: '优惠券',
          img: this.$ossImgSetV2(this.imgList.coupon),
          url: '/my/coupon',
        },
        // {
        //   // iconName: 'gerenzhongxin_youhuiquanicon',
        //   name: '优惠券',
        //   img: this.$ossImgSetV2(this.imgList.coupon),
        //   url: '/my/coupon',
        // },
        // {
        //   // iconName: 'gerenzhongxin_youhuiquanicon',
        //   name: '优惠券',
        //   img: this.$ossImgSetV2(this.imgList.coupon),
        //   url: '/my/coupon',
        // },
        {},
        {},
      ]
    },
    ServiceTabs() {
      const realStatus =
        this.info.realStatus === 'NO_AUTHENTICATION'
          ? '未实名认证'
          : this.info.realStatus === 'AUTHENTICATION_SUCCESS'
          ? '已实名认证'
          : this.info.realStatus === 'AUTHENTICATION_ING'
          ? '认证中'
          : '未实名认证'
      let realUrl = ''
      if (
        this.info.realStatus === 'NO_AUTHENTICATION' ||
        this.info.realStatus === 'AUTHENTICATION_FAIL' ||
        this.info.realStatus === 'AUTHENTICATION_INVALID'
      ) {
        realUrl = '/contract/authentication'
      }

      return [
        {
          // iconName: 'caifang_mian',
          name: '面谈记录',
          img: this.$ossImgSetV2(this.imgList.mianTanJiLu),
          url: '/my/interviewRecord',
        },
        {
          // iconName: 'shimingrenzheng',
          name: realStatus, // 实名认证
          img: this.$ossImgSetV2(this.imgList.real),
          url: realUrl,
        },
        {
          // iconName: 'per_ic_help',
          name: '帮助中心',
          img: this.$ossImgSetV2(this.imgList.help),
          url: '/my/help',
        },
        {
          // iconName: 'per_ic_debunk',
          name: '我要吐槽',
          img: this.$ossImgSetV2(this.imgList.complain),
          url: '/my/complain',
        },
        {
          // iconName: 'per_ic_about',
          name: '关于我们',
          img: this.$ossImgSetV2(this.imgList.about),
          url: '/my/about',
        },
      ]
    },
  },
  mounted() {
    if (this.userId || this.$cookies.get('token', { path: '/' })) {
      this.userName = this.$cookies.get('userName', { path: '/' })
      // 1.先去本地里面找info信息，
      if (localStorage.getItem('info')) {
        this.info = JSON.parse(localStorage.getItem('info'))
        console.log('myInfo', this.info)
      }
      this.getUserInfo()
      this.getEvaluateNumApi()
      if (!this.token) {
        localStorage.removeItem('info')
      }
    }
  },

  methods: {
    toKnownHome(info) {
      if (this.token && this.userId) {
        this.$router.push({
          path: '/known/home',
          query: {
            homeUserId: this.userId,
          },
        })
      } else {
        this.$router.push({
          path: '/known/home?homeUserId=420882',
          query: {
            redirect: '/login',
          },
        })
      }
    },
    clickServiceTabs(item) {
      if (this.token) {
        item.url && this.$router.push({ path: item.url })
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect: item.url,
          },
        })
      }
    },
    clickTab(index) {
      // 进入待评价页面
      if (index === 5) {
        if (this.token) {
          this.$router.push({ path: '/my/evaluate' })
        } else {
          this.$router.push({
            path: '/login',
            query: {
              redirect: '/my/evaluate',
            },
          })
        }
        return
      }
      // console.log('index', index)
      if (this.token) {
        this.$router.push({
          path: '/order',
          query: {
            type: index,
          },
        })
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect: '/order',
            type: index,
          },
        })
      }
    },
    handleAvatar() {
      // 点击头像
      if (!this.userId) {
        this.$router.push({
          name: 'login',
          query: { redirect: this.$route.fullPath },
        })
      } else {
        this.$router.push('/my/information')
      }
    },
    // handleClickLogin() {
    //   if (this.token) return
    //   this.$router.push({
    //     name: 'login',
    //     query: { redirect: this.$route.fullPath },
    //   })
    // },
    async getUserInfo() {
      if (!this.info && !this.info.fullName) {
        this.loading = true
      }
      // 获取用户信息
      try {
        const params = {
          // id: this.userId,
          id: this.userId || this.$cookies.get('userId', { path: '/' }),
        }
        const res = await this.$axios.get(userinfoApi.info, { params })
        this.loading = false
        if (res.code === 200 && res.data && typeof res.data === 'object') {
          this.info = res.data
          this.userName = res.data.nickName
          this.realStatus = res.data.realStatus
          localStorage.setItem('info', JSON.stringify(this.info))
          // console.log(res.data.realStatus)
          this.$store.dispatch('user/setInfo', res.data)
        } else {
          // 清除用户缓存信息
          this.info = {}
          this.$store.dispatch('user/clearUser')
          localStorage.removeItem('info')
        }
      } catch (err) {
        this.info = {}
        this.$store.dispatch('user/clearUser')
        localStorage.removeItem('info')
        localStorage.removeItem('userId')
        this.loading = false
      }
    },
    async getEvaluateNumApi() {
      try {
        const { code, data } = await this.$axios.get(evaluateApi.evaluateNum)
        if (code !== 200) {
          throw new Error('请求评价数量失败')
        }
        if (typeof data !== 'number' || data === 0) {
          this.evaluateNumFlag = 'none'
        } else if (data < 10) {
          this.evaluateNumFlag = 'small'
          this.evaluateNum = data
        } else if (data > 99) {
          this.evaluateNumFlag = 'lar'
          this.evaluateNum = '99+'
        } else {
          this.evaluateNumFlag = 'med'
          this.evaluateNum = data
        }
      } catch (e) {}
    },
    async handleClick(val, type) {
      if (type === 'login') {
        const isLogin = await this.judgeLoginMixin()
        if (isLogin) {
          this.$router.push(val)
        }
      } else {
        this.$router.push(val)
      }
    },
    async linkAuth() {
      const isLogin = await this.judgeLoginMixin()
      if (
        isLogin &&
        (this.realStatus === 'NO_AUTHENTICATION' ||
          this.realStatus === 'AUTHENTICATION_FAIL' ||
          this.realStatus === 'AUTHENTICATION_INVALID')
      ) {
        this.$router.push('/contract/authentication')
      }
    },
    async showExit() {
      this.loginStatus = true
      const deviceId = await getUserSign()
      const initImSdk = imInit({
        token: '',
        userId: '',
        userType: 'VISITOR',
        deviceId,
      })
      this.$store.commit('im/SET_IM_SDK', initImSdk)
    },
    async exitConfirm() {
      // 退出
      const params = {
        userId: this.userId,
        token: this.token,
      }
      const res = await this.$axios.get(userinfoApi.loginOut, { params })
      if (res.code === 200) {
        // 清除cookie中的数据
        this.info = {}
        this.$store.dispatch('user/clearUser')
        // 清除查询的评价内容
        this.clearEvaluate()
        // localStorage.removeItem('info')
      }
    },
    clearEvaluate() {
      this.evaluateNumFlag = 'none'
      this.evaluateNum = 0
    },
  },
}
</script>

<style lang="less" scoped>
.my {
  width: 100%;
  min-height: 100%;
  padding-bottom: 220px;
  overflow: auto;
  background-color: #ffffff;
  &_tp {
    width: 100%;
    height: 176px;
    padding: 0 40px;
    background-color: #ffffff;
    display: flex;
    // justify-content: flex-start;
    align-items: center;
    // flex-direction: row;
    &_info {
      flex: 1;
      display: flex;
      // justify-content: center;
      align-items: center;
      position: relative;
      // flex-direction: column;
      .icon_edit {
        position: absolute;
        bottom: 8px;
        left: 80px;

        width: 32px;
        height: 32px;
        background: #ffffff;
        border-radius: 32px;
        font-size: 0;
        text-align: center;
        line-height: 32px;
        img {
          width: 14px;
        }
      }
      &_img {
        width: 112px;
        height: 112px;
        border-radius: 53px;
      }
      .txt {
        flex: 1;
        margin-left: 24px;
        font-size: 0;
        letter-spacing: 0;
        // line-height: 44px;

        .nickName {
          margin-right: 10px;
          font-size: 44px;
          line-height: 44px;
          color: #1a1a1a;
          font-family: PingFang SC;
          font-weight: bold;
          vertical-align: middle;
        }
        .icon-plus {
          height: 44px;
          vertical-align: middle;
          // line-height: 44px;
        }
      }
      .right {
        display: flex;
        font-size: 28px;
        color: #555555;
        letter-spacing: 0;
        line-height: 28px;
      }
      .home {
        margin-right: 17px;
      }
    }
  }
  &_order {
    // height: 240px;
    padding: 0 40px 33px;
    background: #ffffff;
    &_title {
      font-size: 40px;
      font-family: PingFang-SC-Bold, PingFang-SC;
      font-weight: bold;
      color: #1a1a1a;
      padding: 32px 0 0px;
    }
    &_type {
      padding-top: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      // flex-wrap: wrap;
      &_list {
        cursor: pointer;
        text-align: center;
        min-width: 76px;
        // flex-shrink: 0;
        // flex: 1;
        .icon {
          position: relative;
          font-size: 0;
          box-sizing: border-box;
          .icon_img {
            width: 52px;
            height: 52px;
          }
          &_daipingjia {
            position: absolute;
            font: 24px @fontf-pfsc-med;
            left: 41px;
            top: -18px;
            background: #ec5330;
            border-radius: 16px;
            color: #fff;
            text-align: center;
            box-shadow: -1px 1px #fff;
            &_small {
              width: 30px;
            }
            &_med {
              width: 40px;
            }
            &_lar {
              width: 53px;
            }
          }
        }
        .order_text {
          font-size: 24px;
          font-family: PingFang-SC-Bold, PingFang-SC;
          font-weight: bold;
          color: #222222;
          line-height: 24px;
          padding-top: 20px;
        }
      }
    }
  }
  .regular {
    font-weight: 500;
  }

  .exit_btn {
    margin: 65px 40px 65px;
    // height: 96px;
    ::v-deep .sp-button {
      width: 100%;
      border: none;
      background: #f2f5ff;
      border-radius: 8px;
      height: 96px;
      font-size: 32px;
      color: #4974f5;
      font-family: PingFangSC-Medium;
      font-weight: bold;
    }
  }
  ::v-deep .download-area {
    position: fixed;
    bottom: 100px;
  }
  .spiconfont {
    display: block;
  }
}
</style>
