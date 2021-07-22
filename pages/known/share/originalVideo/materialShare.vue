<template>
  <div class="m-known-share originalVideo materialShare">
    <client-only>
      <sp-video
        :options="playerOptions"
        :vod-url="vurl"
        @errorBtnHandle="errorBtnHandle"
      />
    </client-only>
    <div class="info">
      <div class="info-brand">
        <sp-image
          width="0.84rem"
          height="0.84rem"
          round
          fit="cover"
          src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
        />
        <div class="info-brand-tile">
          <div class="name">乐享创业帮</div>
          <div class="desc">已关注 · 商业因服务更美好</div>
        </div>
      </div>
      <div class="info-tile">领导干部MPA必读核心课程之公共部门经济学</div>
      <div class="info-desc">10.5万次播放 · 发布于2021-11-01</div>
    </div>
    <div class="planner-info">
      <div class="flex-left">
        <sp-image
          class="img"
          round
          src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
        />
        <div class="infos">
          <div class="infos-name">我是规划师</div>
          <div class="infos-desc">金牌规213划师</div>
        </div>
      </div>
      <!-- && planerInfo.mchUserId -->
      <div class="flex-right">
        <sp-button size="small" type="primary">在线问</sp-button>
        <sp-button size="small" type="info">打电话</sp-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'

export default {
  name: 'KnownOriginalVideo',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
  },
  data() {
    return {
      vId: '',
      categoryId: '', // 种类id
      vurl: 'https://video.dgg.net/118146ee86b145c697bb6a6f9c8ea9c6/04aad615e77f4ae5818e46c372ff316c-c5fedc61ccdc5b58f0171620cdacd346-od-S00000001-200000.mp4', // 视频url
      vDetail: {},
      // videojs options
      playerOptions: {
        poster: '',
      },
      vType: 'original',
    }
  },
  mounted() {
    /*
    if (!this.$route.query.id) {
      this.$xToast.error('获取视频信息失败')
      return
    }
    */
    this.vId = this.$route.query.id || '8088997202200690688'
  },
  methods: {
    errorBtnHandle() {
      console.log('error')
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.originalVideo.materialShare {
  background: #fff;
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
          font: bold 32px @fontf-pfsc-med;
          color: #222222;
          margin-bottom: 16px;
          &.z-nontebuttom {
            margin-bottom: 0;
          }
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
      font: bold 40px/56px @fontf-pfsc-med;
      color: #1a1a1a;
      .textOverflow(2);
      margin-bottom: 22px;
    }
    &-desc {
      font: 28px @fontf-pfsc-reg;
      color: #999999;
    }
  }
  .like {
    padding: 16px 32px;
  }
  .button {
    width: 144px;
    height: 64px;
    padding: 0;
  }
  ::v-deep .sp-button__text {
    display: flex;
    align-items: center;
    font-size: 26px;
    font-weight: bold;
    .add-icon {
      margin-right: 12px;
    }
  }
  .planner-info {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 144px;
    padding: 0 40px;
    background: #fff;
    .flex-left {
      display: flex;
      align-items: center;
      .img {
        width: 80px;
        height: 80px;
        background: #f5f5f5;
        margin-right: 24px;
      }
      .infos {
        display: flex;
        flex-direction: column;
        &-name {
          color: #222222;
          font-size: 32px;
          line-height: 45px;
          font-weight: bold;
          margin-bottom: 3px;
        }
        &-desc {
          padding: 5px 8px;
          border: 2px solid #dac79a;
          border-radius: 4px;
          background: #ffefc5;
          color: #7b6225;
          font-size: 22px;
          line-height: 1;
        }
      }
    }
    .flex-right {
      display: flex;
      align-items: center;
      ::v-deep button {
        height: 96px;
        width: 168px;
        border-radius: 8px;
        font-size: 32px;
        font-weight: bold;
        color: #fff;
      }
      ::v-deep.sp-button--info {
        margin-left: 16px;
        background-color: #24ae68;
        border: 1px solid #24ae68;
      }
    }
  }
}
</style>
