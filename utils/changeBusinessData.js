const userTypeConfig = {
  ORDINARY_USER: 1, // 普通用户
  MERCHANT_USER: 2, // 规划师
}

// 添加评价星级 和 对应图片进行对应
const evaluateLevelImgConfig = {
  vbad: 'uihcfufviog000.png',
  bad: 'fqurczrer3c0000.png',
  normal: '8vml2tl3zh00000.png',
  happy: 'u75yce9hmuo000.png',
  vhappy: '4t6hb5mowc80000.png',
  vbadlight: '4cm2myxeh9c0000.png',
  badlight: 'd4l841te9o80000.png',
  normallight: '4gtpmrc0ag00000.png',
  happylight: 'efurydznqt40000.png',
  vhappylight: 'cxyioo5x58g0000.png',
}

// 添加空图片处理
const emptyImgConfig = {
  box: '3py8wghbsaq000.png',
  calendar: '9tfokyuuxb00000.png',
}

const getUserType = (type) => {
  return userTypeConfig[type]
}

const getEvaluateLevelImg = (type) => {
  return evaluateLevelImgConfig[type]
}

const getEmptyImgConfig = (type) => {
  return emptyImgConfig[type]
}

export default {
  getUserType,
  getEvaluateLevelImg,
  getEmptyImgConfig,
}
