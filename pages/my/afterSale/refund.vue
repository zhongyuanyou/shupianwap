<template>
  <div class="refund">
    <Header title="退款" />
    <div class="select-row" @click="openPullPop">
      <div class="title">售后类型</div>
      <div class="select-val">
        <span class="c22">退款</span>
        <sp-icon
          class-prefix="spiconfont"
          size="0.25rem"
          color="#ccc"
          name="you"
        />
      </div>
    </div>
    <div class="select-row" @click="openPullPop">
      <div class="title">申请原因</div>
      <div class="select-val">
        <span class="c22">请选择申请原因</span>
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
        <div class="num">{{ descInfo.length }}/500</div>
      </div>
      <div class="up-pic">
        <sp-uploader
          v-model="uploader"
          :max-count="3"
          :max-size="20 * 1024 * 1024"
          :after-read="afterRead"
          :before-delete="beforeDelete"
          @oversize="onOversize"
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
      <button>提交</button>
    </div>
    <PullUp ref="pull" />
  </div>
</template>

<script>
import { Icon, Field, Uploader } from '@chipspc/vant-dgg'
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
      descInfo: '',
    }
  },
  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    openPullPop() {
      this.$refs.pull.showPullPop = true
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
        &.c22 {
          color: #222 !important;
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
