<template>
  <div class="result">
    <sp-sticky>
      <Search
        ref="searchRef"
        v-model="value"
        :disabled="true"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        :style="{ paddingTop: (appInfo.statusBarHeight || 10) + 'px' }"
        @clickInputHandle="keyClickHandle"
      >
        <template v-slot:left>
          <sp-icon name="arrow-left" size="0.4rem" @click="$back()" />
        </template>
      </Search>
    </sp-sticky>
    <div class="tab">
      <p :class="tabIndex === '1' ? 'act' : ''" @click="changeTab('1')">
        <span>问题</span><i></i>
      </p>
      <p :class="tabIndex === '2' ? 'act' : ''" @click="changeTab('2')">
        <span>文章</span><i></i>
      </p>
      <p :class="tabIndex === '3' ? 'act' : ''" @click="changeTab('3')">
        <span>用户</span><i></i>
      </p>
    </div>
    <div v-show="tabIndex === '1' || tabIndex === '2'" class="listbox">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div
          v-for="(item, index) in searchList"
          :key="index"
          class="list"
          @click="toDetail(item.id)"
        >
          <h1 v-html="item.titleHtml"></h1>
          <div class="box">
            <div :style="{ width: item.contentImageUrl ? '464px' : '100%' }">
              <p v-html="item.contentTextHtml"></p>
              <div v-if="item.contentImageUrl" class="num">
                <span>{{ item.applaudCount }} 赞同</span>
                <i></i>
                <span>{{ item.remarkCount }} 评论</span>
                <i></i>
                <span>{{ item.createTime | fromatDate }} </span>
              </div>
            </div>
            <img
              v-if="item.contentImageUrl"
              :src="item.contentImageUrl"
              alt=""
            />
          </div>
          <div v-if="!item.contentImageUrl" class="num">
            <span>{{ item.applaudCount }} 赞同</span>
            <i></i>
            <span>{{ item.remarkCount }} 评论</span>
            <i></i>
            <span>{{ item.createTime | fromatDate }} </span>
          </div>
        </div>
      </sp-list>
    </div>
    <div v-show="tabIndex === '3'" class="userlist">
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <div v-for="item in userList" :key="item.id" class="list">
          <img :src="item.avatar" alt="" @click="toHome(item)" />
          <div class="name" v-html="item.userNameHtml"></div>
          <div class="applaudFlag" @click="attentionHandler(item)">
            <sp-icon
              v-if="!item.custAttentionFlag"
              name="plus"
              color="#4974F5"
              size="0.3rem"
            />
            <span
              :style="{ color: item.custAttentionFlag ? '#999999' : '#4974F5' }"
              >{{ item.custAttentionFlag ? '已关注' : '关注' }}</span
            >
          </div>
        </div>
      </sp-list>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Sticky, Icon, Dialog, List } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import knownApi from '@/api/known'
import utils from '@/utils/changeBusinessData'

export default {
  name: 'Searchresult',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
    [Dialog.name]: Dialog,
    [List.name]: List,
  },
  filters: {
    fromatDate(value) {
      if (!value) {
        return
      }
      return value.split(' ')[0]
    },
  },
  data() {
    return {
      searchList: [],
      userList: [],
      tabIndex: '1',
      value: '',
      page: 1,
      limit: 15,
      error: false,
      loading: false,
      finished: false,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo, // 登录的用户信息
      userId: (state) => state.user.userId, // userId 用于判断登录
    }),
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  mounted() {
    const query = this.$route.query
    this.tabIndex = query.type || '1'
    this.value = query.keyword
  },
  methods: {
    keyClickHandle() {
      this.$router.replace({
        path: '/known/search',
        query: { type: this.tabIndex, keyword: this.value },
      })
    },
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.id,
          type: utils.getUserType(item.type),
        },
      })
    },
    toDetail(id) {
      if (this.tabIndex === '2') {
        this.$router.push({
          path: '/known/detail/article',
          query: {
            id,
          },
        })
      } else {
        this.$router.push({
          path: '/known/detail/question',
          query: {
            id,
          },
        })
      }
    },
    changeTab(type) {
      if (this.tabIndex === type) {
        return
      }
      this.tabIndex = type
      this.initTab()
      this.onLoad()
    },
    initTab() {
      this.loading = true
      this.finished = false
      this.error = false
      this.page = 1
      this.searchList = []
      this.userList = []
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
    async getSearchListApi() {
      // 请求后台接口
      try {
        const res = await this.$axios.post(knownApi.search.list, {
          keyword: this.value,
          type: parseInt(this.tabIndex),
          limit: this.limit,
          page: this.page,
        })
        if (res.code === 200) {
          // 用户数据
          if (this.tabIndex === '3') {
            res.data.records.forEach((item) => {
              item.custAttentionFlag = false
            })
            this.userList.push(...res.data.records)
          } else {
            this.searchList.push(...res.data.records)
          }
          this.page++
          if (this.page > res.data.totalPage) {
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
    onLoad() {
      this.getSearchListApi()
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  background: #f5f5f5;
  min-height: 100vh;
  /deep/.sp-sticky {
    .search-content {
      padding-left: 24px;
      padding-right: 32px;
    }
    .input-box {
      background: #f5f5f5;
      border: none;
      box-shadow: none;
      height: 64px;
      margin-left: 16px;
      input {
        background: #f5f5f5;
      }
      .imitate-input {
        color: #000;
      }
    }
    .cloose-btn {
      margin-left: 32px;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
    }
  }
  > .tab {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    > p {
      width: 250px;
      height: 30px;
      font-size: 30px;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
      text-align: center;
      > i {
        width: 28px;
        height: 6px;
        background: #4974f5;
        border-radius: 3px;
        display: none;
        margin: 10px auto 0 auto;
      }
    }
    > .act {
      font-weight: 600;
      color: #222222;
      > i {
        display: block;
      }
    }
  }
  > .listbox {
    .list {
      padding: 40px 32px;
      background: #fff;
      margin-top: 20px;
      > h1 {
        font-size: 36px;
        font-weight: 500;
        color: #222222;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      > .box {
        display: flex;
        margin-top: 18px;
        align-items: center;
        > div {
          > p {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
          }
          > .num {
            width: 464px;
            display: flex;
            align-items: center;
            margin-top: 16px;
            > span {
              font-size: 24px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
            > i {
              width: 4px;
              height: 4px;
              background: #999999;
              border-radius: 50%;
              margin: 0 16px;
              display: block;
            }
          }
        }
        > img {
          width: 190px;
          height: 127px;
          background: #d8d8d8;
          border-radius: 12px;
          margin-left: 32px;
          object-fit: cover;
        }
      }
      > .num {
        width: 464px;
        display: flex;
        align-items: center;
        margin-top: 16px;
        > span {
          font-size: 24px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #999999;
        }
        > i {
          width: 4px;
          height: 4px;
          background: #999999;
          border-radius: 50%;
          margin: 0 16px;
          display: block;
        }
      }
    }
  }
  > .userlist {
    // background: #fff;
    // margin-top: 20px;
    // padding-top: 40px;
    .list {
      display: flex;
      padding-top: 20px;
      align-items: center;
      padding: 0 32px 40px 32px;
      box-sizing: border-box;
      margin-top: 16px;
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
      }
      .applaudFlag {
        width: 144px;
        height: 64px;
        background: #f5f5f5;
        border-radius: 8px;
        font-size: 26px;
        font-weight: 500;
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
  }
}
</style>
