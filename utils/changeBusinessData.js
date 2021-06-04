const userTypeConfig = {
  ORDINARY_USER: 1, // 普通用户
  MERCHANT_USER: 2, // 规划师
}

// 添加评价星级 和 对应图片进行对应
const evaluateLevelImgConfig = {
  vbad: '3j7yfp1gur00000.png',
  bad: 'erhcjphe1rs0000.png',
  normal: 'fg3itpb5ymw0000.png',
  happy: '2f3ml0oiphj4000.png',
  vhappy: '3altnsq34c80000.png',
  vbadlight: '89qo0lj31wk0000.png',
  badlight: '4n14ntskhke0000.png',
  normallight: '87qklwsjm3c0000.png',
  happylight: 'fneqpwoo7pk0000.png',
  vhappylight: 'f5itkuaqg800000.png',
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
