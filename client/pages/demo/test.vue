<template>
  <div class="demo-page">
    <div class="modle-item">
      <Search>
        <template v-slot:left>
          <span>X</span>
        </template>
        <template v-slot:center>
          <span>city</span>
        </template>
        <template v-slot:right>
          <span>取消</span>
        </template>
      </Search>
    </div>
    <div class="modle-item">
      <TabCurve
        :tab-list="tabList"
        @selectTabHandle="selectTabHandle"
      ></TabCurve>
    </div>
  </div>
</template>

<script>
import TabCurve from '@/components/tab/TabCurve'
import Search from '@/components/search/Search'
export default {
  name: 'Test',
  components: {
    TabCurve,
    Search,
  },
  data() {
    return {
      isFixed: false,
      tabList: [
        {
          label: '公司',
          code: '1',
        },
        {
          label: '商标',
          code: '2',
        },
        {
          label: '专利',
          code: '2',
        },
        {
          label: '新媒',
          code: '2',
        },
        {
          label: '资质',
          code: '2',
        },
        {
          label: '网店',
          code: '2',
        },
        {
          label: '内容',
          code: '2',
        },
      ],
    }
  },
  methods: {
    selectTabHandle(data) {
      console.log(data)
    },
  },
}
</script>

<style lang="less" scoped>
.demo-page {
  width: 100%;
  min-height: 3000px;
  background-color: pink;
  .modle-item {
    width: 100%;
    // padding: 0 40px;
    box-sizing: border-box;
  }
}
</style>
