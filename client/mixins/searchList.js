import { goods } from '@/api/index'
export default {
  data() {
    return {
      reqType: 'serve', // 搜索的产品类型
    }
  },
  methods: {
    getServeList() {},
    getJyList() {},
    searchKeydownHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      // console.log('reqType', this.reqType)
      if (this.reqType === 'serve') {
        console.log('serveGoodsListData', this.serveGoodsListData)
        goods
          .searchServeGoodsList({ axios: this.$axios }, this.formData)
          .then((data) => {
            console.log(data)
            this.serveGoodsListData = data
          })
      } else {
        console.log('jyGoodsListData', this.jyGoodsListData)
        this.jyGoodsListData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      }
    },
    searchInputHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      // console.log('reqType', this.reqType)
      // console.log('serveGoodsListData', this.serveGoodsListData)
      // console.log('jyGoodsListData', this.jyGoodsListData)
    },
  },
  mounted() {},
}
