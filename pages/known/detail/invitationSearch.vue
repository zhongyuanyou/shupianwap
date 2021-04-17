<template>
  <div class="invitationSearch">
    <div class="head">
      <sp-sticky>
        <Search
          ref="fieldInput"
          v-model="keyword"
          :icon-left="0.12"
          placeholder="搜索你想邀请的人"
          @searchKeydownHandle="keyClickHandle"
        >
          <template v-slot:center>
            <sp-icon
              v-show="keyword != ''"
              name="clear"
              class="clear"
              color="#CCCCCC"
              size="0.35rem"
              @click="clearInput"
            />
          </template>
          <template v-slot:right>
            <a
              class="cloose-btn"
              href="javascript:void(0);"
              @click="clooseHandle"
              >取消</a
            >
          </template>
        </Search>
      </sp-sticky>
    </div>
    <div class="recommend search">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="listbox"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        :immediate-check="false"
        @load="onLoad"
      >
        <div v-for="(item, index) in searchList" :key="index" class="list">
          <img :src="item.avatar" alt="" />
          <div class="name">
            {{ item.userName }}
          </div>
          <div class="invitation" @click="invitItem(item)">邀请</div>
        </div>
      </sp-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Sticky, List } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'

export default {
  name: 'InvitationSearch',
  components: {
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    Search,
    [List.name]: List,
  },
  data() {
    return {
      keyword: '',
      searchList: [],
      questionId: '',
      error: false,
      loading: false,
      finished: false,
      page: 1,
      limit: 15,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo, // 登录的用户信息
      userId: (state) => state.user.userId, // userId 用于判断登录
      userType: (state) => state.user.userType,
    }),
  },
  mounted() {
    const _this = this
    this.$nextTick(() => {
      _this.$refs.fieldInput.$refs.inputRef.focus()
    })
    this.questionId = this.$route.query.questionId
  },
  methods: {
    clearInput() {
      this.keyword = ''
      this.$refs.fieldInput.$refs.inputRef.focus()
    },
    clooseHandle() {
      this.$router.push({
        path: '/known/detail/invitationList',
        query: { questionId: this.questionId, fromPage: 'invitationSearch' },
      })
    },
    keyClickHandle() {
      this.init()
      this.onLoad()
    },
    init() {
      this.searchList = []
      this.finished = false
      this.loading = true
      this.error = false
      this.page = 1
    },
    async searchAnswerUserApi() {
      // 搜索回答用户
      try {
        const params = {
          page: this.page,
          limit: this.limit,
          keyword: this.keyword,
        }
        const { code, data } = await this.$axios.get(
          knownApi.question.searchAnswerUser,
          { params }
        )
        if (code === 200) {
          this.searchList.push(...data.records)
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
      // 邀请用户回答
      try {
        const params = {
          handleUserId: this.userId,
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserType: util.getUserType(this.userType),
          questionId: this.questionId,
        }
        params.invitedUsers = []
        params.invitedUsers.push({
          businessUserId: datas.id,
          businessUserName: datas.userName,
          businessUserType: util.getUserType(datas.type),
        })
        const { code, data } = await this.$axios.post(
          knownApi.question.invite,
          params
        )
        if (code === 200) {
          this.$xToast.show({
            message: '邀请成功',
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
    invitItem(item) {
      this.inviteApi(item)
    },
    onLoad() {
      this.searchAnswerUserApi()
    },
  },
}
</script>

<style lang="less" scoped>
.invitationSearch {
  min-height: 100vh;
  .head {
    height: 88px;
    width: 100%;
    display: flex;
    align-items: center;
    padding-left: 24px;
    box-sizing: border-box;
    /deep/.sp-sticky {
      border-bottom: 1px solid #dddddd;
      .search-content {
        padding: 0 24px;
        height: 88px;
        .input-box {
          position: relative;
          padding: 19px 12px;
          background: #f5f5f5;
          border-radius: 12px;
          height: 68px;
          width: 606px;
          border: none;
          input {
            background: #f5f5f5;
            width: 406px;
          }
          .search-icon {
            color: #cccccc !important;
          }
          .clear {
            position: absolute;
            right: 24px;
          }
        }
      }
      .cloose-btn {
        margin-left: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 600;
        color: #222222;
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
