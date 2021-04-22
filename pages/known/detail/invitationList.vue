<template>
  <div class="invitationList">
    <header-slot>
      <div class="head">
        <Search
          :disabled="true"
          :icon-left="0.24"
          placeholder="搜索你想邀请的人"
          @clickInputHandle="keyClickHandle"
        >
          <template v-slot:left>
            <sp-icon name="arrow-left" size="0.4rem" @click="backPage" />
          </template>
        </Search>
      </div>
    </header-slot>
    <div class="recommend">
      <div class="titbox">
        <span>为你精选 {{ recommendList.length }} 位优质回答者</span>
        <p :class="[invitedAllFlag ? 'active' : '']" @click="invitAll()">
          {{ invitedAllFlag ? '已邀请' : '一键邀请' }}
        </p>
      </div>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="listbox"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="(item, index) in recommendList" :key="index" class="list">
          <img alt="" :src="item.avatar" @click="goUserInfo(item)" />
          <div class="name">{{ item.userName }}</div>
          <div
            class="invitation"
            :class="item.custInvited ? 'active' : ''"
            @click="invitItem(item)"
          >
            {{ item.custInvited ? '已邀请' : '邀请' }}
          </div>
        </div>
      </sp-list>
    </div>
    <!-- 加载组件 -->
    <LoadingCenter v-show="mackLoading" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Field, List, Sticky } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'
import Search from '@/components/common/search/Search'
import HeaderSlot from '@/components/common/head/HeaderSlot'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'InvitationList',
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
    [List.name]: List,
    Search,
    [Sticky.name]: Sticky,
    HeaderSlot,
    LoadingCenter,
  },
  data() {
    return {
      keywords: '',
      recommendList: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 50, // 这里一次请求所有数据 经过和付蔚杰沟通 2021/4/19
      questionId: '',
      invitedAllFlag: false,
      mackLoading: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    console.log(this.userInfo)
    this.questionId = this.$route.query.questionId
  },
  methods: {
    keyClickHandle() {
      this.$router.push({
        path: '/known/detail/invitationSearch',
        query: {
          questionId: this.questionId,
        },
      })
    },
    invitAll() {
      if (this.invitedAllFlag) {
        return
      }
      // 一键邀请
      this.inviteApi('all')
    },
    invitItem(item) {
      if (item.custInvited) {
        return
      }
      // 邀请单个
      this.inviteApi(item)
    },
    async recommendAnswerUserApi() {
      // 查询推荐回答用户
      try {
        const params = {
          page: this.page,
          limit: this.limit,
        }
        const { code, data } = await this.$axios.get(
          knownApi.question.recommendAnswerUser,
          { params }
        )
        if (code === 200) {
          data.rows.forEach((item) => {
            this.invitedAllFlag = false
            item.custInvited = false
          })
          this.recommendList.push(...data.rows)
          this.page++
          if (this.page > data.totalPage) {
            this.finished = true
          }
        } else {
          this.error = true
        }
        this.loading = false
      } catch (e) {
        this.error = true
        this.loading = false
      }
    },
    async inviteApi(datas) {
      this.mackLoading = true
      // 邀请用户回答
      try {
        const params = {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          handleUserType: util.getUserType(this.userInfo.userType),
          questionId: this.questionId,
        }
        if (datas === 'all') {
          params.invitedUsers = this.buildAllInvited()
        } else {
          params.invitedUsers = []
          params.invitedUsers.push({
            businessUserId: datas.id,
            businessUserName: datas.userName,
            businessUserType: util.getUserType(datas.type),
          })
        }
        const { code, data } = await this.$axios.post(
          knownApi.question.invite,
          params
        )
        if (code === 200) {
          this.mackLoading = false
          let message
          if (datas === 'all') {
            this.recommendList.forEach((item) => {
              item.custInvited = true
            })
            message = '一键邀请成功'
            this.invitedAllFlag = true
          } else {
            datas.custInvited = true
            message = '邀请成功'
          }
          this.$xToast.show({
            message,
            duration: 1000,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        } else {
          this.mackLoading = false
          this.$xToast.show({
            message: '邀请失败,请联系客服',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        }
      } catch (e) {
        this.mackLoading = false
        this.$xToast.show({
          message: '邀请失败,请联系客服',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
      }
    },
    onLoad() {
      this.recommendAnswerUserApi()
    },
    buildAllInvited() {
      const res = []
      for (let i = 0, l = this.recommendList.length; i < l; i++) {
        const item = {}
        item.businessUserId = this.recommendList[i].id
        item.businessUserName = this.recommendList[i].userName
        item.businessUserType = util.getUserType(this.recommendList[i].type)
        res.push(item)
      }
      return res
    },
    backPage() {
      this.$back()
    },
    goUserInfo(item) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: item.id, type: 2 },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.invitationList {
  min-height: 100vh;
  .head {
    height: 88px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px 0 24px;
    box-sizing: border-box;
    /deep/.search-content {
      background: #f3f3f3;
      border-radius: 12px;
      height: 88px;
      padding: 0;
      .input-box {
        width: 638px;
        background: #f5f5f5;
        border: none;
        box-shadow: none;
        height: 68px;
        margin-left: 16px;
        input {
          background: #f5f5f5;
        }
        .imitate-input {
          color: #999999;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
        }
      }
    }
  }
  .recommend {
    height: calc(100vh - 88px);
    > .titbox {
      height: 102px;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      padding: 0 32px;
      > span {
        font-size: 28px;
        font-weight: 400;
        color: #999999;
      }
      > p {
        margin-left: auto;
        font-size: 28px;
        font-weight: 500;
        color: #4974f5;
      }
      > p.active {
        color: #999;
      }
    }
    > .listbox {
      height: calc(100% - 102px);
      padding-bottom: 20px;
      box-sizing: border-box;
      overflow: auto;
      > .list {
        display: flex;
        margin-top: 58px;
        padding: 0 32px;
        align-items: center;
        > img {
          height: 72px;
          width: 72px;
          background: #d8d8d8;
          object-fit: cover;
          border-radius: 50%;
        }
        .name {
          margin-left: 24px;
          font-size: 30px;
          line-height: 72px;
          font-weight: 600;
          color: #222222;
          text-align: center;
        }
        .invitation {
          width: 144px;
          height: 72px;
          background: #4974f5;
          border-radius: 8px;
          text-align: center;
          line-height: 72px;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          margin-left: auto;
        }
        .invitation.active {
          background: #f5f5f5;
          color: #999999;
        }
      }
    }
  }
  .search {
    .listbox {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
