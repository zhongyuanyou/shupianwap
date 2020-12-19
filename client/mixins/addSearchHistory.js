/**
 * @author maliang
 * @since 2020/12/19
 */
export default {
  methods: {
    // 搜索前添加历史记录 data.name: 搜索关键词  data.isJumpLink：点击跳转类型，跳转搜索结果页传 0
    addSearchHistoryMixin(data = {}) {
      if (!data.name) {
        return
      }
      const historyList = this.$cookies.get('searchHistory')
        ? this.$cookies.get('searchHistory')
        : []
      const isHave = historyList.findIndex((val) => {
        return val.name === data.name
      })
      if (isHave !== -1) {
        historyList.splice(isHave, 1)
      }
      historyList.unshift(data)
      if (historyList.length > 16) {
        historyList.pop()
      }
      this.$cookies.set('searchHistory', historyList, {
        path: '/',
        maxAge: 60 * 60 * 24 * 99999, // 过期时间
      })
    },
  },
}
