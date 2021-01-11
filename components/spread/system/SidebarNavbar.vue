<template>
  <div class="sidebar-navbar">
    <h5>服务介绍</h5>
    <div class="sidebar-navbar-list">
      <sp-sidebar v-model="activeKey" @change="onChange">
        <sp-sidebar-item
          v-for="(item, index) of 4"
          :key="index"
          :title="`咨询分${index}`"
        />
      </sp-sidebar>
      <div class="sidebar-navbar-list-content">
        <div v-for="(item, index) of contents" :key="index">
          <div v-show="item.flag" v-html="item.content"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast, Sidebar, SidebarItem } from '@chipspc/vant-dgg'
export default {
  name: 'Introduction',
  components: {
    [Toast.name]: Toast,
    [Sidebar.name]: Sidebar,
    [SidebarItem.name]: SidebarItem,
  },
  props: {
    //     listCount: {
    //       type: Array,
    //       default: () => {
    //         return []
    //       },
    //     },
    //     isMore: {
    //       type: Boolean,
    //       default: () => {
    //         return false
    //       },
    //     },
  },
  data() {
    return {
      activeKey: 0,
      contents: [
        {
          content: `<h5>薯片为您提供:</h5> <p>（1）发起人符合法定人数，其中须有半数以上的发起人在中国境内有住所。</p>
            <p>（2）有符合公司章程规定的全体发起人认购的股本数额或者募集的实收股本总额。</p>
            <p>（3）股份发行、筹办事项符合法律规定，在发起人认购的股份缴足前，不得向他人募集股份。</p>
            <h5>您只需准备：</h5>
            <p>（1）有公司名称，建立符合股份有限公司要求的组织机构。</p>`,
          flag: true,
        },
        {
          content: '3213',
          flag: false,
        },
        {
          content: '4863',
          flag: false,
        },
        {
          content: '6984',
          flag: false,
        },
      ],
    }
  },
  methods: {
    onChange(index) {
      this.contents.forEach((element) => {
        element.flag = false
      })
      this.contents[index].flag = true
    },
  },
}
</script>
<style lang="less" scoped>
.sidebar-navbar {
  font-size: 40px;
  h5 {
    // 待改
    margin: 56px 0 32px 42px;
    height: 40px;
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
  }
  &-list {
    position: relative;
    margin: 0 40px;
    width: 670px;
    height: 416px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 4px 4px 12px 12px;
    /deep/&-content {
      padding: 0px 28px 32px 24px;
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 502px;
      height: 416px;
      overflow-x: auto;
      h5 {
        height: 26px;
        line-height: 24px;
        font-size: 26px;
        font-weight: bold;
        color: #333333;
        margin-bottom: 34px;
        margin-top: 32px;
      }
      p {
        font-size: 24px;
        font-weight: 400;
        color: #666666;
        line-height: 36px;
      }
    }
  }
  /deep/.sp-sidebar {
    height: 100%;
    background-color: #f4f4f4;
    .sp-sidebar-item {
      width: 168px;
      line-height: 25px;
      padding: 32px 8px 32px 32px;
      background-color: #f4f4f4;
    }
    .sp-sidebar-item--select {
      color: #4974f5;
      background-color: #ffffff;
      &::before {
        width: 4px;
        height: 22px;
        background: #4974f5;
      }
    }
  }
}
</style>
