/**
 * @author maliang
 * @since 2020/11/22
 */
'use strict'
import { mapState } from 'vuex'
import { createSession, sendTemplateMsg } from '@/utils/im'
import config from '@/config'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo, // 登录的用户信息
      imExample: (state) => state.im.imExample, // IM 实例
    }),
  },
  methods: {
    // 判断是否登录
    judgeLoginMixin() {
      return new Promise((resolve) => {
        if (this.userInfo.token) {
          resolve(true)
          return
        }
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path,
          },
        })
      })
    },
    // 创建IM会话
    creatImSessionMixin(params) {
      this.judgeLoginMixin().then((isLogin) => {
        if (isLogin) {
          createSession(this.imExample, params).then((res) => {
            if (res.code === 200) {
              window.location.href = `${config.imBaseUrl}/chat?token=${this.userInfo.token}&userId=${this.userInfo.userId}&userType=${this.userInfo.userType}&id=${res.data.groupId}`
            } else {
              alert(res.msg)
            }
          })
        }
      })
    },
    // 发送模板消息(带图片)
    sendTemplateMsgMixin(data) {
      this.judgeLoginMixin().then((isLogin) => {
        if (isLogin) {
          // 发送模板消息前先创建会话
          let params = {
            imUserId: '',
            imUserType: 'MERCHANT_USER',
            ext: {
              intentionType: '',
              intentionCity: '',
              recommendId: '',
              recommendAttrJson: {},
              startUserType: 'cps-app',
            },
          }
          params = Object.assign(params, data)
          this.imExample.createSession(params, (res) => {
            // 创建会话成功
            if (res.code === 200) {
              const tepMsgParams = {
                templateId: '', // 模板 id
                receiver: res.data.groupId, // 会话 id
                senderName: data.senderName, // 发送者昵称
                msgType: data.msgType, // 消息类型
                extContent: data.extContent, // 路由参数
                paramJsonStr: {
                  productName: data.productName, // 产品名称
                  productContent: data.productContent, // 产品信息
                  price: data.price, // 价格
                  forwardAbstract: data.forwardAbstract, // 摘要信息，可与显示内容保持一致
                  routerId: data.routerId, // 路由ID
                },
              }
              switch (data.sendType) {
                // 带图片的模板消息
                case 0:
                  tepMsgParams.paramJsonStr.imageUrl = data.imageUrl // 产品图片
                  tepMsgParams.paramJsonStr.unit = data.unit // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
                  tepMsgParams.templateId = '5fcef0aec24ddd00065a8c93'
                  break
                // 不带图片的模板消息
                case 1:
                  tepMsgParams.templateId = '5fcef0aec24ddd00065a8c83'
                  break

                default:
                  break
              }
              tepMsgParams.paramJsonStr = JSON.stringify(
                tepMsgParams.paramJsonStr
              )
              this.imExample.sendTemplateMsg(tepMsgParams, (resData) => {
                if (resData.code === 200) {
                  window.location.href = `${config.imBaseUrl}/chat?token=${this.userInfo.token}&userId=${this.userInfo.userId}&userType=${this.userInfo.userType}&id=${res.data.groupId}`
                } else {
                  alert(res.msg)
                }
              })
            } else {
              alert(res.msg)
            }
          })
        }
      })
    },
  },
}
