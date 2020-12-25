/**
 * @author xyg
 * @since 2020/12/25
 */
import config from '@/config'
export default {
  data() {
    return {
      userInfo: null,
    }
  },
  beforeMount() {
    // 获取userInfo
    this.userInfo = this.$store.state.user.userInfo
  },
  methods: {
    jumpImMixin() {
      // 跳转到IM
      if (this.userInfo.token) {
        window.location.href = `${config.imBaseUrl}/index?token=${this.userInfo.token}&userId=${this.userInfo.userId}&userType=${this.userInfo.userType}`
      } else {
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
