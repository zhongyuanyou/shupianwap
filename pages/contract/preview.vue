<template>
  <div class="preview">
    <Head :title="contract.type == 'qs' ? '合同预览' : '预览合同'"></Head>
    <div class="data">
      <div class="box">
        <Pdf v-if="pdf" :src="pdf" />
        <p v-else>合同预览失败</p>
      </div>
      <div v-if="contract.type == 'qs'" class="btn">
        <Button plain type="primary" size="large">我再想想</Button>
        <Button type="primary" size="large" @click="sign()">确认签署</Button>
        <sp-dialog v-model="timeshow" :show-confirm-button="false">
          <div class="dialog">
            <div class="head">温馨提示</div>
            <div class="body">
              一般用作重要通知或帮助提示，具体 形态可由UI根据实际需求进行设计。
            </div>
            <div
              class="btn"
              :class="btnshow ? 'act' : ''"
              @click="timeshowFn()"
            >
              我已知悉{{ time > 0 ? time + 's' : '' }}
            </div>
          </div>
        </sp-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import Pdf from 'vue-pdf'
import { Button, Dialog } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import contractApi from '@/api/contract'
export default {
  name: 'Preview',
  components: {
    Head,
    Button,
    [Dialog.Component.name]: Dialog.Component,
    Pdf,
  },
  data() {
    return {
      contract: this.$route.query,
      pdf: '',
      timeshow: false,
      time: 5,
      btnshow: false,
    }
  },
  mounted() {
    this.pdf = this.contract.contractUrl
  },
  methods: {
    sign() {
      if (this.$cookies.get('realStatus') === 'AUTHENTICATION_SUCCESS') {
        contractApi
          .signcontart(
            { axios: this.axios },
            {
              contractId: this.contract.contractId,
              phone: this.contract.contactWay,
              signerName: this.contract.signerName,
              contactWay: this.contract.contactWay,
              businessId: this.$cookies.get('userId'),
            }
          )
          .then((res) => {
            if (res) {
              console.log(res)
            }
          })
          .catch((err) => {
            this.$xToast.show(err.message)
            console.log('错误信息err', err)
          })
      } else {
        this.$router.push({
          path: '/contract/authentication',
          query: {
            contractId: this.contract.contractId,
            contractNo: this.contract.contractNo,
            signerName: this.contract.userName,
            contactWay: this.contract.phone,
          },
        })
      }
    },
    timeshowFn() {
      if (this.btnshow) {
        this.timeshow = false
      }
    },
    btntime() {
      setTimeout(() => {
        this.btnshow = true
      }, this.time * 1000)
      const date = setInterval(() => {
        this.time = this.time - 1
        if (this.time === 0) {
          clearInterval(date)
        }
      }, 1000)
    },
    dialogShow() {
      Dialog.confirm({
        title: '温馨提示',
        message: '检测到您未实名认证，请在签合同前 先进行实名认证',
        confirmButtonText: '现在就认证',
        cancelButtonText: '我再想想',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
  },
}
</script>

<style lang="less" scoped>
.preview {
  background: #fff;
  height: 100vh;
  > .data {
    height: calc(100% - 88px);
    box-sizing: border-box;
    padding: 40px 40px 0 40px;
    > .box {
      width: 100%;
      height: calc(100% - 160px);
      overflow-y: auto;
      p {
        height: 100%;
        background: #e5e5e5;
        padding-top: 60%;
        text-align: center;
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
        box-sizing: border-box;
      }
    }
    > .btn {
      display: flex;
      justify-content: space-between;
      height: 160px;
      align-items: center;
      /deep/.sp-button {
        width: 48%;
        border-radius: 8px;
      }
    }
  }
  .dialog {
    padding: 48px 0 0 0;
    > .head {
      padding: 0 40px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      text-align: center;
    }
    > .body {
      padding: 0 40px;
      margin-top: 32px;
      font-size: 28px;
      font-weight: 400;
      color: #222222;
      line-height: 38px;
    }
    > .btn {
      border-top: 1px solid #f4f4f4;
      margin-top: 48px;
      height: 96px;
      text-align: center;
      font-size: 32px;
      font-weight: 400;
      color: #999999;
      line-height: 96px;
    }
    > .act {
      color: #4974f5;
    }
  }
}
</style>
