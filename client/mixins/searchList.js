import { goods } from '@/api/index'
export default {
  methods: {
    getServeList() {},
    getJyList() {},
    searchKeydownHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      console.log('reqType', this.reqType)
      console.log(2222)
      if (this.reqType === 'serve') {
        console.log('serveGoodsListData', this.serveGoodsListData)
        goods
          .searchServeGoodsList({ axios: this.$axios }, this.formData)
          .then((data) => {
            console.log(data)
            if (JSON.stringify(data.goods) !== '{}') {
              this.serveGoodsListData = [
                ...this.serveGoodsListData,
                ...data.goods.records,
              ]
              if (data.goods.records.length < 10) {
                this.finished = true
              } else {
                this.formData.start += 1
                this.loading = false
              }
              if (this.serveGoodsListData.length === 0) {
                this.listShow = false
              } else {
                this.listShow = true
              }
            } else {
              // todo 提示没有数据
            }
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
