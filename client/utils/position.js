import axios from 'axios'
export default () => {
  const amapKey = '5111f49d979a509f1e96420a1b456ff4' // 高德地图key
  const regeoUrl = 'https://restapi.amap.com/v3/geocode/regeo' // 高德地图逆地理编码接口服务（根据经纬度获取城市信息）
  const ipUrl = 'https://restapi.amap.com/v3/ip' // 高德地图根据用户请求地址ip获取所在城市
  return new Promise((resolve, reject) => {
    // 判断浏览器是否支持地理位置接口
    if (navigator.geolocation) {
      // 支持
      agreeObtainLocation()
    } else {
      // 不支持
      getCityInfoToIp()
    }
    // 获取用户的地理位置。使用它需要得到用户的授权
    function agreeObtainLocation() {
      const option = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0,
      }
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, option)
    }
    // 同意授权
    function geoSuccess(event) {
      const longAndlat = `${event.coords.longitude},${event.coords.latitude}` // 经纬度
      getCityInfo(longAndlat)
    }
    // 拒绝授权
    function geoError(event) {
      getCityInfoToIp()
    }
    // 调用高德服务，根据经纬度，获取城市信息
    function getCityInfo(longAndlat) {
      axios
        .get(regeoUrl, {
          params: {
            key: amapKey,
            location: longAndlat,
          },
        })
        .then((res) => {
          if (res.status) {
            resolve(res.data.regeocode.addressComponent)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
    // 调用高德服务，根据ip获取城市信息
    function getCityInfoToIp() {
      axios
        .get(ipUrl, {
          params: {
            key: amapKey,
          },
        })
        .then((res) => {
          if (res.status) {
            resolve(res.data)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    }
  })
}