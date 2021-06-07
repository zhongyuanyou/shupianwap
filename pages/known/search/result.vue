<template>
  <div class="result">
    <header-slot>
      <Search
        ref="searchRef"
        v-model="value"
        :disabled="true"
        :icon-left="0.24"
        placeholder="请输入搜索内容"
        @clickInputHandle="keyClickHandle"
      >
        <template v-slot:left>
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#1a1a1a"
            class="my_icon"
            @click.native="$back()"
          ></my-icon>
        </template>
      </Search>
    </header-slot>
    <div class="tab">
      <p :class="tabIndex === '1' ? 'act' : ''" @click="changeTab('1')">
        <span>问题</span><i></i>
      </p>
      <p :class="tabIndex === '2' ? 'act' : ''" @click="changeTab('2')">
        <span>文章</span><i></i>
      </p>
      <p
        v-if="showItem"
        :class="tabIndex === '4' ? 'act' : ''"
        @click="changeTab('4')"
      >
        <span>视频</span><i></i>
      </p>
      <p
        v-if="showItem"
        :class="tabIndex === '5' ? 'act' : ''"
        @click="changeTab('5')"
      >
        <span>大讲堂</span><i></i>
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
            <div>
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
              :src="item.contentImageUrl.split(',')[0]"
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
    <div
      v-show="tabIndex === '3'"
      :class="userList.length !== 0 ? 'userlist' : ''"
    >
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
      </sp-list>
    </div>
    <div v-show="tabIndex === '4'" class="videolist">
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
          @click="open(item)"
        >
          <div class="item">
            <div class="lf_img">
              <img v-if="item.image" :src="item.image.split(',')[0]" alt="" />
              <div class="time">{{ totime(item.duration) }}</div>
            </div>
            <div class="rt_content">
              <div class="title">
                <p v-html="item.videoNameHtml"></p>
                <!-- {{ item.videoName }} -->
              </div>
              <div class="name_time">
                <div class="name">{{ item.createrName }}</div>
                <div class="time">
                  {{ timeSplice(item.createTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </sp-list>
    </div>
    <div v-show="tabIndex === '5'" class="videolist">
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
          @click="open(item)"
        >
          <div class="item">
            <div class="lf_img">
              <img v-if="item.image" :src="item.image.split(',')[0]" alt="" />
              <div class="time">{{ totime(item.duration) }}</div>
            </div>
            <div class="rt_content">
              <div class="title">
                <p v-html="item.courseNameHtml"></p>
                <!-- {{ item.videoName }} -->
              </div>
              <div class="name_time">
                <div class="name">{{ item.createrName }}</div>
                <div class="time">
                  {{ timeSplice(item.createTime) }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </sp-list>
    </div>
    <sp-center-popup v-model="showPop" :field="Filed4" button-type="confirm" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Sticky, Icon, Dialog, List, CenterPopup } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
import knownApi from '@/api/known'
import utils from '@/utils/changeBusinessData'
import HeaderSlot from '@/components/common/head/HeaderSlot'

export default {
  name: 'Searchresult',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    Search,
    [Dialog.name]: Dialog,
    [List.name]: List,
    [CenterPopup.name]: CenterPopup,
    HeaderSlot,
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
      showPop: false,
      Filed4: {
        type: 'functional',
        showCancelButton: false,
        title: '提示！',
        description: `请到App去观看`,
        confirmButtonText: '好的',
      },
      showItem: true,
    }
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user, // 登录的用户信息
      userId: (state) => state.user.userId, // userId 用于判断登录
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
      // isApplets: (state) => state.app.isApplets,
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
    timeSplice(time) {
      return time.substring(0, time.length - 3)
    },
    totime(time) {
      if (!time) {
        return ''
      }

      let hour = Math.floor(time / 3600)
      let mid = Math.floor((time - 3600 * hour) / 60)
      // math.flotime / 60
      let sec = Math.floor((time - 3600 * hour) % 60)
      if (hour < 10) {
        hour = '0' + hour
      }
      if (mid < 10) {
        mid = '0' + mid
      }
      if (sec < 10) {
        sec = '0' + sec
      }

      return hour + ':' + mid + ':' + sec
    },
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
    open(item) {
      if (this.isInApp && this.appInfo.appCode === 'CPSAPP') {
        if (this.tabIndex === '4') {
          try {
            this.$appFn.dggOpenVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开视频失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        } else if (this.tabIndex === '5') {
          try {
            this.$appFn.dggOpenCourse(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开课程失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            })
          } catch (error) {
            console.error('changeTop error:', error)
          }
        }
      } else if (this.isInApp && this.appInfo.appCode === 'syscode') {
        this.showItem = false
      } else {
        this.showPop = true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.result {
  background: #f5f5f5;
  min-height: 100vh;
  ::v-deep.search-content {
    padding: 10px 32px 10px 24px;
    height: 0.88rem;
  }
  ::v-deep.input-box {
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
  ::v-deep.cloose-btn {
    margin-left: 32px;
    font-size: 32px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #222222;
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
      font-weight: bold;
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
        font-weight: bold;
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
          flex: 1;
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
    background: #fff;
    margin-top: 20px;
    padding-top: 40px;
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
  }
  > .videolist {
    .list {
      .item {
        padding: 28px 40px;
        display: flex;
        align-items: center;
        .lf_img {
          width: 240px;
          height: 135px;
          background: #f5f5f5;
          border-radius: 8px;
          position: relative;
          margin-right: 28px;
          img {
            width: 100%;
            height: 100%;
            display: block;
            border-radius: 8px;
          }
          .time {
            background: #000000;
            border-radius: 8px;
            opacity: 0.6;
            position: absolute;
            bottom: 8px;
            left: 9px;
            font: bold 22px/30px PingFangSC-Medium, PingFang SC;
            color: #ffffff;
            padding: 3px 8px;
          }
        }
        .rt_content {
          width: 402px;
          .title {
            color: #222222;
            font: bold 30px/42px PingFangSC-Medium, PingFang SC;
            margin-bottom: 15px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
            word-break: break-all;
            height: 84px;
          }
          .name_time {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .name {
              color: #555555;
              font: bold 26px/36px PingFangSC-Medium, PingFang SC;
            }
            .time {
              color: #999999;
              font: 400 26px/32px PingFangSC-Regular, PingFang SC;
            }
          }
        }
      }
    }
  }
}
</style>
