/**
 * @Description: 交易资源类型
 * @author zhaoDongMing
 * @date
 */

export function productResourceType(type) {
  switch (type) {
    case 'CATE-JYZY-GS':
      return 'zhgszr'
    case 'CATE-JYZY-ZZ':
      return 'zzzr'
    case 'CATE-JYZY-SB':
      return 'sbjy'
    case 'CATE-JYZY-ZL':
      return 'zljy'
  }
}
