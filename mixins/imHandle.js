/**
 * @author maliang
 * @description: IM 创建会发与发送模板消息封装
 * @since 2020/11/22
 */
'use strict'
import { Toast } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import config from '@/config'
import { userinfoApi, afterSaleApi } from '@/api'

export default {
  computed: {
    ...mapState({
      userInfo: (state) => state.user,
      token: (state) => state.user.token,
      userId: (state) => state.user.userId,
      userType: (state) => state.user.userType,
      imExample: (state) => state.im.imExample, // IM 实例
      isApplets: (state) => state.app.isApplets, // 是否在小程序中
      city: (state) => state.city.currentCity,
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
    // 跳转在线客服
    async jumpOnlineKefu() {
      const res = await this.$axios.post(afterSaleApi.onlineKefu, {
        userCenterTag: this.userInfo.id,
        userName: this.userInfo.fullName,
        userNo: this.userInfo.no,
        platform: 'COMDIC_TERMINAL_WAP',
        port: 'STAFF_PORT_WAP',
        entrance: 'STAFF_DETAIL_PAGE_CODE',
        province: this.userInfo.province,
        city: this.userInfo.city,
        equipment: '',
        sourceTerminal: '',
        customerType: '1',
      })
      if (res.code === 200) {
        const groupId = res.data.groupInfo.groupId
        const token = this.$cookies.get('token', { path: '/' })
        const userId = this.$cookies.get('userId', { path: '/' })
        const userType = this.$cookies.get('userType', { path: '/' })
        window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&operUserType=${userType}&id=${groupId}`
      }
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
            window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&id=${res.data.groupId}&operUserType=${userType}`
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
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&operUserType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}&isApplets=true`
                  } else {
                    window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&operUserType=${userType}&id=${res.data.groupId}&requireCode=${sessionParams.requireCode}&requireName=${sessionParams.requireName}`
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
              window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&operUserType=${userType}&id=${res.data.groupId}&isApplets=true`
            } else {
              window.location.href = `${config.imBaseUrl}/chat?token=${token}&userId=${userId}&userType=${userType}&operUserType=${userType}&id=${res.data.groupId}`
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
    /**
     * @author tangdaibing
     * @description: IM 创建与发送商品模板消息
     * @param mchUserId 规划师商户用户id
     * @param type 规划师用户类型
     * @param goodsInfo 商品信息
     * @since 2021/09/13
     */
    // 调起IM
    // 发送模板消息(带图片)
    sendTemplateMsgWithImg(mchUserId, type, goodsInfo) {
      // const isLogin = await this.judgeLoginMixin()
      // if (isLogin) {
      // 服务产品路由ID：IMRouter_APP_ProductDetail_Service
      // 交易产品路由ID：IMRouter_APP_ProductDetail_Trade
      const intentionType = {}
      intentionType[goodsInfo.classCode] = goodsInfo.classCodeName
      // 意向城市
      const intentionCity = {}
      intentionCity[this.city.code] = this.city.name
      const sessionParams = {
        imUserId: mchUserId, // 商户用户ID
        imUserType: type, // 用户类型
        requireCode: goodsInfo.classCodeLevel.split(',')[0],
        ext: {
          intentionType, // 意向业务 非必传
          intentionCity, // 意向城市 非必传
          recommendId: '',
          recommendAttrJson: {},
          startUserType: 'cps-app', //
        },
      }
      const msgParams = {
        sendType: 0, // 发送模板消息类型 0：商品详情带图片的模板消息 1：商品详情不带图片的模板消息
        msgType: 'im_tmplate', // 消息类型
        extContent: this.$route.query, // 路由参数
        productName: goodsInfo.name, // 产品名称
        productContent: goodsInfo.salesGoodsOperatings.productDescribe, // 产品信息
        price: `${goodsInfo.salesPrice}元`, // 价格
        forwardAbstract: '[商品详情]',
        routerId: 'IMRouter_APP_ProductDetail_Service', // 路由ID
        imageUrl:
          goodsInfo.salesGoodsOperatings.clientDetails[0].imgFileIdPaths[0], // 产品图片
        unit: goodsInfo.salesPrice.split('.')[1], // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
      }
      this.sendTemplateMsgMixin({ sessionParams, msgParams })
      // } else {
      //   this.$router.push('/login')
      // }
    },
  },
}
