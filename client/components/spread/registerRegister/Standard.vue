<template>
  <div class="standard">
    <div class="standard-item">
      <sp-cell
        value-class="right-value"
        title-class="left-title"
        :title="title"
        is-link
        arrow-direction="down"
        value="查看更多"
        @click="show = true"
      />
      <sp-action-sheet v-model="show" :actions="actions" @select="onSelect" />
      <div class="content">
        <div v-for="(item, index) of 6" :key="index">
          <div v-if="title == '选项一'">{{ index }}</div>
          <!-- <sp-tabs v-model="active">
          <sp-tab title="标签 1">内容 1</sp-tab>
          <sp-tab title="标签 2">内容 2</sp-tab>
          <sp-tab title="标签 3">内容 3</sp-tab>
          <sp-tab title="标签 4">内容 4</sp-tab>
        </sp-tabs> -->
        </div>
      </div>
    </div>
    <QueryPhone />
  </div>
</template>
<script>
import {
  Cell,
  CellGroup,
  ActionSheet,
  Toast,
  Tab,
  Tabs,
  Image,
} from '@chipspc/vant-dgg'
import QueryPhone from './QueryPhone'
export default {
  name: 'Standard',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [ActionSheet.name]: ActionSheet,
    [Toast.name]: ActionSheet,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    [Image.name]: Image,
    QueryPhone,
  },
  data() {
    return {
      title: '有限公司',
      show: false,
      active: 2,
      actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
    }
  },
  methods: {
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.show = false
      this.title = item.name
      Toast(item.name)
    },
  },
}
</script>
<style lang="less" scoped>
.standard {
  .standard-item {
    width: 669px;
    height: 426px;
    border: 1px solid rgba(205, 205, 205, 0.5);
    border-radius: 8px;
    .sp-cell {
      background-color: #f4f7fe;
      .right-value {
        color: #4974f5;
      }
      .left-title {
        color: #4974f5;
      }
      i {
        color: #4974f5;
      }
    }
  }
}
</style>
