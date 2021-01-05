/**
 * @author xyg
 * @since 2020/12/01
 */
import { goods } from '@/api/index'
export default {
  methods: {
    getServeListReq() {
      console.log('serveGoodsListData', this.serveGoodsListData)
      // this.skeletonLoading = true
      this.formData.areaCodes = this.cityCode.code
      goods
        .searchServeGoodsList({ axios: this.$axios }, this.formData)
        .then((data) => {
          console.log(data)
          if (JSON.stringify(data.goods) !== '{}') {
            // 数据里面商品有值
            this.serveGoodsListData = [
              ...this.serveGoodsListData,
              ...data.goods.records,
            ]
            if (this.formData.start === 1) {
              // 提示查找到多少条资源
              this.searchToast(`共找到${data.goods.totalCount}条资源`)
            }
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
          } else if (this.formData.start === 1) {
            this.listShow = false
            this.searchToast('共找到0条资源')
          } else {
            this.$xToast.error('网络错误，请刷新后重试')
          }
          this.skeletonLoading = false
          this.$nextTick(() => {
            const installAPPHeight = this.$refs.installApp.$el.clientHeight
            const installAPPTop = this.$refs.installApp.$el.getBoundingClientRect()
              .top
            // const dropDownMenuHeight = this.$refs.dropDownMenu.$el.clientHeight
            // const topHeight = this.$el.getBoundingClientRect().top
            this.maxHeight =
              document.body.clientHeight - installAPPHeight - installAPPTop
          })
        })
        .catch((err) => {
          this.$xToast.error('网络错误，请刷新后重试')
          this.listShow = false
          this.skeletonLoading = false
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
            this.$set(this.jyFilterData, this.currentTabJyCode, data.filters)
            this.formData[this.currentTabJyCode].needTypes = 0
          }

          if (JSON.stringify(data.goods) !== '{}') {
            // 数据里面商品有值
            this.jyGoodsListData[this.currentTabJyCode] = [
              ...this.jyGoodsListData[this.currentTabJyCode],
              ...data.goods.records,
            ]
            if (this.formData[this.currentTabJyCode].start === 1) {
              // 只有首次查询的时候才显示
              // 提示查找到多少条资源
              this.searchToast(`共找到${data.goods.totalCount}条资源`)
            }
          } else if (this.formData[this.currentTabJyCode].start === 1) {
            this.jyGoodsListData[this.currentTabJyCode] = []
            this.searchToast(`共找到0条资源`)
          } else {
            this.$xToast.error('网络错误，请刷新后重试')
          }
          if (
            JSON.stringify(data.goods) === '{}' ||
            data.goods.records.length < 10
          ) {
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
            this.$nextTick(() => {
              /* console.log(this.$refs.installApp)
              console.log(this.$refs.dropDownMenu)
              console.log(this.$refs.spTabs)
              console.log(this.$el)
              console.log(
                document.querySelectorAll('.sp-tabs-self .sp-tabs__wrap')
              ) */
              this.computedHeight()
            })
          }
        })
        .catch((err) => {
          // todo 提示没有数据
          this.listShow = false
          this.$xToast.error('网络错误，请刷新后重试')
          this.isReq[this.currentTabJyCode] = false
          if (this.formData[this.currentTabJyCode].start === 1) {
            this.jyGoodsListData[this.currentTabJyCode] = []
          }
          console.error(err)
        })
    },
    searchKeydownHandle() {
      // console.log('this.searchText', this.searchText)
      // console.log('formData', this.formData)
      console.log('reqType', this.reqType)
      // this.listShow = true
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
    searchToast(message) {
      // 轻提示
      this.$xToast.show({
        message,
        duration: 1500,
        icon: 'toast_ic_comp',
        forbidClick: true,
      })
    },
  },
  mounted() {},
}
