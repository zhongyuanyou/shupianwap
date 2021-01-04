/**
 * @author maliang
 * @since 2020/12/21
 * @describe 点击广告的跳转处理
 * @data 物料对象
 */
export default {
  methods: {
    // 点击广告的跳转处理
    adJumpHandleMixin(data = {}) {
      let url = ''
      switch (data.linkType) {
        // 跳转内链
        case 1:
          url = data.wapLink
          this.$router.push({
            path: url,
          })
          break
        // 跳转外链
        case 2:
          url = data.materialLink
          window.location.href = url
          break
        // 跳转图片链接
        case 3:
          url = 'img'
          this.$router.push({
            name: url,
            params: {
              url: data.imgLink,
            },
          })
          break
        default:
          url = data.wapLink
          this.$router.push({
            path: url,
          })
          break
      }
    },
  },
}
