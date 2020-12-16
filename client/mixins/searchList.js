import { goods } from '@/api/index'
export default {
  methods: {
    getServeList() {},
    getJyList() {},
    searchKeydownHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      console.log('reqType', this.reqType)
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
        goods
          .searchJyGoodsList({ axios: this.$axios }, this.formData)
          .then((data) => {
            console.log(data)
            if (
              this.formData.needTypes === 1 &&
              JSON.stringify(data.filters) !== '{}'
            ) {
              // 处理筛选项数据
              this.jyFilterData = data.filters
              this.filterObj[this.formData.dictCode] = data.filters
              this.formData.needTypes = 0
            }
            this.jyGoodsListData = data.goods.records
            if (data.goods.records.length < 10) {
              this.finished = true
            } else {
              this.formData.start += 1
              this.loading = false
            }
            if (this.jyGoodsListData.length === 0) {
              this.listShow = false
            } else {
              this.listShow = true
            }
          })
          .catch((err) => {
            console.log(err)
          })
        // this.jyGoodsListData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
