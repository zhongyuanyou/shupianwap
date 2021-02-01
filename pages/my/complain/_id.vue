<template>
  <div class="detail">
    <Header title="进度详情">
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
    </Header>
    <div v-if="info" class="detail-content">
      <div class="detail-content-complain">
        <div class="detail-content-complain-title">
          {{ info.content }}
        </div>
        <div class="detail-content-complain-imgs">
          <sp-image
            v-for="(item, index) in imgs"
            :key="index"
            class="detail-content-complain-imgs-item"
            width="75"
            height="75"
            :src="item"
            @click="preview(imgs, index)"
          />
        </div>
        <div class="detail-content-complain-status">
          <div class="detail-content-complain-status-time">
            提交时间：{{ info.createTime }}
          </div>
          <div class="detail-content-complain-status-tag">
            {{ info.isDispose === 1 ? '已处理' : '未处理' }}
          </div>
        </div>
      </div>
      <div v-if="info.revertTime" class="detail-content-answer">
        <div class="detail-content-answer-title">解决方案</div>
        <div class="detail-content-answer-time">
          解决时间：{{ info.revertTime }}
        </div>
        <div class="detail-content-answer-content">
          {{ info.revertContent }}
        </div>
        <div class="detail-content-answer-imgs">
          <sp-image
            v-for="(item, index) in revertImgs"
            :key="index"
            class="detail-content-complain-imgs-item"
            width="75"
            height="75"
            :src="item"
            @click="preview(revertImgs, index)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Button,
  Toast,
  TopNavBar,
  Icon,
  Image,
  ImagePreview,
  Sticky,
} from '@chipspc/vant-dgg'
import { complain } from '~/api'
import Header from '@/components/common/head/header'
export default {
  name: 'ComplaintDetail',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview,
    [Sticky.name]: Sticky,
    Header,
  },
  data() {
    return {
      info: {
        content: '', // 反馈内容
        createTime: '', // 提交时间
        isDispose: '', // 反馈状态
        revertTime: '', // 解决时间
        revertContent: '', // 解决内容
      }, // 用户详情
      imgs: [], // 反馈图片集合
      revertImgs: [], // 反馈解决图片集合
    }
  },
  mounted() {
    this.getComplainDetail()
  },
  methods: {
    back() {
      this.$router.back()
    },
    // 预览大图
    preview(imgs, index) {
      ImagePreview({
        images: imgs,
        startPosition: index,
        closeable: true,
      })
    },
    async getComplainDetail() {
      // 获取吐槽详情
      const params = {
        id: this.$route.params.id,
      }
      const data = await complain.detail({ axios: this.$axios }, params)
      this.info = data
      this.imgs = data.imgs ? data.imgs.split(',') : []
      this.revertImgs = data.revertImgs ? data.revertImgs.split(',') : []
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .back_icon {
    margin-left: 40px;
  }
  &-content {
    width: 100%;
    padding: 36px 40px;
    &-complain {
      width: 100%;
      &-title {
        width: 100%;
        word-break: break-all;
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 48px;
      }
      &-imgs {
        &-item {
          margin-top: 20px;
          &:not(:last-child) {
            margin-right: 24px;
          }
        }
      }
      &-status {
        margin-top: 2px;
        display: flex;
        justify-content: space-between;
        padding-bottom: 40px;
        border-bottom: 1px solid #f4f4f4;
        &-time {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
          flex: 1;
        }
        &-tag {
          height: 36px;
          background: rgba(73, 116, 245, 0.15);
          border-radius: 4px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #4974f5;
          padding: 0px 16px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    &-answer {
      &-title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        margin-top: 35px;
      }
      &-time {
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #999999;
        margin-top: 16px;
        margin-bottom: 22px;
      }
      &-content {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
      }
    }
  }
}
</style>
