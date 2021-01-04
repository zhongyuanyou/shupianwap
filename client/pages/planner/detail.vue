<!--
 * @Author: xiao pu
 * @Date: 2020-11-25 15:28:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-01-04 10:30:45
 * @Description: file content
 * @FilePath: /chips-wap/client/pages/planner/detail.vue
-->

<template>
  <div class="detail">
    <div v-if="!hideHeader" class="head">
      <Header title="规划师">
        <template #left>
          <my-icon
            name="nav_ic_back"
            size="0.4rem"
            color="#1A1A1A"
            class="head__icon-back"
            @click.native="onClickLeft"
          ></my-icon>
        </template>
        <template #right>
          <my-icon
            class="head__icon-share"
            name="nav_ic_share"
            size="0.4rem"
            color="#1A1A1A"
            @click.native="onClickRight"
          />
        </template>
      </Header>
    </div>
    <div class="body">
      <div class="detail-content">
        <div class="detail-content__bg">
          <div class="detail-content__wrap">
            <div class="detail-content__wrap-head">
              <div class="flex-r-s flex-r-a-c">
                <div class="detail-content__avatar">
                  <sp-image
                    round
                    width="1.2rem"
                    height="1.2rem"
                    fit="cover"
                    :src="detailData.img"
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
                  size="large"
                  color="#EADACD"
                  text-color="#222222"
                  class="detail-content__tag"
                  >{{ tag }}</sp-tag
                >
              </div>
            </div>
            <div class="detail-content__wrap-body">
              <div class="detail-content__section-title">个人信息</div>
              <ul class="detail-content__section-content">
                <li>
                  <span class="label">服务人数：</span>
                  <span class="content">{{
                    detailData.serveNum ? `${detailData.serveNum}人` : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">好评率：</span>
                  <span class="content">{{
                    detailData.goodReputation
                      ? `${detailData.goodReputation}次`
                      : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">服务经验：</span>
                  <span class="content">{{
                    detailData.serveAge ? `${detailData.serveAge}年` : '--'
                  }}</span>
                </li>
                <li>
                  <span class="label">成交记录：</span>
                  <span class="content">{{
                    detailData.serveAge ? `${detailData.serveAge}次` : '--'
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
            <div class="detail-content__wrap-footer">
              <div class="detail-content__section-title flex-r-sb flex-r-a-c">
                <i class="horizontal-line"></i>
                <span>薯片分</span>
                <i class="horizontal-line"></i>
              </div>
              <div class="detail-content__sp-score">
                {{ detailData.point || '--' }}
              </div>
              <div class="detail-content__level">
                打败{{ detailData.prop }}的规划师
              </div>
              <div class="detail-content__explain">
                <span>
                  什么是薯片分
                  <my-icon name="per_ic_help" size="0.24rem" color="#666666" />
                </span>
                <sp-button
                  class="detail-content__explain-btn"
                  @click="handlePoint"
                  >查看详情</sp-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="recommendList && recommendList.length" class="recommend">
        <h3 class="recommend__title">为您推荐</h3>
        <div class="recommend-list">
          <GoodsPro
            v-for="item in recommendList"
            :key="item"
            class="item-wrap"
          />
        </div>
      </div>
    </div>
    <div class="footer">
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button
          type="primary"
          text="电话联系"
          @click="handleCall"
        />
        <sp-bottombar-button type="info" text="在线联系" @click="handleIM" />
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
  Button,
  Toast,
  Image,
  Tag,
  Bottombar,
  BottombarButton,
  ShareSheet,
} from '@chipspc/vant-dgg'

import Header from '@/components/common/head/header'
import GoodsPro from '@/components/planner/GoodsPro'
import SpToast from '@/components/common/spToast/SpToast'

import { planner } from '@/api'
import imHandle from '@/mixins/imHandle'
import { callPhone, copyToClipboard } from '@/utils/common'

export default {
  name: 'List',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Tag.name]: Tag,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [ShareSheet.name]: ShareSheet,
    Header,
    GoodsPro,
    SpToast,
  },
  mixins: [imHandle],
  data() {
    return {
      recommendList: [],
      loading: true,
      detailData: {},
      shareOptions: [],
      showShare: false,
      hideHeader: !!this.$route.query.hideHeader || false,
      redirectType: this.$route.query.redirectType || 'wap', // 跳转的到 wap里面还是app里面去
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
    formatTagList() {
      const tagList = this.detailData.tagList
      if (!Array.isArray(tagList)) return []
      const formatData = tagList.slice(0, 2)
      return formatData
    },
  },
  created() {
    if (process && process.client) {
      this.getDetail()
    }
  },
  methods: {
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
      const isSuccess = copyToClipboard(location && location.href)
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
        this.$appFn.dggShare(
          {
            image: this.detailData.img,
            title: '规划师',
            subTitle: '',
            url: window && window.location.href,
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200) {
              this.$refs.spToast.show({
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
          if (code !== 200) Toast('拨号失败！')
        })
        return
      }
      // 浏览器中调用的
      callPhone(telNumber)
    },

    // 发起聊天
    uPIM(data = {}) {
      const { mchUserId, userName } = data
      // 如果当前页面在app中，则调用原生拨打电话的方法
      if (this.isInApp) {
        this.$appFn.dggOpenIM(
          {
            name: userName,
            userId: mchUserId,
            userType: 'MERCHANT_USER',
          },
          (res) => {
            const { code } = res || {}
            if (code !== 200)
              this.$refs.spToast.show({
                message: `联系失败`,
                duration: 1000,
                forbidClick: true,
                icon: 'toast_ic_remind',
              })
          }
        )
        return
      }
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
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

      // 在浏览器里 返回
      this.$router.back(-1)
    },

    // 获取详情数据
    async getDetail() {
      try {
        const { mchUserId } = this.$route.query
        if (mchUserId == null) {
          this.$refs.spToast.show({
            message: '缺少规划师参数!',
            duration: 1000,
            forbidClick: false,
            icon: 'toast_ic_error',
          })
          return
        }
        const params = { id: mchUserId }
        const data = await planner.detail(params)
        console.log(data)
        this.detailData = data || {}
        return data
      } catch (error) {
        console.error('getDetail:', error)
        this.$refs.spToast.show({
          message: error.message || '请求失败！',
          duration: 1000,
          forbidClick: false,
          icon: 'toast_ic_error',
        })
        return Promise.reject(error)
      }
    },
  },
  head: {
    title: '规划师',
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
    &__icon-back {
      margin-left: 40px;
    }
    &__icon-share {
      margin-right: 40px;
    }
  }
  .body {
    padding: 0;
    .detail-content {
      &__bg {
        padding: 40px;
        position: relative;
        background: url(~assets/images/planner/detail_bg.png) top center/100%
          auto no-repeat;
      }
      &__wrap {
        height: 768px;
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
        max-width: 98px;
        max-width: 120px;
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
        /deep/.sp-tag {
          max-width: 280px;
          margin-left: 12px;
          font-size: 24px;
          font-weight: 400;
          white-space: nowrap;
          word-break: normal;
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
    &__title {
      padding: 0 40px;
      font-size: 40px;
      font-weight: bold;
      color: @title-text-color;
      line-height: 44px;
      margin-bottom: 6px;
    }
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
