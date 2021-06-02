<template>
  <div class="m-known-share originalVideo">
    <app-link />
    <div class="placeholder"></div>
    <client-only>
      <sp-video :vod-url="url" :sp-config="config" :show-video="true">
      </sp-video>
    </client-only>
    <div class="info">
      <div class="info-brand">
        <sp-image width="0.84rem" height="0.84rem" round fit="cover" src="" />
        <div class="info-brand-tile">
          <div class="name">乐享werewdfsdfsdweerwerwerwerwerwer创业帮</div>
          <div class="desc">商业因服务更美werewrwerwerewre好</div>
        </div>
        <sp-button color="#4974F5">
          <my-icon name="tianjia" size="0.2rem" color="#FFFFFF" />
          关注</sp-button
        >
      </div>
      <div class="info-tile">领导干部MPA必读核心课程之公共部门经济学</div>
      <div class="info-desc">10.5万次播放 · 发布于2021-11-01</div>
    </div>
    <video-like></video-like>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'

export default {
  name: 'KnownOriginalVideo',
  components: {
    AppLink: () => import('@/components/mustKnown/share/AppLink'),
    VideoLike: () => import('@/components/mustKnown/share/VideoLike'),
    [Image.name]: Image,
    [Button.name]: Button,
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
.m-known-share.originalVideo {
  background: #fff;
  .placeholder {
    height: 120px;
  }
  .info {
    padding: 40px 32px 34px 32px;
    &-brand {
      position: relative;
      display: flex;
      align-items: center;
      margin-bottom: 35px;
      &-tile {
        margin-left: 20px;
        width: 406px;
        .name {
          .mixin-text-oneoverflow();
          font: 32px @fontf-pfsc-med;
          color: #222222;
          margin-bottom: 16px;
        }
        .desc {
          .mixin-text-oneoverflow();
          font: 24px @fontf-pfsc-reg;
          color: #999999;
        }
      }
      ::v-deep .sp-button {
        position: absolute;
        right: 0;
        border-radius: 8px;
        width: 144px;
      }
      ::v-deep .sp-button.sp-button--normal {
        font-size: 26px;
      }
    }
    &-tile {
      font: 40px/56px @fontf-pfsc-med;
      color: #1a1a1a;
      .textOverflow(2);
      margin-bottom: 22px;
    }
    &-desc {
      font: 28px @fontf-pfsc-reg;
      color: #999999;
    }
  }
}
</style>
