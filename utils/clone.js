/* eslint-disable */
/**
 * 拷贝数据
 * 支持深拷贝
 * @author chenmingbing
 * @since 2020/11/04
 */

import { isArray, isNull, isPlainObject } from './check-types'

const primitiveTypes = ['undefined', 'string', 'number', 'boolean']

/**
 * 拷贝数据
 * @param  {*}  data   要拷贝的源数据
 * @param  {Boolean} isDeep 是否深拷贝，默认浅拷贝
 * @return {*}         返回拷贝后的数据
 */
export default (data, isDeep) => {
  if (isNull(data)) {
    return data
  }

  let t = typeof data
  if (t === 'function' || primitiveTypes.indexOf(t) >= 0) {
    return data
  }

  if (isArray(data)) {
    return cloneArr(data, isDeep)
  }

  return cloneObj(data, isDeep)
}

const cloneObj = (obj, isDeep) => {
  if (!isDeep) {
    return Object.assign({}, obj)
  }

  let ret = {}
  let keys = Object.keys(obj)
  keys.forEach((k) => {
    let d = obj[k]
    if (isNull(d)) {
      ret[k] = d
      return true
    }

    let t = typeof d
    if (t === 'function' || primitiveTypes.indexOf(t) >= 0) {
      ret[k] = d
      return true
    }

    ret[k] = isPlainObject(d) ? cloneObj(d, true) : cloneArr(d, true)
  })
  return ret
}

const cloneArr = (arr, isDeep) => {
  if (!isDeep) {
    return arr.concat()
  }

  let ret = []
  arr.forEach((d, i) => {
    if (isNull(d)) {
      ret[i] = d
      return true
    }

    let t = typeof d
    if (t === 'function' || primitiveTypes.indexOf(t) >= 0) {
      ret[i] = d
      return true
    }

    ret[i] = isArray(d) ? cloneArr(d, true) : cloneObj(d, true)
  })
  return ret
}
