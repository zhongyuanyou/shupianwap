<!--
 * @Author: xiao pu
 * @Date: 2020-11-25 15:28:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 16:33:16
 * @Description: file content
 * @FilePath: /chips-wap/pages/planner/detail.vue
-->

<template>
  <div class="detail">
    <div v-if="!hideHeader && !isApplets" class="head">
      <Header title="规划师">
        <template #left>
          <sp-icon
            class-prefix="spiconfont"
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-left: 0.4rem"
            @click.native="onClickLeft"
          />
        </template>
        <template #right>
          <sp-icon
            class-prefix="spiconfont"
            class="head__icon-share"
            name="nav_ic_share"
            size="0.4rem"
            color="#1A1A1A"
            style="margin-right: 0.4rem"
            @click.native="onClickRight"
          />
        </template>
      </Header>
    </div>
    <div class="body">
      <div class="detail-content">
        <div
          class="detail-content__bg"
          :class="{ 'detail-content__bg-show-point': formatShowPoint }"
        >
          <div class="detail-content__wrap">
            <sp-skeleton
              title
              avatar
              avatar-size="1.2rem"
              :row="formatShowPoint ? 10 : 7"
              :loading="loading"
            >
              <div class="detail-content__wrap-head">
                <div class="flex-r-s flex-r-a-c">
                  <div class="detail-content__avatar">
                    <sp-image
                      round
                      width="1.2rem"
                      height="1.2rem"
                      fit="cover"
                      :src="
                        detailData.img ||
                        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_240,h_240,limit_0'
                      "
                    />
                    <span
                      v-if="!!detailData.title"
                      class="detail-content__title"
                      >{{ detailData.title }}</span
                    >
                  </div>
                  <div>
                    <h4 class="detail-content__name">{{ detailData.name }}</h4>
                    <p class="detail-content__discript">
                      {{ detailData.synopsis }}
                    </p>
                  </div>
                </div>

                <div class="detail-content__tag-list">
                  <sp-tag
                    v-for="tag of formatTagList"
                    :key="tag"
                    class="detail-content__tag-list-item"
                    >{{ tag }}</sp-tag
                  >
                </div>
              </div>
              <div class="detail-content__wrap-body">
                <div class="detail-content__section-title">个人信息</div>
                <ul class="detail-content__section-content">
                  <li>
                    <span class="label">服务次数：</span>
                    <span class="content">{{
                      detailData.serveNum ? `${detailData.serveNum}次` : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">好评率：</span>
                    <span class="content">{{
                      detailData.goodReputation
                        ? `${detailData.goodReputation}%`
                        : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">服务经验：</span>
                    <span class="content">{{ formatServeAgeText }}</span>
                  </li>
                  <li>
                    <span class="label">成交记录：</span>
                    <span class="content">{{
                      detailData.payNum ? `${detailData.payNum}次` : '--'
                    }}</span>
                  </li>
                  <li>
                    <span class="label">平均响应时间：</span>
                    <span class="content">{{
                      detailData.averageResponseTime
                        ? `${detailData.averageResponseTime}s`
                        : '--'
                    }}</span>
                  </li>
                </ul>
              </div>
              <div v-show="formatShowPoint" class="detail-content__wrap-footer">
                <div class="detail-content__section-title flex-r-sb flex-r-a-c">
                  <i class="horizontal-line"></i>
                  <span class="detail-content__section-title-text">薯片分</span>
                  <i class="horizontal-line"></i>
                </div>
                <div class="detail-content__sp-score">
                  {{ detailData.point || '--' }}
                </div>
                <div v-if="detailData.prop" class="detail-content__level">
                  打败{{ detailData.prop }}的规划师
                </div>
                <div class="detail-content__explain">
                  <span>
                    什么是薯片分
                    <my-icon
                      name="plan_ic_explain"
                      size="0.24rem"
                      color="#666666"
                      @click.native="handlePoint"
                    />
                  </span>
                  <!-- 一期没有 详情页面只能影藏掉 -->
                  <!-- <sp-button
                  class="detail-content__explain-btn"
                  @click="handlePoint"
                  >查看详情</sp-button
                > -->
                </div>
              </div>
            </sp-skeleton>
          </div>
        </div>
      </div>
      <div class="recommend" style="padding-bottom: 75px">
        <RecommendList :mch-detail-id="detailData.mchDetailId" />
      </div>
    </div>
    <div class="footer">
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button
          type="primary"
          text="电话联系"
          :disabled="!detailData.phone"
          @click="handleCall"
        />
        <sp-bottombar-button
          v-if="!hideIM"
          v-md:p_IMClick
          data-im_type="售前"
          :data-planner_number="detailData.id"
          :data-planner_name="detailData.name"
          :data-crisps_fraction="detailData.point"
          :data-track_code="isInApp ? 'SPP000040' : 'SPW000036'"
          type="info"
          text="在线联系"
          :disabled="!detailData.id"
          @click="handleIM"
        />
      </sp-bottombar>
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
import { mapState, mapMutations } from 'vuex'

import {
  Icon,
  Button,
  Skeleton,
  Image,
  Tag,
  Bottombar,
  BottombarButton,
  ShareSheet,
} from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header'
import SpToast from '@/components/common/spToast/SpToast'
import RecommendList from '@/components/planner/RecommendList'

import { planner } from '@/api'
import imHandle from '@/mixins/imHandle'
import { callPhone, copyToClipboard, setUrlParams } from '@/utils/common'

export default {
  name: 'Detail',
  components: {
    [Icon.name]: Icon,
    [Button.name]: Button,
    [Skeleton.name]: Skeleton,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [ShareSheet.name]: ShareSheet,
    Header,
    RecommendList,
    SpToast,
  },
  mixins: [imHandle],
  data() {
    return {
      loading: true,
      detailData: {},
      shareOptions: [],
      showShare: false,
      isShare: Number(this.$route.query.isShare) === 1, // 默认不是分享页面，从规划师列表进来就不是分享
      hideIM: this.$route.query.imUserId === this.$route.query.mchUserId, // 目前是 获取到imUserId与mchUserId相等，说明是自己与自己聊天，不显示IM
      hideHeader: !!this.$route.query.hideHeader || false,
      redirectType: this.$route.query.redirectType || 'wap', // 跳转的到 wap里面还是app里面去
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
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
  },
  created() {
    if (process && process.client) {
      // notice:
      // store中的用户信息默认来自cookie，会从cookie中获取；因为在wap中， userInfo中的token与userId等 保存在cookie中，
      // 但是在app中登录等，登录信息cookie中的没有更新，导致直接从store中获取到的信息无效
      // 所以在app中进入此页面，先清除userInfo,获取最新的userInfo
      this.isInApp && this.clearUserInfo()

      this.getDetail().finally(() => {
        this.loading = false
      })
    }
  },
  methods: {
    ...mapMutations({
      setUserInfo: 'user/SET_USER',
      clearUserInfo: 'user/CLEAR_USER',
    }),
    onClickLeft() {
      console.log('nav onClickLeft')
      this.uPGoBack()
    },
    onClickRight() {
      console.log('nav onClickRight')
      this.uPShareOption()
    },
    handleCall() {
      console.log('call ')
      this.uPCall(this.detailData.phone)
    },
    handleIM() {
      console.log('IM ')
      this.uPIM({
        mchUserId: this.detailData.id,
        userName: this.detailData.userName,
        type: this.detailData.mchClass,
      })
    },

    onSelect(option) {
      this.uPShare(option)
    },

    handlePoint() {
      this.$refs.spToast.show({
        message: '薯片分是对规划师的综合衡量，薯片分越高综合表现越好',
        duration: 1500,
        forbidClick: false,
        // icon: 'spiconfont-tab_ic_check',
      })
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
            image: this.detailData.img,
            title: '规划师',
            subTitle: '',
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
    // 拨打电话号码
    uPCall(telNumber) {
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggCallPhone({ phone: telNumber }, (res) => {
          const { code } = res || {}
          if (code !== 200) this.$xToast.error('拨号失败！')
        })
        return
      }
      // 浏览器中调用的
      callPhone(telNumber)
    },

    // 发起聊天
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
      this.creatImSessionMixin({ imUserId: mchUserId, imUserType })
    },

    // 平台不同，跳转方式不同
    uPGoBack() {
      if (this.isInApp && this.redirectType === 'app') {
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

    // app获取用户信息
    getUserInfo() {
      return new Promise((resolve, reject) => {
        if (this.userInfo.userId) {
          resolve(this.userInfo.userId)
          return
        }
        this.$appFn.dggGetUserInfo((res) => {
          const { code, data } = res || {}
          // 未登录需要登录
          if (code !== 200) {
            this.$appFn.dggLogin((loginRes) => {
              if (loginRes && loginRes.code === 200) {
                console.log('loginRes : ', loginRes)

                let loginResData = {}
                // 为了兼容 企大顺
                if (typeof loginRes.data === 'string') {
                  try {
                    loginResData = JSON.parse(loginRes.data)
                  } catch (error) {
                    console.error(error)
                  }
                } else {
                  loginResData = loginRes.data
                }
                if (loginResData && loginResData.userId && loginResData.token) {
                  this.setUserInfo(loginResData)
                  resolve(loginResData.userId)
                  return
                }
                reject(new Error('登录后userId或者token缺失'))
                return
              }
              reject(new Error('登录失败'))
            })
            return
          }
          let userInfo = {}
          if (typeof data === 'string') {
            try {
              userInfo = JSON.parse(data)
            } catch (error) {
              console.error(error)
            }
          } else {
            userInfo = data
          }
          if (userInfo && userInfo.userId && userInfo.token) {
            this.setUserInfo(userInfo)
            resolve(userInfo.userId)
            return
          }
          reject(new Error('用户信息中userId或者token缺失'))
        })
      })
    },

    // 获取详情数据
    async getDetail() {
      try {
        const { mchUserId } = this.$route.query
        if (mchUserId == null) {
          this.$xToast.show({
            message: '缺少规划师参数!',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_error',
          })
          return
        }
        const params = { id: mchUserId }
        const data = await planner.detail(params)
        this.detailData = data || {}
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
  },
  head() {
    return {
      title: '规划师',
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
@title-text-color: #1a1a1a;
@subtitle-text-color: #999999;
@hint-text-color: #cccccc;

.flex-r-s {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.flex-r-a-c {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.flex-r-sb {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.detail {
  height: 100%;
  background-color: #ffffff;
  .head {
  }
  .body {
    padding: 0;
    .detail-content {
      &__bg {
        padding: 40px;
        position: relative;
        background: url(https://cdn.shupian.cn/sp-pt/wap/images/fmyco4fucsg0000.png)
          top center/100% auto no-repeat;
        background-position-y: -286px;
      }
      &__bg-show-point {
        background-position-y: 0;
      }
      &__wrap {
        // height: 768px;
        background: linear-gradient(135deg, #f9f1e8, #f9f1e8, #e3d1c3);
        border-radius: 8px;
        padding: 48px 40px;
        box-sizing: border-box;
        &-head {
        }
        &-body {
          padding-top: 42px;
        }
        &-footer {
          margin-top: 14px;
        }
      }
      &__avatar {
        width: 120px;
        height: 120px;
        margin-right: 24px;
        position: relative;
      }
      &__title {
        content: '';
        display: block;
        max-width: 150px;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 28px;
        padding: 0 12px;
        background: linear-gradient(135deg, #ffeab9, #edcf98);
        border: 1px solid #dfb45a;
        border-radius: 14px;
        font-size: 18px;
        font-weight: bold;
        color: #9b6809;
        line-height: 28px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &__name {
        font-size: 36px;
        font-weight: bold;
        color: #222222;
        line-height: 40px;
        .textOverflow(1);
      }
      &__discript {
        margin-top: 20px;
        font-size: 24px;
        line-height: 30px;
        font-weight: 400;
        color: #222222;
        .textOverflow(2);
      }
      &__tag-list {
        margin-top: 24px;
        line-height: 1em;
        font-size: 0;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        max-height: 60px;
        &-item {
          flex-shrink: 0;
          background-color: #eadacd;
          color: #222222;
          font-size: 24px;
          font-weight: 400;
          line-height: 50px;
          margin-left: 12px;
          margin-bottom: 12px;
          padding: 0 18px;
          border-radius: 4px;
          max-width: 280px;
          min-height: 50px;
          .textOverflow(1);
          &:first-child {
            margin-left: 0;
          }
        }
      }
      &__section-title {
        font-size: 28px;
        font-weight: bold;
        line-height: 32px;
        &-text {
          margin: 0 40px;
        }
      }
      &__section-content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-top: 38px;
        > li {
          flex: 50% 1 0;
          height: 23px;
          font-size: 24px;
          font-weight: 400;
          color: #222222;
          line-height: 28px;
          margin-bottom: 24px;
        }
      }
      &__sp-score {
        font-size: 58px;
        font-family: Bebas;
        font-weight: 400;
        color: #222222;
        line-height: 62px;
        text-align: center;
        margin-top: 20px;
      }
      &__level {
        font-size: 24px;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        text-align: center;
        margin-top: 16px;
      }
      &__explain {
        font-size: 28px;
        line-height: 32px;
        font-weight: 400;
        color: #222222;
        margin-top: 22px;
        text-align: center;
      }
      &__explain-btn {
        height: 32px;
        background-color: transparent;
        border: none;
        &:active::before {
          opacity: 1;
          background-color: transparent;
        }
      }
      .horizontal-line {
        .horizontal-line(@width:208px; @bgColor:#DFD4CA; @skewX:0deg; @height:2px;);
        flex: 1;
        width: auto;
      }
    }
  }
  .footer {
    /deep/.sp-bottombar {
      z-index: 100;
      .sp-button--info {
        background-color: #24ae68;
        border: 1px solid #24ae68;
      }
    }
  }
  .recommend {
  }
  .item-wrap {
    padding: 40px;
  }
  &-toast {
    /deep/.my-toast__content {
      transform: translateY(-100%);
    }
  }
}
</style>
