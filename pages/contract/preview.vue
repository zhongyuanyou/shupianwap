<template>
  <div class="preview">
    <Head :title="contract.type == 'qs' ? '签署合同' : '预览合同'">
      <template #left>
        <my-icon
          class="back-icon"
          name="nav_ic_back"
          size="0.4rem"
          color="#1A1A1A"
          @click.native="onLeftClick"
        ></my-icon>
      </template>
    </Head>
    <sp-skeleton
      v-for="_index in 10"
      :key="_index"
      title
      :row="3"
      style="margin-top: 10px"
      :loading="skeletonLoading"
    >
    </sp-skeleton>
    <LoadingCenter v-show="loading" />
    <div v-show="!skeletonLoading" class="data">
      <div class="box">
        <Pdf
          v-for="i in numPages"
          :key="i"
          :src="src"
          :page="i"
          class="pdf-set"
        />
        <!-- <p>合同预览失败</p> -->
      </div>
      <div v-if="contract.type == 'qs'" class="btn">
        <Button plain type="primary" size="large" @click="onLeftClick"
          >我再想想</Button
        >
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
import CMapReaderFactory from 'vue-pdf/src/CMapReaderFactory.js'
import { Button, Dialog, Toast, Skeleton } from '@chipspc/vant-dgg'
import Head from '@/components/common/head/header'
import contractApi from '@/api/contract'
import orderApi from '@/api/order'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'Preview',
  components: {
    Head,
    Button,
    [Dialog.Component.name]: Dialog.Component,
    Pdf,
    LoadingCenter,
    [Skeleton.name]: Skeleton,
  },
  data() {
    return {
      contract: this.$route.query,
      src: '',
      timeshow: false,
      time: 5,
      btnshow: false,
      timeer: '',
      loading: false,
      skeletonLoading: false,
      numPages: 1,
    }
  },
  created() {
    if (
      this.contract.fromPage === 'orderList' ||
      this.contract.fromPage === 'orderDetail'
    ) {
      this.skeletonLoading = true
      this.getorder()
    } else {
      this.src = this.contract.contractUrl
      this.pdfTask(this.src)
    }
  },
  mounted() {},
  methods: {
    pdfTask() {
      // 传参 CMapReaderFactory
      Pdf.createLoadingTask(this.src).promise.then((pdf) => {
        this.numPages = pdf.numPages
      })
    },
    getorder() {
      orderApi
        .getDetailByOrderId(
          { axios: this.axios },
          { id: this.contract.orderId, cusOrderId: this.contract.cusOrderId }
        )
        .then((res) => {
          this.contract.contractId = res.contractVo2s[0].contractId
          this.contract.contactWay = res.contractVo2s[0].contractFirstPhone
          this.contract.signerName = res.contractVo2s[0].contractFirstName
          this.src = res.contractVo2s[0].contractUrl
          this.pdfTask(this.src)
          this.skeletonLoading = false
        })
        .catch((err) => {
          this.skeletonLoading = false
          this.$xToast.error(err.message || '查询失败，请稍后重试')
          const that = this
          setTimeout(function () {
            that.$router.back(-1)
          }, 2000)
        })
    },
    onLeftClick() {
      if (this.contract.go && this.contract.go === '-2') {
        this.$router.push({
          path: '/contract/contractList',
        })
      } else {
        this.$router.back(-1)
      }
    },
    sign() {
      this.loading = true
      if (
        this.$cookies.get('realStatus', { path: '/' }) ===
          'AUTHENTICATION_SUCCESS' ||
        this.$cookies.get('realStatus', { path: '/' }) === 'AUTHENTICATION_ING'
      ) {
        contractApi
          .signcontart(
            { axios: this.axios },
            {
              contractId: this.contract.contractId,
              phone: this.contract.contactWay,
              signerName: this.contract.signerName,
              contactWay: this.contract.contactWay,
              businessId: this.$store.state.user.userId,
            }
          )
          .then((res) => {
            if (res) {
              this.loading = false
              this.$router.replace({
                path: '/contract/iframe',
                query: {
                  src: res,
                  type: 'qs',
                },
              })
            }
          })
          .catch((err) => {
            this.loading = false
            const msg = err.data.error
            Toast({
              message: msg,
              overlay: true,
              iconPrefix: 'sp-iconfont',
              icon: 'popup_ic_fail',
            })
            console.log('错误信息err', err)
          })
      } else {
        this.loading = false
        Dialog.confirm({
          title: '温馨提示',
          message: '检测到您未实名认证，请在签合同前 先进行实名认证',
          confirmButtonText: '现在就认证',
          cancelButtonText: '我再想想',
        })
          .then(() => {
            this.$router.push({
              path: '/contract/authentication',
              query: {
                contractId: this.contract.contractId,
                contractNo: this.contract.contractNo,
                signerName: this.contract.userName,
                contactWay: this.contract.phone,
              },
            })
          })
          .catch(() => {})
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
    dialogShow() {},
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
        line-height: 300px;
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
      ::v-deep.sp-button {
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
