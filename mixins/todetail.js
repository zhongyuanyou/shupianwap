export default {
  methods: {
    //   服务商品跳转
    toGoodsDeatil(serveGoods) {
      console.log('页面跳转', serveGoods)
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
            detailUrl = '/detail/zscq'
          } else if (serveGoods.classCodeLevel.match('FL20210425164558')) {
            // 融资
            detailUrl = '/detail/financing'
          } else if (
            serveGoods.classCodeLevel.match('FL20210604312000') ||
            serveGoods.classCodeLevel.match('FL20210428166370')
          ) {
            // 法律
            detailUrl = '/detail/law'
          } else if (
            serveGoods.classCodeLevel.match('FL20210526292003') ||
            serveGoods.classCodeLevel.match('FL20210425164016')
          ) {
            // IT 互联网
            detailUrl = '/detail/internet'
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
