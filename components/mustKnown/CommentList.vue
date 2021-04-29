<template>
  <div class="comment">
    <sp-popup
      v-model="popupShow"
      position="bottom"
      :style="{ height: '95%' }"
      round
      close-icon="close"
      :close-on-click-overlay="false"
    >
      <div class="head">
        全部评论
        <img
          class="icon"
          src="~/assets/knownImg/close_icon.png"
          alt=""
          @click="popupShow = false"
        />
      </div>
      <div class="btns">
        <span>评论 {{ total }}</span>
        <p>
          <i :class="{ right: sort }"></i>
          <span
            v-for="(item, index) in ['默认', '时间']"
            :key="index"
            :class="{ act: sort === index }"
            @click="sortfn(index)"
            >{{ item }}</span
          >
        </p>
      </div>
      <sp-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        class="listbox"
        @load="getCommentsList"
      >
        <div v-for="(item, index) in list" :key="index" class="list">
          <img :src="item.avatar" alt="" @click="toHome(item)" />
          <div class="user">
            <h1>{{ item.userName }}</h1>
            <p>{{ item.content }}</p>
            <div>
              <span>{{ item.createTime }}</span>
              <div>
                <my-icon
                  name="dianzan"
                  size="0.32rem"
                  :color="item.isApplaud ? '#4974f5' : '#999999'"
                  @click.native="Applaud(item)"
                ></my-icon>
                {{ item.applaudCount }}
              </div>
            </div>
          </div>
        </div>
      </sp-list>
      <sp-bottombar safe-area-inset-bottom>
        <sp-field
          v-model.trim="content"
          maxlength="100"
          style="font-size: 16px; padding-left: 0"
          placeholder="请输入您的评论内容"
        />
        <p
          :style="{ color: content ? 'rgba(73, 116, 245, 1)' : '' }"
          @click="publish"
        >
          发布
        </p>
      </sp-bottombar>
    </sp-popup>

    <LoadingCenter v-show="mackLoading" />
  </div>
</template>

<script>
import { Popup, Field, List, Toast, Bottombar } from '@chipspc/vant-dgg'
import { knownApi } from '~/api'
import LoadingCenter from '@/components/common/loading/LoadingCenter'
export default {
  name: 'CommentList',
  components: {
    [Popup.name]: Popup,
    [Field.name]: Field,
    [List.name]: List,
    [Bottombar.name]: Bottombar,
    LoadingCenter,
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    articleId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      mackLoading: false,
      loading: false,
      finished: false,
      sort: 0, // 0 默认 1 时间
      content: '',
      list: [],
      page: 1,
      total: 0, // 总数
      lll: 33333,
    }
  },
  computed: {
    popupShow: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    userInfo() {
      return this.$store.state.user
    },
  },
  watch: {
    popupShow(val) {
      if (val) {
        this.sort = 0
        this.init()
      }
    },
  },
  methods: {
    sortfn(index) {
      if (this.sort !== index) {
        this.sort = index
        this.init()
      }
    },
    init() {
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.getCommentsList()
    },
    async getCommentsList() {
      const { code, message, data } = await this.$axios.post(
        knownApi.comments.list,
        {
          currentUserId: this.userInfo.userId,
          sourceIds: this.articleId,
          orderBy: this.sort,
          page: this.page,
        }
      )
      if (code === 200) {
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
    async Applaud(item) {
      if (!(await this.isLogin())) {
        return
      }
      this.mackLoading = true
      const { code, message, data } = await this.$axios.post(
        knownApi.comments.like,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName,
          businessId: item.id,
          handleType: item.isApplaud ? 2 : 1,
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
        }
      )
      this.mackLoading = false
      if (code === 200) {
        if (item.isApplaud) {
          item.applaudCount--
          item.isApplaud = 0
        } else {
          item.applaudCount++
          item.isApplaud = 1
        }
      } else {
        console.log(message)
      }
    },
    async isLogin() {
      const res = await this.$isLogin()
      if (res === 'app_login_success') {
        this.init()
        return false
      }
      return true
    },
    async publish() {
      if (!(await this.isLogin())) {
        return
      }
      if (!this.content) {
        return
      }
      this.mackLoading = true
      const { code, message, data } = await this.$axios.post(
        knownApi.comments.publish,
        {
          content: this.content,
          sourceId: this.articleId,
          sourceType: 2, // 2 文章 3 回答
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          userType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2, // 1 普通用户 2 规划师
        }
      )
      this.mackLoading = false
      if (code === 200) {
        Toast({
          message: '发布成功',
          iconPrefix: 'sp-iconfont',
          icon: 'popup_ic_success',
        })
        this.list.unshift(data)
        this.content = ''
        this.total++
      } else {
        console.log(message)
      }
    },
    toHome(item) {
      this.$router.push({
        path: '/known/home',
        query: {
          homeUserId: item.userId,
          type: item.userType,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  .head {
    height: 108px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 34px;
    color: #1a1a1a;
    position: relative;
    font-weight: bold;
    > .icon {
      position: absolute;
      right: 32px;
      top: 38px;
      width: 48px;
      height: 48px;
    }
  }
  .btns {
    font-size: 32px;
    color: #222222;
    height: 96px;
    display: flex;
    align-items: center;
    padding: 0 32px;
    > span {
      font-weight: bold;
    }
    > p {
      margin-left: auto;
      width: 156px;
      height: 56px;
      background: #f5f5f5;
      border-radius: 28px;
      display: flex;
      padding: 4px;
      box-sizing: border-box;
      position: relative;
      > span {
        font-size: 24px;
        font-weight: bold;
        color: #999;
        display: block;
        height: 48px;
        width: 74px;
        position: relative;
        z-index: 1;
        text-align: center;
        line-height: 48px;
      }
      > .act {
        color: #222;
      }
      > i {
        width: 74px;
        height: 48px;
        background: #fff;
        border-radius: 28px;
        position: absolute;
        z-index: 0;
        left: 4px;
        top: 4px;
        transition: all 0.2s;
      }
      > .right {
        left: 78px;
        transition: all 0.2s;
      }
    }
  }
  .listbox {
    height: calc(100% - 300px);
    padding: 0 32px;
    overflow: auto;
    > .list {
      display: flex;
      margin-bottom: 30px;
      padding-top: 8px;
      > img {
        width: 60px;
        height: 60px;
        background: #d8d8d8;
        border-radius: 50%;
        object-fit: cover;
      }
      .user {
        margin-left: 20px;
        flex: 1;
        > h1 {
          font-size: 30px;
          color: #555555;
        }
        > p {
          margin-top: 14px;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
        }
        > div {
          margin-top: 20px;
          display: flex;
          align-items: center;
          font-size: 24px;
          font-weight: 400;
          color: #999999;
          > div {
            margin-left: auto;
          }
        }
      }
    }
  }
  /deep/.sp-bottombar {
    border-top: 1px solid #f4f4f4;
    display: flex;
    align-items: center;
    padding-right: 32px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    /deep/.sp-cell {
      width: 610px;
    }
    .sp-cell::after {
      display: none;
    }
    > p {
      margin-left: auto;
      font-size: 30px;
      font-weight: bold;
      width: 80px;
      color: rgba(73, 116, 245, 0.4);
    }
  }
}
</style>
