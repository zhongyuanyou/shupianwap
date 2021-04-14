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
          <div class="userPhoto" @click="goUserDetail(item.userId)">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="item_status">
            <div class="userName" @click="goUserDetail(item.userId)">
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
          <span v-if="item.isAnswerFlag === 0" @click="invite()">
            <my-icon
              name="yaoqing"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem"
            ></my-icon>
            邀请
          </span>
          <span v-if="item.isAnswerFlag === 0" @click="openAnswer(item.id)">
            <my-icon
              name="xiehuida"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem"
            ></my-icon>
            写回答
          </span>

          <span v-if="item.isAnswerFlag !== 0">
            <my-icon
              name="zantong"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem"
            ></my-icon
            >赞同{{ item.applaudCount }}</span
          >
          <span v-if="item.isAnswerFlag !== 0" @click="showComment">
            <my-icon
              name="pinglun"
              size="0.36rem"
              color="#999999"
              class="my_icon"
              style="margin-right: 0.16rem; margin-left: 0.26rem"
            ></my-icon
            >评论{{ item.remarkCount }}
          </span>
        </div>
      </div>
    </sp-cell>
    <comment-list
      v-model="commentShow"
      :article-id="'1'"
      @release="release"
    ></comment-list>
  </sp-list>
</template>
<script>
import { Cell, List } from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
// import time from '@/utils/time'

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
    }
  },
  watch: {
    listData(newName, oldName) {},
  },
  mounted() {},

  methods: {
    release() {
      console.log('点击了发布')
    },
    showComment() {
      console.log('点击了评论')
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
    goUserDetail(userId) {
      this.$router.push({
        path: '/known/home',
        query: {
          userId,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
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
  }
}
</style>
