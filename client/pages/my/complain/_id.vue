<template>
  <div class="detail">
    <sp-sticky>
      <sp-top-nav-bar ellipsis title="进度详情">
        <template #left>
          <sp-icon name="arrow-left" size="20" @click="back" />
        </template>
      </sp-top-nav-bar>
    </sp-sticky>
    <div v-if="info" class="detail-content">
      <div class="detail-content-complain">
        <div class="detail-content-complain-title">
          {{ info.content }}
        </div>
        <div class="detail-content-complain-imgs">
          <sp-image
            v-for="(item, index) in detailData.complain.imgs"
            :key="index"
            class="detail-content-complain-imgs-item"
            width="75"
            height="75"
            :src="item"
            @click="preview(detailData.complain.imgs, index)"
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
      <div v-if="detailData.answer" class="detail-content-answer">
        <div class="detail-content-answer-title">解决方案</div>
        <div class="detail-content-answer-time">
          解决时间：{{ info.revertTime || '' }}
        </div>
        <div class="detail-content-answer-content">
          {{ info.revertContent || '' }}
        </div>
        <div class="detail-content-answer-imgs">
          <sp-image
            v-for="(item, index) in detailData.answer.imgs"
            :key="index"
            class="detail-content-complain-imgs-item"
            width="75"
            height="75"
            :src="item"
            @click="preview(detailData.answer.imgs, index)"
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
export default {
  name: 'ComplaintDetail',
  components: {
    [Button.name]: Button,
    [TopNavBar.name]: TopNavBar,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      detailData: {
        complain: {
          title: '设置免打扰怎么还给我打电话？你们这到底是什么情况，烦死了',
          createdTime: '2020.10.14 10:00',
          status: '处理中',
          imgs: [
            'https://img.yzcdn.cn/vant/apple-1.jpg',
            'https://img.yzcdn.cn/vant/apple-2.jpg',
            'https://img.yzcdn.cn/vant/apple-3.jpg',
          ],
        },
        answer: {
          resolveTime: '2020.10.14 10:00',
          content:
            '这里显示解决方案内容这里显示解决方案内容这里显示解决方案内容',
          imgs: ['https://img.yzcdn.cn/vant/cat.jpeg'],
        },
      },
      info: {}, // 用户详情
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
      console.log('data', data)
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  width: 100%;
  height: 100%;
  background-color: #fff;
  &-content {
    padding: 36px 40px;
    &-complain {
      &-title {
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
          line-height: 36px;
          padding: 0px 16px;
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
