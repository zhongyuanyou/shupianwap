<template>
  <div class="m-known-share courseVideo">
    <app-link />
    <div class="placeholder"></div>
    <client-only>
      <sp-video :vod-url="url" :sp-config="config" :show-video="true">
      </sp-video>
    </client-only>
    <sp-tabs>
      <sp-tab title="简介">
        <div class="introduction">
          <div class="introduction-tile">
            新时代下中国开放新格局、新趋势和中美贸易摩擦
          </div>
          <div class="introduction-desc">
            <div class="name">
              <span>黄奇帆</span>
              <span>中国国际经济交流中心副理事长</span>
            </div>
            <div class="date">956次播放 · 2021-11-01发布</div>
          </div>
          <div class="introduction-course">
            <div class="tile">课程简介</div>
            <div class="richtxt"></div>
          </div>
        </div>
      </sp-tab>
      <sp-tab title="目录">
        <div class="list">
          <div class="tile">目录 3</div>
          <div class="section-block">
            <div class="section">
              <div class="desc">
                <span>1</span>
                <span
                  >通过设计让品牌起死回生，对于商业设计而言到底有什么用？</span
                >
              </div>
              <div>08:00</div>
            </div>
            <div class="section z-active">
              <div class="desc">
                <span>2</span>
                <span
                  >通过设计让品牌起死回生，对于商业设计而言到底有什么用？</span
                >
              </div>
              <div>08:00</div>
            </div>
            <div class="section">
              <div class="desc">
                <span>3</span>
                <span>通过设计让品牌起死</span>
              </div>
              <div>08:00</div>
            </div>
          </div>
          <video-like></video-like>
        </div>
      </sp-tab>
    </sp-tabs>
  </div>
</template>

<script>
import { Tab, Tabs } from '@chipspc/vant-dgg'

export default {
  name: 'KnownCourseVideo',
  components: {
    AppLink: () => import('@/components/mustKnown/share/AppLink'),
    VideoLike: () => import('@/components/mustKnown/share/VideoLike'),
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
  },
  data() {
    return {
      url: '//sf1-hscdn-tos.pstatp.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4',
      config: {
        height: '30vh',
        width: '100vw',
      },
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.m-known-share.courseVideo {
  background: #fff;
  .placeholder {
    height: 120px;
  }
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
}
</style>
