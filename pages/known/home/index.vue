<template>
  <div class="collection_container">个人主页</div>
</template>

<script>
import { Tabs, Tab, Image, List } from '@chipspc/vant-dgg'
import { userinfoApi } from '~/api'
export default {
  name: 'Collection',
  components: {
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [Image.name]: Image,
    [List.name]: List,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.collection_container {
  height: 100%;
  background-color: #f8f8f8;
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
