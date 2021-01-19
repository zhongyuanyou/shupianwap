<!--
 * @Author: Level
 * @Date: 2020-11-23 09:56:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 15:47:04
 * @Description: complaint
 * @FilePath: /chips-wap/client/pages/my/add-complaint.vue
-->
<template>
  <div class="complaint">
    <Header title="我要吐槽">
      <template #left>
        <div @click="back">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
      <template #right>
        <p class="process" @click="complaintList">反馈进度</p>
      </template>
    </Header>
    <div class="complaint-box">
      <div class="complaint-type">
        <p class="complaint-type-title">请选择反馈或建议的类型</p>
        <div class="complaint-type-content">
          <span
            v-for="(item, index) in complainCategory"
            :key="index"
            :class="
              formData.feedbackTypeId === item.id
                ? 'complaint-type-content-item complaint-type-content-item-active'
                : 'complaint-type-content-item'
            "
            @click="changeType(item.id)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <div class="complaint-content">
        <textarea
          v-model="formData.content"
          class="complaint-content-textarea"
          placeholder="请描述您的问题，有助于快速处理您的反馈额~(最少10个字符)"
          maxlength="200"
          @input="changeText"
          @blur="textBlur"
        />
        <span class="complaint-content-label"
          >{{ formData.content.length }}/200</span
        >
      </div>
      <div class="complaint-image">
        <div class="complaint-image-title">上传照片</div>
        <div class="complaint-image-upload">
          <sp-uploader
            v-model="uploader"
            :max-count="3"
            :max-size="20 * 1024 * 1024"
            :after-read="afterRead"
            :before-delete="beforeDelete"
            @oversize="onOversize"
          >
            <template>
              <div class="complaint-image-upload-add">
                <my-icon
                  class="complaint-image-upload-add-img"
                  name="upload_ic_img"
                  size="0.56rem"
                  color="#CCCCCC"
                ></my-icon>
                <p class="complaint-image-upload-add-text">点击上传</p>
              </div>
            </template>
          </sp-uploader>
        </div>
      </div>
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button type="primary" text="提交" @click="submit" />
      </sp-bottombar>
    </div>
    <sp-toast ref="spToast"></sp-toast>
    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  Sticky,
  BottombarButton,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import { complain, commonApi, ossApi } from '~/api'
import SpToast from '@/components/common/spToast/SpToast'
import Header from '@/components/common/head/header'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'AddComplaint',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [Uploader.name]: Uploader,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Sticky.name]: Sticky,
    SpToast,
    Header,
    LoadingCenter,
  },
  data() {
    return {
      selectTypes: [], // 吐槽类型type
      multipleChoice: false, // 是否可多选
      complainCategory: [], // 吐槽分类集合
      desc: '',
      uploader: [],
      formData: {
        content: '', // 内容
        feedbackTypeId: '', // 吐槽类型
        userId: this.userId || '', // 用户id
        terminalCode: '', // 终端编码
        terminalName: '', // 终端名称
        platformCode: '', // 平台编码
        platformName: '', // 平台名称
      },
      loading: false, // 加载效果状态
      images: [], // 图片集合
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      isInApp: (state) => state.app.isInApp,
      appInfo: (state) => state.app.appInfo, // app信息
      appPlatform: (state) => state.app.appPlatform,
      userInfo: (state) => state.user.userInfo, // 用户信息
    }),
  },
  created() {
    if (process.client) {
      this.loading = true
    }
  },
  mounted() {
    if (this.isInApp) {
      // 设置app导航名称
      this.$appFn.dggSetTitle(
        {
          title: '我要吐槽',
        },
        (res) => {}
      )
      // 调用安卓权限
      this.$appFn.dggPermission((res) => {
        console.log('ress', res)
      })
    }
    // 设置终端和平台
    this.formData.terminalCode = this.isInApp
      ? 'COMDIC_TERMINAL_APP'
      : 'COMDIC_TERMINAL_WAP'
    this.formData.terminalName = this.isInApp ? 'APP' : 'WAP'
    this.formData.platformCode = this.isInApp
      ? this.appInfo.platformCode
      : 'COMDIC_PLATFORM_CRISPS'
    this.formData.platformName = this.isInApp
      ? this.appInfo.platformCode === 'COMDIC_PLATFORM_QIDABAO'
        ? '企大宝'
        : this.appInfo.platformCode === 'COMDIC_PLATFORM_CRISPS'
        ? '薯片'
        : '企大顺'
      : '薯片'
    if (this.isInApp) {
      this.$appFn.dggDeviceInfo((res) => {
        if (res.code === 200) {
          this.formData.equipment = res.data['X-Device-Type']
        } else {
          this.formData.equipment = '未获取到设备信息'
        }
      })
    } else {
      this.formData.equipment = '浏览器'
    }
    this.getComplainCategory()
  },
  methods: {
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack((res) => {})
        return
      }
      this.$router.back()
    },
    complaintList() {
      this.$router.push('/my/complain/list')
    },
    changeType(type) {
      this.formData.feedbackTypeId = type
    },
    // 提交
    async submit() {
      this.formData.userId = this.userId
      if (this.formData.content.length < 10) {
        this.$refs.spToast.show({
          message: '描述问题为必填，长度为10-200个字',
          duration: 1500,
          forbidClick: true,
        })
      } else if (this.formData.feedbackTypeId === '') {
        this.$refs.spToast.show({
          message: '请选择反馈或建议的类型',
          duration: 1500,
          forbidClick: true,
        })
      } else {
        this.loading = true
        try {
          if (this.images.length) {
            this.formData.imgs = this.images.toString()
          }
          const params = {
            ...this.formData,
          }
          await complain.add({ axios: this.$axios }, params)
          this.loading = false
          this.formData = {
            content: '', // 内容
            feedbackTypeId: '', // 吐槽类型
            userId: this.userId, // 用户id
            terminalCode: '', // 终端编码
            terminalName: '', // 终端名称
            platformCode: '', // 平台编码
            platformName: '', // 平台名称
            images: [],
          }
          this.uploader = []
          this.$refs.spToast.show({
            message: '提交成功，感谢您的反馈',
            duration: 1500,
            forbidClick: true,
            icon: 'spiconfont-tab_ic_check',
          })
        } catch (err) {
          this.loading = false
          this.$refs.spToast.show({
            message: err.message || '添加失败',
            duration: 1500,
            forbidClick: true,
          })
        }
      }
    },
    // 限制图片大小
    onOversize(file) {
      Toast('文件大小不能超过20M')
    },
    afterRead(file) {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const imgs = this.images
      const formData = new FormData()
      formData.append('uploadatalog', 'sp-pt/wap/images')
      formData.append('file', file.file)
      console.log('file', file)
      this.loading = true
      try {
        this.$axios.post(ossApi.add, formData, config).then((res) => {
          this.loading = false
          if (res.code === 200) {
            imgs.push(res.data.url)
            this.images = imgs
          }
        })
      } catch (err) {
        this.loading = false
      }
    },
    async getComplainCategory() {
      // 获取吐槽分类
      try {
        const params = {
          code: 'fed100026',
        }
        const res = await this.$axios.get(commonApi.detail, { params })
        this.loading = false
        if (res.code === 200) {
          this.complainCategory = res.data.childrenList || []
        }
      } catch (err) {
        this.loading = false
      }
    },
    changeText() {
      this.formData.content = this.formData.content.substring(0, 200)
    },
    textBlur() {
      // 输入框失焦
      window.scroll(0, 0)
    },
    handleImage() {
      // 上传图片
      const isAndroid = this.appPlatform.indexOf('iphone')
      if (isAndroid < 0) {
        const imgs = this.images
        this.$appFn.dggPhoneAlbum({ fileId: this.userInfo.fileId }, (res) => {
          imgs.push(res.data.filePath)
          this.images = imgs
          const obj = {
            file: {},
            message: '',
            content: res.data.filePath,
          }
          this.uploader.push(obj)
        })
      }
    },
    beforeDelete(file, detail) {
      // 删除图片
      this.images.splice(detail.index, 1)
      this.uploader.splice(detail.index, 1)
    },
  },
}
</script>

<style lang="less" scoped>
.complaint {
  height: 100%;
  background-color: #fff;
  overflow-y: scroll;
  padding-bottom: 140px;
  .back_icon {
    margin-left: 40px;
  }
  .process {
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    margin-right: 40px;
  }
  /deep/ .sp-bottombar-button {
    font-size: 32px;
    font-weight: bold;
  }
  &-box {
    padding: 0px 40px 30px 40px;
  }
  &-type {
    padding-top: 36px;
    &-title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    &-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      &-item {
        margin-top: 26px;
        line-height: 30px;
        display: block;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        padding: 20px;
        &:not(:last-child) {
          margin-right: 24px;
        }
        &-active {
          background: rgba(73, 116, 245, 0.1);
          border: 1px solid #4974f5;
          color: #4974f5;
        }
      }
    }
  }
  &-content {
    margin-top: 32px;
    position: relative;
    &-textarea {
      height: 380px;
      width: 100%;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      border-radius: 8px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #1a1a1a;
      line-height: 42px;
      padding: 28px 25px;
      vertical-align: baseline;
      caret-color: #1a1a1a;
      resize: none;
      &::-webkit-input-placeholder {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #cccccc;
        line-height: 42px;
      }
    }
    &-label {
      position: absolute;
      right: 25px;
      bottom: 28px;
      font-size: 28px;
      transform: translateY(-50%);
      font-family: PingFang SC;
      font-weight: 400;
      color: #cccccc;
      display: inline-block;
      background-color: #ffffff;
    }
  }
  &-image {
    &-title {
      margin: 6px 0px 26px 0px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    &-upload {
      &-add {
        text-align: center;
        width: 140px;
        height: 140px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        &-img {
          position: relative;
          top: -18px;
        }
        &-text {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          position: relative;
          top: -30px;
        }
      }
      /deep/.sp-uploader__upload {
        width: 140px;
        height: 140px;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        &-icon {
          color: #cccccc;
          font-size: 56px;
        }
        &-text {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
      /deep/.sp-uploader__preview-image {
        width: 140px;
        height: 140px;
        border-radius: 8px;
      }
      /deep/.sp-uploader__preview {
        margin: 0 32px 20px 0;
      }
      /deep/.sp-uploader__preview-delete-icon {
        font-size: 40px;
        font-weight: 500;
        top: -4px;
        right: -4px;
      }
      /deep/.sp-uploader__preview-delete {
        width: 32px;
        height: 32px;
        top: -12px;
        right: -12px;
        background: #000000;
        opacity: 0.6;
        border-radius: 32px;
      }
    }
  }
  /deep/.sp-bottombar {
    height: 96px;
    padding: 32px 40px;
    &-button {
      height: 96px;
      font-family: PingFang SC;
    }
  }
}
</style>
