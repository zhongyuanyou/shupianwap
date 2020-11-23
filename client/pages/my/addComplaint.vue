<!--
 * @Author: Level
 * @Date: 2020-11-23 09:56:21
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-23 08:39:23
 * @Description: complaint
 * @FilePath: /chips-wap/client/pages/my/add-complaint.vue
-->
<template>
  <div class="complaint">
    <sp-top-nav-bar
      title="我要吐槽"
      right-text="反馈进度"
      ellipsis
      @on-click-right="complaintList"
      @on-click-left="back"
    >
      <template #left>
        <div>
          <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A"></my-icon>
        </div>
      </template>
    </sp-top-nav-bar>
    <div class="complaint-box">
      <div class="complaint-type">
        <p class="complaint-type-title">请选择反馈或建议的类型</p>
        <div class="complaint-type-content">
          <span
            v-for="(item, index) in types"
            :key="index"
            :class="
              item.type === type
                ? 'complaint-type-content-item complaint-type-content-item-active'
                : 'complaint-type-content-item'
            "
            @click="changeType(item.type)"
            >{{ item.name }}</span
          >
        </div>
      </div>
      <div class="complaint-content">
        <textarea
          v-model="desc"
          class="complaint-content-textarea"
          placeholder="请你填写反馈"
          maxlength="200"
        />
        <span class="complaint-content-label">{{ desc.length }}/200</span>
      </div>
      <div class="complaint-image">
        <div class="complaint-image-title">上传照片</div>
        <div class="complaint-image-upload">
          <sp-uploader v-model="uploader" />
        </div>
      </div>
      <sp-bottombar safe-area-inset-bottom>
        <sp-bottombar-button type="primary" text="提交" @click="submit" />
      </sp-bottombar>
    </div>
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  BottombarButton,
} from '@chipspc/vant-dgg'
export default {
  name: 'AddComplaint',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [Uploader.name]: Uploader,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
  },
  data() {
    return {
      type: 1, // 吐槽类型type
      types: [
        {
          name: '体验问题',
          type: 1,
        },
        {
          name: '需要新功能',
          type: 2,
        },
        {
          name: '功能异常',
          type: 3,
        },
        {
          name: '其他',
          type: 4,
        },
      ],
      desc: '',
      uploader: [],
    }
  },
  methods: {
    back() {
      Toast('返回')
    },
    complaintList() {
      Toast('反馈进度')
    },
    changeType(type) {
      this.type = type
    },
    submit() {
      console.log('提交')
    },
  },
}
</script>

<style lang="less" scoped>
.complaint {
  width: 100%;
  &-box {
    padding: 0px 40px 30px 40px;
  }
  &-type {
    padding-top: 40px;
    &-title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    &-content {
      margin-top: 30px;
      height: 64px;
      overflow-x: auto;
      &-item {
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
        float: left;
        & + & {
          margin-left: 24px;
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
      padding: 28px 10px;
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
      margin: 17px 0px 30px 0px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
}
</style>
