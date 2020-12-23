export default function ({ app, req, redirect, route, store }) {
  if (req && req.headers && req.headers['user-agent']) {
    if (req.headers['user-agent'].indexOf('CPSAPP') > -1) {
      // 设置store中isInApp是是否在app中状态为true
      store.dispatch('app/setUAInfo', true)
      if (req.headers['user-agent'].indexOf('AppInfo:') > -1) {
        if (req.headers['user-agent'].split('AppInfo:')[1]) {
          const info = JSON.parse(
            req.headers['user-agent'].split('AppInfo:')[1]
          )
          store.dispatch('app/setAppInfo', info)
        }
      }
    }
  }
  // const erminal = req.headers['user-agent'] // 访问用户的设备终端
}
