'use strict'

// 处理防抖的程序
export function debounce(fun, delayed) {
  // 使用闭包，让每次调用时点击定时器状态不丢失
  let timeout = null
  return function () {
    // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    clearTimeout(timeout)
    const context = this
    const args = arguments
    timeout = setTimeout(function () {
      // 使用事件绑定的当前对象，替换处理程序的当前对象
      // 并将事件绑定的当前对象参数，传递给操作之后的处理程序
      fun.apply(context, args)
    }, delayed)
  }
}
// 处理防抖的程序
export function throttling(fun, delayed = 500) {
  // 使用闭包，让每次调用时点击定时器状态不丢失
  let timeout = null
  // 记录第一次点击时的时间戳
  let start = +new Date()
  return function () {
    clearTimeout(timeout)
    const context = this
    const args = arguments
    // 记录第一次以后的每次点击的时间戳
    const end = +new Date()
    // 当时间到达设置的延时时间则立即调用数据处理函数
    if (end - start >= delayed) {
      fun.apply(context, args)
      // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
      start = end
      // 后续点击没有到达设置的延时，定时器设定延时进行调用
    } else {
      timeout = setTimeout(function () {
        fun.apply(context, args)
      }, delayed)
    }
  }
}
