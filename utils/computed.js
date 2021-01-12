/* eslint-disable */
export default {
  /**
   * 精度计算
   */
  calculate(input) {
    const f = {
      add: '+',
      sub: '-',
      div: '/',
      mlt: '*',
      mod: '%',
      exp: '^',
      lk: '(',
      rk: ')',
    }
    f.ooo = [
      [[f.mlt], [f.div], [f.mod], [f.exp]],
      [[f.add], [f.sub], [f.lk], [f.rk]],
    ]

    input = input.replace(/[^0-9%^*\/\-+.]/g, '') // 清除不必要的字符
    let output
    for (let i = 0, n = f.ooo.length; i < n; i++) {
      // 正则表达式，用于查找浮点数或整数之间的操作符
      const re = new RegExp(
        '(\\d+\\.?\\d*)([\\' + f.ooo[i].join('\\') + '])(\\d+\\.?\\d*)'
      )
      re.lastIndex = 0 // 采取预防措施，重新启动pos
      // 循环时仍然需要计算优先级
      while (re.test(input)) {
        // console.log('RegExp.$1, RegExp.$2, RegExp.$3', RegExp.$1, RegExp.$2, RegExp.$3)
        output = operation(+RegExp.$1, RegExp.$2, +RegExp.$3)
        if (isNaN(output) || !isFinite(output)) {
          return output
        } // 如果不是数字就退出
        input = input.replace(re, output)
      }
    }
    return output

    function isInteger(num) {
      // 判断一个数字是否为整数
      return Math.floor(num) === num
    }
    function toInteger(floatNum) {
      // 将一个浮点数转换成整数，返回整数和倍数
      const ret = { times: 1, num: 0 }
      // 是整数
      if (isInteger(floatNum)) {
        ret.num = floatNum
        return ret
      }
      const strfi = floatNum + ''
      // 查找小数点的下标
      const dotPos = strfi.indexOf('.')
      // 获取小数的位数
      const len = strfi.substr(dotPos + 1).length
      // Math.pow(10,len)指定10的len次幂。
      const time = Math.pow(10, len)

      // 将浮点数转化为整数
      const intNum = parseInt(floatNum * time + 0.5, 10)
      ret.times = time
      ret.num = intNum
      return ret
    }
    function operation(a, op, b) {
      const o1 = toInteger(a)
      const o2 = toInteger(b)
      const n1 = o1.num
      const n2 = o2.num
      const t1 = o1.times
      const t2 = o2.times
      const max = t1 > t2 ? t1 : t2
      let result = null
      // eslint-disable-next-line default-case
      switch (op) {
        case f.add:
          if (t1 === t2) {
            result = n1 + n2
          } else if (t1 > t2) {
            result = n1 + n2 * (t1 / t2)
          } else {
            result = n1 * (t2 / t1) + n2
          }
          return result / max
          // eslint-disable-next-line no-unreachable
          break
        case f.sub:
          if (t1 === t2) {
            result = n1 - n2
          } else if (t1 > t2) {
            result = n1 - n2 * (t1 / t2)
          } else {
            result = n1 * (t2 / t1) - n2
          }
          return result / max
          // eslint-disable-next-line no-unreachable
          break
        case f.mlt:
          result = (n1 * n2) / (t1 * t2)
          return result
          // eslint-disable-next-line no-unreachable
          break
        case f.div:
          // result = (n1 / n2) / (t2 / t1);
          let _t1 = 0,
            _t2 = 0,
            r1,
            r2
          try {
            _t1 = a.toString().split('.')[1].length
          } catch (e) {}
          try {
            _t2 = b.toString().split('.')[1].length
          } catch (e) {}
          r1 = Number(a.toString().replace('.', ''))
          r2 = Number(b.toString().replace('.', ''))
          result = (r1 / r2) * Math.pow(10, _t2 - _t1)
          return result
          // eslint-disable-next-line no-unreachable
          break
        case f.mod:
          result = (n1 / n2) % (t2 / t1)
          return result
          // eslint-disable-next-line no-unreachable
          break
        case f.exp:
          return Math.pow(n1 / max, n2 / max)
          // eslint-disable-next-line no-unreachable
          break
      }
    }
  },
  /**
   * 进度计算后保留指定小数位数,返回字符串
   * @param.num: String config文件中APPID下对应的项目实例名称
   * @param.bit: String 请求路径
   * @return {String}
   */
  priceFixed(num, bit) {
    let numObj = Number(0)
    if (Number(this.calculate(num))) {
      numObj = Number(this.calculate(num))
    }
    return numObj.toFixed(bit)
  },
}
