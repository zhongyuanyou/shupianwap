<template>
  <div
    class="banner"
    :style="isshow == true ? { height: '9.75rem' } : { height: '8.71rem' }"
  >
    <!--    第一层-->
    <div class="banner-top">
      <sp-swipe :autoplay="3000" indicator-color="white">
        <sp-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" class="banner-top-img" />
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
          title="选择税务类型"
          arrow-direction="down"
          @click="show = true"
        />
        <sp-action-sheet
          v-model="show"
          :actions="actions"
          cancel-text="取消"
          close-on-click-action
        />
        <div class="banner-bottom-form-div">
          <span>手机号</span>
          <input
            type="text"
            class="banner-bottom-form-input"
            placeholder="信息包含中，仅官方可见"
            @focus="focus"
          />
        </div>
        <div v-if="isshow" class="banner-bottom-form-div">
          <span>验证码</span>
          <input
            type="text"
            class="banner-bottom-form-input banner-bottom-form-input-wid"
            placeholder="请输入验证码"
          />
          <a href="javascript:;" class="banner-bottom-form-div-a" @click="send"
            >获取验证码</a
          >
        </div>
        <button class="banner-bottom-form-button">咨询获取节税方案</button>
        <div class="banner-bottom-form-lastdiv">
          今日已提供方案：<span>126</span>份
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
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
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
    send(e) {
      if (e.target.innerHTML === '获取验证码') {
        let i = 59
        e.target.innerHTML = i + 's'
        const time = setInterval(() => {
          if (i > 0) {
            i--
            e.target.innerHTML = i + 's'
          } else {
            e.target.innerHTML = '获取验证码'
            clearInterval(time)
          }
        }, 1000)
      }
    },
  },
}
</script>

<style scoped lang="less">
.banner {
  position: relative;
  &-top {
    width: 750px;
    height: 392px;
    &-img {
      width: 750px;
      height: 392px;
    }
  }
  &-bottom {
    background: #fff;
    width: 670px;
    position: absolute;
    top: 311px;
    margin: 0 40px;
    box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.05);
    border-radius: 8px;
    font-size: 0;
    &-tab {
      width: 670px;
      height: 80px;
      background: #f8f8f8;
      border-radius: 8px 4px 0px 0px;
      font-size: 24px;
      display: flex;
      text-align: center;
      line-height: 80px;
    }
    &-text {
      width: 452px;
      height: 25px;
      font-size: 24px;
      line-height: 25px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #555555;
      margin: 31px 109px;
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
        > span {
          display: inline-block;
          margin-right: 30px;
        }
        &-a {
          position: absolute;
          right: 0;
          margin-right: 33px;
        }
      }
      &-input {
        display: inline-block;
        flex: 1;
        border: none;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        background: #f8f8f8;
        &::placeholder {
          color: #cccccc;
        }
      }
      &-input-wid {
        width: 240px;
      }
      &-button {
        width: 100%;
        height: 88px;
        background: #4974f5;
        border-radius: 8px;
        margin-top: 32px;
        color: #ffffff;
        font-size: 32px;
        padding: 0;
      }
      &-lastdiv {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #555555;
        margin: 24px 0 32px;
        display: flex;
        justify-content: center;
        > span {
          display: inline-block;
          color: #4974f5;
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
}
.small {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
}
</style>
