import axios from 'axios'
import { homeApi } from '@/api'

const amapKey = '5111f49d979a509f1e96420a1b456ff4' // 高德地图key
const regeoUrl = '/gdmap/v3/geocode/regeo' // 高德地图逆地理编码接口服务（根据经纬度获取城市信息）
// const ipUrl = '/gdmap/v3/ip' // 高德地图根据用户请求地址ip获取所在城市

/**
 * @description 获取当前定位城市
 * @returns {Promise}
 * @code {Number} 定位结果code、 （200：定位成功且匹配到站点； 5003：定位成功，但未匹配到开通服务的站点； 其它均为定位失败）
 * @message {String} 定位成功或失败的描述
 * @data {Object} 定位成功的城市code与name
 *
 * @remarks 使用方式： const data = await getPositonCity()
 * @author：Ma Liang
 */
export const getPositonCity = () => {
  return new Promise((resolve, reject) => {
    const returnData = {
      code: 200, // 200 定位成功； 其它失败
      message: '',
      data: {},
    }
    // 判断浏览器是否支持地理位置接口
    if (navigator.geolocation) {
      // 支持
      agreeObtainLocation()
    } else {
      // 不支持,定位失败
      returnData.code = 5000
      returnData.message = '定位失败，当前浏览器不支持GPS定位'
      resolve(returnData)
    }

    async function getCityInfo(longAndlat) {
      try {
        let positionCity = ''
        // 调用高德服务，根据经纬度逆地址解析，获取城市信息
        const cityAnalysis = await axios.get(regeoUrl, {
          params: {
            key: amapKey,
            location: longAndlat,
          },
        })
        if (cityAnalysis.status === 200 && cityAnalysis.data.status) {
          positionCity = cityAnalysis.data.regeocode.addressComponent.city
        } else {
          returnData.code = 5001
          returnData.message = '定位失败，高德地图逆地址编码解析错误'
          resolve(returnData)
        }

        // 定位成功，获取站点列表判断是否开通定位城市的服务
        if (positionCity) {
          let siteList = []
          const findSiteApi = `/api${homeApi.findSiteList}`
          // 获取站点列表
          const siteRes = await axios.get(findSiteApi, {
            headers: {
              'x-cache-control': 'cache',
            },
          })
          if (siteRes.status === 200 && siteRes.data.code === 200) {
            siteList = siteRes.data.data.cityList
            // 遍历城市列表，找到对应城市
            const mateSite = siteList.find((item) => item.name === positionCity)
            // 匹配到对应城市
            if (mateSite) {
              returnData.code = 200
              returnData.message = '定位成功，匹配到对应的服务城市'
              returnData.data = mateSite
              resolve(returnData)
            } else {
              returnData.code = 5003
              returnData.message = '定位成功，但未匹配到对应的服务城市'
              returnData.data.name = positionCity
              resolve(returnData)
            }
          } else {
            returnData.code = 5003
            returnData.message = '定位成功，但获取站点列表失败'
            returnData.data.name = positionCity
            resolve(returnData)
          }
        }
      } catch (error) {
        returnData.code = 5002
        returnData.message = error
        resolve(returnData)
      }
    }

    // 定位成功
    function geoSuccess(event) {
      const longAndlat = `${event.coords.longitude},${event.coords.latitude}` // 经纬度
      getCityInfo(longAndlat)
    }

    // 定位失败
    function showError(error) {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          returnData.code = 5001
          returnData.message =
            '定位失败，用户拒绝请求地理定位或因非https的站点被浏览器安全策略阻止'
          break
        case error.POSITION_UNAVAILABLE:
          returnData.code = 5001
          returnData.message = '定位失败，位置信息不可用'
          break
        case error.TIMEOUT:
          returnData.code = 5001
          returnData.message = '定位失败，请求获取用户位置超时'
          break
        case error.UNKNOWN_ERROR:
          returnData.code = 5001
          returnData.message = '定位失败，定位系统失效'
          break
        default:
          returnData.code = 5001
          returnData.message = '定位失败，未知异常'
      }
      resolve(returnData)
    }

    // 获取用户的地理位置。使用它需要得到用户的授权
    function agreeObtainLocation() {
      const option = {
        enableHighAccuracy: true,
        timeout: 5000, // 超时时间
        maximumAge: 0,
      }
      navigator.geolocation.getCurrentPosition(geoSuccess, showError, option)
    }
  })
}

// 调用高德服务，根据ip获取城市信息
// function getCityInfoToIp() {
//   axios
//     .get(ipUrl, {
//       params: {
//         key: amapKey,
//       },
//     })
//     .then((res) => {
//       if (res.status) {
//         resolve(res.data)
//       } else {
//         reject(res)
//       }
//     })
//     .catch((err) => {
//       reject(err)
//     })
// }
