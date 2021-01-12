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
      <div class="sidebar-navbar-list-content">12321</div>
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
    }
  },
  methods: {
    onChange(index) {
      Toast(index)
    },
  },
}
</script>
<style lang="less" scoped>
.sidebar-navbar {
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
    &-content {
      position: absolute;
      top: 0;
      right: 0;
      display: inline-block;
      width: 502px;
      height: 416px;
      border: 1px solid red;
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
