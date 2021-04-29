<template>
  <div class="MustSee">
    <HeaderSlot>
      <div class="flex">
        <div>
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#FFFFFF"
            class="my_icon"
            @click.native="back()"
          ></my-icon>
        </div>
        <div v-show="showHead" class="newspaperTitle">进站必看</div>
        <div>
          <my-icon
            name="sear_ic_sear"
            size="0.40rem"
            color="#FFFFFF"
            class="my_icon"
            @click.native="$router.push({ path: '/known/search' })"
          ></my-icon>
        </div>
      </div>
    </HeaderSlot>
    <div class="top">
      <!-- <h1>进站必看</h1>
      <p>必懂上那些「压箱底」的宝藏内容</p> -->
    </div>
    <div ref="body" class="listbox">
      <div
        v-for="(item, index) in mustSeeData"
        :key="index"
        class="list"
        @click="goDetail(item)"
      >
        <h1>{{ item.title }}</h1>
        <div class="box">
          <div class="left" :style="{ width: item.img ? '300px' : '100%' }">
            <div class="top">
              <img :src="item.avatar" alt="" />
              <p>{{ item.userName }}</p>
            </div>
            <p class="tit">
              {{ item.contentText }}
            </p>
          </div>
          <img v-if="item.img" :src="item.img" alt="" class="right" />
        </div>
        <div class="num">
          <p>{{ item.applaudCount }} 赞同</p>
          <i></i>
          <p>{{ item.remarkCount }} 评论</p>
        </div>
      </div>
      <div style="height: 1px; margin-top: 20px"></div>
      <!--
      <div class="bottom" @click="goRecommend">
        到底啦，去推荐看看吧
        <my-icon
          name="you"
          size="0.22rem"
          color="#999999"
          class="my_icon"
          style="margin-top: 2px"
        ></my-icon>
      </div>
      -->
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Icon, Sticky } from '@chipspc/vant-dgg'
import { knownApi } from '@/api'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  layout: 'keepAlive',
  name: 'MustSee',
  components: {
    [Sticky.name]: Sticky,
    [Icon.name]: Icon,
    HeaderSlot,
  },
  data() {
    return {
      showHead: false,
      categorIds: [],
      mustSeeData: [],
      name: '',
      description: '',
      showPaper: false,
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
    this.name = this.$route.query.name
    this.description = this.$route.query.description
    this.init()
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    back() {
      if (this.isInApp) {
        this.$appFn.dggWebGoBack()
      } else {
        this.$router.go(-1)
      }
    },
    // 调到推荐页面
    goRecommend() {
      this.$router.push({
        path: '/known/',
      })
    },
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 160) {
        this.showPaper = true
      } else {
        this.showPaper = false
      }
    },
    init() {
      this.categorIds.push(this.$route.query.id)
      this.getList()
    },
    async getList() {
      // 组装参数
      const params = {}
      params.categorIds = this.categorIds
      params.limit = 50
      params.page = 1
      const { code, message, data } = await this.$axios.post(
        knownApi.questionArticle.list,
        params
      )
      if (code === 200) {
        if (data.rows.length > 0) {
          this.mustSeeData = data.rows
        } else {
          this.attentionStatus = false
          this.showNotAttention = true
        }
      } else {
        console.log(message)
      }
    },
    handleScroll() {
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      const scrollTop = this.$refs.body.getBoundingClientRect().top // 滚动条距离顶部的位置
      const than = document.body.clientWidth / 375
      if (scrollTop / than <= ((this.appInfo.statusBarHeight || 0) + 88) / 2) {
        this.showHead = true
      } else {
        this.showHead = false
      }
    },
    goDetail(item) {
      this.$router.push({
        path: '/known/detail/answer',
        query: {
          id: item.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.MustSee {
  background: #4974f5;
  > .head {
    height: 88px;
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 32px;
    box-sizing: border-box;
    > .right {
      margin-left: auto;
    }
  }
  > .top {
    height: 420px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/1ho0s5co5gow000.png')
      no-repeat 100%;
    background-size: 100%;
  }
  > .listbox {
    border-radius: 24px 24px 0px 0px;
    background: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    > .list {
      margin-top: 32px;
      background: #ffffff;
      box-shadow: 0px 4px 24px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      padding: 44px 32px;
      box-sizing: border-box;
      > h1 {
        font-size: 36px;
        font-weight: bold;
        color: #1a1a1a;
        display: -webkit-box;
        line-height: 40px;
        word-break: break-all;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; /* 超出n行这里写n */
        -webkit-box-orient: vertical;
      }
      > .box {
        display: flex;
        align-items: center;
        margin-top: 19px;
        > .left {
          > .top {
            display: flex;
            align-items: center;
            > img {
              width: 40px;
              height: 40px;
              background: #6d7177;
              object-fit: cover;
              margin-right: 12px;
              border-radius: 50%;
            }
            > p {
              font-size: 26px;
              font-weight: 400;
              color: #222222;
            }
          }
          > .tit {
            margin-top: 10px;
            font-size: 30px;
            font-weight: 400;
            color: #555555;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
          }
        }
        > .right {
          width: 190px;
          height: 127px;
          background: #cccccc;
          border-radius: 12px;
          object-fit: cover;
          margin-left: 40px;
        }
      }
      > .num {
        display: flex;
        margin-top: 24px;
        > p {
          font-size: 28px;
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
          align-self: center;
        }
      }
    }
    > .list:first-child {
      margin-top: 0;
    }
  }
}
.newspaperTitle {
  height: 50px;
  font-size: 36px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #ffffff;
  line-height: 50px;
}
.bottom {
  width: 336px;
  height: 60px;
  background: #f5f5f5;
  border-radius: 30px;
  display: flex;
  align-items: center;
  font-size: 24px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #999999;
  // line-height: 24px;
  justify-content: center;
  margin: 60px auto;
  .my_icon {
    margin-left: 8px;
  }
}
::v-deep .fixed-head {
  position: absolute !important;
  background: #4974f5 !important;
}
::v-deep .my-head {
  background: url('https://cdn.shupian.cn/sp-pt/wap/1ho0s5co5gow000.png')
    no-repeat;
  background-size: 100%;
  box-shadow: none !important;
}
.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.88rem;
  padding: 0 0.32rem;
  // background: #4974f5;
  div {
    display: flex;
    height: 0.88rem;
    align-items: center;
  }
  .newspaperTitle {
    font-size: 36px;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
