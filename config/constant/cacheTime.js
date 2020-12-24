/** @Author: MaLiang
 * @Date: 2020-12-23 19:50:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 19:50:00
 * @Description: 中间层 redis 缓存时间配置文件
 * @FilePath: /chips-wap/app/config/constant/cacheTime.js
 * */

module.exports = {
  BASE_CACHE_TIME: 60 * 5, // 所有内容的缓存的过期时间(5分钟)
  RECOM_TIME: 60 * 60, // 算法推荐产品ids缓存过期时间(1小时)
};
