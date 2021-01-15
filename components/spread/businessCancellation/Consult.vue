<template>
  <div class="consult">
    <my-title title="企服专家咨询"></my-title>
    <gui-hua-shi-swipe
      :planners-common="plannersCommon"
      :planners-data="plannersData"
      md-type="new"
    >
    </gui-hua-shi-swipe>
  </div>
</template>

<script>
import MyTitle from '@/components/spread/businessCancellation/MyTitle'
import guiHuaShiSwipe from '@/components/spread/businessCancellation/GuiHuaShiSwipe'

export default {
  components: {
    MyTitle,
    guiHuaShiSwipe,
  },
  props: {},
  data() {
    return {
      plannersData: [
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 138,
          serverNum: 258,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
        {
          id: '7862495547640840192',
          type: '金牌规划师',
          avatarImg: '',
          name: '郭亮亮',
          shuPianFen: 138,
          serverNum: 258,
          telephone: 12345679985,
          labels: ['工商注册', '财税咨询', '税务筹划'],
          jobNum: '107547',
        },
      ],
      plannersCommon: {
        title: '咨询规划师',
        imName: '工商注销_咨询规划师_在线咨询',
        telName: '工商注销_咨询规划师_拨打电话',
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.consult {
  padding: 33px 40px 32px;
}
.planner {
  margin-left: -40px;
  margin-top: -33px;
}
</style>
