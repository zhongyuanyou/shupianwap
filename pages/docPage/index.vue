<template>
  <div class="doc_container" :class="showPop ? 'overfley' : ''">
    <div class="head">
      <my-icon
        name="houtui"
        size="0.40rem"
        color="#1A1A1A"
        class="head_icon_back"
        @click.native="goBack"
      />
      <my-icon
        name="guanbi"
        size="0.40rem"
        color="#1A1A1A"
        class="head_icon_goapp"
        @click.native="goAppHomePage"
      />
      <div class="head_title">互联网行业…书.doc</div>
    </div>
    <div class="download">
      <div class="download_left">
        <div class="close"></div>
        <div class="download_left_icon">
          <my-icon name="logo_mian" size="0.40rem" color="#ffffff" />
        </div>
        <div class="download_left_des">
          <div class="download_left_des_title">薯片找人APP</div>
          <div class="download_left_des_word">找人服务，尽在薯片找人</div>
        </div>
      </div>
      <div class="download_right" @click="openApp">立即打开</div>
    </div>
    <div class="content_panel">
      <iframe
        class="filename"
        :src="adress"
        width="100%"
        height="600"
        frameborder="1"
      ></iframe>
    </div>
    <div class="footer">
      <div class="footer_forward" @click="share">
        <my-icon
          name="fenxiang"
          size="0.40rem"
          color="#1A1A1A"
          class="footer_forward_fenxiang"
        />
        <div>转发</div>
      </div>
      <div class="footer_download" @click="download">下载至邮箱</div>
    </div>
    <!-- <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="confirm"
      @cancel="cancel"
    /> -->
    <div v-show="showPop" class="popup">
      <div class="popup_body">
        <div class="top_title">请输入邮箱</div>
        <div class="middle_content">我们将把文档信息发送至邮箱</div>
        <div class="input">
          <sp-field v-model="email" placeholder="请输入邮箱地址" />
        </div>
      </div>
      <div class="btns">
        <div class="cancel" @click="cancel">取消</div>
        <div class="confirm" @click="confirm">确定</div>
      </div>
    </div>
  </div>
</template>

<script>
import { CenterPopup, Field } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { documentApi } from '@/api'

export default {
  name: 'DocPage',
  components: {
    [CenterPopup.name]: CenterPopup,
    [Field.name]: Field,
  },
  data() {
    return {
      Field: {
        type: 'functional',
        title: '请输入邮箱',
        description: '我们将把文档信息发送至邮箱',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      },
      showPop: false,
      email: '',
      documentId: '123',
      adress:
        'https://view.officeapps.live.com/op/view.aspx?src=search-1-wk_es_paddle-income5&fixfr=J0XqYQkohDIS%2B6ElWfkiUg%3D%3D',
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      // this.documentId = this.$route.qurey.documentId
      this.documentId = '123'
      // const isLogin = await this.$isLogin
      // console.log('+++++++', isLogin)
      // if (isLogin) {
      //   this.$router.push({
      //     path: '/my',
      //   })
      // }
    },
    goBack() {
      // if (this.isInApp) {
      //   const iOSRouterStr = ``
      //   const androidRouterStr = ``
      //   this.$appFn.dggJumpRoute({
      //     iOSRouter: iOSRouterStr,
      //     androidRouter: androidRouterStr,
      //   })
      // }
      this.$router.push({
        path: '/',
      })
    },
    goAppHomePage() {
      // if (this.isInApp) {
      //   const iOSRouterStr = ``
      //   const androidRouterStr = ``
      //   this.$appFn.dggJumpRoute({
      //     iOSRouter: iOSRouterStr,
      //     androidRouter: androidRouterStr,
      //   })
      // }
      this.$router.push({
        path: '/',
      })
    },
    download() {
      console.log('download')
      this.showPop = true
    },
    async share() {
      console.log('share')
      const isLogin = await this.$isLogin
      if (isLogin) {
        const { code, message } = await this.$axios.post(documentApi.forward, {
          documentId: this.documentId,
        })
        if (code === 200) {
          this.$xToast.show({
            message: '转发成功',
            duration: 1000,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        } else {
          console.log(message)
        }
      }
    },
    async confirm() {
      this.showPop = false
      const isLogin = await this.$isLogin
      if (isLogin) {
        const { code, message } = await this.$axios.post(documentApi.download, {
          documentId: this.documentId,
          email: this.email,
        })
        if (code === 200) {
          this.$xToast.show({
            message: '下载成功',
            duration: 1000,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        } else {
          console.log(message)
        }
      }
    },
    cancel() {
      this.showPop = false
    },
    openApp() {
      // 跳转到下载app页面
      console.log('open')
    },
  },
}
</script>

<style lang="less">
@font-medium: pingfangsc-medium;
@font-regular: pingfangsc-regular;

.mixin-flex {
  display: flex;
  align-items: center;
}

.overfley {
  background: rgba(0, 0, 0, 0.4) !important;
}
.sp-cell {
  padding: 0 24px;
  width: 456px;
}
.doc_container {
  position: relative;
  height: 100%;
  background-color: #fff;
  // background: rgba(0, 0, 0, 0.4);
  .head {
    height: 88px;
    .mixin-flex();
    padding: 32px;
    &_icon_back {
      margin-right: 36px;
    }
    &_icon_goapp {
      margin-right: 71px;
    }
    &_title {
      font: bold 36px/36px @font-medium;
      color: #1a1a1a;
    }
  }
  .download {
    .mixin-flex();
    padding: 14px 40px;
    background: rgba(0, 0, 0, 0.6);
    height: 100px;
    justify-content: space-between;
    &_left {
      .mixin-flex();
      &_icon {
        width: 60px;
        height: 60px;
        background: #4974f5;
        border-radius: 8px;
        justify-content: center;
        .mixin-flex();
        margin-right: 16px;
      }
      &_des {
        &_title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #ffffff;
          font: bold 30px/42px @font-medium;
        }
        &_word {
          font: 400 22px/30px @font-regular;
          color: #999999;
        }
      }
    }
    &_right {
      width: 152px;
      height: 56px;
      background: #4974f5;
      border-radius: 8px;
      font: bold 26px/56px @font-medium;
      color: #ffffff;
      text-align: center;
    }
  }
  .footer {
    .mixin-flex();
    justify-content: space-between;
    height: 96px;
    position: absolute;
    bottom: 0;
    width: 100%;
    &_forward {
      font: bold 24px/24px @font-medium;
      color: #1a1a1a;
      .mixin-flex();
      &_fenxiang {
        margin-left: 52px;
        margin-right: 10px;
      }
    }
    &_download {
      padding: 32px 80px;
      background: #4974f5;
      font: bold 24px/24px @font-medium;
      color: #ffffff;
    }
  }

  .popup {
    width: 540px;
    height: 390px;
    background: #fff;
    border-radius: 24px;
    margin: 344px auto;
    position: relative;
    .popup_body {
      padding: 42px 40px 0 40px;
      .top_title {
        // width: 460px;
        height: 48px;
        color: #1a1a1a;
        font: bold 36px/48px @font-medium;
        text-align: center;
      }
      .middle_content {
        height: 40px;
        font: 400 28px/40px @font-regular;
        text-align: center;
        margin-top: 20px;
      }
      .input {
        width: 100%;
        height: 72px;
        background: #ffffff;
        border-radius: 8px;
        border: 1px solid #dddddd;
        margin-top: 24px;
        .mixin-flex();
      }
    }

    .btns {
      .mixin-flex();
      height: 96px;
      position: absolute;
      bottom: 0;
      border-top: 1px solid #f0f0f0;
      width: 100%;
      .cancel {
        color: #222222;
        font: 400 32px/96px @font-regular;
        width: 270px;
        text-align: center;
        height: 100%;
      }
      .confirm {
        color: #4974f5;
        font: bold 32px/96px @font-medium;
        width: 270px;
        text-align: center;
        border-left: 1px solid #f0f0f0;
        height: 100%;
      }
    }
  }
}
</style>
