import Moment from 'moment'
import { checkPhone } from '../check'
import computed from '../computed'

const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

function formatDate(time) {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  //  const hour = date.getHours()
  //  const minute = date.getMinutes()
  //  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-')
}
//  时间戳转换日期
function transformTime(timestamp) {
  if (timestamp.toString().length <= 13) {
    const date = new Date(timestamp * 1)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return (
      [year, month, day].map(formatNumber).join('-') +
      ' ' +
      [hour, minute, second].map(formatNumber).join(':')
    )
  } else {
    return timestamp
  }
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

// 手机号码隐藏显示
const numberSuitScanf = (phoneNumber) => {
  let numberString = '暂无'
  if (phoneNumber == null) {
    return numberString
  } else {
    if (phoneNumber.length === 11) {
      const replaceStr = phoneNumber.substr(3, 4)
      numberString = phoneNumber.replace(replaceStr, '****')
    } else {
      const halfLength = phoneNumber.length / 2
      if (halfLength < 4) {
        const replaceStr = phoneNumber.substr(
          phoneNumber.length - halfLength,
          halfLength
        )
        numberString = phoneNumber.replace(replaceStr, '****')
      } else {
        const replaceStr = phoneNumber.substr(phoneNumber.length - 4, 4)
        numberString = phoneNumber.replace(replaceStr, '****')
      }
    }
    return numberString
  }
}

/**
 * 检查用户登录信息，token是否过期等
 */
const checkUserIsLogin = () => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const localUserInfo = wx.getStorageSync('userInfo')
    if (localUserInfo != null && localUserInfo.userInfo != null) {
      // eslint-disable-next-line no-undef
      const tokenExpire = wx.getStorageSync('userInfo').tokenExpire
      const timestamp = parseFloat(tokenExpire)
      const expireDate = new Date(timestamp)
      // var expireDate = new Date(timestamp);// 1549945943000
      const nowDate = new Date()
      if (nowDate >= expireDate) {
        const response = {
          code: 1,
          msg: '会话已超时，请重新登录',
          data: localUserInfo,
        }
        resolve(response)
      } else {
        const response = {
          code: 200,
          msg: '用户已登录，且token有效',
          data: localUserInfo,
        }
        resolve(response)
      }
    } else {
      const response = {
        code: -1,
        msg: '用户未登录，请先登录',
        data: null,
      }
      resolve(response)
    }
  })
}

/**
 * 时间戳转换成时间函数
 */
const formatDateTime = (inputTime) => {
  const date = new Date(inputTime)
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
}

/**
 * 获取用于网络请求验证的时间
 */
const getNetworkRequestDate = () => {
  const date = new Date()
  const y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  h = h < 10 ? '0' + h : h
  let minute = date.getMinutes()
  let second = date.getSeconds()
  minute = minute < 10 ? '0' + minute : minute
  second = second < 10 ? '0' + second : second
  return y + '' + m + '' + d + 'T' + h + '' + minute + '' + second + 'D'
}

//  活动详情倒计时
function handleActivityDetialCountDownDate(endDate) {
  const time = new Date().getTime()
  const endTime = new Date(endDate).getTime()

  const tamp = (endTime - time) / 1000
  return tamp
}
function handleTamp(tamp) {
  const day = getTime(Math.floor(tamp / (60 * 60 * 24)))
  const hour = getTime(Math.floor((tamp / 3600) % 24))
  const minute = getTime(Math.floor(tamp / 60) % 60)
  const second = getTime(Math.floor(tamp) % 60)
  const result = {
    day,
    hour,
    minute,
    second,
  }
  return result
}
function getTime(time) {
  if (time * 1 <= 9) {
    return '0' + time
  } else {
    return '' + time
  }
}
function timestampConvertDate(obj) {
  const date = new Date(obj)
  const y = 1900 + date.getYear()
  const m = '0' + (date.getMonth() + 1)
  const d = '0' + date.getDate()
  return (
    y +
    '-' +
    m.substring(m.length - 2, m.length) +
    '-' +
    d.substring(d.length - 2, d.length)
  )
}
//  判断空对象
function isEmptyObject(e) {
  let t
  for (t in e) return !1
  return !0
}
//  深拷贝对象
function deepCopyobject(a) {
  let c = {}

  c = JSON.parse(JSON.stringify(a))

  return c
}

/**
 * Map转JSON
 * **/
const mapToJson = (map) => {
  return JSON.stringify(strMapToObj(map))
}

/**
 * Map转Object
 * **/
const strMapToObj = (strMap) => {
  const obj = Object.create(null)
  for (const [k, v] of strMap) {
    obj[k] = v
  }
  return obj
}

/**
 * 处理请求参数，拼接成字符串
 */
const handleRequestWithParams = (params) => {
  let resultStr = ''
  const newkey = Object.keys(params).sort()
  const newObj = {}
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = params[newkey[i]]
  }
  for (const key in newObj) {
    const value = newObj[key]

    if (value !== undefined && value != null && value !== '') {
      resultStr = resultStr + key + '=' + newObj[key] + '&'
    }
  }
  resultStr = resultStr.substr(0, resultStr.length - 1)

  return resultStr
}

//  格式化价格
const regFenToYuan = (str) => {
  if (str % 100 === 0) {
    return String(str / 100) + '.00'
  } else {
    return str / 100
  }
}

// 获取本机IP
const getIPAdress = () => {
  const interfaces = require('os').networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        return alias.address
      }
    }
  }
}
// 验证手机号码
const checkMobile = (mobile) => {
  return /^1[3456789]\d{9}$/.test(mobile)
}
// 产品属性处理
// 属性价格展示处理
const priceHandle = (p) => {
  const price = computed.calculate(`${p} / 100`)
  let str = price
  if (price < 500000) {
    str = '50以万下'
  }
  if (price >= 500000 && price < 1000000) {
    str = '50-100万'
  }
  if (price >= 1000000 && price < 5000000) {
    str = '100-500万'
  }
  if (price >= 5000000 && price < 10000000) {
    str = '500-1000万'
  }
  if (price >= 10000000) {
    str = '1000万以上'
  }
  return str
}
const resetField = (field) => {
  let val = ''
  // 处理无字段数据的情况
  if (field.fieldValueCn) {
    val = field.fieldValueCn
  } else if (field.fieldValue) {
    val = field.fieldValue
  } else {
    val = ''
  }
  if (val) {
    switch (field.fieldCode) {
      case 'registration_time':
        val = resetTimeField(val)
        break
      case 'registered_capital':
        val = priceHandle(val)
        break
    }
  }
  return val
}
const resetTimeField = (str) => {
  const timeArr = str.split('-').map((item) => +item)
  timeArr[1] -= 1
  const a = Moment()
  const b = Moment(timeArr)
  const diifTime = a.diff(b, 'years', true)
  if (diifTime < 1) {
    // 1年以下
    return '1年以下'
  }
  if (diifTime >= 1 && diifTime < 2) {
    // 1-2年
    return '1-2年'
  }
  if (diifTime >= 2 && diifTime < 3) {
    // 2-3年
    return '2-3年'
  }
  if (diifTime >= 3) {
    // 3年以上
    return '3年以上'
  }
  return str
}
export default {
  priceHandle,
  resetTimeField,
  formatTime,
  numberSuitScanf,
  checkUserIsLogin,
  handleActivityDetialCountDownDate,
  handleTamp,
  timestampConvertDate,
  mapToJson,
  strMapToObj,
  getNetworkRequestDate,
  handleRequestWithParams,
  isEmptyObject,
  deepCopyobject,
  formatDate,
  transformTime,
  getIPAdress,
  regFenToYuan,
  checkPhone,
  checkMobile,
}
