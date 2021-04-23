const userTypeConfig = {
  ORDINARY_USER: 1, // 普通用户
  MERCHANT_USER: 2, // 规划师
}

const getUserType = (type) => {
  return userTypeConfig[type]
}

export default {
  getUserType,
}
