<template>
  <div class="serveGoods">
    <sp-dropdown-menu>
      <sp-dropdown-item v-model="value1" title="全部服务" />
      <sp-dropdown-item v-model="value2" title="默认排序" :options="option" />
    </sp-dropdown-menu>
    <install-app />
  </div>
</template>

<script>
import { DropdownMenu, DropdownItem } from '@chipspc/vant-dgg'
import InstallApp from '@/components/common/app/InstallApp'
export default {
  name: 'ServeGoods',
  components: {
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    InstallApp,
  },
  data() {
    return {
      value1: 0,
      value2: 0,
      option: [
        { text: '默认排序', value: 0 },
        { text: '销量从高到低', value: 1 },
        { text: '销量从低到高', value: 2 },
        { text: '价格从高到低', value: 3 },
        { text: '价格从低到高', value: 4 },
      ],
    }
  },
  methods: {
    handlerItemChange(action, index) {
      console.log(action, index)
      // this.$toast(`选择结果：${JSON.stringify({ type: action, index })}`);
    },
  },
}
</script>

<style lang="less" scoped>
.serveGoods {
  /*height: calc(100% - 200px);*/
  /deep/.sp-dropdown-menu__bar {
    height: 80px;
    box-shadow: none;
    padding: 0 40px;
  }
  /deep/.sp-dropdown-menu__item {
    margin-right: 80px;
    &:last-child {
      margin-right: 0;
    }
  }
  /deep/.sp-cell {
    padding: 28px 40px;
  }
}
</style>
