<template>
  <div class="m-known-share vlike">
    <div v-if="mVlist.length > 0" class="like">猜你喜欢</div>
    <div v-if="mVlist.length > 0" class="video-list">
      <div
        v-for="(item, index) in mVlist"
        :key="index"
        class="item"
        @click="openApp"
      >
        <div class="item-video">
          <sp-image
            width="2.4rem"
            height="1.35rem"
            radius="8px"
            fit="cover"
            :src="item.image"
          />
          <div class="time">{{ item.custVideoTime }}</div>
        </div>
        <div class="item-desc">
          <div class="tile">{{ item.videoName }}</div>
          <div class="desc">
            <span>{{ item.authorName }}</span>
            <span>{{ item.createTime }}</span>
          </div>
        </div>
      </div>
    </div>
    <sp-center-popup
      v-model="showPop"
      button-type="confirm"
      :field="Field"
      @confirm="openAppConfirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
import openappV2 from '@/mixins/openappV2'
import knownApi from '@/api/known'
import { secondToTime } from '@/utils/common'

export default {
  name: 'KnownVideoLike',
  components: {
    [Image.name]: Image,
  },
  mixins: [openappV2],
  props: {
    categoryId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mVlist: [],
      apiLock: false,
    }
  },
  watch: {
    categoryId() {
      this.getVideoApi()
    },
  },
  mounted() {
    if (this.categoryId !== '' && !this.apiLock) {
      this.getVideoApi()
    }
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      this.apiLock = true
      const params = {
        categoryIds: [this.categoryId],
      }
      this.$axios
        .post(knownApi.video.videoList, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.buildVLikeList(res.data)
        })

        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildVLikeList(data) {
      // 这里注意,按照需求取 <= 4条(总共4条)
      this.mVlist = data.filter((item, index) => {
        return index < 4
      })
      this.mVlist.forEach((item) => {
        item.custVideoTime = secondToTime(item.duration)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.vlike {
  .like {
    color: #222222;
    font: bold 32px/44px @fontf-pfsc-med;
    margin-bottom: 10px;
  }
  .video-list {
    .item {
      padding: 28px 0;
      display: flex;
      &-video {
        position: relative;
        background: #f5f5f5;
        margin-right: 28px;
        width: 240px;
        height: 135px;
        img {
          width: 240px;
          height: 135px;
          border-radius: 8px;
        }
        .time {
          position: absolute;
          padding: 3px 8px;
          box-sizing: border-box;
          bottom: 8px;
          left: 8px;
          opacity: 0.6;
          background: #000000;
          font: 22px @fontf-pfsc-med;
          color: #ffffff;
          border-radius: 8px;
        }
      }
      &-desc {
        width: 418px;
        .tile {
          font: 32px/44px @fontf-pfsc-med;
          color: #222222;
          height: 88px;
          .textOverflow(2);
          margin-bottom: 13px;
        }
        .desc {
          display: flex;
          justify-content: space-between;
          span:first-child {
            font: 26px @fontf-pfsc-med;
            color: #555555;
          }
          span:nth-child(2) {
            font: 24px @fontf-pfsc-reg;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
