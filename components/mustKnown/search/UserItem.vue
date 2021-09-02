<template>
  <div class="item">
    <img :src="item.avatar" alt="" @click="toHome(item)" />
    <div class="name" v-html="item.userNameHtml"></div>
    <div class="applaudFlag" @click="attentionHandler(item)">
      <my-icon
        v-if="!item.custAttentionFlag"
        name="tianjia"
        size="0.27rem"
        color="#4974F5"
      ></my-icon>
      <span
        :style="{ color: item.custAttentionFlag ? '#999999' : '#4974F5' }"
        >{{ item.custAttentionFlag ? '已关注' : '关注' }}</span
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import utils from '@/utils/changeBusinessData'
import knownApi from '@/api/known'

export default {
  name: 'KnownSearchUserItem',
  props: {
    userItem: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
    }),
    item() {
      return this.userItem
    },
  },
  methods: {
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.id,
          type: utils.getUserType(item.type),
        },
      })
    },
    async attentionHandler(item) {
      // 先判断是否登录
      const result = await this.$isLogin()
      if (result === 'app_login_success') {
        return
      }
      try {
        const res = await this.$axios.post(knownApi.home.attention, {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: item.custAttentionFlag ? 2 : 1,
          attentionUserId: item.id,
          attentionUserName: item.userName,
          attentionUserType: item.type === 'ORDINARY_USER' ? 1 : 2,
        })
        if (res.code === 200) {
          // 重新构建页面数据,处理关注状态
          item.custAttentionFlag = !item.custAttentionFlag
          let message
          if (item.custAttentionFlag) {
            message = '关注成功'
          } else {
            message = '取关成功'
          }
          this.$xToast.show({
            message,
            duration: 1000,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        }
      } catch (e) {
        this.$xToast.show({
          message: '请求失败,请联系客服',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.item {
  > img {
    width: 74px;
    height: 74px;
    background: #d8d8d8;
    border-radius: 50%;
  }
  .name {
    flex: 1;
    margin-left: 24px;
    font-size: 36px;
    font-weight: bold;
  }
  .applaudFlag {
    width: 144px;
    height: 64px;
    background: #f5f5f5;
    border-radius: 8px;
    font-size: 26px;
    font-weight: bold;
    color: #4974f5;
    margin-left: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      margin-left: 13px;
    }
  }
}
</style>
