<!--
 * @Author: xiao pu
 * @Date: 2020-11-21 15:13:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-21 16:57:29
 * @Description: file content
 * @FilePath: /chips-wap/client/components/serviceSelected/ServiceSelect.vue
-->
<template>
  <div class="service-select">
    <sp-tree-select
      height="55vw"
      :items="items"
      :active-id.sync="activeIds"
      :main-active-index.sync="active"
    >
    </sp-tree-select>
  </div>
</template>

<script>
import { TreeSelect, Button, Image } from '@chipspc/vant-dgg'

export default {
  name: 'ServiceSelect',
  components: {
    [TreeSelect.name]: TreeSelect,
    [Image.name]: Image,
    [Button.name]: Button,
  },
  props: {},
  data() {
    return {
      active: 0,
      activeIds: [-1],
      items: [
        {
          text: '不限',
          className: 'my-class',
          children: [
            {
              text: '不限',
              id: -1,
            },
          ],
        },
        {
          text: '工商服务',
          className: 'my-class',
          children: [
            {
              text: '不限',
              id: -1,
            },
            {
              text: '有限公司注册',
              id: 1,
            },
            {
              text: '外资公司注册',
              id: 2,
              disabled: true,
            },
            {
              text: '印章',
              id: 3,
            },
            {
              text: '公司地址变更',
              id: 4,
            },
          ],
        },
        {
          text: '会计财税',
          className: 'my-class',
          children: [],
        },
        {
          text: '知产服务',
          className: 'my-class',
          children: [],
        },
      ],
    }
  },

  mounted() {},
}
</script>

<style lang="less" scoped>
.service-select {
  /deep/.sp-tree-select {
    .sp-tree-select__nav {
      flex: 190px 0 1;
      .sp-sidebar-item {
        padding: 30px 40px;
        color: @text-main-color;
        font-size: 28px;
        font-weight: 400;
        background-color: #f0f0f0;
      }
      .sp-sidebar-item--select {
        color: @main-color;
        font-weight: bold;
        background-color: #ffffff;
        &::before {
          display: none;
        }
      }
    }
  }
}
</style>
