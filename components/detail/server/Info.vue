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
      // 运营提供数据,对应 key 关键字
      tempAttr: [
        {
          key: [
            'SX20210820541037',
            'SX20210820541020',
            'SX20210820541048',
            'SX20210820541150',
            'SX20210820541032',
            'SX20210820541095',
            'SX20210820541140',
          ],
          text: '贷款期数',
        },
        {
          key: [
            'SX20210820541035',
            'SX20210820541025',
            'SX20210820541046',
            'SX20210820541154',
            'SX20210820541030',
            'SX20210820541098',
            'SX20210820541144',
          ],
          text: '贷款额度',
        },
        {
          key: [
            'SX20210820541036',
            'SX20210820541022',
            'SX20210820541047',
            'SX20210820541149',
            'SX20210820541027',
            'SX20210820541094',
          ],
          text: '月贷款利率',
        },
        {
          key: ['SX20210820541143'],
          text: '还款方式',
        },
      ], // 展示属性
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
        if (item.key.some((n) => n === item1.attrCode)) {
          tempItemVals.push(item1.attrValName)
        }
      })
      if (tempItemVals.length) {
        this.attr.push({
          name: item.text,
          vals: tempItemVals.join(','),
        })
      }
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
