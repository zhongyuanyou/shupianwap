<template>
  <div class="invitationSearch">
    <header-slot>
      <div class="head">
        <div class="input_box">
          <my-icon name="sousuo3" color="#D8D8D8" size="0.28rem"></my-icon>
          <input
            ref="inputRef"
            v-model="keyword"
            type="text"
            placeholder="搜索你想邀请的人"
            @keyup.enter="keyClickHandle"
          />
          <my-icon
            v-show="keyword !== ''"
            name="guanbi_mian"
            color="#CCCCCC"
            size="0.32rem"
            @click.native="clearInput"
          ></my-icon>
        </div>
        <span class="cancel" @click="clooseHandle">取消</span>
        <!-- <Search
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
        </Search> -->
      </div>
    </header-slot>
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
          <img :src="item.avatar" alt="" @click="goUserInfo(item)" />
          <div class="name">
            {{ item.userName }}
          </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Sticky, List } from '@chipspc/vant-dgg'
// import Search from '@/components/common/search/Search'
import knownApi from '@/api/known'
import util from '@/utils/changeBusinessData'
import HeaderSlot from '@/components/common/head/HeaderSlot'

export default {
  name: 'InvitationSearch',
  components: {
    [Icon.name]: Icon,
    [Sticky.name]: Sticky,
    // Search,
    [List.name]: List,
    HeaderSlot,
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
    this.$refs.inputRef.focus()
    const _this = this
    this.$nextTick(() => {
      // _this.$refs.fieldInput.$refs.inputRef.focus()
    })
    this.questionId = this.$route.query.questionId
  },
  methods: {
    clearInput() {
      this.keyword = ''
      // this.$refs.fieldInput.$refs.inputRef.focus()
      this.$refs.inputRef.focus()
    },
    clooseHandle() {
      this.$back()
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
          data.records.forEach((item) => {
            item.custInvited = false
          })
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
          datas.custInvited = true
        } else {
          this.$xToast.show({
            message: data.error,
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
      if (item.custInvited) {
        return
      }
      this.inviteApi(item)
    },
    onLoad() {
      this.searchAnswerUserApi()
    },
    goUserInfo(item) {
      this.$router.push({
        path: '/known/home',
        query: { homeUserId: item.id, type: util.getUserType(item.type) },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.invitationSearch {
  min-height: 100vh;
  background: #fff;
  .head {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 24px;
    .input_box {
      width: 606px;
      height: 68px;
      background: #f3f3f3;
      display: flex;
      align-items: center;
      border-radius: 12px;
      padding: 0 24px;

      input {
        width: 460px;
        height: 68px;
        border: none;
        background: #f3f3f3;
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        margin: 0 20px 0 16px;
      }
    }
    .cancel {
      font-size: 32px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
    // /deep/.sp-sticky {
    //   border-bottom: 1px solid #f4f4f4;
    //   .search-content {
    //     padding: 0 24px;
    //     height: 88px;
    //     .input-box {
    //       position: relative;
    //       padding: 19px 12px;
    //       background: #f5f5f5;
    //       border-radius: 12px;
    //       height: 68px;
    //       width: 606px;
    //       border: none;
    //       input {
    //         background: #f5f5f5;
    //         width: 406px;
    //       }
    //       .search-icon {
    //         color: #cccccc !important;
    //       }
    //       .clear {
    //         position: absolute;
    //         right: 24px;
    //       }
    //     }
    //   }
    //   .cloose-btn {
    //     margin-left: 32px;
    //     font-size: 32px;
    //     font-family: PingFangSC-Medium, PingFang SC;
    //     font-weight: bold;
    //     color: #222222;
    //   }
    // }
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
        font-weight: bold;
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
          font-weight: bold;
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
          font-weight: bold;
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
