<template>
  <div class="attention_container">
    <!-- <sp-top-nav-bar
      title="关注"
      :fixed="true"
      left-arrow
      @on-click-left="$router.back()"
    /> -->

    <Header title="关注" />

    <sp-tabs
      v-model="active"
      title-active-color="#4974F5"
      title-inactive-color="#222222"
      @change="tabChange"
    >
      <sp-tab
        v-for="(item, index) in ['用户', '规划师']"
        :key="index"
        :title="item"
      ></sp-tab>
    </sp-tabs>

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
          @click="toHome(item.inviteeId)"
        />
        <div class="user_info">
          <div class="title">{{ item.inviteeName }}</div>
          <div class="introduce">{{ item.desc }}</div>
        </div>
        <div class="bt" @click="cancelAttention(item)">已关注</div>
      </div>
    </sp-list>
  </div>
</template>

<script>
import { TopNavBar, Tabs, Tab, Image, List, Dialog } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import { knownApi } from '~/api'
export default {
  name: 'Attention',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    [Dialog.name]: Dialog,
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
            handleType: 1,
            userType: this.active ? 2 : 1, // 1普通用户 2规划师
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
    cancelAttention(item) {
      Dialog.confirm({
        title: '温馨提示',
        message: '确定不再关注当前用户吗？',
      }).then(() => {
        this.attention(item)
      })
    },
    async attention(item) {
      const { code, message } = await this.$axios.post(
        knownApi.home.attention,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: 2,
          attentionUserId: item.inviteeId,
          attentionUserName: item.inviteeName,
          attentionUserType: item.inviteeType,
        }
      )
      if (code === 200) {
        this.$xToast.show({
          message: '取关成功',
          duration: 1000,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
        this.tabChange()
      } else {
        console.log(message)
      }
    },
    toHome(id) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: id,
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

  .sp-tabs {
    position: fixed;
    left: 0;
    top: 88px;
    z-index: 2;
    width: 100%;
    height: 80px;
    border-bottom: 1px solid #dddddd;
  }

  /deep/ .sp-tabs__line {
    width: 28px;
    height: 6px;
    border-radius: 3px;
    bottom: 34px;
  }

  .list_container {
    padding-top: 80px;
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
          font-weight: 500;
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
      .bt {
        width: 144px;
        height: 64px;
        background: #f5f5f5;
        border-radius: 8px;
        text-align: center;
        line-height: 64px;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
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
