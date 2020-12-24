<template>
  <div>
    <Header title="常见问题" @leftClickFuc="onClickLeft" />
    <div class="problem">
      <ProblemItem
        v-for="(item, index) in problemData"
        :key="index"
        :item-data="item"
      />
    </div>
  </div>
</template>

<script>
import { Collapse, CollapseItem } from '@chipspc/vant-dgg'
import Header from '~/components/common/head/header'
import ProblemItem from '~/components/detail/ProblemItem'
import problemMockData from '~/mock/problem'
export default {
  name: 'CommonProblem',
  components: {
    Header,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    ProblemItem,
  },
  data() {
    return {
      activeNames: ['1'],
      problemData: [],
    }
  },
  mounted() {
    this.getMockData(this.$route.params.type)
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    getMockData(classCode) {
      const problemData = problemMockData[classCode]
      this.problemData = problemData
    },
  },
}
</script>

<style scoped lang="less">
.problem {
  background: #f8f8f8;
  min-height: 100vh;
}
</style>
