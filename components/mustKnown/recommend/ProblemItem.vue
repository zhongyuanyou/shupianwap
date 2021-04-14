<template>
  <sp-list
    v-if="newspaperData.length"
    v-model="loading"
    :finished="finished"
    offset="0"
    finished-text="没有更多了"
  >
    <sp-cell v-for="(item, index) in newspaperData" :key="index">
      <div class="item_span">1/精选</div>
      <div class="item">
        <div class="item_title" @click="goDetailPage(item.type, item.id)">
          {{ item.title }}
        </div>
        <div class="item_Info">
          <div class="userPhoto" @click="goUserDetail(item.userId)">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="userName" @click="goUserDetail(item.userId)">
            {{ item.userName }}
          </div>
        </div>
        <div class="item_content" @click="goDetailPage(item.type, item.id)">
          <p class="content">
            {{ item.content }}
            {{ item.contentText }}
          </p>
          <img
            v-if="item.contentImageUrl"
            :src="item.contentImageUrl.split(',')[0]"
            alt=""
          />
        </div>
        <div class="item_bottom">
          <span class="like">{{ item.applaudCount / 10000 }}万赞同</span>
          <span class="comment"> · {{ item.remarkCount }}评论</span>
        </div>
      </div>
    </sp-cell>
  </sp-list>
</template>
<script>
import {
  Tab,
  Tabs,
  Icon,
  TopNavBar,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  PullRefresh,
  List,
  Cell,
  Image,
} from '@chipspc/vant-dgg'

export default {
  name: 'ProblemItem',
  components: {
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Icon.name]: Icon,
    [TopNavBar.name]: TopNavBar,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
    [Image.name]: Image,
  },

  props: {
    newspaperData: {
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
    }
  },
  methods: {
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
          homeUserId: userId,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.sp-list {
  padding-top: 59px;
}
/deep/ .sp-cell {
  padding: 0 0 47px 0;
  position: relative;
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
  background: linear-gradient(180deg, #f1f3fa 0%, #fafafa 100%);
  border-radius: 12px;
  padding: 44px 32px;

  .item_title {
    height: 36px;
    font-size: 36px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a1a1a;
    line-height: 36px;
  }
  .item_Info {
    display: flex;
    margin-top: 24px;
    align-items: center;
    .userPhoto {
      width: 44px;
      height: 44px;
      background: #6d7177;
      margin-right: 20px;
      border-radius: 50%;
      img {
        height: 100%;
        width: 100%;
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
  .item_content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .content {
      font-size: 30px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #555555;
      line-height: 54px;
      padding: 20px 0;
      margin-right: 0.32rem;
    }
    img {
      display: block;
      width: 190px;
      height: 127px;
      background: #cccccc;
      border-radius: 12px;
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
