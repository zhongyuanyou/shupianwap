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
    <div v-if="item.type !== 1" class="bottom">
      <div
        class="bottom_item"
        :style="{ color: item.isApplaudFlag ? '#4974f5' : '#999999' }"
        @click="like(item)"
      >
        <my-icon
          name="zantong"
          size="0.36rem"
          :color="item.isApplaudFlag ? '#4974f5' : '#999999'"
        ></my-icon>
        {{ item.applaudCount || '赞同' }}
      </div>
      <div class="bottom_item" @click="comments(item.id)">
        <my-icon name="pinglun" size="0.36rem" color="#999999"></my-icon>
        {{ item.remarkCount || '评论' }}
      </div>
    </div>
    <div v-if="item.type === 1 && item.status === 1" class="bottom">
      <div class="bottom_item" @click="invitation(item.id)">
        <my-icon name="yaoqing" size="0.36rem" color="#999999"></my-icon>
        邀请
      </div>
      <div class="bottom_item" @click="answer(item.id)">
        <my-icon name="xiehuida" size="0.36rem" color="#999999"></my-icon>
        写回答
      </div>
    </div>
  </div>
</template>
<script>
import { Image } from '@chipspc/vant-dgg'
import { knownApi } from '~/api'
export default {
  name: 'Item',
  components: {
    [Image.name]: Image,
  },
  filters: {
    filterType(type) {
      if (type === 1) {
        return '发布了问题'
      } else if (type === 2) {
        return '发表了文章'
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
    return {}
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
    },
    async isLogin() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.init()
        return false
      }
      return true
    },
    comments(id) {
      this.$emit('comments', id)
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
    font-weight: 500;
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
  .bottom {
    font-family: PingFangSC-Regular, PingFang SC;
    margin-top: 24px;
    font-size: 28px;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
    display: flex;
    &_item {
      display: flex;
      align-items: center;
      margin-right: 24px;
      min-width: 148px;
      i {
        margin-right: 16px;
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
