/** @Author: MaLiang
 * @Date: 2020-12-23 19:50:00
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-12-23 19:50:00
 * @Description: 中间层 redis 缓存时间配置文件
 * @FilePath: /chips-wap/app/config/constant/cacheTime.js
 * */

module.exports = {
  RECOM_TIME: 60 * 60, // 算法推荐产品ids缓存过期时间(1小时)
  ADVERT_TIME: 60 * 5, // 广告缓存的过期时间(5分钟)
};
