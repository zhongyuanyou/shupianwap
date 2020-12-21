<template>
  <div class="banner">
    <!--    第一层-->
    <div class="banner-top">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <a href="javascript:;">
            <img :src="image" class="banner-top-img" />
          </a>
        </sp-swipe-item>
      </sp-swipe>
    </div>
    <!--    第二层-->
    <div class="banner-bottom">
      <!--      导航-->
      <div class="banner-bottom-tab">
        <div
          :class="active == 1 ? bigfont : smallfont"
          style="width: 195px"
          @click="change(1)"
        >
          增值税筹划
        </div>
        <div
          :class="active == 2 ? bigfont : smallfont"
          style="width: 232px"
          @click="change(2)"
        >
          企业所得税筹划
        </div>
        <div
          :class="active == 3 ? bigfont : smallfont"
          style="width: 243px"
          @click="change(3)"
        >
          个人所得税筹划
        </div>
      </div>
      <div class="banner-bottom-text">为您定制稅筹方案，可降低成本40%-90%</div>
      <!--      表单-->
      <div class="banner-bottom-form">
        <sp-cell
          is-link
          :title="select"
          arrow-direction="down"
          @click="show = true"
        />
        <sp-action-sheet
          v-model="show"
          :actions="actions"
          close-on-click-action
          @select="onSelect"
        />
        <div class="banner-bottom-form-div">
          <span>手机号</span>
          <input
            type="text"
            class="banner-bottom-form-input"
            placeholder="信息保护中，仅官方可见"
            @focus="focus"
          />
        </div>
        <div v-if="isshow" class="banner-bottom-form-div">
          <span>验证码</span>
          <input
            type="text"
            class="banner-bottom-form-input banner-bottom-form-inputspe"
            placeholder="请输入验证码"
          />
          <a
            href="javascript:;"
            class="banner-bottom-form-div-a"
            @click="send"
            >{{ test }}</a
          >
        </div>
        <button class="banner-bottom-form-button">咨询获取节税方案</button>
        <div class="banner-bottom-form-lastdiv">
          今日已提供方案：<span>{{ count }}</span
          >份
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem, ActionSheet, Cell } from '@chipspc/vant-dgg'
export default {
  name: 'BannerVue',
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [ActionSheet.name]: ActionSheet,
    [Cell.name]: Cell,
  },
  data() {
    return {
      images: [
        require('~/assets/spreadImages/tax/busi_img_swchbanner1.jpg'),
        require('~/assets/spreadImages/tax/busi_img_swchbanner2.jpg'),
      ],
      show: false,
      isshow: false,
      active: 1,
      bigfont: { big: true },
      smallfont: { small: true },
      actions: [
        { name: 'ISO45001认证', color: '#5a79e8' },
        { name: 'ISO14001认证' },
        { name: 'ISO9001认证' },
        { name: 'ISO50430认证' },
        { name: 'ISO27001认证' },
        { name: 'ISO13485认证' },
        { name: '认证年审' },
        { name: '三体系认证' },
        { name: '双体系认证' },
        { name: '其他认证' },
      ],
      selectname: 'ISO45001认证',
      count: 126,
      test: '获取验证码',
      select: '选择税务类型',
    }
  },

  methods: {
    showPopup() {
      this.show = true
    },
    change(i) {
      this.active = i
    },
    focus() {
      this.isshow = true
    },
    send() {
      if (this.test === '获取验证码') {
        let i = 59
        this.test = i + 's'
        const time = setInterval(() => {
          if (i > 1) {
            i--
            this.test = i + 's'
          } else {
            this.test = '获取验证码'
            clearInterval(time)
          }
        }, 1000)
      }
    },
    onSelect(e) {
      this.selectname = e.name
      this.select = e.name
      for (const item of this.actions) {
        if (item.name === this.selectname) {
          item.color = '#5a79e8'
        } else {
          item.color = '#232124'
        }
      }
    },
  },
}
</script>

<style scoped lang="less">
.banner {
  &-top {
    width: 750px;
    height: 392px;
    margin-bottom: -81px;
    &-img {
      width: 750px;
      height: 392px;
    }
  }
  &-bottom {
    background: #fff;
    width: 670px;
    margin: 0 40px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    font-size: 0;
    position: relative;
    z-index: 999;
    &-tab {
      width: 670px;
      height: 80px;
      border-radius: 8px 4px 0px 0px;
      font-size: 24px;
      display: flex;
      text-align: center;
      line-height: 80px;
    }
    &-text {
      height: 87px;
      font-size: 24px;
      line-height: 87px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      text-align: center;
    }
    &-form {
      padding: 0 40px;
      &-div {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        width: 590px;
        height: 80px;
        background: #f8f8f8;
        border-radius: 2px;
        margin-top: 24px;
        border: none;
        line-height: 80px;
        padding: 0 0 0 33px;
        position: relative;
        display: flex;
        > span {
          display: inline-block;
          margin-right: 30px;
          width: 84px;
        }
        &-a {
          position: absolute;
          right: 0;
          margin: 0 33px;
        }
      }
      &-input {
        display: inline-block;
        border: none;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: bold;
        background: #f8f8f8;
        padding: 0;
        width: 443px;
        &::placeholder {
          color: #cccccc;
          font-weight: 400;
        }
      }
      &-inputspe {
        width: 237px;
      }
      &-button {
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        margin-top: 40px;
        color: #ffffff;
        font-size: 32px;
        padding: 0;
      }
      &-lastdiv {
        font-size: 26px;
        height: 81px;
        line-height: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        padding: 24px 0 31px;
        display: flex;
        justify-content: center;
        > span {
          display: inline-block;
          color: #4974f5;
          font-weight: bold;
        }
      }
    }
  }
}
/deep/ .sp-cell {
  width: 590px;
  height: 80px;
  background: #f8f8f8;
  border-radius: 2px;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #1a1a1a;
}
a {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #4974f5;
}
.big {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: bold;
  color: #1a1a1a;
  background: white;
}
.small {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  background: #f8f8f8;
}
/deep/ .sp-action-sheet__name {
  font-size: 31px;
  line-height: 56px;
  height: 56px;
  font-family: PingFang SC;
  font-weight: 400;
}
/deep/ .sp-cell::after {
  display: none;
}
</style>
