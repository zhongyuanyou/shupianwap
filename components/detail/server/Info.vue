<template>
  <div v-if="attr.length" class="c-info">
    <div class="title">
      <div class="title__name">产品信息</div>
    </div>
    <div class="content">
      <div v-for="(item, i) in attr" :key="i" class="content__line">
        <div class="label">{{ `${item.name}:` }}</div>
        <div class="text">{{ item.vals }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GoodDetailInfo',
  components: {},
  data() {
    return {
      tempAttr: ['还款方式', '月利息要求', '期望期限'], // 展示属性
      attr: [],
    }
  },
  computed: {
    ...mapState({
      sellingDetail: (state) => state.sellingGoodsDetail.sellingGoodsData,
    }),
  },
  mounted() {
    const attr = this.sellingDetail.commonDetailAttrs
    this.tempAttr.forEach((item) => {
      const tempItemVals = []
      attr.forEach((item1) => {
        if (item1.attrName === item) {
          tempItemVals.push(item1.attrValName)
        }
      })
      this.attr.push({
        name: item,
        vals: tempItemVals.join(','),
      })
    })
  },
  methods: {},
}
</script>

<style lang="less" scoped>
@import '~@css/pages/detail/var.less';
.c-info {
  .c-space-mixin();
  padding: @c-padding;
  background: @c-bg;
  .title {
    .c-title-font-mixin();
  }
  .content {
    margin-top: 34px;
    &__line {
      margin-bottom: 20px;
      font-size: 30px;
      line-height: 42px;
      display: flex;
      align-items: flex-start;
      .label {
        width: 180px;
        color: #999;
      }
      .text {
        flex: 1;
        color: #222222;
      }
    }
  }
}
</style>
