<template>
  <div class="m-known-share smallVideo materialShare">
    <img class="bg" src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg" />
    <my-icon
      name="bofang_mian"
      size="1.28rem"
      color="rgba(0,0,0,0.40)"
      class="my-icon"
      @click.native="link"
    ></my-icon>
    <div class="info-content">
      <div class="tile">1个视频助新人创业完全闭坑指南，…</div>
      <div class="desc">
        王健林批评马云：平时不看书，还讲一堆大道理,给青少年灌输不好思想
      </div>
    </div>
    <div class="goods-swipe">
      <sp-swipe :autoplay="3000" :show-indicators="true">
        <sp-swipe-item>
          <div class="good-content">
            <sp-image
              fit="cover"
              width="1.4rem"
              height="1.4rem"
              radius="0.24rem"
              src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
            />
            <div class="info">
              <div class="info-tile">商品名称商品名称商品</div>
              <div class="info-desc">
                <div class="price">
                  <span>698</span><span class="unit">元</span>
                </div>
                <sp-button class="btn">立即抢购</sp-button>
              </div>
            </div>
          </div>
        </sp-swipe-item>
        <sp-swipe-item>
          <div class="good-content">
            <sp-image
              fit="cover"
              width="1.4rem"
              height="1.4rem"
              radius="0.24rem"
              src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
            />
            <div class="info">
              <div class="info-tile">商品名称商品名称商品</div>
              <div class="info-desc">
                <div class="price">
                  <span>698</span><span class="unit">元</span>
                </div>
                <sp-button class="btn">立即抢购</sp-button>
              </div>
            </div>
          </div>
        </sp-swipe-item>
      </sp-swipe>
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
import { Image, Button, Swipe, SwipeItem } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'

export default {
  name: 'KnownSmallVideo',
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
  },
  data() {
    return {
      vId: '',
      categoryId: '', // 种类id
      vurl: '', // 视频url
      vDetail: {},
      videoType: '',
    }
  },
  mounted() {
    this.vId = this.$route.query.id || '8086190052126556160'
    // this.getVideoApi()
  },
  methods: {
    // 查询视频信息
    getVideoApi() {
      const params = {
        id: this.vId,
      }
      this.$axios
        .post(knownApi.video.videoDetail, params)
        .then((res) => {
          if (res.code !== 200) {
            throw new Error('查询视频失败')
          }
          this.vDetail = res.data
          this.categoryId = res.data.categoryId
          this.vurl = res.data.videoUrl
        })
        .catch((e) => {
          this.$xToast.error(e.message)
        })
    },
    link() {
      if (!this.vId || !this.vurl) {
        this.$xToast.error('获取视频信息失败')
        return
      }
      this.$router.push({
        path: '/known/share/smallvideo/detail',
        query: {
          categoryId: this.categoryId,
          vurl: this.vurl,
          shareType: 'materialShare', // 传对应的分销标识
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.m-known-share.smallVideo.materialShare {
  background: #1a1a1a;
  .bg {
    width: 100vw;
    height: 100vh;
    object-fit: cover;
  }
  .my-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
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
  .goods-swipe {
    position: fixed;
    bottom: 188px;
    width: 100%;
    padding: 0 40px;
    height: 214px;
    ::v-deep.sp-swipe {
      width: 100%;
      height: inherit;
    }
    ::v-deep.sp-swipe-item {
      background: #fff;
      border-radius: 12px;
    }
    .good-content {
      height: 160px;
      display: flex;
      align-items: center;
      padding: 0 20px;
      .info {
        margin-left: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        &-tile {
          width: 100%;
          height: 84px;
          color: #222222;
          font-weight: bold;
          font-size: 32px;
          line-height: 42px;
          .textOverflow(2);
        }
        &-desc {
          width: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          .price {
            display: flex;
            align-items: center;
            .unit {
              font-size: 24px;
              line-height: 24px;
            }
            color: #ec5330;
            font-weight: bold;
            font-size: 32px;
            line-height: 40px;
          }
          .btn {
            background: #ec5330;
            height: 54px;
            font-size: 28px;
            font-weight: bold;
            border-radius: 8px;
            color: #fff;
          }
        }
      }
    }
  }
  .info-content {
    position: fixed;
    bottom: 466px;
    padding: 0 32px;
    .tile {
      color: #ffffff;
      font-weight: bold;
      font-size: 40px;
      line-height: 56px;
      .mixin-text-oneoverflow();
      margin-bottom: 10px;
    }
    .desc {
      font-size: 32px;
      line-height: 44px;
      color: #fff;
      font-weight: bold;
      .textOverflow(2);
    }
  }
}
</style>
