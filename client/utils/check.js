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
