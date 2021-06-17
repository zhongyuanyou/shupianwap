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
      isApplets: (state) => state.app.isApplets, // 是否在小程序中
    }),
  },
  methods: {
    clearUserInfoAndJumpLoging(url) {
      this.$store.commit('user/CLEAR_USER')
      if (this.isApplets) {
        // 若是在小程序中
        this.uni.redirectTo({
          url: '/pages/my_son/login/wxLogin?url=' + url,
        })
        return
      }
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath,
        },
      })
    },
    // 判断是否登录
    judgeLoginMixin(needUserInfo = false, url) {
      const token = this.token || this.$cookies.get('token', { path: '/' })
      const userId = this.userId || this.$cookies.get('userId', { path: '/' })
      const userType =
        this.userType || this.$cookies.get('userType', { path: '/' })
      return new Promise((resolve) => {
        if (userId && token && userType) {
          if (needUserInfo) {
            // 获取用户信息
            this.$axios
              .get(userinfoApi.info, {
                params: { id: this.userId },
              })
              .then((res) => {
                if (res.code === 200 && res.data.id) {
                  this.$store.dispatch('user/setInfo', res.data)
                  resolve(res.data)
                } else {
                  this.$xToast.warning('获取用户信息失败')
                }
              })
          } else {
            resolve(true)
          }
        } else {
          let url = this.$route.path.split('')
          url.splice(0, 1)
          url = url.join('')
          if (this.$route.query) {
            for (const key in this.$route.query) {
              url += `&${key}=${this.$route.query[key]}`
            }
          }
          this.clearUserInfoAndJumpLoging(url)
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
      const userInfo = this.$store.state.user.userInfo
      // this.judgeLoginMixin().then((userInfo) => {
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
            const myInfo = localStorage.getItem('myInfo')
              ? JSON.parse(localStorage.getItem('myInfo'))
              : {}
            const token = this.token
              ? this.token
              : this.$cookies.get('token', { path: '/' })
              ? this.$cookies.get('token', { path: '/' })
              : myInfo.token
            const userId = this.userId
              ? this.userId
              : this.$cookies.get('userId', { path: '/' })
              ? this.$cookies.get('userId', { path: '/' })
              : myInfo.imUserId
            const userType =
              this.userType ||
              this.$cookies.get('userType', { path: '/' }) ||
              'VISITOR'
            window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}`
          } else if (res.code === 5223) {
            this.clearUserInfoAndJumpLoging()
          } else {
            this.$xToast.warning(res.msg)
          }
        })
      }
      // })
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
    regularVisitor({ visitorId, userId }) {
      return new Promise((resolve) => {
        this.imExample.regularVisitor(
          {
            visitorId,
            userId,
          },
          (res) => {
            resolve()
            console.log(res, 123)
          }
        )
      })
    },
    sendTemplateMsgMixin({ sessionParams, msgParams }) {
      const userInfo = this.$store.state.user.userInfo
      // this.judgeLoginMixin(true).then((userInfo) => {
      if (userInfo) {
        let params = {
          operUserType: userInfo.type || 'VISITOR',
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
        params = Object.assign(params, sessionParams)
        // 发送模板消息前先创建会话
        this.imExample.createSession(params, (res) => {
          if (res.code === 200) {
            const tepMsgParams = {
              templateId: '', // 模板 id
              receiver: res.data.groupId, // 会话 id
              senderName: userInfo.nickName || '访客', // 发送者昵称
              msgType: msgParams.msgType, // 消息类型
              extContent: JSON.stringify(msgParams.extContent), // 路由参数
              paramJsonStr: {
                productName: msgParams.productName, // 产品名称
                productContent: msgParams.productContent, // 产品信息
                // eslint-disable-next-line eqeqeq
                price: msgParams.price == '0.00元' ? '面议' : msgParams.price, // 价格
                forwardAbstract: msgParams.forwardAbstract, // 摘要信息，可与显示内容保持一致
                routerId: msgParams.routerId, // 路由ID
              },
            }
            switch (msgParams.sendType) {
              // 带图片的模板消息
              case 0:
                tepMsgParams.paramJsonStr.imageUrl = msgParams.imageUrl // 产品图片
                tepMsgParams.paramJsonStr.unit =
                  // eslint-disable-next-line eqeqeq
                  msgParams.price == '0.00元' ? '' : msgParams.unit // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
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
                // 延时1s进入IM,避免模板消息未发生完成就已进入IM
                this.$xToast.showLoading({ message: '正在联系规划师...' })
                const timer = setTimeout(() => {
                  clearTimeout(timer)
                  this.$xToast.hideLoading()
                  const myInfo = localStorage.getItem('myInfo')
                    ? JSON.parse(localStorage.getItem('myInfo'))
                    : {}
                  const token = this.userType ? this.token : myInfo.token
                  const userId = this.userType ? this.userId : myInfo.imUserId
                  const userType = this.userType || 'VISITOR'
                  if (this.isApplets) {
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}&isApplets=true`
                  } else {
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}`
                  }
                }, 2000)
                // window.location.href = `${config.imBaseUrl}/chat?token=${this.token}&userId=${this.userId}&userType=${this.userType}&id=${res.data.groupId}`
              } else if (res.code === 5223) {
                this.clearUserInfoAndJumpLoging()
              } else {
                this.$xToast.warning(resData.msg)
              }
            })
          } else if (res.code === 5223) {
            this.clearUserInfoAndJumpLoging()
          } else {
            this.$xToast.warning(res.msg)
          }
        })
      }
      // })
    },
    // 普通会话
    sendTextMessage(mchUserId) {
      const userInfo = this.$store.state.user.userInfo
      // this.judgeLoginMixin(true).then((userInfo) => {
      if (userInfo) {
        const userInfo = this.$store.state.user.userInfo
        const userType = userInfo && userInfo.type ? userInfo.type : 'VISITOR'
        const params = {
          operUserType: userType,
          imUserId: mchUserId,
          imUserType: 'MERCHANT_USER',
          ext: {
            intentionType: '',
            intentionCity: '',
            recommendId: '',
            recommendAttrJson: {},
            startUserType: 'cps-app',
          },
        }
        // 发送消息前先创建会话
        this.imExample.createSession(params, (res) => {
          if (res.code === 200) {
            const myInfo = localStorage.getItem('myInfo')
              ? JSON.parse(localStorage.getItem('myInfo'))
              : {}
            const token = this.userType ? this.token : myInfo.token
            const userId = this.userType ? this.userId : myInfo.imUserId
            const userType = this.userType || 'VISITOR'
            if (this.isApplets) {
              window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&isApplets=true`
            } else {
              window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}`
            }
          } else if (res.code === 5223) {
            console.log('发送消息', res)
            this.clearUserInfoAndJumpLoging()
          } else {
            console.log('发送消息', res)
            this.$xToast.warning(res.msg)
          }
        })
      }
    },
  },
}
