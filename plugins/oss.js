import Vue from 'vue'
import config from '@/config'
const ossBaseUrl = config.ossBaseUrl

/*
 * @Author: MaLiang
 * @Date: 2020-12-28 18:35:00
 * @LastEditTime:
 * @LastEditors:
 * @Description: 阿里云oss服务端图片剪裁传参封装；OSS图片剪裁说明相关链接：https://www.alibabacloud.com/help/zh/doc-detail/44693.htm?spm=a2c63.p38356.b99.775.10586c55VFcVKB
 * @FilePath:
 */
const ossImgSet = (width, heigt, imgName = null) => {
  /* 参数：imgName 图片名称 */
  /* 参数：width 图片剪裁宽度 */
  /* 参数：heigt 图片剪裁高度 */
  /* 参数：fit 图片剪裁的缩略方式  (这里默认fill)
    lfit：等比缩放，限制在指定w与h的矩形内的最大图片。
    mfit：等比缩放，延伸出指定w与h的矩形框外的最小图片。
    fill：固定宽高，将延伸出指定w与h的矩形框外的最小图片进行居中裁剪。
    pad：固定宽高，缩略填充。
    fixed：固定宽高，强制缩略。 */
  if (imgName) {
    return `${ossBaseUrl}/sp-pt/wap/images/${imgName}?x-oss-process=image/resize,m_fill,w_${
      width || 10
    },h_${heigt || 10},limit_0`
  } else {
    return `?x-oss-process=image/resize,m_fill,w_${width || 10},h_${
      heigt || 10
    },limit_0`
  }
}

/*
 * @Author: majinghe
 * @Date: 2021-05-08
 * @Description: ossImgSetV2 把设置参数自定义,扩展ossImgSet.
 *               图片配置参见: https://www.alibabacloud.com/help/zh/doc-detail/183902.htm?spm=a2c63.p38356.b99.166.698f2520aAXUM1
 */

const ossImgSetV2 = (imgName = null, config = '') => {
  if (imgName) {
    let imgPath = `${ossBaseUrl}/sp-pt/wap/images/${imgName}`
    if (config) {
      imgPath += `?${config}`
    }
    return imgPath
  } else {
    if (config) {
      return `?${config}`
    }
    return `?x-oss-process=image/resize,m_fill,w_10,h_10,limit_0`
  }
}

/*
 * @Author: tdb
 * @params : {number} width 裁剪后图片宽度
 * @params : {number} height 裁剪后图片高度
 * @params : {string} url 处理之前的图片线上地址
 * @return : {string} 处理之后的图片地址
 * @Date: 2021-09-18
 * @Description:图片压缩裁剪
 */

const resizeImg = (width, height, url) => {
  if (!url) return ''
  if (url.match('image/resize')) {
    return url
  }
  // https://cdn.shupian.cn/E5756.png?x-oss-process=image/resize,m_fill,w_300,h_300,limit_0
  width = width || 180
  height = height || 120
  return (
    url + `?x-oss-process=image/resize,m_fill,w_${width},h_${height},limit_0`
  )
}
Vue.prototype.$ossImgSet = ossImgSet
Vue.prototype.$ossImgSetV2 = ossImgSetV2
Vue.prototype.$resizeImg = resizeImg
