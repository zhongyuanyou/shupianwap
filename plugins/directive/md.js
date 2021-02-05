/*
 * @Author: xiao pu
 * @Date: 2021-02-05 10:02:55
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-02-05 10:10:05
 * @Description: file content
 * @FilePath: /chips-wap/plugins/directive/md.js
 */

/**
 * 埋点指令
 * @param {*} el 当前dom对象
 * @param {*} binding 指令参数
 * 指令使用 v-md:p_search
 *  其中 p_search 为传的参数（自定义事件名称）
 *  在指令中通过 binding.arg 接收传递的参数
 */
export const md = {
  name: 'md',
  inserted(el, binding) {
    el.mdClick = function () {
      const getDataset = this.dataset
      const setData = {}
      for (const key in getDataset) {
        if (
          getDataset[key] !== undefined &&
          key.indexOf('v-') === -1 &&
          key !== 'sensorsClick'
        ) {
          setData[key] = getDataset[key]
        }
      }
      if (binding.arg) {
        setData.even_name = binding.arg
        window.spptMd.spptTrackRow(binding.arg, setData)
      }
    }
    el.addEventListener('click', el.mdClick, true)
  },
  unbind: (el, binding) => {
    el.removeEventListener('click', el.mdClick)
  },
}

/**
 * 热力图指令
 * @param {*} el 当前dom对象
 * 指令使用 v-md-map
 */
export const mdMap = {
  name: 'md-map',
  inserted(el) {
    el.mdMapClick = function () {
      window.spptMd.quick('trackHeatMap', this)
    }
    el.addEventListener('click', el.mdMapClick, true)
  },
  unbind: (el, binding) => {
    el.removeEventListener('click', el.mdMapClick)
  },
}
