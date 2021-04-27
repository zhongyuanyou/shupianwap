<template>
  <div class="container">
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
        <div v-show="showHead" class="newspaperTitle">日报精选</div>
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
    <div class="container_head">
      <div>
        <!-- <div class="newspaper">日报精选</div> -->
        <div class="day_num">{{ new Date().getDate() }}</div>
        <div class="weekday">{{ getWekDay() }}</div>
        <!-- <div class="title">专属必懂带逛小助手，带你发现并懂精品</div> -->
      </div>
    </div>

    <div ref="body" class="container_body">
      <ProblemItem :newspaper-data="newspaperData" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { Sticky, Icon } from '@chipspc/vant-dgg'
import ProblemItem from '@/components/mustKnown/recommend/ProblemItem'
import { knownApi } from '@/api'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  name: 'Recommend',
  components: {
    [Sticky.name]: Sticky,
    ProblemItem,
    HeaderSlot,
  },
  data() {
    return {
      name: '',
      showHead: false,
      [Icon.name]: Icon,
      description: '',
      categorIds: [],
      newspaperData: [],
      showPaper: false,
      title: '考研复试体检包含什么项目',
      tabs: ['关注', '推荐', '热榜', '法律', '交易', '知产', '知识'],
      nowIndex: 2,
      infoList: [
        {
          item: 1,
        },
        {
          item: 1,
        },
      ],
    }
  },

  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp, // 是否app中
      appInfo: (state) => state.app.appInfo, // app信息
    }),
  },
  mounted() {
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
    // 初始化
    init() {
      this.name = this.$route.query.name
      this.description = this.$route.query.description
      this.categorIds.push(this.$route.query.id)
      this.getList()
      this.getWekDay()
    },
    toggleTabs(index) {
      console.log('index', index)
      this.nowIndex = index
    },
    scrollHandle({ scrollTop }) {
      // 滚动事件
      if (scrollTop > 88) {
        this.showPaper = true
      } else {
        this.showPaper = false
      }
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
          this.newspaperData = data.rows
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
    getWekDay() {
      const date = '周' + '天一二三四五六'.charAt(new Date().getDay())
      return date
    },
  },
}
</script>
<style lang="less" scoped>
::v-deep .sp-cell {
  overflow: visible;
}
::v-deep .sp-cell__value {
  overflow: visible;
}
::v-deep .sp-work-tab--active {
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #222222;
}
/deep/ .sp-work-tab__text {
  flex-shrink: 0;
  font-size: 32px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: bold;
  color: #999999;
}
/deep/ .sp-work-tabs__line {
  width: 24px;
  height: 6px;
  background: #4974f5;
  border-radius: 3px;
}
/deep/ .fixed-head {
  position: absolute !important;
  background: #4974f5 !important;
}
/deep/ .my-head {
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
.container {
  position: relative;
  .container_head {
    height: 420px;
    background: url('https://cdn.shupian.cn/sp-pt/wap/1ho0s5co5gow000.png')
      no-repeat 100%;
    background-size: 100%;
    position: relative;
    .header_search {
      padding: 0 34px;
      height: 88px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #4974f5;
      .newspaperTitle {
        height: 50px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 50px;
      }
    }
    .newspaper {
      position: absolute;
      top: 100px;
      left: 40px;
      font-size: 52px;
      font-family: AlibabaPuHuiTiH;
      color: #ffffff;
      line-height: 52px;
    }
    .day_num {
      position: absolute;
      top: 218px;
      right: 60px;
      height: 56px;
      font-size: 56px;
      font-family: Bebas;
      color: #ffffff;
      line-height: 56px;
    }
    .weekday {
      position: absolute;
      top: 300px;
      right: 64px;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 26px;
    }
    .title {
      position: absolute;
      top: 174px;
      left: 40px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #ffffff;
      line-height: 26px;
    }
  }

  .container_body {
    padding: 0 20px;
    width: 100%;
    height: 1218px;
    background: #ffffff;
    border-radius: 24px 24px 0px 0px;
    position: absolute;
    top: 370px;
  }
}
</style>
