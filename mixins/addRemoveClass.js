/**
 * @author xyg
 * @since 2020/12/01
 */
export default {
  methods: {
    addClass(className) {
      this.moreTextCss.indexOf(className) === -1 &&
        (this.moreTextCss = this.moreTextCss + ' ' + className)
    },
    removeClass(className) {
      const arr = this.moreTextCss.split(' ')
      const _index = arr.findIndex((item) => item === className)
      if (_index !== -1) {
        arr.splice(_index, 1)
      }
      this.moreTextCss = arr.join(' ')
    },
  },
}
