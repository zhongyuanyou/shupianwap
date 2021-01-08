<template>
  <div class="sidebar-navbar">
    <h5>服务介绍</h5>
    <div class="sidebar-navbar-list">
      <sp-sidebar v-model="activeKey" @change="onChange">
        <sp-sidebar-item
          v-for="(item, index) of 5"
          :key="index"
          :title="`标签${index}`"
        />
      </sp-sidebar>
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
    margin: 0 40px;
    width: 670px;
    height: 416px;
    background: #ffffff;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 4px 4px 12px 12px;
  }
  /deep/.sp-sidebar {
    .sp-sidebar-item {
      padding: 32px 0 32px 32px;
    }
    .sp-sidebar-item--select {
      color: #4974f5;
    }
  }
}
</style>
