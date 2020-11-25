<template>
  <div class="recommend-moudle">
    <TabCurve
      :tab-list="tabBtn"
      :need-fixed="false"
      :right="0.54"
      @selectTabHandle="selectTabHandle"
    ></TabCurve>
  </div>
</template>

<script>
import TabCurve from '@/components/common/tab/TabCurve'
export default {
  components: {
    TabCurve,
  },
  props: {
    tabBtn: {
      type: Array,
      default: () => {
        return [
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
            code: '3',
          },
          {
            label: '新媒',
            code: '4',
          },
          {
            label: '资质',
            code: '5',
          },
          {
            label: '网店',
            code: '6',
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    selectTabHandle(data) {
      console.log(data)
    },
  },
}
</script>

<style scoped lang="less"></style>
