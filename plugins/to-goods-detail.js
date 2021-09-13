/**
 * @description 跳转到详情页
 * @author tdb
 */
import Vue from 'vue'
export default ({ app }) => {
  Vue.prototype.toGoodsDeatil = (goodsInfo) => {
    if (goodsInfo.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
      // 交易商品跳转
      app.$router.push({
        path: '/detail/transactionDetails',
        query: {
          type: goodsInfo.typeCode,
          productId: goodsInfo.id,
        },
      })
    } else {
      //   服务商品跳转
      const detailUrl = '/detail'
      // if (goodsInfo.classCodeLevel) {
      //   if (
      //     goodsInfo.classCodeLevel.match('FL20210425164438') ||
      //     goodsInfo.classCodeLevel.match('FL20210425164496')
      //   ) {
      //     // 商标或专利跳转至知识产权详情页
      //     detailUrl = '/detail/server/zscq'
      //   } else if (goodsInfo.classCodeLevel.match('FL20210425164558')) {
      //     // 融资
      //     detailUrl = '/detail/server/financing'
      //   } else if (
      //     goodsInfo.classCodeLevel.match('FL20210604312000') ||
      //     goodsInfo.classCodeLevel.match('FL20210428166370')
      //   ) {
      //     // 法律
      //     detailUrl = '/detail/server/law'
      //   } else if (
      //     goodsInfo.classCodeLevel.match('FL20210526292003') ||
      //     goodsInfo.classCodeLevel.match('FL20210425164016')
      //   ) {
      //     // IT 互联网
      //     detailUrl = '/detail/server/internet'
      //   }
      // }
      app.router.push({
        path: detailUrl,
        query: {
          productId: goodsInfo.id || goodsInfo.productId,
          classCodeOne: goodsInfo.classCodeLevel.split(',')[0],
        },
      })
    }
  }
}
