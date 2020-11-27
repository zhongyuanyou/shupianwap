<!--
 * @Author: ma liang
 * @Date: 2020-11-26 13:09:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-26 13:09:23
 * @Description: search city
 * @FilePath: /chips-wap/client/pages/city/searchCity.vue
-->
<template>
  <div class="city-search">
    <sp-sticky>
      <div class="search-content">
        <Search
          ref="searchRef"
          :icon-left="0.35"
          placeholder="请输入城市名称"
          @valChangeHandle="valChangeHandle"
        >
          <template v-slot:right>
            <a
              class="cloose-btn"
              href="javascript:void(0);"
              @click="clooseHandle"
              >取消</a
            >
          </template>
        </Search>
      </div>
    </sp-sticky>
    <div v-if="searchList.length" class="search-results">
      <div v-for="(item, index) in searchList" :key="index">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { Sticky } from '@chipspc/vant-dgg'
import Search from '@/components/common/search/Search'
export default {
  name: 'SearchCity',
  components: {
    [Sticky.name]: Sticky,
    Search,
  },
  data() {
    return {
      searchList: [
        {
          code: 'COMPANY_CD',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 0,
          name: '成都',
          id: '7832865662955618304',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '四川省/成都市',
        },
        {
          code: 'COMPANY_BJCY',
          pcode: 'COMPANY',
          description: '',
          pid: '7832865386077028352',
          sort: 1,
          name: '北京',
          id: '7837857825929887744',
          ext5: '',
          ext4: '',
          ext3: '',
          levels: '-1_1_7864361670522896384_7832865386077028352',
          ext2: '',
          status: 1,
          ext1: '北京市',
        },
      ],
    }
  },
  methods: {
    // 取消
    clooseHandle() {
      this.$router.back()
    },
    // 搜索框内容变化
    valChangeHandle(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="less" scoped>
.city-search {
  width: 100%;
  .search-content {
    border-bottom: 1px solid #f8f8f8;
    .cloose-btn {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      margin-left: 40px;
    }
  }
  .search-results {
    width: 100%;
    padding: 0 40px;
    > div {
      width: 100%;
      height: 120px;
      line-height: 120px;
      border-bottom: 1px solid #f4f4f4;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
    }
  }
}
</style>
