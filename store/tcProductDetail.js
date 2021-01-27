/**
 * @Description: 交易产品详情
 * @author zhaoDongMing
 * @date
 */
export const state = () => ({
  detailData: {
    baseData: {},
    classCodeLevelList: [],
    platformPrice: '0',
    classCodeLevel: '',
    qftDetails: {
      fieldValueCn: '',
      fieldValue: '',
      fieldValueList: [],
    },
    productImgArr: [],
    dictCode: '',
  },
})
export const mutations = {
  SET_TCPRODUCT_DETAIL(state, object) {
    state.detailData = object
  },
}
