import axios from '~/plugins/axios' // 导入http中创建的axios实例

const eureka = {
  // 新闻列表
  queryEurekaUrl(params) {
    return axios({
      method: 'get',
      url: '/chips-wap/service/nk/eureka/v1/get_eureka',
      params,
    })
  },
}
export default eureka
