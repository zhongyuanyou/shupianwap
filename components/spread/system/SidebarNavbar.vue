<template>
  <div class="sidebar-navbar">
    <h5>服务介绍</h5>
    <div class="sidebar-navbar-list">
      <sp-sidebar v-model="activeKey" @change="onChange">
        <sp-sidebar-item
          v-for="(item, index) of activeKeyTitle"
          :key="index"
          v-sensorsTrack:webClick="{ name: `体系认证服务流程_${item}` }"
          :title="item"
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
      activeKeyTitle: ['咨询分析', '准备资料', '提交审核', '领取证书'],
      contents: [
        {
          content: `<h5>我们为您提供:</h5> <p><span>①</span> 专业一对一咨询，精确分析企业情况</p>
            <p><span>②</span> 根据企业情况和认证范围选择更合适的体系认证</p>
            <h5>您只需准备：</h5>
            <p><span>①</span> 企业营业执照</p>`,
          flag: true,
        },
        {
          content: `<h5>我们为您提供:</h5>
            <p><span>①</span> 办理前期准备工作，在相关单位备案</p>
            <p><span>①</span> 了解相关政策，一站式办理省时省心</p>
            <h5>您只需准备：</h5>
            <p><span>①</span> 有效的资质证明</p>
            <p><span>②</span> 认证体系覆盖的产品和服务的接收准则清单或说明</p>`,
          flag: false,
        },
        {
          content: `<h5>我们为您提供:</h5> <p><span>①</span> 绿色通道快速办理，拿证更快</p>
          <p><span>②</span> 客户信息严格保密，避免外泄</p>`,

          flag: false,
        },
        {
          content: `<h5>我们为您提供:</h5> <p><span>①</span>品质售后，服务有保障</p>`,
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
      padding: 0px 28px 0px 24px;
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
        margin-bottom: 20px;
        margin-top: 32px;
      }
      h5:not(:first-child) {
        margin-top: 24px;
      }
      p {
        font-size: 24px;
        font-weight: 400;
        color: #666666;
        line-height: 45px;
        margin-bottom: 12px;
        display: flex;
        span {
          margin-right: 14px;
          color: #999999;
          font-size: 30px;
          height: 35px;
          line-height: 40px;
        }
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
