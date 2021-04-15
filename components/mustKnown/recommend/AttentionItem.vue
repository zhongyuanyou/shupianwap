<template>
  <sp-list
    v-if="listData.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in listData" :key="index">
      <div class="item">
        <div class="item_Info">
          <div class="userPhoto" @click="goUserDetail(item)">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="item_status">
            <div class="userName" @click="goUserDetail(item)">
              {{ item.userName }}
            </div>
            <div class="item_time">
              {{ toTimeStamp(item.createTime) }}·
              <span>{{
                item.type == 1
                  ? '发起了问题'
                  : item.type == 2
                  ? '发表了文章'
                  : '回答了问题'
              }}</span>
            </div>
          </div>
        </div>
        <div class="item_title" @click="goDetailPage(item.type, item.id)">
          {{ item.title }}
        </div>
        <div class="item_content" @click="goDetailPage(item.type, item.id)">
          <p class="content">
            {{ item.contentText }}
          </p>
          <img
            v-if="item.contentImageUrl"
            :src="item.contentImageUrl.split(',')[0]"
            alt=""
          />
        </div>
        <div class="item_bottom">
          <span v-if="item.type === 2" @click="invite()">
            <my-icon
              name="yaoqing"
              size="0.36rem"
              color="#999999"
              class="my_icon"
            ></my-icon>
            邀请
          </span>
          <span v-if="item.type === 2" @click="openAnswer(item.id)">
            <my-icon
              name="xiehuida"
              size="0.36rem"
              color="#999999"
              class="my_icon"
            ></my-icon>
            写回答
          </span>

          <span
            v-if="item.type === 1"
            class="bottom_icon"
            :class="item.isApplaudFlag === 1 ? 'like_active' : ''"
            @click="like(item)"
          >
            <my-icon
              v-if="item.isApplaudFlag === 1"
              name="zantong_mian"
              size="0.36rem"
              color="#4974F5"
              class="my_icon"
            ></my-icon>
            <my-icon
              v-else
              name="zantong"
              size="0.36rem"
              color="#999999"
              class="my_icon"
            ></my-icon>
            <span>
              {{ item.applaudCount > 0 ? item.applaudCount : '赞同' }}
            </span>
          </span>
          <span
            v-if="item.type === 1"
            class="bottom_icon"
            @click="showComment(item.id)"
          >
            <my-icon
              name="pinglun"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-left: 0.26rem"
            ></my-icon>
            <span> 评论{{ item.remarkCount }}</span>
          </span>
        </div>
      </div>
    </sp-cell>
    <comment-list
      v-model="commentShow"
      :article-id="articleId"
      @release="release"
    ></comment-list>
  </sp-list>
</template>
<script>
import { mapState } from 'vuex'
import { Cell, List } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
import { knownApi } from '@/api'
export default {
  name: 'AttentionItem',
  components: {
    [Cell.name]: Cell,
    [List.name]: List,
    CommentList,
  },

  props: {
    listData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },

  data() {
    return {
      commentShow: false,
      loading: true,
      finished: false,
      timeStamp: 0,
      articleId: 0,
      applaudLine: false,
      applaudMian: true,
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
      token: (state) => state.user.userInfo.token,
      userPhone: (state) => state.user.userInfo.userPhone,
    }),
  },
  watch: {
    listData(newName, oldName) {},
  },
  mounted() {
    if (this.Token) {
      console.log('+++++++++++++', this.token)
    }
  },
  methods: {
    release() {
      console.log('点击了发布')
    },
    showComment(id) {
      console.log('点击了评论')
      this.articleId = id
      this.commentShow = true
    },
    openAnswer(id) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
          type: 2,
        },
      })
    },
    invite() {
      this.$router.push({
        path: '/known/detail/invitationList',
      })
    },
    toTimeStamp(time) {
      console.log('time', time)
      let times = time.replace(/-/g, '/')
      times = Date.parse(times)
      const nowTime = new Date().getTime()
      let result = ''
      // 的倒时差
      const diff = nowTime - times
      if (diff < 3600000) {
        result = diff / 60000 + '分钟前'
      } else if (diff > 3600000 && diff < 86400000) {
        result = diff / 3600000 + '小时前'
      } else {
        const m =
          new Date(times).getMonth() + 1 < 10
            ? '0' + new Date(times).getMonth()
            : new Date(times).getMonth()
        const d =
          new Date(times).getDate() < 10
            ? '0' + new Date(times).getDate()
            : new Date(times).getDate()
        result = m + '-' + d
      }
      return result
    },
    // 进入文章/问题/回答详情页面
    goDetailPage(type, id) {
      if (type === 1) {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      } else if (type === 2) {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else if (type === 3) {
        this.$router.push({
          path: '/known/detail/answer',
          query: {
            id,
          },
        })
      }
    },
    // 进入用户详情
    goUserDetail(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
    // 点赞（取消）
    async like(item) {
      const params = {
        handleUserId: this.$store.state.user.userId,
        handleUserName:
          this.$store.state.user.userName || this.$cookies.get('userId'),
        businessId: item.id,
        handleUserType: item.userType,
        dateType: item.type,
      }
      if (item.isApplaudFlag === 0) {
        params.handleType = 1
        const { code, message, data } = await this.$axios.post(
          knownApi.home.operation,
          params
        )
        this.flag = true
        if (code === 200) {
          this.$xToast.show({
            message: '点赞成功',
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
        } else {
          this.$xToast.show({
            message,
            duration: 1000,
            icon: 'toast_ic_remind',
            forbidClick: true,
          })
        }
      }
      // else {
      //   params.handleType = 2
      //   const { code, message, data } = await this.$axios.post(
      //     knownApi.home.operation,
      //     params
      //   )
      //   if (code === 200) {
      //   } else {
      //   }
      // }
    },
  },
}
</script>
<style lang="less" scoped>
.like_active {
  color: #4974f5 !important;
}
/deep/ .sp-cell {
  padding: 0 0 20px 0;
  position: relative;
}
.item {
  background: #ffffff;
  padding: 0 32px;
  margin-bottom: 20px;
  .item_title {
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 48px;
  }
  .item_Info {
    display: flex;
    padding: 28px 0 32px 0;
    align-items: center;

    .userPhoto {
      width: 66px;
      height: 66px;
      background: #6d7177;
      margin-right: 16px;
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .item_status {
      flex: 1;
      .userName {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #222222;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .item_time {
        height: 24px;
        font-size: 24px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;
        line-height: 24px;
      }
    }
  }
  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      margin: 17px 0 24px 0;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    img {
      display: block;
      width: 190px;
      height: 127px;
      background: #d8d8d8;
      border-radius: 12px;
      margin-left: 24px;
    }
  }
  .item_bottom {
    // width: 294px;
    // height: 28px;
    font-size: 28px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 28px;
    > .bottom_icon {
      display: inline-flex;
      > span {
        margin-left: 16px;
      }
    }
  }
}
</style>
