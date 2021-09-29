/*
 * @Author: mjh
 * @Date: 2021-09-13 2:53:51 PM
 * @Description: 因为项目中图片都已url形式进行存储,已有内容太乱太杂,导致有些图片未能重复利用,或者重复定义的现象很多,所以这里重新进行布局
 * 图片分类: 图片整体分2类。
 * 1. 整体ui图片。 如缺省图,一些整体样式图片等等。命名规则, ui + 'XXX'
 * 2. 业务端图片。 以业务端页面为准则,先以业务模块尽量以大类分割,具体内容可以里面细分。命名规则, 分组件和页面两块内容.
 * *******************************
 * (1). 组件: c + '-' + 'xxx(组件名称)' + '-' + 'xxx(图标名称)'.
 * (2). 页面: p + '-' +' xxx(页面名称)' + '-' +' xxx(图标名称)'
 * *******************************
 * 页面引用example, in vue:
 * import { goodDetail } from '~/utils/static/imgs.js'
 * export default {
 *  data() {
 *   return {
 *     hdImg: goodDetail['c-header-bg'], // hdImg: 在页面中可以引用
 *   }
 * }
 */

// 商品详情模块
const goodDetail = {
  'c-header-bg': 'https://cdn.shupian.cn/sp-pt/wap/images/2pxcr859fbi0000.png',
  'c-header-avatarStar':
    'https://cdn.shupian.cn/sp-pt/wap/images/8wso9j09ej40000.png',
  'c-siderConsult-questionIcon':
    'https://cdn.shupian.cn/sp-pt/wap/images/5tfp3gne5q80000.png',
  'c-caseNew-searchIcon':
    'https://cdn.shupian.cn/sp-pt/wap/images/3n54r7af7tq0000.png	',
}

export { goodDetail }
