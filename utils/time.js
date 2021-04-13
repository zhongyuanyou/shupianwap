// //JavaScript函数：
// var minute = 1000 * 60
// var hour = minute * 60
// var day = hour * 24
// var halfamonth = day * 15
// var month = day * 30
// function getDateDiff(dateTimeStamp) {
//   var now = new Date().getTime()
//   var diffValue = now - dateTimeStamp
//   if (diffValue < 0) {
//     //若日期不符则弹出窗口告之
//     //alert("结束日期不能小于开始日期！");
//   }
//   var monthC = diffValue / month
//   var weekC = diffValue / (7 * day)
//   var dayC = diffValue / day
//   var hourC = diffValue / hour
//   var minC = diffValue / minute
//   if (monthC >= 1) {
//     result = parseInt(monthC)
//   }
//   else if (weekC >= 1) {
//     result = parseInt(weekC)
//   }
//   else if (dayC >= 1) {
//     result = parseInt(dayC)
//   }
//   else if (hourC >= 1) {
//     result = parseInt(hourC)
//   }
//   else if (minC >= 1) {
//     result = parseInt(minC)
//   } else
//     result = "刚刚发表"
//   return result
// }
// module.exports = {
//   timestampFormat
// }
