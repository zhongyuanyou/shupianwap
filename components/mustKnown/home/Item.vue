<template>
  <div class="item_box">
    <div class="user">
      <sp-image
        round
        class="user_avatar"
        fit="cover"
        :src="item.avatar"
        @click="toHome(item)"
      />
      <div class="user_info">
        <div class="user_info_name">{{ item.userName }}</div>
        <div class="user_info_time">
          {{ item.createTime }}·{{ item.type | filterType }}
        </div>
      </div>
    </div>
    <div @click="toDetail(item)">
      <div class="title clamp2">
        {{ item.title }}
      </div>
      <div v-if="item.type !== 7 && item.type !== 6 && item.type != 5">
        <div v-if="!item.contentImageUrl" class="content clamp3">
          {{ item.contentText }}
        </div>
        <div v-else class="content_img">
          <div class="left_content clamp3">
            {{ item.contentText }}
          </div>
          <sp-image
            class="right_img"
            fit="cover"
            radius="0.12rem"
            :src="item.contentImageUrl.split(',')[0]"
          />
        </div>
      </div>
      <div
        v-if="item.type === 5 && item.originalVideoType === 1"
        class="video_content"
      >
        <div class="video">
          <img :src="item.imageUrl" alt="" class="cover_img" />
        </div>
        <my-icon name="bofang_mian" size="0.96rem" class="play_btn"></my-icon>
        <div class="bottom_time">
          <div class="time">{{ totime(item.duration) }}</div>
        </div>
      </div>
      <div
        v-if="item.type === 5 && item.originalVideoType === 2"
        class="small_video_content"
      >
        <div class="video">
          <img :src="item.imageUrl" alt="" class="cover_img" />
        </div>
        <my-icon name="bofang_mian" size="0.96rem" class="play_btn"></my-icon>
        <div class="bottom_time">
          <div class="time">{{ totime(item.duration) }}</div>
        </div>
      </div>
    </div>
    <div v-if="item.type !== 1" class="bottom">
      <div
        class="bottom_item"
        :style="{ color: item.isApplaudFlag ? '#4974f5' : '#999999' }"
        @click="like(item)"
      >
        <my-icon
          v-show="item.isApplaudFlag && item.type < 4"
          name="zantong_mian"
          size="0.34rem"
          color="#4974f5"
        ></my-icon>
        <my-icon
          v-show="!item.isApplaudFlag && item.type < 4"
          name="zantong"
          size="0.34rem"
          color="#999999"
        ></my-icon>
        <my-icon
          v-show="item.isApplaudFlag && item.type > 4"
          name="dianzan_mian"
          size="0.34rem"
          color="#4974f5"
        ></my-icon>
        <my-icon
          v-show="!item.isApplaudFlag && item.type > 4"
          name="dianzan"
          size="0.34rem"
          color="#999999"
        ></my-icon>
        {{ item.applaudCount || '赞同' }}
      </div>
      <div class="bottom_item" @click="comments(item)">
        <my-icon name="pinglun" size="0.34rem" color="#999999"></my-icon>
        {{ item.remarkCount || '评论' }}
      </div>
    </div>
    <div v-if="item.type === 1 && item.status === 1" class="bottom">
      <div class="bottom_item" @click="invitation(item.id)">
        <my-icon name="yaoqing" size="0.34rem" color="#999999"></my-icon>
        邀请
      </div>
      <div class="bottom_item" @click="answer(item.id)">
        <my-icon name="xiehuida" size="0.34rem" color="#999999"></my-icon>
        写回答
      </div>
    </div>
    <sp-center-popup v-model="showPop" :field="Filed4" button-type="confirm" />
  </div>
</template>
<script>
import { Image, CenterPopup } from '@chipspc/vant-dgg'
import { knownApi } from '~/api'
export default {
  name: 'Item',
  components: {
    [Image.name]: Image,
    [CenterPopup.name]: CenterPopup,
  },
  filters: {
    filterType(type) {
      if (type === 1) {
        return '发布了问题'
      } else if (type === 2) {
        return '发表了文章'
      } else if (type === 5) {
        return '发布了视频'
      } else if (type === 6) {
        return '发布了小视频'
      } else {
        return '回答了问题'
      }
    },
  },
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      Filed4: {
        type: 'functional',
        showCancelButton: false,
        title: '提示！',
        description: `请到App去观看`,
        confirmButtonText: '好的',
      },
      showPop: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  methods: {
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    toDetail(item) {
      if (item.type === 5) {
        this.open()
      } else {
        this.$router.push({
          path:
            item.type === 1
              ? '/known/detail/question'
              : item.type === 2
              ? '/known/detail/article'
              : '/known/detail/answer',
          query: {
            id: item.id,
          },
        })
      }
    },
    async isLogin() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.init()
        return false
      }
      return true
    },
    comments(item) {
      this.$emit('comments', { id: item.id, type: item.type })
    },
    async invitation(id) {
      if (!(await this.isLogin())) {
        return
      }
      this.$router.push({
        path: '/known/detail/invitationList',
        query: {
          questionId: id,
        },
      })
    },
    async answer(id) {
      if (!(await this.isLogin())) {
        return
      }
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
        },
      })
    },
    async like(item) {
      if (!(await this.isLogin())) {
        return
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.home.operation,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          businessId: item.id,
          handleType: item.isApplaudFlag ? 7 : 1, // 1是点赞 7是取消点赞
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          dateType: item.type,
        }
      )
      if (code === 200) {
        if (item.isApplaudFlag) {
          item.isApplaudFlag = 0
          item.applaudCount--
        } else {
          item.isApplaudFlag = 1
          item.applaudCount++
        }
      } else {
        console.log(message)
      }
    },
    open(item) {
      if (this.isInApp && this.appInfo.appCode === 'CPSAPP') {
        // console.log('++++++++this.active', this.active)
        // console.log('++++++++this.item', item.id)
        if (item.type === 5 && item.originalVideoType === 1) {
          try {
            this.$appFn.dggOpenVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开视频失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        } else {
          try {
            this.$appFn.dggOpenSmallVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开小视频失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        }
      } else if (this.isInApp && this.appInfo.appCode === 'syscode') {
        this.showItem = false
      } else {
        this.showPop = true
      }
    },
    totime(time) {
      let hour = Math.floor(time / 3600)
      let mid = Math.floor((time - 3600 * hour) / 60)
      // math.flotime / 60
      let sec = Math.floor((time - 3600 * hour) % 60)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (mid < 10) {
        mid = '0' + mid
      }
      if (sec < 10) {
        sec = '0' + sec
      }
      return hour + ':' + mid + ':' + sec
    },
  },
}
</script>
<style lang="less" scoped>
.item_box {
  background: #ffffff;
  padding: 28px 32px 28px;
  margin-bottom: 20px;
  .user {
    display: flex;
    align-items: center;
    margin-bottom: 32px;
    .user_avatar {
      width: 66px;
      height: 66px;
      margin-right: 16px;
    }
    .user_info {
      &_name {
        font-size: 28px;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
      }
      &_time {
        margin-top: 12px;
        font-size: 24px;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
    }
  }
  .title {
    font-family: PingFangSC-Medium, PingFang SC;
    font-size: 36px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 48px;
    margin-bottom: 17px;
  }

  .content {
    font-family: PingFangSC-Regular, PingFang SC;
    font-size: 30px;
    font-weight: 400;
    color: #555555;
    line-height: 42px;
  }
  .content_img {
    display: flex;
    .left_content {
      font-family: PingFangSC-Regular, PingFang SC;
      font-size: 30px;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      flex: 1;
      margin-right: 32px;
    }
    .right_img {
      width: 190px;
      height: 127px;
      background: #cccccc;
    }
  }
  .video_content {
    width: 686px;
    height: 384px;
    background: #f5f5f5;
    border-radius: 12px;
    position: relative;
    margin-top: 28px;
    .video {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .play_btn {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -48px;
      margin-left: -48px;
      opacity: 0.4;
    }
    .bottom_time {
      position: absolute;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      border-radius: 0 0 12px 12px;
      height: 88px;
      bottom: 0;
      width: 100%;
      padding: 20px;
      .time {
        font: bold 24px PingFangSC-Medium;
        height: 24px;
        color: #ffffff;
        text-align: right;
        height: 20px;
        margin-top: 20px;
      }
    }
  }
  .small_video_content {
    width: 483px;
    height: 852px;
    background: #f5f5f5;
    border-radius: 12px;
    position: relative;
    margin-top: 28px;
    .video {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .play_btn {
      width: 96px;
      height: 96px;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -48px;
      margin-left: -48px;
      opacity: 0.4;
    }
    .bottom_time {
      position: absolute;
      background-image: linear-gradient(
        0deg,
        rgba(0, 0, 0, 0.4) 0%,
        rgba(0, 0, 0, 0) 100%
      );
      border-radius: 0 0 12px 12px;
      height: 88px;
      bottom: 0;
      width: 100%;
      padding: 20px;
      .time {
        font: bold 24px PingFangSC-Medium;
        height: 24px;
        color: #ffffff;
        text-align: right;
        height: 20px;
        margin-top: 20px;
      }
    }
  }
  .bottom {
    font-family: PingFangSC-Regular, PingFang SC;
    margin-top: 24px;
    font-size: 28px;
    font-weight: 400;
    color: #999999;
    display: flex;
    align-items: center;
    &_item {
      margin-right: 24px;
      min-width: 100px;
      i {
        margin-right: 8px;
      }
    }
  }
}

.clamp2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.clamp3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
