export default {
  methods: {
    //   服务商品跳转
    toGoodsDeatil(serveGoods) {
      if (serveGoods.productType === 'PRO_CLASS_TYPE_TRANSACTION') {
        this.$router.push({
          path: '/detail/transactionDetails',
          query: {
            type: serveGoods.typeCode,
            productId: serveGoods.id,
          },
        })
      } else {
        let detailUrl = '/detail'
        if (serveGoods.classCodeLevel) {
          if (
            serveGoods.classCodeLevel.match('FL20210425164438') ||
            serveGoods.classCodeLevel.match('FL20210425164496')
          ) {
            // 商标或专利跳转至知识产权详情页
            detailUrl = '/detail/server/zscq'
          } else if (serveGoods.classCodeLevel.match('FL20210425164558')) {
            // 融资
            detailUrl = '/detail/server/financing'
          } else if (
            serveGoods.classCodeLevel.match('FL20210604312000') ||
            serveGoods.classCodeLevel.match('FL20210428166370')
          ) {
            // 法律
            detailUrl = '/detail/server/law'
          } else if (
            serveGoods.classCodeLevel.match('FL20210526292003') ||
            serveGoods.classCodeLevel.match('FL20210425164016')
          ) {
            // IT 互联网
            detailUrl = '/detail/server/internet'
          }
        }
        this.$router.push({
          path: detailUrl,
          query: {
            productId: serveGoods.id || serveGoods.productId,
          },
        })
      }
    },
  },
}
