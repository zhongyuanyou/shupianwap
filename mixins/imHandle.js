/**
 * @author maliang
 * @description: IM 创建会发与发送模板消息封装
 * @since 2020/11/22
 */
'use strict'
import { Toast } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import config from '@/config'
import { userinfoApi } from '@/api'
export default {
  computed: {
    ...mapState({
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      userType: (state) => state.user.userType,
      imExample: (state) => state.im.imExample, // IM 实例
    }),
  },
  methods: {
    loginToast(
      message = '',
      className = 'toast',
      icon = 'toast_ic_remind',
      duration = 1000
    ) {
      Toast({
        duration,
        className,
        message,
        icon,
        iconPrefix: 'spiconfont',
      })
    },
    // 判断是否登录
    judgeLoginMixin(needUserInfo = false) {
      return new Promise((resolve) => {
        if (this.userId && this.token && this.userType) {
          if (needUserInfo) {
            // 获取用户信息
            this.$axios
              .get(userinfoApi.info, {
                params: { id: this.userId },
              })
              .then((res) => {
                if (res.code === 200 && res.data.id) {
                  resolve(res.data)
                } else {
                  this.loginToast('获取用户信息失败')
                }
              })
          } else {
            resolve(true)
          }
        } else {
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath,
            },
          })
        }
      })
    },
    /**
     * @description: 创建IM会话 （私聊）
     * @param {Object} data: 必传
     * @param {String} data.imUserId: 对方用户ID（用户唯一标识） 必传
     * @param {String} data.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
     * @param {Object} data.ext: 扩展字段，客户端自定义 非必传
     * @param {String} data.ext.intentionType: 意向业务 非必传
     * @param {String} data.ext.intentionCity: 意向城市 非必传
     * @param {String} data.ext.recommendId: 推荐ID 非必传
     * @param {Object} data.ext.recommendAttrJson: 推荐属性 Object 非必传
     * @return: void
     */
    creatImSessionMixin(data) {
      this.judgeLoginMixin().then((userInfo) => {
        if (userInfo) {
          let params = {
            imUserId: '',
            imUserType: '',
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
            if (res.code === 200) {
              window.location.href = `${config.imBaseUrl}/chat?token=${this.token}&userId=${this.userId}&userType=${this.userType}&id=${res.data.groupId}`
            } else {
              this.loginToast(res.msg)
            }
          })
        }
      })
    },
    /**
     * @description: 发送模板消息
     * @param {Object} sessionParams: 创建会话用到的参数 必传
     * @param {String} sessionParams.imUserId: 对方用户ID（用户唯一标识） 必传
     * @param {String} sessionParams.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
     * @param {Object} sessionParams.ext: 扩展字段，客户端自定义 非必传
     * @param {String} sessionParams.ext.intentionType: 意向业务 非必传
     * @param {String} sessionParams.ext.intentionCity: 意向城市 非必传
     * @param {String} sessionParams.ext.recommendId: 推荐ID 非必传
     * @param {Object} sessionParams.ext.recommendAttrJson: 推荐属性 Object 非必传
     * @param {Object} msgParams: 发送模板消息用到的参数 必传
     * @param {String} msgParams.sendType: 0：带图片的模板消息  1：不带图片的模板消息 必传
     * @param {String} msgParams.senderName: 发送者昵称 非必传
     * @param {String} msgParams.msgType: 消息类型 必传
     * @param {Object} msgParams.extContent: 路由参数 必传
     * @param {String} msgParams.productName: 产品名称 必传
     * @param {String} msgParams.productContent: 产品信息 必传
     * @param {String} msgParams.price: 价格 必传
     * @param {String} msgParams.forwardAbstract: 摘要信息，可与显示内容保持一致 必传
     * @param {String} msgParams.routerId: 路由ID（配置路由的id）
     * @param {String} msgParams.imageUrl: 产品图片 （sendType = 0 必传）
     * @param {String} msgParams.unit: 小数点后面带单位的字符串（示例：20.20元，就需要传入20元） （sendType = 0 必传）
     * @return: void
     */
    sendTemplateMsgMixin({ sessionParams, msgParams }) {
      this.judgeLoginMixin(true).then((userInfo) => {
        if (userInfo) {
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
          params = Object.assign(params, sessionParams)
          // 发送模板消息前先创建会话
          this.imExample.createSession(params, (res) => {
            if (res.code === 200) {
              const tepMsgParams = {
                templateId: '', // 模板 id
                receiver: res.data.groupId, // 会话 id
                senderName: userInfo.nickName, // 发送者昵称
                msgType: msgParams.msgType, // 消息类型
                extContent: JSON.stringify(msgParams.extContent), // 路由参数
                paramJsonStr: {
                  productName: msgParams.productName, // 产品名称
                  productContent: msgParams.productContent, // 产品信息
                  price: msgParams.price, // 价格
                  forwardAbstract: msgParams.forwardAbstract, // 摘要信息，可与显示内容保持一致
                  routerId: msgParams.routerId, // 路由ID
                },
              }
              switch (msgParams.sendType) {
                // 带图片的模板消息
                case 0:
                  tepMsgParams.paramJsonStr.imageUrl = msgParams.imageUrl // 产品图片
                  tepMsgParams.paramJsonStr.unit = msgParams.unit // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
                  tepMsgParams.templateId = '5fcef0aec24ddd00065a8c93' // 模板id
                  break
                // 不带图片的模板消息
                case 1:
                  tepMsgParams.templateId = '5fcef0aec24ddd00065a8c83' // 模板id
                  break

                default:
                  break
              }
              tepMsgParams.paramJsonStr = JSON.stringify(
                tepMsgParams.paramJsonStr
              )
              // 发送模板消息
              this.imExample.sendTemplateMsg(tepMsgParams, (resData) => {
                if (resData.code === 200) {
                  window.location.href = `${config.imBaseUrl}/chat?token=${this.token}&userId=${this.userId}&userType=${this.userType}&id=${res.data.groupId}`
                } else {
                  this.loginToast(resData.msg)
                }
              })
            } else {
              this.loginToast(res.msg)
            }
          })
        }
      })
    },
  },
}
