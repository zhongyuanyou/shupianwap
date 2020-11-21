<template>
  <div class="demo-page">
    <div class="modle-item">
      <TabCurve
        :tab-list="tabList"
        @selectTabHandle="selectTabHandle"
      ></TabCurve>
    </div>
    <my-icon name="shop_ic_open" size="0.68rem" color="#000"></my-icon>
  </div>
</template>

<script>
import TabCurve from '@/components/tab/TabCurve'
export default {
  name: 'Test',
  components: {
    TabCurve,
  },
  data() {
    return {
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
  .modle-item {
    width: 100%;
    // padding: 0 40px;
    box-sizing: border-box;
  }
}
</style>
