<template>
  <div class="wrapper">
    <Header title="帮助中心" @leftClickFuc="onClickLeft" />
    <sp-search
      v-model="searchText"
      placeholder="搜索您遇到的问题"
      background="#f8f8f8"
      class="search"
      clearable
      reverse
      @search="searchFuc"
    />
    <sp-cell-group>
      <sp-cell
        v-for="(item, index) in list"
        :key="index"
        center
        is-link
        class="cellClass"
        @click="onServiceTouch"
      >
        <template #title>
          <span class="custom-title">{{ item + index }}</span>
        </template>
      </sp-cell>
    </sp-cell-group>
    <div v-if="isShowNoFind" class="noFindDiv">
      <div>
        <img :src="img" alt="" />
      </div>
      <span class="firstSpan">抱歉，未找到相关问题</span>
      <span class="lastSpan">联系客服</span>
    </div>
  </div>
</template>

<script>
import { Search, Cell, CellGroup } from '@chipspc/vant-dgg'
import Header from '@/components/common/my/header/header'
export default {
  name: 'HelpCenter',
  components: {
    [Search.name]: Search,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    Header,
  },
  props: {},
  data() {
    return {
      searchText: '',
      list: [
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
        '回答',
      ],
      img: require('~/assets/temporary/home/notify_img_logo@1,5x.png'),
      isShowNoFind: false,
    }
  },
  computed: {},
  watch: {
    list(newVal, oldVal) {
      // 是否显示未到到框的逻辑
      this.isShowNoFind =
        !Array.isArray(newVal) || (Array.isArray(newVal) && !newVal.length)
    },
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    onServiceTouch() {
      //   console.log(111)
      this.$router.push({
        path: '/my/help/questions',
        query: { type: 1 },
      })
    },
    searchFuc() {
      // 这里异步取数据
      this.list = []
    },
  },
}
</script>
<style lang="less" scoped>
.wrapper {
  .cellClass {
    // height: 72px;
  }
  .noFindDiv {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 176px;
    span {
      margin-top: 24px;
      font-family: PingFang SC;
      font-weight: bold;
    }
    img {
      width: 340px;
      height: 340px;
    }
    .firstSpan {
      font-size: 30px;
      color: #1a1a1a;
    }
    .lastSpan {
      font-size: 28px;
      color: #4974f5;
    }
  }
}
</style>
