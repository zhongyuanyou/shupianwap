<template>
  <sp-list
    v-if="normalListData.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
    @scroll="handleScollList"
  >
    <sp-cell v-for="(item, index) in normalListData" :key="index">
      <div class="item">
        <div class="item_title" @click="goDetailPage(item.type, item.id)">
          {{ item.title }}
        </div>

        <div class="item_content">
          <div class="item_content_lf">
            <div class="item_Info">
              <div class="userPhoto" @click="goUserDetail(item.userId)">
                <img :src="item.avatar" alt="" />
              </div>
              <div class="userName">{{ item.userName }}</div>
            </div>
            <p class="content" @click="goDetailPage(item.type, item.id)">
              {{ item.content }}
            </p>
          </div>

          <img
            v-if="item.contentImageUrl"
            :src="item.contentImageUrl.split(',')[0]"
            class="content_img"
            alt=""
          />
        </div>
        <div class="item_bottom">
          <span class="like">
            {{ applaudNumber(item.applaudCount) }}万赞同</span
          >
          <span class="comment" @click="showComment(item.id)">
            · {{ item.answerCount }} 评论</span
          >
        </div>
      </div>
    </sp-cell>
    <comment-list v-model="commentShow" :article-id="articleId"></comment-list>
  </sp-list>
</template>
<script>
import {
  Tab,
  Tabs,
  TopNavBar,
  Toast,
  PullRefresh,
  List,
  Cell,
} from '@chipspc/vant-dgg'
import CommentList from '@/components/mustKnown/CommentList'
export default {
  name: 'ListItem',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    CommentList,
  },

  props: {
    normalListData: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      loading: true,
      finished: false,
      commentShow: false,
      articleId: '1',
    }
  },
  watch: {
    normalListData(newData, oldData) {
      console.log('newData', newData)
    },
  },
  methods: {
    handleScollList(e) {
      console.log('列表滚动', e)
      // this.throttle(this.scollChange(), 500, 1000)
    },
    applaudNumber(browseCount) {
      return browseCount / 10000
    },
    showComment(id) {
      console.log('id', id)
      this.articleId = id
      this.commentShow = true
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
  background: none;
}
.item_span {
  width: 94px;
  height: 40px;
  background: #4974f5;
  border-radius: 4px;
  position: absolute;
  top: -20px;
  right: 32px;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #ffffff;
  line-height: 0.4rem;
  text-align: center;
}
.item {
  background: #fff;
  border-radius: 12px;
  padding: 24px 32px 28px 28px;

  .item_title {
    height: 36px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 36px;
  }

  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    .item_content_lf {
      .item_Info {
        display: flex;
        margin-top: 16px;
        margin-bottom: 12px;
        align-items: center;
        .userPhoto {
          width: 40px;
          height: 40px;
          background: #6d7177;
          margin-right: 20px;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            vertical-align: unset;
          }
        }
        .userName {
          height: 26px;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #222222;
          line-height: 26px;
        }
      }
      .content {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #555555;
        line-height: 42px;
        // margin-right: 0.32rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }

    .content_img {
      display: block;
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
      margin-top: 21px;
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
