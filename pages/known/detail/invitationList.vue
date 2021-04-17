<template>
  <div class="invitationList">
    <div class="head">
      <Search
        :disabled="true"
        :icon-left="0.24"
        placeholder="搜索你想邀请的人"
        @clickInputHandle="keyClickHandle"
      >
        <template v-slot:left>
          <sp-icon name="arrow-left" size="0.4rem" @click="$router.back()" />
        </template>
      </Search>
    </div>
    <div class="recommend">
      <div class="titbox">
        <span>为你精选 {{ recommendList.length }} 位优质回答者</span>
        <p @click="invitAll()">一键邀请</p>
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
          <img :src="item.avatar" alt="" />
          <div class="content">
            <div class="name">{{ item.userName }}</div>
            <div class="desc">
              {{ item.desc }}
            </div>
          </div>
          <div class="invitation" @click="invitItem(item)">邀请</div>
        </div>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Field, List, Sticky } from '@chipspc/vant-dgg'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'
import Search from '@/components/common/search/Search'

export default {
  name: 'InvitationList',
  components: {
    [Icon.name]: Icon,
    [Field.name]: Field,
    [List.name]: List,
    Search,
    [Sticky.name]: Sticky,
  },
  data() {
    return {
      keywords: '',
      recommendList: [],
      actList: [],
      error: false,
      loading: false,
      finished: false,
      page: 1,
      totalPage: 1,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
    }),
    questionId() {
      return this.$route.query.questionId
    },
  },
  methods: {
    keyClickHandle() {
      this.$router.push('/known/detail/invitationSearch')
    },
    invitAll() {
      // 一键邀请
      this.inviteApi('all')
    },
    invitItem(item) {
      // 邀请单个
      this.inviteApi(item)
    },
    async recommendAnswerUserApi() {
      // 查询推荐回答用户
      try {
        const params = {
          page: this.page,
          limit: 10,
        }
        const { code, data } = await this.$axios.get(
          knownApi.question.recommendAnswerUser,
          { params }
        )
        if (code === 200) {
          if (!data.rows || data.rows.length === 0) {
            this.recommendList = []
            this.finished = true
          }
          this.recommendList.push(...data.rows)
          this.totalPage = data.totalPage
          this.page++
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
          let message
          if (data === 'all') {
            message = '一键邀请成功'
          } else {
            message = '邀请成功'
          }
          this.$xToast.show({
            message,
            duration: 1000,
            icon: 'toast_ic_comp',
            forbidClick: true,
          })
        } else {
          this.$xToast.show({
            message: '邀请失败,请联系客服',
            duration: 1000,
            icon: 'toast_ic_error',
            forbidClick: true,
          })
        }
      } catch (e) {
        this.$xToast.show({
          message: '邀请失败,请联系客服',
          duration: 1000,
          icon: 'toast_ic_error',
          forbidClick: true,
        })
      }
    },
    onLoad() {
      if (this.page > this.totalPage) {
        this.finished = true
        return
      }
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
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          object-fit: cover;
          border-radius: 50%;
        }
        .content {
          margin-left: 24px;
          .name {
            font-size: 30px;
            line-height: 26px;
            font-weight: 600;
            color: #222222;
            margin-bottom: 12px;
            margin-top: 3px;
          }
          .desc {
            font-size: 26px;
            line-height: 26px;
            color: #999999;
            width: 414px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
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
