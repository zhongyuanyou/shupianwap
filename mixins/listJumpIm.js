/**
 * @author xyg
 * @since 2020/12/25
 */
import config from '@/config'
// import uni from '@/plugins/uni'
export default {
  data() {
    return {
      userInfo: null,
      token: '',
      userId: '',
      // isApplets: false,
    }
  },
  beforeMount() {
    // 获取userInfo
    this.userInfo = this.$store.state.user.userInfo
    this.token = this.$store.state.user.token
    this.userId = this.$store.state.user.userId
    this.isApplets = this.$store.state.app.isApplets
  },
  methods: {
    jumpImMixin() {
      // 跳转到IM
      if (this.token && this.userId) {
        // if (this.isApplets) {
        //   uni.switchTab({
        //     url: '/pages/message/index',
        //   })
        //   return
        // }
        window.location.href = `${config.imBaseUrl}/index?token=${this.userInfo.token}&userId=${this.userInfo.userId}&userType=${this.userInfo.userType}`
      } else {
        // if (this.isApplets) {
        //   let url = this.$route.path.split('')
        //   url.splice(0, 1)
        //   url = url.join('')
        //   if (this.$route.query) {
        //     for (const key in this.$route.query) {
        //       url += `&${key}=${this.$route.query[key]}`
        //     }
        //   }
        //   this.uni.redirectTo({
        //     url:
        //       '/pages/my_son/login/wxLogin?url=' +
        //       url +
        //       '&firstLevel=true=true',
        //   })
        //   return
        // }
        this.$router.push({
          path: '/login',
          query: {
            redirect: this.$route.path,
          },
        })
      }
    },
  },
}
