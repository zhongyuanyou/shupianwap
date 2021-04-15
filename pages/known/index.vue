<template>
  <div class="container">
    <div class="container_head">
      <Search
        :value="title"
        :icon-left="0.2"
        @submit="submit"
        @click.native="$router.push('/known/search')"
      >
      </Search>
      <my-icon
        name="fabu_mian"
        size="0.52rem"
        color="#4974F5"
        class="my_icon"
        @click.native="openArticle"
      ></my-icon>
    </div>
    <!-- 吸顶 start -->
    <sp-sticky>
      <div class="container_middle">
        <div class="tabs-box-items">
          <div
            v-for="(item, index) in tabs"
            :key="index"
            class="li-tab"
            :class="{ tab_active: index == tabIndex }"
            @click="toggleTabs(index, item)"
          >
            <p>{{ item.name }}</p>
            <div :class="{ line_active: index == tabIndex }"></div>
          </div>
        </div>
        <my-icon
          name="fenlei"
          size="0.32rem"
          color="#1A1A1A"
          class="my_icon"
          @click.native="openPop"
        ></my-icon>
      </div>
    </sp-sticky>
    <!-- 吸顶 end -->
    <!-- 列表 start -->
    <div class="container_body">
      <!-- 回答start -->
      <section><Answer v-if="shwoAnswer" :answer-list="answerList" /></section>
      <!-- 回答end -->
      <!-- 关注start -->
      <section>
        <VisitUser v-if="attentionStatus" :user-data="userData" />
        <AttentionItem v-if="attentionStatus" :list-data="listData" />
        <NotAttention v-if="showNotAttention" />
      </section>
      <!-- 关注end -->
      <!-- 推荐列表 start-->
      <section>
        <sp-pull-refresh
          v-model="isLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <ListItem v-if="showRecommend" :normal-list-data="normalListData" />
        </sp-pull-refresh>
      </section>
      <!-- 推荐列表 end-->
      <!-- 热榜 start -->
      <sp-pull-refresh
        v-model="isLoading"
        success-text="刷新成功"
        @refresh="onRefresh"
      >
        <section v-if="showHot">
          <div class="container_news_see">
            <div
              class="news"
              @click="
                $router.push({
                  path: '/known/newspaper',
                  query: {
                    id: subjectList ? subjectList[0].id : '',
                  },
                })
              "
            >
              <div class="news_num">{{ new Date().getDate() }}</div>
              <div class="news_span">
                {{ subjectList ? subjectList[0].name : '' }}
              </div>
            </div>
            <div
              class="see"
              @click="
                $router.push({
                  path: '/known/mustSee',
                  query: {
                    id: subjectList ? subjectList[1].id : '',
                  },
                })
              "
            >
              <div class="see_like">
                <my-icon
                  name="dianzan"
                  size="0.24rem"
                  color="#4974F5"
                ></my-icon>
              </div>
              <div class="see_span">
                {{ subjectList ? subjectList[1].name : '' }}
              </div>
            </div>
          </div>
          <ItemCard
            v-if="showHot"
            :list-data="listData"
            @load="requestHotList"
          />
        </section>
      </sp-pull-refresh>
      <!-- 热榜 end -->
      <section>
        <ListItem v-if="normalList" :normal-list-data="normalListData" />
      </section>
    </div>
    <!-- 列表 end -->
    <!-- 弹出框tab修改列表 start -->
    <sp-popup
      v-model="showPop"
      position="bottom"
      class="popup"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.4)' }"
    >
      <div class="popContentOne">
        <div class="popTop">
          <span class="popTop_title">全部板块</span>
          <div class="my_icon close_btn" @click="showPop = false">×</div>
        </div>
        <div class="popMiddle">
          <div class="spans">
            <div class="popMiddle_span1">我的板块</div>
          </div>
          <div class="popMiddle_span3" @click="editIcon(status)">
            {{ editFinish }}
          </div>
        </div>
        <div class="list">
          <div class="list_items">
            <div
              v-for="(item, index) in myPlate"
              :key="index"
              :class="status ? '' : index < 3 ? 'active' : ''"
              class="item"
            >
              {{ item }}
              <my-icon
                v-show="showIcon"
                name="guanbi_mian"
                size="0.28rem"
                color="#dddddd"
                class="my_icon"
                :class="index < 3 ? 'iconactive' : ''"
                @click.native="deleteToMyPlate(index)"
              ></my-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="popContentTwo">
        <div class="popBottom">
          <div class="spans">
            <div class="popBottom_span1">更多板块</div>
          </div>
        </div>
        <div class="list">
          <div class="list_items">
            <div v-for="(item, index) in morePlate" :key="index" class="item">
              {{ item }}
              <my-icon
                v-show="showIcon"
                name="fabu_mian"
                size="0.28rem"
                color="#dddddd"
                class="my_icon"
                @click.native="addToMyPlate(index)"
              ></my-icon>
            </div>
          </div>
        </div>
      </div>
    </sp-popup>
    <!-- 弹出框tab修改列表 end -->
    <!-- 弹出框文章 start -->
    <sp-popup
      v-model="showArticlePop"
      position="bottom"
      class="popupArticle"
      :overlay-style="{ background: 'rgba(0, 0, 0, 0.4)' }"
    >
      <div class="popUserInfo">
        <div class="popUserPhoto">
          <img :src="userInfo.avatar" alt="" />
        </div>
        <span>{{ userInfo.userName }}</span>
      </div>
      <div class="answer_article">
        <div class="item" @click="tonav('/known/publish/question')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/9blv1fi2icc0000.png"
            alt=""
          />
          <span>提个问题</span>
        </div>
        <div class="item" @click="tonav('/known/publish/chooseque')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/8sixz8dnnt40000.png"
            alt=""
          />
          <span>回答问题</span>
        </div>
        <div class="item" @click="tonav('/known/publish/article')">
          <img
            src="https://cdn.shupian.cn/sp-pt/wap/eoeulbunbpk0000.png"
            alt=""
          />
          <span>写文章</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="button" @click="closePop">取消</div>
    </sp-popup>
    <!-- 弹出框文章 end -->
    <!-- 底部tab start -->
    <Bottombar v-if="!isInApp" ref="bottombar" />
    <!-- 底部tab end -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
import {
  WorkTab,
  WorkTabs,
  Popup,
  Sticky,
  Tab,
  Tabs,
  PullRefresh,
} from '@chipspc/vant-dgg'
import AttentionItem from '@/components/mustKnown/recommend/AttentionItem'
import Answer from '@/components/mustKnown/answer/Answer'
import NotAttention from '@/components/mustKnown/recommend/NotAttention'
import VisitUser from '@/components/mustKnown/recommend/VisitUser'
import ListItem from '@/components/mustKnown/recommend/ListItem'
import ItemCard from '@/components/mustKnown/recommend/ItemCard'
import Search from '@/components/mustKnown/recommend/search/Search'
import Bottombar from '@/components/common/nav/Bottombar'
import { knownApi } from '@/api'

export default {
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Popup.name]: Popup,
    [Sticky.name]: Sticky,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [PullRefresh.name]: PullRefresh,
    Search,
    Answer,
    ListItem,
    ItemCard,
    VisitUser,
    AttentionItem,
    Bottombar,
    NotAttention,
  },
  data() {
    return {
      isLoading: false,
      answerList: [],
      subjectList: [],
      listData: [],
      normalListData: [],
      type: 0, // 类型
      nowDate: 0, // 日期
      userData: [], // 用户数据
      // type: 0, // 	不传 代表wap或薯片app 1代表企大顺
      attentionStatus: false, // 已关注
      showNotAttention: false, // 未关注
      showHot: false, // 热榜
      showRecommend: false, // 推荐
      shwoAnswer: false, // 回答
      normalList: true, // 推荐列表和一般列表
      title: '考研复试体检包含什么项目', // 标题
      tabs: [
        {
          name: '',
          categoryId: '',
          executionParameters: '',
        },
      ],
      editFinish: '编辑',
      tabIndex: 1,
      ada: 2,
      showPop: false,
      showIcon: false,
      status: true,
      showArticlePop: false,
      myPlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
      morePlate: [
        '关注',
        '推荐',
        '热榜',
        '法律',
        '交易',
        '知产',
        '知识',
        '互联网',
        '工商注册',
        '办证',
        '刻章',
      ],
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
      isShowOpenApp: (state) => state.app.isShowOpenApp,
      token: (state) => state.user.userInfo.token,
    }),
    userInfo() {
      return this.$store.state.user
    },
  },
  mounted() {
    this.type = this.$route.query.type
    this.init()
  },
  methods: {
    init() {
      this.getDate()
      this.getSubjectList() // 获取专题列表
      this.categoryList() // 获取分类列表
      this.recommendList()
    },
    // 请求分类列表
    async categoryList() {
      const params = {}
      params.type = this.type
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.categoryList,
        { params }
      )
      if (code === 200) {
        this.tabs = data.reduce((arr, item) => {
          return [
            ...arr,
            {
              name: item.name,
              categoryId: item.categoryId,
              executionParameters: item.executionParameters,
              id: item.id,
            },
          ]
        }, [])
        // 将起始位置放到推荐下
        for (let i = 0; i < this.tabs.length; i++) {
          if (this.tabs[i].executionParameters === 'tuijian') {
            this.tabIndex = i
          }
        }
      } else {
        this.loading = false
        this.finished = true
      }
    },
    tonav(url) {
      this.$router.push({ path: url })
    },
    async toggleTabs(index, item) {
      this.tabIndex = index
      const params = {}
      this.listData = []
      // 去请求推荐列表数据
      if (item.executionParameters === 'tuijian') {
        this.showRecommend = true
        this.showNotAttention = false
        this.attentionStatus = false
        this.showHot = false
        this.normalList = false
        this.shwoAnswer = false
        this.normalListData = []
        await this.recommendList()
        // 去请求关注列表数据
      } else if (item.executionParameters === 'guanzhu') {
        if (!this.token) {
          this.showNotAttention = true
          this.attentionStatus = false
          this.showRecommend = false
          this.normalList = false
          this.showHot = false
          this.shwoAnswer = false
        } else {
          this.attentionStatus = true
          this.showNotAttention = false
          this.showRecommend = false
          this.normalList = false
          this.showHot = false
          this.shwoAnswer = false
          await this.attentionList() // 获取关注用户动态列表
          await this.focusFansList() // 获取关注列表
        }
        // 请求热榜数据
      } else if (item.executionParameters === 'rebang') {
        this.showNotAttention = false
        this.attentionStatus = false
        this.showRecommend = false
        this.normalList = false
        this.shwoAnswer = false
        this.showHot = true
        // 请求热榜列表
        await this.hotList(item)
      } else if (item.executionParameters === 'huida') {
        this.showNotAttention = false
        this.shwoAnswer = true
        this.attentionStatus = false
        this.showRecommend = false
        this.normalList = false
        this.showHot = false
        await this.getAnswerList()
      } else {
        this.normalList = true
        this.showNotAttention = false
        this.showNotAttention = false
        this.attentionStatus = false
        this.showRecommend = false
        this.showHot = false
        // 请求列表数据
        await this.getList(item)
      }
    },
    // 请求专题列表数据
    async getSubjectList() {
      const params = {}
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.subjectList,
        { params }
      )
      if (code === 200) {
        if (data.length > 0) {
          this.subjectList.push(data[1])
          this.subjectList.push(data[2])
        } else {
          this.attentionStatus = false
          this.showNotAttention = true
        }
      } else {
      }
    },
    // 请求关注用户的数据
    async focusFansList() {
      const params = {
        handleUserId: this.$store.state.userInfo.userId,
        handleType: 1,
        limit: 10,
        page: 1,
      }
      const { code, message, data } = await this.$axios.get(
        knownApi.home.focusFansList,
        { params }
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.userData = data.rows
        } else {
        }
      } else {
      }
    },
    // 请求关注用户的列表数据
    async attentionList() {
      const params = {}
      params.handleUserId = this.$store.state.userInfo.userId
      params.dateType = 0
      params.userHandleFlag = 1
      params.limit = 10
      params.page = 1
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.attentionUserList,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.listData = data.rows
        } else {
        }
      } else {
      }
    },
    // 请求热榜列表数据
    async hotList(item) {
      const categorIds = []
      categorIds.push(item.id)
      const params = {
        categorIds,
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.list,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.listData = data.rows
        } else {
        }
      } else {
      }
    },
    // 请求推荐列表数据
    async recommendList() {
      const params = {
        limit: 10,
        page: 1,
      }
      const { code, message, data } = await this.$axios.get(
        knownApi.questionArticle.recommendList,
        { params }
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.normalListData = data.rows
        } else {
        }
      } else {
      }
    },
    // 请求普通列表数据
    async getList(item) {
      this.normalListData = []
      const categorIds = []
      categorIds.push(item.id)
      const params = {
        categorIds,
        limit: 10,
        page: 1,
      }
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.list,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.normalListData = data.rows
        } else {
        }
      } else {
      }
    },
    // 请求回答列表
    async getAnswerList(limit, page) {
      const params = {
        handleUserId: this.userInfo.userId || this.$cookies.get('userId'),
        type: 1,
        limit,
        page,
      }

      const { code, message, data } = await this.$axios.get(
        knownApi.question.writeAnswer,
        { params }
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.answerList = data.rows
        } else {
        }
      } else {
      }
    },
    // 打开弹出框
    OpenPop(event) {
      if (event) {
        this.showPop = event
      }
    },
    // 回到上一页
    getBackIndex(event) {
      if (event) {
      }
    },
    async isLogin() {
      if (this.userInfo.userId && this.userInfo.token) {
        return true
      } else if (this.isInApp) {
        await this.$appFn.dggLogin()
      } else {
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.fullPath,
          },
        })
      }
    },
    // 打开文章编辑框
    openArticle() {
      if (!this.isLogin) {
        return
      }
      this.showArticlePop = true
    },
    // 关闭弹出框
    closePop() {
      this.showArticlePop = false
    },
    // 编辑
    editIcon(status) {
      if (status) {
        this.showIcon = true
        this.editFinish = '完成'
        this.status = false
      } else {
        this.showIcon = false
        this.editFinish = '编辑'
        this.status = true
      }
    },
    // 添加到我的列表中
    addToMyPlate(index) {
      const arrayValue = this.morePlate[index]
      if (arrayValue) {
        this.myPlate.push(arrayValue)
        this.morePlate.pop(index)
      }
    },
    // 打开弹出框
    openPop() {
      this.showPop = true
    },
    submit() {},
    // 获取日期
    getDate() {
      this.nowDate = new Date().getDate()
    },
    onRefresh() {
      this.hotList()
    },
    requestHotList(page) {
      console.log('+++++++++page', page)
    },
  },
}
</script>
<style lang="less" scoped>
.active {
  color: #cccccc !important;
}
.iconactive {
  display: none;
}
.tab_active {
  height: 32px;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
  line-height: 32px;
}
.line_active {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
  margin-top: 12px;
  margin: 0 auto;
  margin-top: 12px;
}
.close_btn {
  background: #f5f5f5;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  font-size: 40px;
  color: #999999;
  line-height: 48px;
  text-align: center;
}
::v-deep .sp-work-tab--active {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #222222;
}
/deep/ .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #999999;
}
/deep/ .sp-work-tabs__line {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
}
.container {
  background: #fff;
  .container_head {
    display: flex;
    justify-content: space-between;
    height: 88px;
    align-items: center;
    padding: 0 32px;
    .my_icon {
      width: 52px;
      height: 52px;
      margin-left: 32px;
    }
  }
  .container_middle {
    height: 88px;
    background: #ffffff;
    display: flex;
    align-items: center;
    // margin-bottom: 24px;
    padding: 0 32px;

    .tabs-box-items {
      display: flex;
      overflow: auto;
      justify-content: space-between;
      align-items: center;
      height: 100%;
      .li-tab {
        flex-shrink: 0;
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #999999;
        line-height: 32px;
        margin-right: 48px;
      }
      .active {
        height: 32px;
        font-size: 32px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        line-height: 32px;
      }
    }
  }
  .container_body {
  }
  .container_news_see {
    height: 136px;
    background: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32px;
    margin-bottom: 24px;
    .news {
      width: 329px;
      height: 88px;
      background: #dbe4fd;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;

      .news_num {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        font-size: 22px;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #133aa3;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .news_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #133aa3;
        line-height: 28px;
        margin-left: 12px;
      }
    }
    .see {
      width: 329px;
      height: 88px;
      background: #d8cffa;
      border-radius: 12px;
      display: flex;
      justify-content: center;
      align-items: center;
      .see_like {
        width: 48px;
        height: 48px;
        background: #ffffff;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .see_span {
        height: 28px;
        font-size: 28px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #564499;
        line-height: 28px;
        margin-left: 12px;
      }
    }
  }
  .popup {
    height: 1012px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    padding: 0 40px;
    .popContentOne {
      .popTop {
        display: flex;
        height: 120px;
        align-items: center;
        justify-content: space-between;
        .popTop_title {
          height: 40px;
          font-size: 40px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
        }
        .my_icon {
          width: 48px;
          height: 48px;
        }
      }
      .popMiddle {
        // height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .spans {
          height: 50px;
          display: flex;
          align-items: center;
          .popMiddle_span1 {
            height: 30px;
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 30px;
          }
          .popMiddle_span2 {
            height: 24px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            margin-left: 15px;
          }
        }

        .popMiddle_span3 {
          height: 28px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #4974f5;
          line-height: 28px;
        }
      }
      .list {
        .list_items {
          display: flex;
          flex-flow: row wrap;
          .item {
            width: 154px;
            height: 88px;
            background: #f5f5f5;
            border-radius: 44px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 8px 0;
            position: relative;
            margin-right: 18px;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          div:nth-child(4n + 4) {
            margin-right: 0;
          }
        }
      }
    }
    .popContentTwo {
      margin-top: 72px;
      .popBottom {
        // height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .spans {
          height: 50px;
          display: flex;
          align-items: center;
          .popBottom_span1 {
            height: 30px;
            font-size: 30px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: #222222;
            line-height: 30px;
          }
          .popBottom_span2 {
            height: 24px;
            font-size: 24px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 24px;
            margin-left: 15px;
          }
        }

        .popBottom_span3 {
          height: 28px;
          font-size: 28px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #4974f5;
          line-height: 28px;
        }
      }
      .list {
        .list_items {
          display: flex;
          flex-flow: row wrap;
          .item {
            width: 154px;
            height: 88px;
            background: #f5f5f5;
            border-radius: 44px;
            font-size: 28px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: #222222;
            line-height: 28px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 8px 0;
            position: relative;
            margin-right: 18px;
            > .my_icon {
              position: absolute;
              top: 0;
              right: 0;
            }
          }
          div:nth-child(4n + 4) {
            margin-right: 0;
          }
        }
      }
    }
  }
  .popupArticle {
    height: 519px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    > .popUserInfo {
      height: 136px;
      background: #ffffff;
      display: flex;
      align-items: center;
      padding: 0 40px;
      font-size: 28px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #555555;
      line-height: 28px;
      > .popUserPhoto {
        > img {
          width: 48px;
          height: 48px;
          background: #6d7177;
          border-radius: 50%;
          margin-right: 16px;
        }
      }
      // > .popUserNick {
      //   height: 28px;
      //   font-size: 28px;
      //   font-family: PingFangSC-Medium, PingFang SC;
      //   font-weight: 500;
      //   color: #555555;
      //   line-height: 28px;
      // }
    }
    > .answer_article {
      height: 285px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 78px;
      > .item {
        text-align: center;
        > img {
          width: 96px;
          height: 96px;
          display: block;
        }
        > span {
          height: 24px;
          font-size: 24px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #222222;
          line-height: 24px;
          display: block;
          margin-top: 24px;
        }
      }
    }
    > .line {
      height: 1px;
      background: #dddddd;
    }
    > .button {
      height: 98px;
      background: #ffffff;
      font-size: 32px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      width: 100%;
      justify-content: center;
      align-items: center;
      display: flex;
    }
  }
}
</style>
