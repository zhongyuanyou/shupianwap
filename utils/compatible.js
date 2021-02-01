/*
 * @Author: ma laing
 * @Date: 2020-12-30 17:30:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-30 17:30:00
 * @Description: 移动端兼容问题处理
 * @FilePath: /chips-wap/client/utils/compatible.js
 */

export function hideFixedFooter(
  dom,
  hideDisplay = 'none',
  showDisplay = 'block'
) {
  /**
   * @description 判断软键盘触焦与失焦隐藏元素；
   * @param {node} ref 绑定的原生dom节点
   */
  console.log(dom)
  if (!dom) {
    return
  }
  const m = navigator.userAgent
  const isAndroid = m.indexOf('Android') > -1 || m.indexOf('Adr') > -1 // android终端
  const isIos = !!m.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
  if (isIos) {
    // ios 弹出与收起软键盘执行事件
    document.body.addEventListener('focusin', () => {
      // 软键盘弹起事件
      dom.style.display = hideDisplay
    })
    document.body.addEventListener('focusout', () => {
      // 软键盘关闭事件
      dom.style.display = showDisplay

      // 解決ios端用微信打开页面，收起软键盘后，底部出现空白问题
      setTimeout(() => {
        const scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, Math.max(scrollHeight - 1, 0))
      }, 100)
    })
  }
  if (isAndroid) {
    // android 弹出与收起软键盘执行事件
    const innerHeight = window.innerHeight
    window.addEventListener('resize', () => {
      const newInnerHeight = window.innerHeight
      if (innerHeight > newInnerHeight) {
        // 键盘弹出事件处理
        dom.style.display = hideDisplay
      } else {
        // 键盘收起事件处理
        dom.style.display = showDisplay
      }
    })
  }
}
