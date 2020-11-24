/*
 * @Author: xiao pu
 * @Date: 2020-11-20 10:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-20 15:32:10
 * @Description: file content
 * @FilePath: /chips-wap/client/components/imgAuth/index.js
 */
import Vue from 'vue'
import VueImgAuthDialog from './ImgAuthDialog.vue'

function createInstance() {
  if (!window || !window.document) {
    return {}
  }
  const imgAuthDialog = new (Vue.extend(VueImgAuthDialog))({
    el: document.createElement('div'),
  })
  imgAuthDialog.$on('update', (value) => {
    imgAuthDialog.show = value
  })

  return imgAuthDialog
}

function ImgAuthDialog(options = {}) {
  const imgAuthDialog = createInstance()
  console.log('成功！')
  Object.assign(imgAuthDialog, options, { show: true })
  return imgAuthDialog
}

ImgAuthDialog.install = () => {
  Vue.use(VueImgAuthDialog)
}

Vue.prototype.$ImgAuthDialog = ImgAuthDialog

export default ImgAuthDialog
