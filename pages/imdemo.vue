<template>
  <div class="page-content">
    <h1>IM 联调 demo 页</h1>
    <div class="demo-btn">
      <a @click="creatImSession">创建会话</a>
      <a @click="sendTemplateMsgWithImg">商品详情发送模板消息（带图片）</a>
      <a @click="sendTemplateMsgNoImg">商品详情发送模板消息（不带图片）</a>
    </div>
  </div>
</template>

<script>
import imHandle from '@/mixins/imHandle'
export default {
  name: 'Imdemo',
  mixins: [imHandle],
  methods: {
    // 创建IM会话
    creatImSession() {
      const imUserId = '607991036165120329' // 商户用户ID
      const imUserType = 'MERCHANT_USER' // 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户
      this.creatImSessionMixin({ imUserId, imUserType })
    },
    // 发送模板消息(带图片)
    sendTemplateMsgWithImg() {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      const sessionParams = {
        imUserId: '607991036165120329', // 商户用户ID
        imUserType: 'MERCHANT_USER', // 用户类型
      }
      const msgParams = {
        sendType: 0, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        msgType: 'im_tmplate', // 消息类型
        extContent: { type: '121', productId: '607992101317013570' }, // 路由参数
        productName: '交易产品-带图', // 产品名称
        productContent: '产品信息-DSGSDGdfsgsdfg215251', // 产品信息
        price: '20.20元', // 价格
        forwardAbstract: '摘要信息，可与显示内容保持一致', // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Trade', // 路由ID
        imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 产品图片
        unit: '20元', // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
    },
    // 发送模板消息(不带图片)
    sendTemplateMsgNoImg() {
      const sessionParams = {
        imUserId: '607991036165120329', // 商户用户ID
        imUserType: 'MERCHANT_USER', // 用户类型
      }
      const msgParams = {
        sendType: 1, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        msgType: 'im_tmplate', // 消息类型
        extContent: { productId: '607991242323551420' }, // 路由参数
        productName: '服务产品-不带图', // 产品名称
        productContent: '产品信息-848444558454', // 产品信息
        price: '50.92', // 价格
        forwardAbstract: '摘要信息，可与显示内容保持一致', // 摘要信息，可与显示内容保持一致
        routerId: 'IMRouter_APP_ProductDetail_Service', // 路由ID
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
    },
  },
}
</script>
<style lang="less" scoped>
.page-content {
  max-width: 1000px;
  margin: auto;
  overflow: hidden;
  font-size: 24px;
  padding: 24px;
  > h1 {
    text-align: center;
  }
  .demo-btn {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > a {
      padding: 10px;
      background-color: #4974f5;
      margin: 20px;
      border-radius: 6px;
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
