export default function ({ app, req, redirect, route, store }) {
  if (req && req.headers && req.headers['user-agent']) {
    if (req.headers['user-agent'].indexOf('CPSAPP') > -1) {
      store.dispatch('app/setUAInfo', true)
    }
  }
  // const erminal = req.headers['user-agent'] // 访问用户的设备终端
}
