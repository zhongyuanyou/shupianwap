<template>
  <a
    v-md:p_commodityClick
    class="goods-item"
    data-even_name="p_commodityClick"
    :data-com_level_1_code="mdData.commodity_level_1"
    :data-com_level_2_code="mdData.commodity_level_2"
    data-commodity_level_1=""
    data-commodity_level_2=""
    :data-n_now_price="mdData.n_now_price"
    :data-commodity_number="mdData.commodity_number"
    :data-commodity_name="mdData.commodity_name"
    :data-commodity_type="mdData.commodity_type"
    :data-track_code="mdData.track_code"
    @click="jumpUrl"
  >
    <div class="goods-item-left">
      <img
        :src="$resizeImg(80, 80, sbGoodsImg || itemData.goodsImg)"
        alt=""
        class="goods-img"
      />
      <!--<span class="tag">急售</span>-->
    </div>
    <div class="goods-right">
      <h3 v-if="dictCode === 'CATE-JYZY-GS'">
        {{ itemData.dzname }}
      </h3>
      <h3 v-else v-html="heightLightHtml(itemData.name || getGoodsName())"></h3>
      <p
        :style="{
          visibility: description ? 'visible' : 'hidden',
        }"
        v-html="heightLightHtml(description)"
      ></p>
      <div v-if="goodstype.type === 'serve' && tags.length > 0" class="tags">
        <span v-for="(item, index) in tags" :key="index">{{ item.name }}</span>
      </div>
      <div v-if="itemData.slogan" class="slogan">
        {{ itemData.slogan }}
      </div>
      <div class="price-sales">
        <span>{{ itemData.referencePrice }}<b>元</b></span
        ><span v-if="goodstype.type === 'serve'"
          >销量 {{ itemData.salesSum }}</span
        >
      </div>
    </div>
  </a>
</template>

<script>
import Moment from 'moment'
import utils from '@/utils/spread/util.js'
export default {
  name: 'GoodsItem',
  props: {
    isList: {
      // 是否是列表页
      type: Boolean,
      default() {
        return false
      },
    },
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
    dictCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      sbGoodsImg: '', // 商标图片
    }
  },
  computed: {
    mdData() {
      // 埋点数据组装
      const { itemData } = this
      const mdData = {}
      if (itemData) {
        if (itemData.parentClassCode) {
          mdData.commodity_level_1 =
            itemData.parentClassCode.split(',')[0] || '' // 1级分类
          mdData.commodity_level_2 =
            itemData.parentClassCode.split(',')[1] || '' // 2级分类
        }
        mdData.n_now_price = itemData.referencePrice // 商品售价
        mdData.commodity_number = itemData.productNo // 商品编号
        mdData.commodity_name = this.getGoodsName() // 商品名
        mdData.commodity_type = this.itemData.operating
          ? '服务商品'
          : '交易商品' // 商品类型 服务商品、交易商品、服务资源
        mdData.track_code = !this.isList
          ? 'SPW000022'
          : this.goodstype.type === 'serve'
          ? 'SPW000026'
          : 'SPW000027'
      }
      // console.log(mdData)
      return mdData
    },
    description() {
      // 描述，包括
      // console.log(this.itemData)
      if (this.itemData.operating) {
        // 服务商品
        return this.itemData.operating.slogan
      }
      if (this.itemData.fieldList && this.itemData.fieldList.length) {
        // 交易商品
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
              // 注册时间
              case 'registration_time':
                desc.push(utils.resetTimeField(val))
                break
              // 注册资本
              case 'qualification_registered_capital':
              case 'registered_capital':
                desc.push(utils.priceHandle(val))
                break
              // 区域
              case 'qualification_registration_area':
                desc.push(val.split(',')[0])
                break
              // 到期时间
              case 'qualification_expire_date':
                desc.push(val.split('-')[0] + '年')
                break
              // 安许证
              case 'safety_production_license':
                desc.push(val === '是' ? '有安许证' : '无安许证')
                break
              // 商标图片
              case 'logo_image':
                if (item.resourceIdPathUrls) {
                  this.sbGoodsImg = item.resourceIdPathUrls
                    .split(';')[0]
                    .split(',')[1]
                } else {
                  this.sbGoodsImg = this.itemData.goodsImg
                }
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
        return this.itemData.PRO_SALES_TAG.slice(0, 3)
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
      if (this.goodstype.type === 'serve') {
        this.$router.push(
          `/detail?productId=${this.itemData.id}`
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
    position: relative;
    min-height: 220px;
    padding-bottom: 40px;
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
    .slogan {
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      -webkit-line-clamp: 1;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      word-break: break-all;
      overflow: hidden;
      white-space: normal;
    }
    .price-sales {
      display: flex;
      position: absolute;
      bottom: 0;
      align-items: flex-end;
      display: inherit;
      // margin-top: 12px;
      // margin-bottom: 34px;
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
