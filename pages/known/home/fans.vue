<template>
  <div class="attention_container">
    <!-- <sp-top-nav-bar
      title="粉丝"
      :fixed="true"
      left-arrow
      @on-click-left="$router.back()"
    /> -->
    <Header title="粉丝" />

    <sp-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="list_container"
      @load="getList"
    >
      <div v-for="(item, index) in list" :key="index" class="item">
        <sp-image
          round
          class="user_avatar"
          fit="cover"
          :src="item.avatar"
          @click="toHome(item)"
        />
        <div class="user_info">
          <div class="title">{{ item.inviteeName }}</div>
          <!-- <div class="introduce">{{ item.desc }}</div> -->
        </div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { TopNavBar, Image, List } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { knownApi } from '~/api'
export default {
  name: 'Fans',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Image.name]: Image,
    [List.name]: List,
    Header,
  },
  data() {
    return {
      active: 0,
      content: '',
      list: [],
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {},
  methods: {
    tabChange() {
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.getList()
    },
    async getList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.home.focusFansList,
        {
          params: {
            handleUserId: this.$route.query.homeUserId || this.userInfo.userId,
            handleType: 2,
            page: this.page,
            limit: this.limit,
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
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.inviteeId,
          type: item.inviteeType,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.attention_container {
  height: 100%;
  background-color: #f8f8f8;

  /deep/ .sp-top-nav-bar {
    height: 88px;
  }

  .list_container {
    .item {
      background: #ffffff;
      padding: 28px 32px 28px;
      display: flex;
      align-items: center;

      .user_avatar {
        width: 72px;
        height: 72px;
        margin-right: 24px;
      }
      .user_info {
        flex: 1;
        .title {
          font-size: 30px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: bold;
          color: #222222;
          line-height: 30px;
          margin-right: 30px;
        }
        .introduce {
          margin-top: 12px;
          font-size: 26px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
          line-height: 26px;
          width: 414px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
}
</style>
