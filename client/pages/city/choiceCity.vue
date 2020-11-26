<!--
 * @Author: ma liang
 * @Date: 2020-11-26 10:13:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 10:13:23
 * @Description: Choice city
 * @FilePath: /chips-wap/client/pages/city/choiceCity.vue
-->
<template>
  <div class="city-page">
    <sp-sticky>
      <Search :icon-left="0.35" placeholder="请输入城市名称">
        <template v-slot:left>
          <i>x</i>
        </template>
      </Search>
    </sp-sticky>
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
export default {
  name: 'ChoiceCity',
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  data() {
    return {}
  },
  methods: {},
}
</script>

<style lang="less" scoped></style>
