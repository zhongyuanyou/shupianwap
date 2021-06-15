<template>
  <div class="refund">
    <Header title="退款" />
    <div class="select-row" @click="openPullPop(0)">
      <div class="title">售后类型</div>
      <div class="select-val">
        <span class="c88">{{ afterTypeText || '请选择售后类型' }}</span>
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
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
          v-model="uploader"
          :max-count="3"
          :max-size="20 * 1024 * 1024"
          :after-read="afterRead"
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
              <p class="upload-add-text">(9张照片)</p>
            </div>
          </template>
        </sp-uploader>
      </div>
      <div class="tips">为了更好的为你解决问题，请您务必上传有效凭证</div>
    </div>
    <div class="doubt">有其他问题？<span>联系客服</span></div>
    <div class="submit">
      <p>售后单提交后，售后专员可能与您电话沟通，请保持手机畅通</p>
      <button @click="submit">提交</button>
    </div>
    <PullUp
      ref="pull"
      :title="title"
      :list="pullDataList"
      :active-index="activeIndex"
      @selectItem="selectItem"
    />
  </div>
</template>

<script>
import { Icon, Field, Uploader } from '@chipspc/vant-dgg'
import { afterSaleApi } from '@/api'
import Header from '@/components/common/head/header'
import PullUp from '@/components/afterSale/PullUp'
export default {
  components: {
    Header,
    PullUp,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
  },
  data() {
    return {
      uploader: [],
      descInfo: '',
      pullDataList: [],
      afterSaleType: [{ name: '我要退款' }, { name: '我要换业务' }],
      applyReason: [{ name: '办理超期退款' }, { name: '业务办错了，需要更换' }],
      afterTypeText: '',
      applyReasonText: '',
      activeTypeIndex: -1,
      activeReagonIndex: -1,
      title: '',
      currentIndex: '',
      activeIndex: null,
    }
  },
  created() {},
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
      }
      const res = await this.$axios.post(afterSaleApi.refundApply, {
        orderId: '11111',
        afterSaleExpType: 'AFTER_SALE_CENTER_REFUND',
        afterSaleReasonNo: 'AFTER_SALE_REASON_1',
        afterSaleProblemDetail: this.descInfo,
        pictrueDetail: this.uploader,
        createrId: this.createrId,
        createrName: this.createrName,
        updaterId: this.updaterId,
        updaterName: this.updaterName,
        createrNo: this.createrNo,
        updaterNo: this.updaterNo,
      })
      if (res.code === 200) {
        this.$xToast.show({
          message: '申请成功',
        })
        this.$router.push('/my/afterSale/apply')
      } else {
        this.$message.error(res.message)
      }
    },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
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
        this.activeTypeIndex = data.index
      } else {
        this.applyReasonText = data.name
        this.activeReagonIndex = data.index
      }

      this.$refs.pull.showPullPop = false
    },
  },
}
</script>

<style lang="less" scoped>
.refund {
  min-height: 100vh;
  background: #f4f4f4;
  font-family: PingFangSC-Regular;
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
      width: 140px;
      height: 140px;
      margin-top: 28px;
      overflow: hidden;
      .upload-add {
        text-align: center;
        width: 140px;
        height: 140px;
        background: #ffffff;
        border: 1px dashed #dddddd;
        border-radius: 8px;
      }
      .upload-add-img {
        position: relative;
        top: -50px;
      }
      .upload-add-text {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        position: relative;
        top: -70px;
      }
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
        margin: 0 32px 20px 0;
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
    > p {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      line-height: 32px;
      margin-bottom: 20px;
      text-align: center;
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
