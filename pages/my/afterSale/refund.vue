<template>
  <div class="refund">
    <Header title="退款" />
    <div class="select-row">
      <div class="title">售后类型</div>
      <div class="select-val">
        <span class="c88">{{ afterTypeText || '请选择售后类型' }}</span>
        <!-- <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        /> -->
      </div>
    </div>
    <div class="select-row" @click="openPullPop(1)">
      <div class="title">申请原因</div>
      <div class="select-val">
        <span class="c88">{{ applyReasonText || '请选择申请原因' }}</span>
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
      </div>
    </div>
    <div class="desc-box">
      <div class="textarea">
        <sp-field
          v-model="descInfo"
          rows="5"
          autosize
          type="textarea"
          maxlength="500"
          placeholder="请描述您遇到的问题～"
        />
        <div class="num">
          <span>{{ descInfo.length }}</span
          >/500
        </div>
      </div>
      <div class="up-pic">
        <sp-uploader
          v-model="fileList"
          :max-count="9"
          :after-read="afterRead"
          :before-delete="deleteImg"
          multiple
        >
          <template>
            <div class="upload-add">
              <my-icon
                class="upload-add-img"
                name="upload_ic_img"
                size="0.56rem"
                color="#999"
              ></my-icon>
              <p class="upload-add-text">上传凭证</p>
              <p class="upload-add-text">(最多9张)</p>
            </div>
          </template>
        </sp-uploader>
      </div>
      <div class="tips">为了更好的为你解决问题，请您务必上传有效凭证</div>
    </div>
    <div class="doubt">
      有其他问题？<span @click="concatKefuBtn">联系客服</span>
    </div>
    <!-- <div class="doubt">
      温馨提示：售后单提交后，售后专员可能与您电话沟通，请保持手机畅通
    </div> -->
    <div class="submit">
      <p>
        <sp-checkbox v-model="checked"></sp-checkbox>我已阅读过并知晓<span
          class="blue"
          @click="afterSaleProtocol('protocol100039')"
          >《薯片平台用户售后协议》</span
        >
      </p>
      <button @click="submit">提交</button>
    </div>
    <PullUp
      ref="pull"
      :title="title"
      :list="pullDataList"
      :active-index="activeIndex"
      @selectItem="selectItem"
    />
    <!--S loding-->
    <LoadingCenter v-show="loading" />
    <!--E loding-->
  </div>
</template>

<script>
import { Icon, Field, Uploader, Checkbox } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
import PullUp from '@/components/afterSale/PullUp'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
import { uploadAndCallBack } from '@/utils/uploadFile'
import imHandle from '@/mixins/imHandle'
export default {
  components: {
    Header,
    PullUp,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Checkbox.name]: Checkbox,
    LoadingCenter,
  },
  mixins: [imHandle],
  data() {
    return {
      loading: false,
      fileList: [],
      descInfo: '',
      pullDataList: [],
      checked: false,
      afterSaleType: [
        { name: '我要退款', code: 'AFTER_SALE_TYPE_1' },
        // { name: '我要换业务', code: 'AFTER_SALE_CENTER_BUSINESS_CHANGE' },
      ],
      applyReason: [
        { name: '需求变更/无业务需求', code: 'AFTER_SALE_REASON_1' },
        { name: '证据不足/条件不符/资料不齐', code: 'AFTER_SALE_REASON_2' },
        { name: '公司注销', code: 'AFTER_SALE_REASON_3' },
        { name: '公司转让', code: 'AFTER_SALE_REASON_4' },
        { name: '股东/合伙人未达成共识', code: 'AFTER_SALE_REASON_5' },
        { name: '公司经营方向变更', code: 'AFTER_SALE_REASON_6' },
        { name: '下单错误', code: 'AFTER_SALE_REASON_7' },
        { name: '过度承诺/承诺不符', code: 'AFTER_SALE_REASON_8' },
        { name: '服务态度不好', code: 'AFTER_SALE_REASON_9' },
        { name: '跟进处理不及时', code: 'AFTER_SALE_REASON_10' },
        { name: '专业度欠佳', code: 'AFTER_SALE_REASON_11' },
        { name: '业务办理出错', code: 'AFTER_SALE_REASON_12' },
      ],
      afterTypeText: '我要退款',
      afterTypeCode: 'AFTER_SALE_TYPE_1',
      applyReasonText: '',
      applyReasonCode: '',
      activeTypeIndex: -1,
      activeReagonIndex: -1,
      title: '',
      currentIndex: '',
      activeIndex: null,
      pictrueDetail: [],
      // userInfo: '',
      fileId: '',
      singleImageUpload: [],
    }
  },
  computed: {
    userInfo() {
      return JSON.parse(localStorage.getItem('info'))
    },
  },
  mounted() {
    this.fileId = `${this.userInfo.id}:crisps-app:aftersale:${
      this.$route.query.orderId
    }:${String(Math.random()).substring(2, 8)}`
    this.userInfo = JSON.parse(localStorage.getItem('info'))
  },
  methods: {
    async submit() {
      if (this.afterTypeText === '') {
        this.$xToast.show({
          message: '请选择售后类型',
          duration: 1000,
        })
        return false
      } else if (this.applyReasonText === '') {
        this.$xToast.show({
          message: '请选择申请原因',
          duration: 1000,
        })
        return false
      } else if (this.descInfo === '') {
        this.$xToast.show({
          message: '请描述您遇到的问题～',
          duration: 1000,
        })
        return false
      } else if (!this.checked) {
        this.$xToast.show({
          message: '请您先阅读并勾选售后协议',
          duration: 1000,
        })
        return false
      }
      this.loading = true
      const res = await this.$axios.post(afterSaleApi.refundApply, {
        orderId: this.$route.query.orderId,
        afterSaleExpType: this.afterTypeCode,
        afterSaleReasonNo: this.applyReasonCode,
        afterSaleProblemDetail: this.descInfo,
        pictrueDetail: this.fileId,
        createrId: this.userInfo.id,
        createrName: this.userInfo.fullName,
        updaterId: this.userInfo.id,
        updaterName: this.userInfo.fullName,
        createrNo: this.userInfo.no,
        updaterNo: this.userInfo.no,
        afterSaleAgreementIds: 'protocol100039',
      })
      this.loading = false
      if (res.code === 200) {
        this.$xToast.show({
          message: '申请成功',
        })
        this.$router.push(`/my/afterSale/apply?id=${res.data.afterSaleId}`)
      } else {
        this.$xToast.error(res.data.error)
      }
    },
    async uploadImg(item) {
      const res = await uploadAndCallBack({
        file: item.file,
        sys_code: 'crisps-app',
        fileuid: this.fileId,
      })
      if (res.code === 200) {
        console.log('上传成功')
      }
    },
    afterRead(fileObj) {
      // 多张上传
      if (fileObj.length) {
        fileObj.forEach((item) => {
          this.uploadImg(item)
        })
      } else {
        // 单张上传
        this.uploadImg(fileObj)
      }

      // this.fileId = `${this.userInfo.id}:crisps-app:aftersale:${
      //   this.$route.query.orderId
      // }:${String(new Date().valueOf()).substring(7, 13)}`
      // const res = await uploadAndCallBack({
      //   file: fileObj.file,
      //   sys_code: 'crisps-app',
      //   fileuid: this.fileId,
      // })
      // if (res.code === 200) {
      //   // this.pictrueDetail += this.pictrueDetail
      //   console.log(this.fileList)
      //   console.log('上传成功')
      // }
    },
    deleteImg() {
      this.fileList.forEach((index) => {
        this.fileList.splice(index, 1)
      })
    },
    openPullPop(index) {
      this.pullDataList = []
      this.currentIndex = index
      if (index === 0) {
        this.title = '请选择售后类型'
        this.pullDataList = this.afterSaleType
        this.activeIndex = this.activeTypeIndex
      } else {
        this.title = '申请原因'
        this.pullDataList = this.applyReason
        this.activeIndex = this.activeReagonIndex
      }
      this.$refs.pull.showPullPop = true
    },
    selectItem(data) {
      if (this.currentIndex === 0) {
        this.afterTypeText = data.name
        this.afterTypeCode = data.code
        this.activeTypeIndex = data.index
      } else {
        this.applyReasonText = data.name
        this.activeReagonIndex = data.index
        this.applyReasonCode = data.code
      }
      this.$refs.pull.showPullPop = false
    },
    // 售后协议
    afterSaleProtocol(code) {
      this.$router.push({
        name: 'login-protocol',
        query: { categoryCode: code },
      })
    },
    // 在线客服
    concatKefuBtn() {
      this.jumpOnlineKefu()
    },
  },
}
</script>

<style lang="less" scoped>
.blue {
  color: #4974f5;
}
::v-deep .upload-add {
  text-align: center;
  width: 140px;
  height: 140px;
  background: #ffffff;
  border: 1px dashed #dddddd;
  border-radius: 8px;
}
::v-deep .upload-add-img {
  position: relative;
  top: -50px;
}
::v-deep .upload-add-text {
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  position: relative;
  top: -70px;
}
.refund {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
  padding-bottom: 120px;
  .select-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 112px;
    background: #fff;
    padding: 0 40px;
    border-bottom: 1px solid #f4f4f4;
    .title {
      font-size: 32px;
      color: #222222;
      font-family: PingFangSC-Regular;
      line-height: 44px;
    }
    .select-val {
      display: flex;
      align-items: center;
      span {
        font-family: PingFangSC-Regular;
        font-size: 32px;
        color: #999999;
        margin-right: 16px;
        &.c88 {
          color: #888 !important;
        }
      }
    }
  }
  .desc-box {
    padding: 40px;
    background: #fff;
    margin-top: 20px;
    .textarea {
      position: relative;
      border-radius: 12px;
      ::v-deep .sp-cell {
        background: #f8f8f8;
        border-radius: 12px;
      }
      .num {
        position: absolute;
        right: 32px;
        bottom: 14px;
        font-family: PingFangSC-Regular;
        font-size: 28px;
        line-height: 28px;
        color: #999999;
      }
    }
    .up-pic {
      // height: 140px;
      margin-top: 28px;
      // overflow: hidden;

      ::v-deep.sp-uploader__upload {
        width: 140px;
        height: 140px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        .sp-uploader__upload-icon {
          color: #cccccc;
          font-size: 56px;
        }
        .sp-uploader__upload-text {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
      ::v-deep.sp-uploader__preview-image {
        width: 140px;
        height: 140px;
        border-radius: 8px;
      }
      ::v-deep.sp-uploader__preview {
        margin: 0 27px 20px 0;
      }
      ::v-deep.sp-uploader__preview-delete-icon {
        font-size: 40px;
        font-weight: 500;
        top: -4px;
        right: -4px;
      }
      ::v-deep.sp-uploader__preview-delete {
        width: 32px;
        height: 32px;
        top: -12px;
        right: -12px;
        background: #000000;
        opacity: 0.6;
        border-radius: 32px;
      }
    }
    .tips {
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #ff3b30;
      margin-top: 20px;
    }
  }
  .doubt {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #999999;
    line-height: 32px;
    margin-top: 40px;
    text-align: center;
    span {
      color: #4974f5;
    }
  }
  .submit {
    padding: 0 40px;
    position: fixed;
    bottom: 32px;
    left: 0;
    width: 100%;
    background: #f4f4f4;
    padding-top: 20px;
    > p {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      line-height: 32px;
      margin-bottom: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      ::v-deep .sp-checkbox {
        margin-right: 10px;
      }
    }
    > button {
      font-size: 32px;
      color: #ffffff;
      text-align: center;
      width: 100%;
      display: block;
      height: 95px;
      background: #4974f5;
      border-radius: 8px;
      font-weight: bold;
    }
  }
}
</style>
