export default function ({ app, req, redirect, route, store }) {
  if (req && req.headers && req.headers['user-agent']) {
    if (req.headers['user-agent'].indexOf('AppInfo') > -1) {
      // 设置store中isInApp是是否在app中状态为true
      store.dispatch('app/setUAInfo', true)
      if (req.headers['user-agent'].indexOf('AppInfo:') > -1) {
        if (req.headers['user-agent'].split('AppInfo:')[1]) {
          const info = JSON.parse(
            req.headers['user-agent'].split('AppInfo:')[1]
          )
          store.dispatch('app/setAppInfo', info)
          const platform = req.headers['user-agent'].split('AppInfo:')[0]
          store.dispatch('app/setAppPlatform', platform)
        }
      }
    }
  }
  if (route.query.isApplets) {
    store.dispatch('app/setApplets', true)
    // 获取小程序中的token和userId
    if (route.query.token && route.query.userId) {
      store.dispatch('user/setUser', {
        token: route.query.token,
        userId: route.query.userId,
        userType: 'ORDINARY_USER',
      })
    }
    if (route.query.typeCode) {
      store.dispatch('city/setCode', route.query.typeCode)
    }
  }
  // const erminal = req.headers['user-agent'] // 访问用户的设备终端
}
