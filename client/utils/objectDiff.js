/*
 * @Author: xiao pu
 * @Date: 2020-11-27 15:34:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-27 16:16:10
 * @Description: file content
 * @FilePath: /chips-wap/client/utils/objectDiff.js
 */

/**
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
function diff(a, b) {
  if (a === b) {
    return {
      changed: 'equal',
      value: a,
    }
  }

  if (a == null || b == null) {
    return {
      changed: 'object change',
      value: {},
    }
  }

  const value = {}
  let equal = true

  for (const key in a) {
    if (key in b) {
      if (a[key] === b[key]) {
        value[key] = {
          changed: 'equal',
          value: a[key],
        }
      } else {
        const typeA = typeof a[key]
        const typeB = typeof b[key]
        if (
          a[key] &&
          b[key] &&
          (typeA === 'object' || typeA === 'function') &&
          (typeB === 'object' || typeB === 'function')
        ) {
          const valueDiff = diff(a[key], b[key])
          if (valueDiff.changed === 'equal') {
            value[key] = {
              changed: 'equal',
              value: a[key],
            }
          } else {
            equal = false
            value[key] = valueDiff
          }
        } else {
          equal = false
          value[key] = {
            changed: 'primitive change',
            removed: a[key],
            added: b[key],
          }
        }
      }
    } else {
      equal = false
      value[key] = {
        changed: 'removed',
        value: a[key],
      }
    }
  }

  for (const key in b) {
    if (!(key in a)) {
      equal = false
      value[key] = {
        changed: 'added',
        value: b[key],
      }
    }
  }

  if (equal) {
    return {
      changed: 'equal',
      value: a,
    }
  } else {
    return {
      changed: 'object change',
      value,
    }
  }
}

/**
 * @param {Object} a
 * @param {Object} b
 * @return {Object}
 */
function diffOwnProperties(a, b) {
  if (a === b) {
    return {
      changed: 'equal',
      value: a,
    }
  }

  if (a == null || b == null) {
    return {
      changed: 'object change',
      value: {},
    }
  }

  const diff = {}
  let equal = true
  let keys = Object.keys(a)

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]
    if (Object.prototype.hasOwnProperty.call(b, key)) {
      if (a[key] === b[key]) {
        diff[key] = {
          changed: 'equal',
          value: a[key],
        }
      } else {
        const typeA = typeof a[key]
        const typeB = typeof b[key]
        if (
          a[key] &&
          b[key] &&
          (typeA === 'object' || typeA === 'function') &&
          (typeB === 'object' || typeB === 'function')
        ) {
          const valueDiff = diffOwnProperties(a[key], b[key])
          if (valueDiff.changed === 'equal') {
            diff[key] = {
              changed: 'equal',
              value: a[key],
            }
          } else {
            equal = false
            diff[key] = valueDiff
          }
        } else {
          equal = false
          diff[key] = {
            changed: 'primitive change',
            removed: a[key],
            added: b[key],
          }
        }
      }
    } else {
      equal = false
      diff[key] = {
        changed: 'removed',
        value: a[key],
      }
    }
  }

  keys = Object.keys(b)

  for (let i = 0, length = keys.length; i < length; i++) {
    const key = keys[i]
    if (!Object.prototype.hasOwnProperty.call(a, key)) {
      equal = false
      diff[key] = {
        changed: 'added',
        value: b[key],
      }
    }
  }

  if (equal) {
    return {
      value: a,
      changed: 'equal',
    }
  } else {
    return {
      changed: 'object change',
      value: diff,
    }
  }
}

export default { diff, diffOwnProperties }
