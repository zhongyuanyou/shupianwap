<template>
  <section>
    <ShareModal v-if="isShare" />
    <LoadingCenter v-show="loadingData" />
    <div class="home_container">
      <div
        class="header"
        :class="{ header_fixed: fixed }"
        :style="{ paddingTop: (appInfo.statusBarHeight || 0) + 'px' }"
      >
        <my-icon
          v-if="!isShare"
          name="nav_ic_back"
          size="0.4rem"
          :color="fixed ? '#1A1A1A' : '#D8D8D8'"
          @click.native="$back"
        ></my-icon>
        <div style="margin-left: 0.2rem">{{ fixed ? userName : '' }}</div>
      </div>
      <DownLoadArea v-if="isShare" />
      <div class="top_box">
        <div class="card">
          <sp-image round class="user_avatar" fit="cover" :src="avatar" />
          <div class="bt_box">
            <template v-if="homeUserId && homeUserId !== userInfo.userId">
              <div
                class="bt_attention"
                :class="{ bt_has_attention: isAttention }"
                @click="attention"
              >
                <my-icon
                  v-show="!isAttention"
                  name="tianjia"
                  size="0.27rem"
                  color="#fff"
                />
                <p>{{ isAttention ? '已关注' : '关注' }}</p>
              </div>
            </template>
            <div
              v-if="isInApp && type === 2"
              class="bt_contact"
              @click="contact"
            >
              <my-icon
                name="pinglun_mian"
                size="0.36rem"
                color="#ffffff"
              ></my-icon>
            </div>
          </div>
          <div class="user_name">{{ userName }}</div>
          <!-- <div class="user_desc clamp3">{{ desc }}</div> -->
          <div class="user_data">
            <div class="user_data_item" @click="toFans">
              <div class="user_data_item_num">{{ fansNum }}</div>
              <div class="user_data_item_name">粉丝</div>
            </div>
            <div class="user_data_item" @click="toAttention">
              <div class="user_data_item_num">{{ attentionNum }}</div>
              <div class="user_data_item_name">关注</div>
            </div>
            <div class="user_data_item">
              <div class="user_data_item_num">{{ applaudNum }}</div>
              <div class="user_data_item_name">获赞</div>
            </div>
          </div>
          <sp-swipe
            v-if="adList.length"
            class="user_banner"
            :autoplay="3000"
            indicator-color="white"
          >
            <sp-swipe-item
              v-for="(item, index) in adList"
              :key="index"
              @click="adJump(item.materialList[0])"
            >
              <sp-image
                class="banner_img"
                fit="cover"
                :src="item.materialList[0].materialUrl"
            /></sp-swipe-item>
          </sp-swipe>
        </div>
      </div>
      <div class="bottom_box">
        <sp-tabs
          v-model="active"
          title-active-color="#222222"
          title-inactive-color="#999999"
          @change="tabChange"
        >
          <sp-tab
            v-for="item in menuList"
            :key="item.index"
            :title="item.name"
            :name="item.index"
          ></sp-tab>
        </sp-tabs>
        <div v-if="active !== 6">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            class="list_container"
            :immediate-check="false"
            @load="getList"
          >
            <div v-for="(item, index) in list" :key="index">
              <Item
                v-if="active !== 5 && active !== 6"
                :item="item"
                @comments="comments"
              />
              <div v-else-if="active === 5" class="item_five">
                <div class="item" @click="open(item)">
                  <div class="lf_img">
                    <img
                      v-if="item.image"
                      :src="item.image.split(',')[0]"
                      alt=""
                    />
                    <div v-if="!isNaN(item.duration)" class="time">
                      {{ totime(item.duration) }}
                    </div>
                  </div>
                  <div class="rt_content">
                    <div class="title">{{ item.videoName }}</div>
                    <div class="name_time">
                      <div class="name">{{ userName }}</div>
                      <div class="time">
                        {{ timeSplice(item.createTime) }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </sp-list>
        </div>
        <div v-else class="smallVideolist">
          <sp-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            :immediate-check="false"
            @load="getList"
          >
            <div v-if="list.length > 0" class="video-list">
              <div
                v-for="(item, index) in list"
                :key="index"
                class="item"
                @click="open(item)"
              >
                <sp-image
                  width="3.72rem"
                  height="6.61rem"
                  fit="cover"
                  :src="item.image"
                />
                <div class="content_box">
                  <div class="content">
                    <div class="count">{{ item.custTotalCount }} 次观看</div>
                    <div class="tile">{{ item.videoName }}</div>
                  </div>
                </div>
              </div>
            </div>
          </sp-list>
        </div>
      </div>
      <comment-list
        v-model="commentShow"
        :article-id="articleId"
        :source-type="sourceType"
        @release="release"
      ></comment-list>
      <sp-center-popup
        v-model="showPop"
        :field="Filed4"
        button-type="confirm"
      />
    </div>
  </section>
</template>

<script>
import {
  Tabs,
  Tab,
  Image,
  List,
  Swipe,
  SwipeItem,
  CenterPopup,
} from '@chipspc/vant-dgg'
import { mapMutations } from 'vuex'
import CommentList from '@/components/mustKnown/CommentList'
import Item from '@/components/mustKnown/home/Item'
import { knownApi } from '~/api'
import utils from '@/utils/changeBusinessData'
import { domainUrl } from '~/config/index'
import DownLoadArea from '@/components/common/downLoadArea'
import ShareModal from '@/components/common/ShareModal'
import { numChangeW } from '@/utils/common'
import LoadingCenter from '@/components/common/loading/LoadingCenter'

export default {
  layout: 'keepAlive',
  name: 'KnownHomeCollection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [CenterPopup.name]: CenterPopup,
    CommentList,
    Item,
    DownLoadArea,
    ShareModal,
    LoadingCenter,
  },
  async asyncData({ $axios, query, store, redirect }) {
    if (!query.homeUserId && !store.state.user.userId) {
      return redirect('/known')
    }
    let userInfo = {
      avatar: '',
      userName: '',
      desc: '',
      type: '',
      isAttention: false,
      attentionNum: 0,
      fansNum: 0,
      applaudNum: 0,
    }
    try {
      const { code, data } = await $axios.get(knownApi.home.userInfo, {
        params: {
          homeUserId: query.homeUserId || store.state.user.userId,
          homeUserType:
            query.type || utils.getUserType(store.state.user.userType),
        },
      })
      if (code === 200) {
        userInfo = data
      }
    } catch (error) {}

    return userInfo
  },
  data() {
    return {
      isShare: false,
      articleId: '', // 打开评论列表需要传的id
      userName: '',
      active: 0,
      Filed4: {
        type: 'functional',
        showCancelButton: false,
        title: '提示！',
        description: `请到App去观看`,
        confirmButtonText: '好的',
      },
      menuList: [
        {
          name: '全部',
          index: 0,
        },
        {
          name: '问题',
          index: 1,
        },
        {
          name: '回答',
          index: 3,
        },
        {
          name: '文章',
          index: 2,
        },
        {
          name: '短视频',
          index: 5,
        },
        {
          name: '小视频',
          index: 6,
        },
      ],
      list: [],
      loading: false,
      finished: false,
      commentShow: false,
      page: 1,
      limit: 10,
      fixed: false,
      adList: [],
      showPop: false,
      sourceType: 1,
      error: false,
      loadingData: false, // 加载项
    }
  },
  computed: {
    // 主页用户id
    homeUserId() {
      return this.$route.query.homeUserId
    },
    userInfo() {
      return this.$store.state.user
    },
    isInApp() {
      return this.$store.state.app.isInApp
    },
    appInfo() {
      return this.$store.state.app.appInfo
    },
  },
  mounted() {
    this.isShare = this.$route.query.isShare
    this.getAdList()
    this.getList()
    window.addEventListener('scroll', this.getScroll)
    // const userType = this.type || utils.getUserType(this.type)
    // 到时候这里改成5
    // if (userType !== 1) {
    //   this.menuList.push({
    //     name: '视频',
    //     index: 5,
    //   })
    // }
  },
  beforeRouteLeave(to, from, next) {
    if (
      [
        'known-detail-answer',
        'known-detail-article',
        'known-detail-question',
      ].includes(to.name)
    ) {
      this.SET_KEEP_ALIVE({ type: 'add', name: 'KnownHomeCollection' })
    } else {
      this.SET_KEEP_ALIVE({ type: 'remove', name: 'KnownHomeCollection' })
    }
    next()
  },
  methods: {
    ...mapMutations({
      SET_KEEP_ALIVE: 'keepAlive/SET_KEEP_ALIVE',
    }),
    open(item) {
      if (this.isInApp && this.appInfo.appCode === 'CPSAPP') {
        if (this.active === 5) {
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
        } else {
          console.log('item', item)
          try {
            this.$appFn.dggOpenSmallVideo(item.id, (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `打开小视频失败`,
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
    timeSplice(time) {
      return time.substring(0, time.length - 3)
    },
    totime(time) {
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
    adJump(item) {
      if (!this.isInApp) {
        if (item.linkType === 1) {
          this.$router.push(`/${item.wapLink}`)
        } else if (item.linkType === 2) {
          location.href = item.materialLink
        } else {
          location.href = item.imgLink
        }
      }
      if (this.isInApp) {
        let iosUrl = ''
        let adUrl = ''
        let hide = 0
        switch (item.linkType) {
          // 跳转内链
          case 1:
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            iosUrl = item.iosLink
            adUrl = item.androidLink
            break
          // 跳转外链接
          case 2:
            iosUrl = item.materialLink
            adUrl = item.materialLink
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            break
          // 跳转图片链接
          case 3:
            iosUrl = item.imgLink
            adUrl = item.imgLink
            hide = 0
            this.$appFn.dggSetTitle({ title: '' }, () => {})
            break
        }
        const iosRouter =
          '{"path":"CPSCustomer:CPSCustomer/CPSBaseWebViewController///push/animation","parameter":{"urlstr":"' +
          `${iosUrl}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"0","version":"1.0.0"}'
        const adRouter =
          '{"path":"/common/android/SingleWeb","parameter":{"urlstr":"' +
          `${adUrl}` +
          '","isHideNav":' +
          hide +
          ',"emptyTitle":"标题"},"isLogin":"0","version":"1.0.0"}'
        if (this.isInApp) {
          this.$appFn.dggJumpRoute(
            {
              iOSRouter: iosRouter,
              androidRouter: adRouter,
            },
            (res) => {}
          )
        }
      }
    },
    toFans() {
      this.$router.push({
        path: '/known/home/fans',
        query: { homeUserId: this.homeUserId },
      })
    },
    toAttention() {
      this.$router.push({
        path: '/known/home/attention',
        query: { homeUserId: this.homeUserId },
      })
    },
    contact() {
      this.$appFn.dggOpenIM(
        {
          name: this.userName, // 商户用户名称
          userId: this.homeUserId, // 商户用户ID
          userType: 'MERCHANT_USER', // 用户类型
        },
        (res) => {}
      )
    },
    getScroll() {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop

      if (scrollTop > 180) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    tabChange() {
      // 未加载完成数据直接不响应
      if (this.loadingData) {
        return
      }
      this.page = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.getList()
    },
    async init() {
      const { code, data } = await this.$axios.get(knownApi.home.userInfo, {
        params: {
          homeUserId: this.homeUserId || this.userInfo.userId,
          homeUserType: this.type || utils.getUserType(this.userInfo.userType),
        },
      })
      this.isAttention = data.isAttention
    },
    async attention() {
      const result = await this.$isLogin()
      if (result === 'app_login_success') {
        this.init()
        return
      }
      const { code, message } = await this.$axios.post(
        knownApi.home.attention,
        {
          handleUserId: this.userInfo.userId,
          handleUserName: this.userInfo.userName || '测试用户',
          handleUserType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
          handleType: this.isAttention ? 2 : 1,
          attentionUserId: this.$route.query.homeUserId,
          attentionUserName: this.userName,
          attentionUserType: this.type,
        }
      )
      if (code === 200) {
        this.$xToast.show({
          message: this.isAttention ? '取关成功' : '关注成功',
          duration: 1000,
          icon: 'toast_ic_comp',
          forbidClick: true,
        })
        this.isAttention = !this.isAttention
      } else {
        console.log(message)
      }
    },
    comments({ id, type }) {
      this.articleId = id
      this.sourceType = type
      this.commentShow = true
    },
    release() {
      console.log('点击了发布')
    },
    async getList() {
      this.loadingData = true
      try {
        // 类型：1问题  2文章 3回答
        const params = {
          types: [this.active],
          userIds: this.homeUserId || this.userInfo.userId,
          currentUserId: this.userInfo.userId,
          page: this.page,
          limit: this.limit,
        }
        if (this.active === 0) {
          params.types = [1, 2, 3]
        }
        const { code, message, data } = await this.$axios.post(
          knownApi.home.list,
          params
        )
        if (code === 200) {
          this.list = this.list.concat(data.rows)
          if (this.active === 6) {
            this.list.forEach((item) => {
              item.custTotalCount = numChangeW(item.totalViewCount)
            })
          }
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
      } catch (e) {
        console.log(e)
      } finally {
        this.loadingData = false
      }
    },
    async getAdList() {
      const { code, message, data } = await this.$axios.get(
        knownApi.home.adList,
        {
          params: {
            locationCode: 'ad100028',
          },
        }
      )
      if (code === 200) {
        this.adList = data.sortMaterialList || []
      } else {
        console.log(message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.home_container {
  height: 100%;
  background: #fff;
  .header {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 88px;
    padding-left: 0.32rem;
    color: #1a1a1a;
    font-size: 36px;
    font-weight: 500px;
    display: flex;
    align-items: center;
    transition: 0.3s all;
    box-sizing: content-box;
    .spiconfont-zuo {
      position: absolute;
      left: 24px;
      bottom: 20px;
    }
  }
  .header_fixed {
    border-bottom: 1px solid #f4f4f4;
    background: #ffffff;
  }

  .top_box {
    padding-top: 320px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/images/dkl5m4sxqyo0000.png')
      top right no-repeat;
    background-size: contain;
    .card {
      position: relative;
      background-color: #ffffff;
      border-radius: 24px 24px 0px 0px;
      padding: 33px 32px 40px;
      font-size: 0;
      .user_avatar {
        width: 194px;
        height: 194px;
        background: #d9d9d9;
        border: 3px solid #ffffff;
        position: absolute;
        left: 32px;
        top: -97px;
      }
      .bt_box {
        display: flex;
        justify-content: flex-end;
        text-align: center;
        font-size: 26px;
        font-weight: bold;
        height: 64px;
        .bt_attention {
          width: 144px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #4974f5;
          border-radius: 8px;
          color: #ffffff;
          ::v-deep i {
            margin-right: 6px;
          }
        }
        .bt_has_attention {
          background: #f5f5f5;
          color: #999999;
        }
        .bt_contact {
          width: 63px;
          height: 64px;
          background: #999999;
          border-radius: 8px;
          margin-left: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .user_name {
        margin-top: 48px;
        font-size: 44px;
        font-weight: bold;
        color: #1a1a1a;
        line-height: 44px;
      }
      .user_desc {
        margin-top: 24px;
        font-size: 26px;
        font-weight: 400;
        color: #999999;
        line-height: 26px;
      }
      .user_data {
        margin-top: 48px;
        display: flex;
        &_item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 64px;
          &_num {
            color: #4974f5;
            font-size: 36px;
            line-height: 36px;
            font-weight: bold;
          }
          &_name {
            font-size: 26px;
            font-weight: 400;
            color: #999999;
            line-height: 26px;
            margin-top: 16px;
          }
        }
      }
      .user_banner {
        margin-top: 48px;
        width: 100%;
        height: 180px;
        border-radius: 12px;
        .banner_img {
          width: 100%;
          height: 180px;
          border-radius: 12px;
        }
      }
    }
  }

  .bottom_box {
    background-color: #f8f8f8;
    ::v-deep .sp-tabs {
      border-bottom: 1px solid #f4f4f4;
    }
    ::v-deep .sp-tab {
      font-size: 30px;
    }
    .sp-tab--active {
      font-size: 32px;
      font-weight: bold;
    }

    .list_container {
      background: #ffffff;
      .item {
        background: #ffffff;
        padding: 28px 32px 28px;
        margin-bottom: 20px;
        .user {
          display: flex;
          align-items: center;
          margin-bottom: 32px;
          .user_avatar {
            width: 66px;
            height: 66px;
            margin-right: 16px;
          }
          .user_info {
            &_name {
              font-size: 28px;
              font-weight: 400;
              color: #222222;
              line-height: 28px;
            }
            &_time {
              margin-top: 12px;
              font-size: 24px;
              font-weight: 400;
              color: #999999;
              line-height: 24px;
            }
          }
        }
        .title {
          font-family: PingFangSC-Medium, PingFang SC;
          font-size: 36px;
          font-weight: bold;
          color: #1a1a1a;
          line-height: 48px;
          margin-bottom: 17px;
        }

        .content {
          font-family: PingFangSC-Regular, PingFang SC;
          font-size: 30px;
          font-weight: 400;
          color: #555555;
          line-height: 42px;
        }
        .content_img {
          display: flex;
          .left_content {
            font-family: PingFangSC-Regular, PingFang SC;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
            line-height: 42px;
            flex: 1;
            margin-right: 32px;
          }
          .right_img {
            width: 190px;
            height: 127px;
            background: #cccccc;
            border-radius: 12px;
          }
        }
        .bottom {
          font-family: PingFangSC-Regular, PingFang SC;
          margin-top: 24px;
          font-size: 28px;
          font-weight: 400;
          color: #999999;
          line-height: 28px;
          display: flex;
          &_item {
            display: flex;
            align-items: center;
            margin-right: 24px;
            min-width: 148px;
            i {
              margin-right: 16px;
            }
          }
        }
      }
      .item_five {
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
            height: 135px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .title {
              color: #222222;
              font: bold 30px/42px PingFangSC-Medium, PingFang SC;
              .textOverflow(2);
            }
            .name_time {
              display: flex;
              align-items: center;
              justify-content: space-between;
              .name {
                color: #555555;
                font: bold 26px/36px PingFangSC-Medium, PingFang SC;
                max-width: 150px;
                .mixin-text-oneoverflow();
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
    .smallVideolist {
      .video-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        padding: 0 2px;
        .item {
          position: relative;
          display: inline-block;
          box-sizing: border-box;
          width: 50%;
          height: 661px;
          margin: 2px 0;
          ::v-deep .sp-image__img {
            border-radius: 4px;
          }
          .content_box {
            position: absolute;
            bottom: 0;
            height: 200px;
            width: 100%;
            background-image: linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.4) 0%,
              rgba(0, 0, 0, 0) 100%
            );
            border-radius: 0 0 12px 12px;
            .content {
              position: absolute;
              bottom: 16px;
              left: 20px;
              .count {
                font-size: 24px;
                opacity: 0.8;
                margin-bottom: 8px;
                line-height: 32px;
                color: #fff;
                font-weight: bold;
              }
              .tile {
                line-height: 44px;
                font-size: 36px;
                .textOverflow(2);
                text-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
                color: #fff;
                font-weight: bold;
                width: 340px;
              }
            }
          }
        }
      }
    }
  }

  .clamp2 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .clamp3 {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }
}
</style>
