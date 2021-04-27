<template>
  <div>
    <div class="container_news_see">
      <div
        class="news"
        @click="
          $router.push({
            path: '/known/newspaper',
            query: {
              id: subjectList ? subjectList[0].id : '',
            },
          })
        "
      >
        <div class="news_num">{{ new Date().getDate() }}</div>
        <div class="news_span">
          {{ subjectList[0] ? subjectList[0].name : '日报精选' }}
        </div>
      </div>
      <div
        class="see"
        @click="
          $router.push({
            path: '/known/mustSee',
            query: {
              id: subjectList ? subjectList[1].id : '',
            },
          })
        "
      >
        <div class="see_like">
          <my-icon name="dianzan" size="0.24rem" color="#564499"></my-icon>
        </div>
        <div class="see_span">
          {{ subjectList[1] ? subjectList[1].name : '进站必看' }}
        </div>
      </div>
    </div>
    <sp-pull-refresh
      v-model="refreshing"
      success-text="刷新成功"
      pulling-text="下拉即可刷新..."
      loosing-text="释放即可刷新..."
      loading-text="加载中..."
      @refresh="onRefresh"
    >
      <ItemCard :list-data="list" />
    </sp-pull-refresh>
  </div>
</template>
<script>
import { Image, PullRefresh } from '@chipspc/vant-dgg'
import ItemCard from './ItemCard'
import { knownApi } from '~/api'
export default {
  name: 'Index',
  components: {
    [PullRefresh.name]: PullRefresh,
    [Image.name]: Image,
    ItemCard,
  },
  props: {
    categoryId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      subjectList: [],
      list: [],
      refreshing: false,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  created() {
    this.getSubjectList()
    this.hotList()
  },
  methods: {
    // 请求专题列表数据
    async getSubjectList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.subjectList
      )
      if (code === 200) {
        if (data.length > 0) {
          this.subjectList.push(data[1])
          this.subjectList.push(data[2])
        }
      }
    },
    onRefresh() {
      this.refreshing = false
      this.hotList()
    },
    // 请求热榜列表数据
    async hotList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.list,
        {
          categorIds: [this.categoryId],
          page: 1,
          limit: 50,
          currentUserId: this.userInfo.userId,
        }
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.list = data.rows
        }
      }
    },
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
    comments(id) {
      this.$emit('comments', id)
    },
    invitation(id) {
      this.$router.push({
        path: '/known/detail/invitationList',
        query: {
          questionId: id,
        },
      })
    },
    answer(id) {
      this.$router.push({
        path: '/known/publish/answer',
        query: {
          id,
        },
      })
    },
  },
}
</script>
<style lang="less" scoped>
.container_news_see {
  height: 136px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
  margin-bottom: 24px;
  .news {
    width: 329px;
    height: 88px;
    background: #dbe4fd;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;

    .news_num {
      width: 48px;
      height: 48px;
      background: #ffffff;
      border-radius: 50%;
      font-size: 22px;
      font-family: SourceHanSansCN-Medium, SourceHanSansCN;
      font-weight: 500;
      color: #133aa3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .news_span {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #133aa3;
      margin-left: 12px;
    }
  }
  .see {
    width: 329px;
    height: 88px;
    background: #d8cffa;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    .see_like {
      width: 48px;
      height: 48px;
      background: #ffffff;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .see_span {
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #564499;
      margin-left: 12px;
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
