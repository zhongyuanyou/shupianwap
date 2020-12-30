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
        terminalCode: 'adadasdasd', // 终端编码
        terminalName: 'dadasd', // 终端名称
        platformCode: 'adasdad', // 平台编码
        platformName: 'asdasdas', // 平台名称
      },
      loading: false, // 加载效果状态
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      isInApp: (state) => state.app.isInApp,
    }),
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
    }
    this.formData.userId = this.userId
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
      // if (this.formData.content.length < 10) {
      //   this.$refs.spToast.show({
      //     message: '描述问题为必填，长度为10-200个字',
      //     duration: 1500,
      //     forbidClick: true,
      //   })
      // } else if (this.formData.feedbackTypeId === '') {
      //   this.$refs.spToast.show({
      //     message: '请选择反馈或建议的类型',
      //     duration: 1500,
      //     forbidClick: true,
      //   })
      // } else {
      //   try {
      //     const params = {
      //       ...this.formData,
      //     }
      //     const data = await complain.add({ axios: this.$axios }, params)
      //     this.formData = {
      //       content: '', // 内容
      //       feedbackTypeId: '', // 吐槽类型
      //       userId: this.userId, // 用户id
      //       terminalCode: 'adadasdasd', // 终端编码
      //       terminalName: 'dadasd', // 终端名称
      //       platformCode: 'adasdad', // 平台编码
      //       platformName: 'asdasdas', // 平台名称
      //     }
      //     this.$refs.spToast.show({
      //       message: '提交成功，感谢您的反馈',
      //       duration: 1500,
      //       forbidClick: true,
      //       icon: 'spiconfont-tab_ic_check',
      //     })
      //   } catch (err) {}
      // }
      console.log('up', this.uploader)
      const formData = new FormData()
      formData.append('file', this.uploader[0].file)
      formData.append('uploadatalog', 'sp-pt/wap/images')
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const res = await this.$axios.post(ossApi.add, formData, config)
      console.log('res', res)
    },
    // 限制图片大小
    onOversize(file) {
      Toast('文件大小不能超过20M')
    },
    afterRead(file) {
      console.log('file', file)
    },
    async getComplainCategory() {
      this.loading = true
      // 获取吐槽分类
      try {
        const params = {
          code: 'fed100026',
        }
        const res = await this.$axios.get(commonApi.detail, { params })
        this.loading = false
        if (res.code === 200) {
          this.complainCategory = res.data.childrenList
        }
      } catch (err) {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.complaint {
  width: 100%;
  padding-bottom: 160px;
  /deep/.sp-top-nav-bar__right {
    font-size: 28px;
  }
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
        height: 64px;
        line-height: 64px;
        display: block;
        background: #ffffff;
        border: 1px solid #cdcdcd;
        border-radius: 8px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        padding: 0px 20px;
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
