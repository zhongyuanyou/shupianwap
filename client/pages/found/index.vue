<template>
  <div class="found">
    <!--S tab-->
    <sp-work-tabs
      v-model="activeTab"
      title-inactive-color="#222"
      title-active-color="#1a1a1a"
      line-width="0.32rem"
      line-height="0.06rem"
      :mask="true"
      :is-nav-tab="true"
      :need-content="false"
      :sticky="true"
    >
      <sp-work-tab v-for="(item, index) in tabs" :key="index" :title="item">
        <Con />
      </sp-work-tab>
    </sp-work-tabs>
    <!--E tab-->
  </div>
</template>

<script>
import { WorkTab, WorkTabs } from '@chipspc/vant-dgg'
import Con from '~/components/found/found/Cons'
export default {
  name: 'Index',
  components: {
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    Con,
  },
  data() {
    return {
      activeTab: 0,
      tabs: ['推荐', '知识', '新闻', '活动', '行情', '快报'],
    }
  },
}
</script>

<style lang="less" scoped>
.found {
}
</style>
