/* eslint-disable */
/**
 * 数据类型检测工具函数
 * @author chenmingbing
 * @since 2020/11/04
 */

const toString = Object.prototype.toString
const hasOwn = Object.prototype.hasOwnProperty

export const isArray = (arr) => {
  return Array.isArray
    ? Array.isArray(arr)
    : toString.call(arr) === '[object Array]'
}

export const isArrayLike = (obj) =>
  obj != null && isLength(obj.length) && !isFunction(obj)

export const isBoolean = (bool) => toString.call(bool) === '[object Boolean]'

export const isDate = (date) => toString.call(date) === '[object Date]'

export const isFunction = (fn) => toString.call(fn) === '[object Function]'

export const isLength = (val) => {
  return (
    typeof val === 'number' &&
    val > -1 &&
    val % 1 === 0 &&
    val <= Number.MAX_SAFE_INTEGER
  )
}

export const isNull = (val) => val === null

export const isUndefined = (val) => val === void 0

export const isNumber = (val) => {
  return isNull(val) || isUndefined(val) || isNaN(val) ? false : true
}

export const isObject = (obj) => {
  let type = typeof obj
  return (obj && (type === 'object' || type === 'function')) || false
}

export const isObjectLike = (obj) => obj != null && typeof obj === 'object'

export const isPlainObject = (obj) => {
  if (!isObject(obj) || obj.nodeType || obj === obj.window) {
    return false
  }

  try {
    if (
      obj.constructor &&
      !hasOwn.call(obj, 'constructor') &&
      !hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')
    ) {
      return false
    }
  } catch (e) {
    return false
  }

  for (var key in obj) {
    //
  }
  return key === void 0 || hasOwn.call(obj, key)
}

export const isRegExp = (reg) => toString.call(reg) === '[object RegExp]'

export const isString = (str) => toString.call(str) === '[object String]'

/**
 * 检测一个对象是否是空对象
 * 1.对象为null
 * 2.数组是空数组
 * 3.字面量对象是空对象
 * @param  {Null|Array|Object}  value     检测对象
 * @return {Boolean}      返回是否是空对象
 */
export const isEmpty = (value) => {
  if (value === null) {
    return true
  }

  if (isArray(value)) {
    return !value.length
  }

  if (isPlainObject(value)) {
    return !Object.keys(value).length
  }

  return false
}
