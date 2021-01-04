/**
 * 分割数组
 * 将数组分割成多个等长的二维数组，注意如果最后的元素不满足长度，那么最后剩余的元素将组成一个区块
 * @author xueyige
 * @since 2020/11/20
 */

/**
 * 分割数组
 * @param  {Array}  arr   需要分割的数组
 * @param  {Number} len 需要分成长度为多少的二维数组
 * @return {Array}         返回分割后的数据
 */

export default function chunkArr(arr, len) {
  if (!Array.isArray(arr) || !/^\d+$/.test(len)) {
    return arr
  }
  const array = [[]]
  let _index = 0
  for (let i = 0; i < arr.length; i++) {
    const arrElement = arr[i]
    if (array[_index].length >= len) {
      _index += 1
      array[_index] = []
    }
    array[_index].push(arrElement)
  }
  return array
}
