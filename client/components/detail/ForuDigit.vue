<template>
  <div class="foru-digit">
    <ul class="item-list" @click="itemChange">
      <li v-for="(elem, i) of child" :key="i">
        {{ elem }}
      </li>
    </ul>
    <div class="button">
      <BottomConfirm
        @resetFilters="resetFilters"
        @confirmFilters="confirmFilters"
      />
    </div>
  </div>
</template>
<script>
import {
  Toast,
  Icon,
  WorkTabFilter,
  WorkTabFilterItem,
} from '@chipspc/vant-dgg'
import BottomConfirm from '../common/filters/BottomConfirm'
export default {
  name: 'BeforFoure',
  components: {
    BottomConfirm,
  },
  props: {
    child: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {}
  },
  methods: {
    itemChange(e) {
      if (e.target.nodeName === 'LI' && e.target.dataset.n === '1') {
        console.log(111)
      } else {
        e.target.dataset.n = '1'
        console.log(222)
      }
    },
    resetFilters() {
      alert('重置')
    },
    confirmFilters() {
      alert('确定')
    },
  },
}
</script>
<style lang="less" scoped>
.foru-digit {
  font-size: 24px;
  color: #222222;
  .item-list {
    display: flex;
    flex-wrap: wrap;
    padding-left: 26px;
    li {
      width: 250px;
      background: #f0f4ff;
      width: 149px;
      height: 64px;
      line-height: 64px;
      margin: 24px 12.5px;
      text-align: center;
    }
  }
}
</style>
