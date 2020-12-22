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
      const imUserId = '607992685432567399' // 商户用户ID
      this.creatImSessionMixin({ imUserId })
    },
    // 发送模板消息(带图片)
    sendTemplateMsgWithImg() {
      const data = {
        imUserId: '607992685432567399', // 商户用户ID
        sendType: 0, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        senderName: '181******33', // 发送者昵称
        msgType: 'im_tmplate', // 消息类型
        extContent: '', // 路由参数
        productName: '产品名称-带', // 产品名称
        productContent: '产品信息-DSGSDGdfsgsdfg215251', // 产品信息
        price: '20.20元', // 价格
        forwardAbstract: '摘要信息，可与显示内容保持一致', // 摘要信息，可与显示内容保持一致
        routerId: '', // 路由ID
        imageUrl: 'https://img.yzcdn.cn/vant/cat.jpeg', // 产品图片
        unit: '20元', // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      this.sendTemplateMsgMixin(data)
    },
    // 发送模板消息(不带图片)
    sendTemplateMsgNoImg() {
      const data = {
        imUserId: '607992685432567399', // 商户用户ID
        sendType: 1, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        senderName: '181******33', // 发送者昵称
        msgType: 'im_tmplate', // 消息类型
        extContent: '', // 路由参数
        productName: '产品名称-不带图', // 产品名称
        productContent: '产品信息-848444558454', // 产品信息
        price: '50.92元', // 价格
        forwardAbstract: '摘要信息，可与显示内容保持一致', // 摘要信息，可与显示内容保持一致
        routerId: '', // 路由ID
      }
      this.sendTemplateMsgMixin(data)
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
