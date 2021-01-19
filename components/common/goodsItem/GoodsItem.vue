<template>
  <div class="goods-item" @click="jumpUrl">
    <div class="goods-item-left">
      <img :src="itemData.goodsImg" alt="" class="goods-img" />
      <!--<span class="tag">急售</span>-->
    </div>
    <div class="goods-right">
      <h3 v-html="heightLightHtml(getGoodsName())"></h3>
      <p
        :style="{
          visibility: description ? 'visible' : 'hidden',
        }"
        v-html="heightLightHtml(description)"
      ></p>
      <div
        class="tags"
        :style="{
          visibility: goodstype.type === 'serve' ? 'visible' : 'hidden',
        }"
      >
        <span v-for="(item, index) in tags" :key="index">{{ item.name }}</span>
      </div>
      <div class="price-sales">
        <span>{{ itemData.referencePrice }}元</span
        ><span v-if="goodstype.type === 'serve'"
          >销量 {{ itemData.salesSum }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import Moment from 'moment'
import utils from '@/utils/spread/util.js'
export default {
  name: 'GoodsItem',
  props: {
    searchKey: {
      // 用户搜索的关键词
      type: String,
      default() {
        return ''
      },
    },
    goodstype: {
      type: Object,
      default() {
        return {
          type: 'serve',
          typeCode: '',
        }
      },
    },
    itemData: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    mdData() {
      // 埋点数据组装
      const { itemData } = this
      const mdData = {}
      if (itemData) {
        mdData.commodity_level_1 = itemData.parentClassCode.split(',')[0] // 1级分类
        mdData.commodity_level_2 = itemData.parentClassCode.split(',')[1] // 2级分类
        mdData.n_now_price = itemData.referencePrice // 商品售价
        mdData.commodity_number = itemData.productNo // 商品编号
        mdData.commodity_name = this.getGoodsName() // 商品名
        mdData.commodity_type = this.itemData.operating
          ? '服务商品'
          : '交易商品' // 商品类型 服务商品、交易商品、服务资源
      }
      // console.log(mdData)
      return mdData
    },
    description() {
      // 描述，包括
      // console.log(this.itemData)
      if (this.itemData.operating) {
        return this.itemData.operating.slogan
      }
      if (this.itemData.fieldList && this.itemData.fieldList.length) {
        const desc = []
        this.itemData.fieldList.forEach((item) => {
          let val = ''
          // 处理无字段数据的情况
          if (item.fieldValueCn) {
            val = item.fieldValueCn
          } else if (item.fieldValue) {
            val = item.fieldValue
          } else {
            val = ''
          }
          if (val) {
            switch (item.fieldCode) {
              case 'registration_time':
                desc.push(utils.resetTimeField(val))
                break
              case 'registered_capital':
                desc.push(utils.priceHandle(val))
                break
              case 'qualification_registration_area':
                desc.push(val.split(',')[0])
                break
              case 'qualification_expire_date':
                desc.push(val.split('-')[0] + '年')
                break
              case 'safety_production_license':
                desc.push(val === '是' ? '有安许证' : '无安许证')
                break
              case 'qualification_registered_capital':
                desc.push(utils.priceHandle(val))
                break
              default:
                desc.push(val)
            }
          }
        })
        return desc.join(' | ')
      }
      return ''
    },
    tags() {
      if (
        'PRO_SALES_TAG' in this.itemData &&
        this.itemData.PRO_SALES_TAG.length
      ) {
        return this.itemData.PRO_SALES_TAG
      } else {
        return []
      }
    },
  },
  methods: {
    getGoodsName() {
      // 获取商品名
      let goodsName = ''
      if (this.itemData.operating) {
        // 服务商品的名字需要从operating中去取showName，如果没有值，则去外层取name
        goodsName = this.itemData.operating.showName
          ? this.itemData.operating.showName
          : this.itemData.name
      } else {
        // 交易商品直接去取name
        goodsName = this.itemData.name
      }
      return goodsName
    },
    jumpUrl() {
      window.sensors.track('p_commodityClick', { ...this.mdData })
      if (this.goodstype.type === 'serve') {
        this.$router.push(
          `/detail/serviceDetails?productId=${this.itemData.id}`
        )
      } else {
        this.$router.push(
          `/detail/transactionDetails?type=${this.goodstype.typeCode}&productId=${this.itemData.id}`
        )
      }
    },
    heightLightHtml(str) {
      // 高亮显示
      if (this.searchKey !== '' && str && str.indexOf(this.searchKey) !== -1) {
        const _str = str.replace(
          new RegExp(this.searchKey, 'g'),
          `<span style="color: #4974f5;">${this.searchKey}</span>`
        )
        return _str
      } else {
        return str
      }
    },
  },
}
</script>

<style lang="less" scoped>
.goods-item {
  display: flex;
  width: 100%;
  align-items: flex-start;
  overflow: hidden;
  .goods-item-left {
    position: relative;
    width: 160px;
    height: 160px;
    min-width: 160px;
    min-height: 160px;
    /*background: #f8f8f8;*/
    border-radius: 4px;
    margin: 40px 32px 0 40px;
    .goods-img {
      width: 160px;
      height: 160px;
      min-width: 160px;
      min-height: 160px;
      border-radius: 4px;
    }
    .tag {
      position: absolute;
      font-size: 22px;
      line-height: 1;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      background: #fa5741;
      border-radius: 4px 0px 4px 0px;
      padding: 10px;
      left: 0;
      top: 0;
    }
  }
  .goods-right {
    display: flex;
    flex-direction: column;
    width: calc(100% - 52px);
    padding-right: 52px;
    overflow: hidden;
    h3 {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 38px;
      .textOverflow(2);
      overflow: hidden;
      margin-top: 36px;
      margin-bottom: 12px;
    }
    p {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 32px;
      margin-bottom: 12px;
      .textOverflow(1);
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      display: inherit;
      height: 32px;
      overflow: hidden;
      span {
        display: inline-block;
        height: 32px;
        line-height: 32px;
        padding: 0 8px;
        background: #f0f2f5;
        border-radius: 4px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #5c7499;
        margin-right: 12px;
        .textOverflow(1);
        &:last-child {
          margin-right: 0;
        }
      }
    }
    .price-sales {
      display: flex;
      align-items: flex-end;
      display: inherit;
      margin-top: 12px;
      margin-bottom: 34px;
      span {
        &:nth-child(1) {
          font-size: 26px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #ec5330;
          margin-right: 20px;
        }
        &:nth-child(2) {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #999999;
        }
      }
    }
  }
}
</style>
