<template>
  <div class="sp-popup">
    <!-- <div v-show="!visible" class="inception" @click="showFullScreen">
      <img src="@/static/image/page/kefu.png" />
    </div> -->
    <div
      :class="{ fullscreen: visible, hideFullScreen: !visible }"
      @click="showInception"
    >
      <div
        :class="[
          'fullscreen-popup',
          { fadeIn: visible },
          { fadeOut: !visible },
        ]"
        @click.stop=""
      >
        <!--S 弹框banner-->
        <div class="popup-banner">
          <img src="@/static/image/page/bg.png" />
          <div class="popup-header">
            <slot name="head">
              <div class="popup-header__con">
                <div @click.stop="showInception">
                  <my-icon
                    name="notify_ic_close"
                    size="0.24rem"
                    color="#f4f4f4"
                  ></my-icon>
                </div>
              </div>
            </slot>
          </div>
          <div class="popup-banner__con">
            <img
              class="avatar"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-uni-app-doc/6acec660-4f31-11eb-a16f-5b3e54966275.jpg"
            />
            <div class="planner-info">
              <span>您好，我是{{ info.name }}</span>
            </div>
          </div>
        </div>
        <!--E 弹框banner-->
        <!--S 弹框content-->
        <div class="popup-content">
          <div class="popup-content__hint">
            <span>委托我为您提供以下服务</span>
          </div>
          <div class="popup-content__tags">
            <div class="item">
              <!--              <icon type="success" size="12" />-->
              <span class="txt">快速服务咨询</span>
            </div>
            <div class="item">
              <!--              <icon type="success" size="12" />-->
              <span class="txt">快速服务咨询</span>
            </div>
          </div>
          <div class="popup-content__tags">
            <div class="item">
              <!--              <icon type="success" size="12" />-->
              <span class="txt">快速服务咨询</span>
            </div>
            <div class="item">
              <!--              <icon type="success" size="12" />-->
              <span class="txt">快速服务咨询</span>
            </div>
          </div>
          <div class="popup-btn" @click="handleClickBtn()">
            <span>同意委托</span>
          </div>
          <div class="prompt">
            <span>我会与您电话联系，请保持手机畅通</span>
          </div>
        </div>
        <!--E 弹框content-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpPopup',
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          name: '规划师', // 规划师姓名
          tel: '13131313131', // 规划师电话号码
          id: '131311414', // 规划师id
        }
      },
    },
  },
  data() {
    return {
      visible: true, // 是否最大化显示 true为最大化显示 false为最小化显示
      plannerId: '',
      shareId: '',
      partnerId: '',
    }
  },
  created() {
    this.plannerId = this.$route.query.plannerId
    this.shareId = this.$route.query.shareId
    this.partnerId = this.$route.query.partnerId
  },
  methods: {
    showFullScreen() {
      // 显示全屏
      this.visible = true
    },
    showInception() {
      // 显示最小化
      this.visible = false
    },
    handleClickBtn() {
      console.log('plannerId', this.plannerId)
      console.log('shareId', this.shareId)
      console.log('partnerId', this.partnerId)
    },
  },
}
</script>

<style lang="less" scoped>
@keyframes animationFadeOut {
  from {
    width: 630px;
    height: 900px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -315px;
    margin-bottom: -450px;
    // transform: translate(50%, 50%);
  }

  to {
    width: 142px;
    height: 126px;
    position: fixed;
    right: 40px;
    bottom: 200px;
  }
}

@keyframes animationFadeIn {
  from {
    width: 142px;
    height: 126px;
    position: fixed;
    right: 40px;
    bottom: 200px;
  }

  to {
    width: 630px;
    height: 900px;
    position: fixed;
    right: 50%;
    bottom: 50%;
    margin-right: -315px;
    margin-bottom: -450px;
    // transform: translate(50%, 50%);
  }
}

.fadeOut {
  animation: animationFadeOut 0.3s ease 1 normal forwards;
}

.fadeIn {
  animation: animationFadeIn 0.3s ease 1 normal forwards;
}

.sp-popup {
  max-width: 100%;
  max-height: 100%;
  overflow: hidden;

  .inception {
    position: fixed;
    right: 40px;
    bottom: 200px;
    z-index: 9999;

    > img {
      width: 142px;
      height: 126px;
    }
  }

  .hideFullScreen {
    width: 0;
    height: 0;
  }

  .fullscreen {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 9999;

    &-popup {
      width: 630px;
      height: 900px;
      position: fixed;
      right: 50%;
      bottom: 50%;
      margin-right: -315px;
      margin-bottom: -450px;
      background-color: #ffffff;
      border-radius: 24px;

      .popup-banner {
        width: 100%;
        height: 395px;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        > img {
          width: 100%;
          height: 100%;
        }
        &__con {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          .avatar {
            width: 160px;
            height: 160px;
            border-radius: 80px;
          }
          .planner-info {
            font-size: 36px;
            font-family: PingFang SC;
            font-weight: bold;
            color: #ffffff;
            margin-top: 31px;
          }
        }
        .popup-header {
          position: absolute;
          left: 0;
          top: 0;
          right: 0;
          z-index: 5;
          &__con {
            height: 88px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            flex-direction: row;
            padding-right: 32px;
          }
        }
      }
      .popup-content {
        padding: 0 64px;
        &__hint {
          text-align: center;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #555555;
          margin-top: 40px;
        }
        &__tags {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-direction: row;
          margin-top: 48px;
          &:first-child {
            margin-top: 63px;
          }
          > .item {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: row;
            .txt {
              font-size: 28px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #222222;
              margin-left: 17px;
            }
          }
        }
        .popup-btn {
          width: 100%;
          height: 88px;
          background: #4974f5;
          border-radius: 8px;
          margin-top: 64px;
          text-align: center;
          line-height: 88px;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ffffff;
        }
        .prompt {
          width: 100%;
          text-align: center;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          margin-top: 24px;
        }
      }
    }
  }
}
</style>
