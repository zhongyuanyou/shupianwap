<template>
  <span @click="sendEmail()">发送</span>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    sendEmail() {
      const obj = {
        syscode: 'spc-wap', // 系统码 必填
        msgTemplateId: '427808223337609919', // 模板id 必填
        recverMap: {
          // 接收方联系人Map集合 必填
          EMAIL: {
            concat: '1974776566@qq.com',
          },
        },
        recverType: '1', // 接收方类型 必填 0-内部用户，1-外部用户
        recverName: '张三', // 接收方称呼 必填
        senderName: '薯片科技', // 发送方称呼 必填
        title: '电子发票签收', // 标题 必填 	内部使用
        extendMsg: '', // 扩展字段 非必填
        serviceId: '', // 业务ID 短信回复使用
      }
      const arr = new Array(1).fill(obj)
      const data = JSON.stringify(arr)
      //   const data = JSON.stringify(params)
      this.$axios
        .post(
          '/msgcenter/api/v1/msgcenter/external/tpp_batch_send_message.do',
          data
        )
        .then((res) => {
          console.log('res', res)
        })
    },
  },
}
</script>
