<template>
  <div class="m-known-share originalVideo">
    <app-link :ios-link="iosPathFinally" :androd-link="androdFinally" />
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
          :src="vDetail.custavatar"
          @click="confirm"
        />
        <div class="info-brand-tile" @click="confirm">
          <div
            class="name"
            :class="[
              vDetail.custbriefIntroduction === '' ? 'z-nontebuttom' : '',
            ]"
          >
            {{ vDetail.authorName }}
          </div>
          <div class="desc">{{ vDetail.custbriefIntroduction }}</div>
        </div>
        <sp-button color="#4974F5" class="button" @click="confirm">
          <my-icon
            class="add-icon"
            name="jiahao"
            size="0.2rem"
            color="#FFFFFF"
          />
          <span>关注</span></sp-button
        >
      </div>
      <div class="info-tile" @click="confirm">{{ vDetail.videoName }}</div>
      <div class="info-desc">
        {{ vDetail.custTotalViewCount }}次播放 · 发布于{{
          vDetail.custUpdateTime
        }}
      </div>
    </div>
    <video-like
      :category-id="categoryId"
      :type="vType"
      class="like"
    ></video-like>
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
import { Image, Button } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import openappV2 from '@/mixins/openappV2'
import { numChangeW } from '@/utils/common'

export default {
  name: 'KnownOriginalVideo',
  components: {
    AppLink: () => import('@/components/common/downLoadArea'),
    VideoLike: () => import('@/components/mustKnown/share/VideoLike'),
    [Image.name]: Image,
    [Button.name]: Button,
  },
  mixins: [openappV2],
  data() {
    return {
      vId: '',
      categoryId: '', // 种类id
      vurl: '', // 视频url
      vDetail: {},
      // videojs options
      playerOptions: {
        poster: '',
      },
      vType: 'original',
      prefixPath: 'cpsccustomer://',
      iosPath: {
        path: 'CPSCustomer:CPSCustomer/CPSCKnowCommonDetailViewController///push/animation',
        parameter: {
          selectedIndex: 1,
          type: '5', // 视频
          id: '',
        },
      },
      iosPathFinally: '',
      androdPath: {
        path: '/main/android/main',
        parameter: {
          selectedIndex: 1,
          isLogin: '0',
          secondLink: '/savvy/chips/video_details',
          id: '',
        },
      },
      androdFinally: '',
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
    this.iosPath.parameter.id = this.vId
    this.iosPathFinally = this.prefixPath + JSON.stringify(this.iosPath)
    this.androdPath.parameter.id = this.vId
    this.androdFinally = this.prefixPath + JSON.stringify(this.androdPath)

    this.getVideoApi()
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      const params = {
        id: this.vId,
      }
      this.$axios
        .post(knownApi.video.videoUserDetail, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.vDetail = res.data
          this.categoryId = res.data.categoryId
          this.vurl = res.data.videoUrl
          this.playerOptions.poster = res.data.image
          this.buildDetail()
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    buildDetail() {
      this.vDetail.custUpdateTime = this.vDetail.updateTime.split(' ')[0]
      this.vDetail.custTotalViewCount = numChangeW(this.vDetail.totalViewCount)
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
.m-known-share.originalVideo {
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
}
</style>
