import imSdk from '@dgg/sp-im-sdk'

/**
 * @description: 初始化im
 * @param {String} env: 环境 必传
 * @param {String} token: 登录的获取的X-Auth-Token 必传
 * @param {String} userId: 用户中心userID 必传
 * @param {String} userTypeFlag: 用户类型 必传
 * @param {String} sysCode: 平台sysCode 必传
 * @param {String} secret: secret 必传
 * @param {Number} sessionPageNumber: 会话的页码  否 默认第1页
 * @param {Number} sessionPageSize: 会话分页的条数 否 默认100条
 * @param {Function} onMessage: 消息接收
 * @param {Function} onConnect: 连接状态
 * @param {Function} onSessions: 获取初始化会话列表
 * @param {Function} myInfo: 我的信息
 * @param {Function} onError: 报错
 * @return: void
 */
export function imInit(data = {}) {
  const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
  const BASE = {
    // 开发、测试环境
    development: 'D',
    // 预发布环境
    release: 'Y',
    // 生产环境
    production: 'P',
  }
  const env = BASE[DGG_SERVER_ENV]
  const initSdk = imSdk.instance({
    env, // 'D|T|Y|P'
    token: data.token,
    userId: data.userId,
    userTypeFlag: data.userType,
    sysCode: 'crisps-app',
    secret: 'b06ca305974e8b6b590b8315f72a7438',
    appKey: '4R29RHK10AQILT8ONUAOC5DDST',
    isConnectSocket: false,
    onError: (res) => {
      console.log(res)
    },
  })
  return initSdk
}

/**
 * @description: 获取未读数总数
 * @param {Object} imExample: 初始化IM的实例  必传
 * @param {Object} data: 非必传
 * @return: void
 */
export function pullUnreadMsgCount(imExample, data = {}) {
  return new Promise((resolve) => {
    imExample.pullUnreadMsgCount({}, (res) => {
      resolve(res)
    })
  })
}

/**
 * @description: 创建会话（私聊）
 * @param {Object} imExample: 初始化IM的实例  必传
 * @param {Object} data: 必传
 * @param {String} data.imUserId: 对方用户ID（用户唯一标识） 必传
 * @param {String} data.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
 * @param {Object} data.ext: 扩展字段，客户端自定义 必传
 * @param {String} data.ext.intentionType: 意向业务 非必传
 * @param {String} data.ext.intentionCity: 意向城市 非必传
 * @param {String} data.ext.recommendId: 推荐ID 非必传
 * @param {Object} data.ext.recommendAttrJson: 推荐属性 Object 非必传
 * @return: void
 */
export function createSession(imExample, data = {}) {
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
  return new Promise((resolve) => {
    imExample.createSession(params, (res) => {
      resolve(res)
    })
  })
}

/**
 * @description: 发送模板消息
 * @param {Object} imExample: 初始化IM的实例  必传
 * @param {Object} data: 必传
 * @param {String} data.imUserId: 对方用户ID（用户唯一标识） 必传
 * @param {String} data.imUserType: 用户类型: ORDINARY_USER 普通用户|MERCHANT_USER 商户用户 必传
 * @param {String} data.ext: 扩展字段，客户端自定义 非必传
 * @return: void
 */
export function sendTemplateMsg(imExample, data = {}) {
  return new Promise((resolve) => {
    const params = {
      templateId: '', // 模板 id
      receiver: data.receiver, // 会话 id
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
        params.paramJsonStr.imageUrl = data.imageUrl // 产品图片
        params.paramJsonStr.unit = data.unit // 小数点后面带单位的字符串（示例：20.20元，就需要传入20元）
        params.templateId = '5fcef0aec24ddd00065a8c93'
        break
      // 不带图片的模板消息
      case 1:
        params.templateId = '5fcef0aec24ddd00065a8c83'
        break

      default:
        break
    }
    params.paramJsonStr = JSON.stringify(params.paramJsonStr)
    imExample.sendTemplateMsg(params, (res) => {
      resolve(res)
    })
  })
}
