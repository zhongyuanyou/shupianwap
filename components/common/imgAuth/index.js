/*
 * @Author: xiao pu
 * @Date: 2020-11-20 10:16:07
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-26 15:26:00
 * @Description: file content
 * @FilePath: /chips-wap/client/components/common/imgAuth/index.js
 */
import Vue from 'vue'
import VueImgAuthDialog from './ImgAuthDialog.vue'

let instance

function createInstance() {
  if (!window || !window.document) {
    return {}
  }

  if (instance) {
    instance.$destroy()
  }

  instance = new (Vue.extend(VueImgAuthDialog))({
    el: document.createElement('div'),
  })
  instance.$on('update', (value) => {
    instance.show = value
  })

  return instance
}

function ImgAuthDialog(options = {}) {
  if (process && process.server) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const imgAuthDialog = createInstance()
    Object.assign(imgAuthDialog, options, {
      show: true,
      resolve,
      reject,
      callback: (action, data) => {
        imgAuthDialog[action === 'confirm' ? 'resolve' : 'reject']({
          action,
          data,
        })
      },
    })
    return imgAuthDialog
  })
}

ImgAuthDialog.install = () => {
  Vue.use(VueImgAuthDialog)
}

Vue.prototype.$ImgAuthDialog = ImgAuthDialog

export default ImgAuthDialog
