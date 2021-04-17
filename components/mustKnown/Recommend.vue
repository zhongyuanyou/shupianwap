<template>
  <sp-pull-refresh
    v-model="refreshing"
    success-text="刷新成功"
    pulling-text="下拉即可刷新..."
    loosing-text="释放即可刷新..."
    loading-text="加载中..."
    @refresh="onRefresh"
  >
    <sp-list
      v-model="loading"
      :finished="finished"
      offset="0"
      finished-text="没有更多了"
      @load="recommendList"
    >
      <sp-cell v-for="(item, index) in list" :key="index">
        <div class="item">
          <div class="item_title" @click="goDetailPage(item.type, item.id)">
            {{ item.title }}
          </div>

          <div class="item_content">
            <div class="item_content_lf">
              <div class="item_Info">
                <div class="userPhoto" @click="goUserDetail(item)">
                  <img :src="item.avatar" alt="" />
                </div>
                <div class="userName">{{ item.userName }}</div>
              </div>
              <p class="content" @click="goDetailPage(item.type, item.id)">
                {{ item.contentText }}
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
            <span class="like"> {{ item.applaudCount }}赞同</span>
            <span class="comment"> · {{ item.answerCount }} 评论</span>
          </div>
        </div>
      </sp-cell>
    </sp-list>
  </sp-pull-refresh>
</template>
<script>
import { PullRefresh, List, Cell } from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
export default {
  name: 'Index',
  components: {
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
    [Cell.name]: Cell,
  },

  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      list: [],
    }
  },
  methods: {
    onRefresh() {
      this.finished = false
      this.list = []
      this.page = 1
      this.loading = true
      this.refreshing = false
      this.recommendList()
    },
    // 请求推荐列表数据
    async recommendList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.recommendList,
        {
          params: {
            limit: this.limit,
            page: this.page,
          },
        }
      )
      if (code === 200) {
        this.list = this.list.concat(data.rows)
        this.loading = false
        this.page++
        if (this.page > data.totalPage) {
          this.finished = true
        }
      } else {
        console.log(message)
        this.loading = false
        this.finished = true
      }
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
  },
}
</script>
<style lang="less" scoped>
/deep/ .sp-cell {
  padding: 0 0 20px 0;
  position: relative;
  background: none;
}
/deep/ .sp-list {
  padding-bottom: 110px;
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
        word-break: break-all;
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
