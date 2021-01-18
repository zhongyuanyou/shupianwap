/*
 * @Author: zky
 * @Date: 2020-12-18 10:42:12
 */

import Vue from 'vue'

// 验证是否为android
const isAndroid =
  navigator.userAgent.indexOf('Android') > -1 ||
  navigator.userAgent.indexOf('Adr') > -1
// 验证是否为ios
const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

function dggSetBridge(callback) {
  if (isAndroid) {
    if (window.WebViewJavascriptBridge) {
      callback(window.WebViewJavascriptBridge)
    } else {
      document.addEventListener(
        'WebViewJavascriptBridgeReady',
        function () {
          callback(window.WebViewJavascriptBridge)
        },
        false
      )
    }
  }
  if (isiOS) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge)
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback)
    }
    window.WVJBCallbacks = [callback]
    const WVJBIframe = document.createElement('iframe')
    WVJBIframe.style.display = 'none'
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
    document.documentElement.appendChild(WVJBIframe)
    setTimeout(function () {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }
}

// 注册回调函数，第一次连接时调用 初始化函数(android需要初始化,ios不用)
dggSetBridge(function (bridge) {
  if (isAndroid) {
    bridge.init(function (message, responseCallback) {
      const data = {
        'Javascript Responds': 'Wee!',
      }
      responseCallback(data)
    })
  }
})

const Bridge = {
  callHandler(name, data, callback) {
    dggSetBridge(function (bridge) {
      bridge.callHandler(name, data, callback)
    })
  },
  registerHandler(name, callback) {
    dggSetBridge(function (bridge) {
      bridge.registerHandler(name, function (data, responseCallback) {
        callback(data, responseCallback)
      })
    })
  },
}

// 数据状态判断
const handleRequest = (ret, fn = () => {}) => {
  try {
    const result = typeof ret === 'string' ? JSON.parse(ret) : ret
    fn(result)
  } catch (err) {
    console.log('err', err)
  }
}

// js调用APP方法

const appHandler = {
  // 获取用户信息
  dggGetUserInfo: (fn = () => {}) => {
    Bridge.callHandler('dgg_getUserInfo', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用webView返回上一级网页
  dggWebGoBack: (fn = () => {}) => {
    Bridge.callHandler('dgg_webGoBack', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用webView关闭
  dggCloseWebView: (fn = () => {}) => {
    Bridge.callHandler('dgg_close_webView', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 设置App导航栏标题
  dggSetTitle: (data = { title: '标题' }, fn = () => {}) => {
    Bridge.callHandler('dgg_setTitle', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 跳转App页面
  dggJumpRoute: (
    data = { iOSRouter: '', androidRouter: '' },
    fn = () => {}
  ) => {
    Bridge.callHandler('dgg_jumpRoute', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用App登录
  dggLogin: (fn = () => {}) => {
    Bridge.callHandler('dgg_login', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // app定位
  dggLocation: (fn = () => {}) => {
    Bridge.callHandler('dgg_location', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // app当前定位的站点
  dggCityCode: (fn = () => {}) => {
    Bridge.callHandler('dgg_cityCode', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 打开新的webView
  dggOpenNewWeb: (
    data = { urlString: 'https://www.baidu.com', title: '' },
    fn = () => {}
  ) => {
    Bridge.callHandler('dgg_openNewWeb', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 拨打电话
  dggCallPhone: (data = { phone: '17755021122' }, fn = () => {}) => {
    Bridge.callHandler('dgg_callPhone', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 隐藏导航头部
  dggHideNav: (fn = () => {}) => {
    Bridge.callHandler('dgg_hideNav', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // wap返回数据给到flutter
  dggWebBackValueToFlutter: (data = {}, fn = () => {}) => {
    Bridge.callHandler('dgg_webBackValueToFlutter', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用分享
  dggShare: (
    data = { image: '', title: '', subTitle: '', url: '' },
    fn = () => {}
  ) => {
    Bridge.callHandler('dgg_share', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用设备信息
  dggDeviceInfo: (fn = () => {}) => {
    Bridge.callHandler('dgg_deviceInfo', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用IM
  dggOpenIM: (
    data = {
      name: '', // 商户用户名称
      userId: '', // 商户用户ID
      userType: '', // 用户类型
    },
    fn = () => {}
  ) => {
    Bridge.callHandler('dgg_openIM', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 认证
  dggGetRealNameAuthAddress: (fn = () => {}) => {
    Bridge.callHandler('dgg_GetRealNameAuthAddress', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用安卓相册
  dggPhoneAlbum: (data = { fileId: '' }, fn = () => {}) => {
    Bridge.callHandler('dgg_phoneAlbum', data, (res) => {
      handleRequest(res, fn)
    })
  },
  // 调用安卓权限
  dggPermission: (fn = () => {}) => {
    Bridge.callHandler('dgg_Permission', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 修改登录密码
  dggChangePwd: (fn = () => {}) => {
    Bridge.callHandler('dgg_changePwd', {}, (res) => {
      handleRequest(res, fn)
    })
  },
  // 修改手机号
  dggChangePhone: (fn = () => {}) => {
    Bridge.callHandler('dgg_changePhone', {}, (res) => {
      handleRequest(res, fn)
    })
  },
}

// 注册APP调用的js方法
const registHandler = (handlerName, fn = () => {}) => {
  handlerName
    ? Bridge.registerHandler(handlerName, (data, responseCallback) => {
        try {
          fn(data, responseCallback)
        } catch (error) {
          console.error('handlerName error:', error)
        }
      })
    : appHandler.dgg_errorTip({ msg: '请注册方法名' })
}

Vue.prototype.$appFn = {
  isiOS,
  ...appHandler,
  registHandler,
}
export default {
  isAndroid,
  isiOS,
  ...appHandler,
  registHandler,
}

export { appHandler }
