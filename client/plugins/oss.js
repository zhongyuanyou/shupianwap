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
Vue.prototype.$ossImgSet = ossImgSet
