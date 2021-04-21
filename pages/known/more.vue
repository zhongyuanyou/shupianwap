<template>
  <div class="container">
    <Header title="关注更多" />

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
          @click="toHome(item.id)"
        />
        <div class="user_info">
          <div class="title">{{ item.userName }}</div>
          <!-- <div class="introduce">{{ item.desc }}</div> -->
        </div>
        <div
          class="bt"
          :class="{ bt_have: item.isAttention }"
          @click="handle(item)"
        >
          {{ item.isAttention ? '已关注' : '+ 关注' }}
        </div>
      </div>
    </sp-list>
  </div>
</template>
<script>
import { TopNavBar, Image, List, Dialog } from '@chipspc/vant-dgg'
import { knownApi } from '~/api'
import Header from '@/components/common/head/header'
export default {
  name: 'AttentionMore',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Image.name]: Image,
    [List.name]: List,
    [Dialog.name]: Dialog,
    Header,
  },
  data() {
    return {
      loading: false,
      finished: false,
      attention_btn: {},
      list: [],
      page: 1,
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
  },
  methods: {
    toHome(id) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: id,
          type: 2,
        },
      })
    },
    async handle(item) {
      if (!(await this.$isLogin())) {
        return
      }
      item.isAttention ? this.cancelAttention(item) : this.attention(item)
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
          handleType: item.isAttention ? 2 : 1,
          attentionUserId: item.id,
          attentionUserName: item.userName,
          attentionUserType: 2, // 推荐的用户都是规划师
        }
      )
      if (code === 200) {
        this.$xToast.show({
          message: item.isAttention ? '取关成功' : '关注成功',
          duration: 1000,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
        item.isAttention = !item.isAttention
      } else {
        console.log(message)
      }
    },
    async getList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.attentionMore,
        {
          page: this.page,
        }
      )
      if (code === 200) {
        data.rows.forEach((item) => {
          item.isAttention = false
        })
        this.list = this.list.concat(data.rows)
        this.total = data.total
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
  },
}
</script>
<style lang="less" scoped>
.container {
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
        background: #4974f5;
        color: #ffffff;
        border-radius: 8px;
        text-align: center;
        line-height: 64px;
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
      }
      .bt_have {
        background: #f5f5f5;
        color: #999999;
      }
    }
  }
}
</style>
