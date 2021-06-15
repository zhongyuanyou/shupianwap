<template>
  <div class="m-known-share courseVideo">
    <app-link />
    <client-only>
      <sp-video
        :vod-url="vurl"
        :options="playerOptions"
        @errorBtnHandle="errorBtnHandle"
      >
      </sp-video>
    </client-only>
    <sp-tabs>
      <sp-tab title="简介">
        <div class="introduction">
          <div class="introduction-tile" @click="openApp">
            {{ vDetail.courseName }}
          </div>
          <div class="introduction-desc" @click="openApp">
            <div class="name">
              <span>{{ vDetail.authorName }}</span>
              <span>{{ vDetail.authorTitle }}</span>
            </div>
            <div class="date">
              {{ vDetail.custTotalViewCount }} 次播放 ·
              {{ vDetail.custUpdateTime }} 发布
            </div>
          </div>
          <div class="introduction-course">
            <div class="tile">课程简介</div>
            <div
              class="richtxt"
              @click="openApp"
              v-html="vDetail.courseDesc"
            ></div>
          </div>
        </div>
      </sp-tab>
      <sp-tab title="目录">
        <div class="list">
          <div class="tile">目录 {{ vDetail.custCourseCount }}</div>
          <div class="section-block">
            <div
              v-for="(item, index) in vDetail.courseVideos"
              :key="index"
              class="section"
              :class="[index === 0 ? 'z-active' : '']"
              @click="openApp"
            >
              <div class="desc">
                <span>{{ index + 1 }}</span>
                <span>{{ item.videoName }}</span>
              </div>
              <div>{{ item.custDuration }}</div>
            </div>
          </div>
          <video-like :category-id="categoryId"></video-like>
        </div>
      </sp-tab>
    </sp-tabs>
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
import { Tab, Tabs } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import openappV2 from '@/mixins/openappV2'
import { numChangeW, secondToTime } from '@/utils/common'

export default {
  name: 'KnownCourseVideo',
  components: {
    AppLink: () => import('@/components/common/downLoadArea'),
    VideoLike: () => import('@/components/mustKnown/share/VideoLike'),
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  mixins: [openappV2],
  data() {
    return {
      // videojs options
      playerOptions: {
        muted: true,
        poster: '',
        width: '100vw',
        height: '4.22rem',
      },
      vId: '',
      categoryId: '', // 种类id
      vurl: '', // 视频url
      vDetail: {},
    }
  },
  mounted() {
    /*
    if (!this.$route.query.id) {
      this.$xToast.error('获取视频信息失败')
      return
    }
    */
    this.vId = this.$route.query.id || '8088687517639704576'
    this.getVideoApi()
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      const params = {
        id: this.vId,
      }
      this.$axios
        .post(knownApi.video.courseDetail, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.vDetail = res.data
          // 这里是拿课程的类型
          this.categoryId = res.data.categoryId
          if (res.data.courseVideos && res.data.courseVideos.length > 0) {
            this.vurl = res.data.courseVideos[0].videoUrl
            this.playerOptions.poster = res.data.courseVideos[0].image
          }
          this.buildDetail()
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildDetail() {
      this.vDetail.custUpdateTime = this.vDetail.updateTime.split(' ')[0]
      this.vDetail.custTotalViewCount = numChangeW(this.vDetail.totalViewCount)
      this.vDetail.courseVideos.forEach((element) => {
        element.custDuration = secondToTime(element.duration)
      })
      this.vDetail.custCourseCount = this.vDetail
        ? this.vDetail.courseVideos.length
        : 0
    },
    errorBtnHandle() {
      if (this.vId) {
        this.getVideoApi()
      } else {
        this.$xToast.error('获取视频信息失败')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.courseVideo {
  background: #fff;
  ::v-deep.sp-tabs {
    .sp-tabs__wrap {
      height: 80px;
      padding-bottom: 8px;
      border-bottom: 1px solid #f4f4f4;
      .sp-tab {
        font: 400 30px/30px PingFangSC-Regular, PingFang SC;
        color: #999999;
      }
      .sp-tab--active {
        color: #222222;
        font-weight: bold;
      }
      .sp-tab__text--ellipsis {
        overflow: unset;
      }
      .sp-tabs__line {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
      }
    }
  }
  .introduction {
    padding: 34px 32px;
    &-tile {
      font: bold 40px/56px @fontf-pfsc-med;
      color: #1a1a1a;
      margin-bottom: 34px;
    }
    &-desc {
      margin-bottom: 56px;
      .name {
        font: 28px @fontf-pfsc-reg;
        margin-bottom: 20px;
        span:first-child {
          color: #222222;
          margin-right: 20px;
        }
        span:nth-child(2) {
          color: #999999;
        }
      }
      .date {
        font: 24px @fontf-pfsc-reg;
        color: #999999;
      }
    }
    &-course {
      .tile {
        font: bold 32px @fontf-pfsc-med;
        color: #222222;
        margin-bottom: 32px;
      }
    }
  }
  .list {
    padding: 48px 32px 0 32px;
    .tile {
      font: bold 32px @fontf-pfsc-med;
      color: #222222;
    }
    .section-block {
      .section {
        background: #f8f8f8;
        border-radius: 12px;
        padding: 34px 32px 28px 40px;
        box-sizing: border-box;
        margin-bottom: 20px;
        .desc {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
          }
          span:first-child {
            font: bold 34px Bebas;
            color: #999999;
            width: 60px;
          }
          span:nth-child(2) {
            font: 32px/44px @fontf-pfsc-reg;
            width: 556px;
            color: #222222;
          }
        }
        div:nth-child(2) {
          margin: 18px 0 0 60px;
          font: 24px @fontf-pfsc-reg;
          color: #999999;
        }
        &.z-active {
          border: 3px solid #4974f5;
          .desc {
            span:nth-child(2) {
              color: #4974f5;
              font-weight: bold;
            }
          }
        }
      }
      .section:first-child {
        margin-top: 32px;
      }
      .section:last-child {
        margin-bottom: 56px;
      }
    }
  }
  ::v-deep .richtxt {
    img {
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 100%;
    }
  }
}
</style>
