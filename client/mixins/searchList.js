import { goods } from '@/api/index'
export default {
  methods: {
    getServeListReq() {
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
            this.listShow = false
          }
        })
        .catch((err) => {
          // todo 提示没有数据
          this.listShow = false
          console.error(err)
        })
    },
    getJyListReq() {
      console.log(
        'jyGoodsListData',
        this.jyGoodsListData[this.currentTabJyCode]
      )
      goods
        .searchJyGoodsList(
          { axios: this.$axios },
          this.formData[this.currentTabJyCode]
        )
        .then((data) => {
          console.log(data)
          this.isReq[this.currentTabJyCode] = true
          if (
            this.formData[this.currentTabJyCode].needTypes === 1 &&
            JSON.stringify(data.filters) !== '{}'
          ) {
            // 处理筛选项数据
            this.jyFilterData[this.currentTabJyCode] = data.filters
            this.formData[this.currentTabJyCode].needTypes = 0
          }
          if (JSON.stringify(data.goods) !== '{}') {
            this.jyGoodsListData[this.currentTabJyCode] = data.goods.records
          } else {
            this.jyGoodsListData[this.currentTabJyCode] = []
          }
          if (data.goods.records.length < 10) {
            this.finished = true
          } else {
            this.formData[this.currentTabJyCode].start += 1
            this.loading = false
          }
          // 显示或隐藏订阅框
          if (this.jyGoodsListData[this.currentTabJyCode].length === 0) {
            this.listShow = false
          } else {
            this.listShow = true
          }
          // 如果没有计算maxHeight，则需要在筛选数据出来后计算列表的最大高
          if (this.maxHeight <= 0) {
            /* console.log(this.$refs.installApp)
            console.log(this.$refs.dropDownMenu)
            console.log(this.$refs.spTabs)
            console.log(this.$el)
            console.log(
              document.querySelectorAll('.sp-tabs-self .sp-tabs__wrap')
            ) */
            this.computedHeight()
          }
        })
        .catch((err) => {
          // todo 提示没有数据
          this.listShow = false
          this.isReq[this.currentTabJyCode] = false
          console.error(err)
        })
    },
    searchKeydownHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      console.log('reqType', this.reqType)
      this.listShow = true
      if (this.reqType === 'serve') {
        this.getServeListReq()
      } else {
        this.getJyListReq()
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
