/**
 * 获取验证码(还需修改)
 * @author zky
 * @params tel: 手机号码
 * @since 2020/11/21
 */

export function getCode(tel) {
  this.$axios
    .post('/service/nk/check_get_code.do', { tel })
    .then((res) => {
      return res.data.code
    })
    .catch((err) => {
      return err.message
    })
}

/**
 * 校验验证码(还需修改)
 * @author zky
 * @params tel: 手机号码 code: 验证码
 * @since 2020/11/21
 */

export function checkCode(tel, code) {
  this.$axios
    .post('/service/nk/check_get_code.do', { tel, code })
    .then((res) => {
      return res.data.code
    })
    .catch((err) => {
      return err.message
    })
}

/**
 * 校验电子邮箱格式(还需修改)
 * @author zky
 * @params email: 电子邮箱地址
 * @since 2020/11/21
 */

export function checkEmail(email) {
  // /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/
  const Regex = /^[a-zA-Z0-9_-]+@((qq|163|sina|sohu|gmail|msn|live)+\.)+(com|cn|net|org)$/
  return Regex.test(email)
}

/**
 * 校验手机号码
 * @params {string} telephoneNumber 手机号码
 * @returns  boolean
 */
export function checkPhone(telephoneNumber) {
  const Regex = /^(((13[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[3-8]{1})|(18[0-9]{1})|(19[0-9]{1})|(14[5-7]{1}))+\d{8})$/
  return Regex.test(telephoneNumber)
}

/**
 * 校验密码
 * @params {string} password 密码
 * @returns  boolean
 */
export function checkPassword(password) {
  // 至少6-15个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符
  // const Regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,15}$/
  // 至少6-15个字符 可以包含\"#$%&'()*+,-./:;<=>?@[]^_`{|}~等特殊字符
  // eslint-disable-next-line
  const Regex = /^[A-Za-z0-9!\\"#\$%&'\(\)\*\+,-.\/\:;<=>\?@\[\]\^_`\{\|\}\~]{6,15}$/
  return Regex.test(password)
}

/**
 * 校验验证码
 * @params {string} authCode 密码
 * @returns  boolean
 */
export function checkAuthCode(authCode) {
  // 6个数字
  const Regex = /\d{6}/
  return Regex.test(authCode)
}
