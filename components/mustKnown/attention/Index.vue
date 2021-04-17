<template>
  <div>
    <template v-if="userData.length">
      <VisitUser :user-data="userData" />
      <AttentionItem />
    </template>
    <NotAttention v-else />
  </div>
</template>
<script>
import VisitUser from './VisitUser'
import AttentionItem from './AttentionItem'
import NotAttention from './NotAttention'
import { knownApi } from '@/api'
export default {
  name: 'Index',
  components: {
    VisitUser,
    AttentionItem,
    NotAttention,
  },

  data() {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 10,
      list: [],
      userData: [],
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  created() {
    if (this.userInfo.userId) {
      this.focusFansList()
    }
  },
  methods: {
    // 请求关注用户的数据
    async focusFansList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.home.focusFansList,
        {
          params: {
            handleUserId: this.userInfo.userId,
            handleType: 1,
            limit: 50, // 最多只取50条数据
            page: 1,
          },
        }
      )
      if (code === 200) {
        this.userData = data.rows
      }
    },
  },
}
</script>
<style lang="less" scoped></style>
