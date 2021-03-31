<template>
  <div class="container">
    <div class="container_head">
      <sp-sticky @scroll="scrollHandle">
        <div class="header_search">
          <my-icon
            name="nav_ic_back"
            size="0.40rem"
            color="#FFFFFF"
            class="my_icon"
            @click.native="$router.back()"
          ></my-icon>
          <div v-show="showPaper" class="newspaperTitle">日报精选</div>
          <my-icon
            name="sear_ic_sear"
            size="0.40rem"
            color="#FFFFFF"
            class="my_icon"
          ></my-icon>
        </div>
      </sp-sticky>
      <div class="newspaper">日报精选</div>
      <div class="day_num">08</div>
      <div class="weekday">周一</div>
      <div class="title">专属必懂带逛小助手，带你发现并懂精品</div>
    </div>

    <div class="container_body"><ProblemItem /></div>
  </div>
</template>
<script>
import { Sticky } from '@chipspc/vant-dgg'
import ProblemItem from '@/components/mustKnown/recommend/ProblemItem'

// import Search from '@/components/mustKnown/recommend/search/Search'
// import { foundApi } from '@/api'

export default {
  name: 'Recommend',
  components: {
    [Sticky.name]: Sticky,
    ProblemItem,
  },
  data() {
    return {
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
  methods: {
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
  position: relative;
  .container_head {
    height: 380px;
    background: #4974f5;
    position: relative;
    .header_search {
      padding: 0 34px;
      height: 88px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #4974f5;
      .my_icon {
      }
      .newspaperTitle {
        height: 50px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 50px;
      }
    }
    .newspaper {
      position: absolute;
      top: 186px;
      left: 40px;
      font-size: 52px;
      font-family: AlibabaPuHuiTiH;
      color: #ffffff;
      line-height: 52px;
    }
    .day_num {
      position: absolute;
      top: 186px;
      right: 60px;
      height: 56px;
      font-size: 56px;
      font-family: Bebas;
      color: #ffffff;
      line-height: 56px;
    }
    .weekday {
      position: absolute;
      top: 264px;
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
      top: 264px;
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
    top: 350px;
  }
}
</style>
