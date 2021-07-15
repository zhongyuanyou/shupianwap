<template>
  <div class="protocol">
    <header-slot>
      <div v-if="!hideHeader" class="top">
        <sp-top-nav-bar
          ellipsis
          :title="article.title"
          @on-click-left="onClickLeft"
        >
          <template #left>
            <my-icon name="nav_ic_back" size="0.4rem" color="#1A1A1A" />
          </template>
        </sp-top-nav-bar>
      </div>
    </header-slot>
    <div class="content">
      <sp-skeleton title :row="10" :loading="loading">
        <div class="content-text" v-html="article.content"></div>
      </sp-skeleton>
    </div>
    <div class="submit">
      <p>
        <sp-checkbox v-model="checked"></sp-checkbox
        ><span
          >同意<a class="blue" @click="afterSaleProtocol('protocol100122')"
            >《服务协议》</a
          >
          和<a class="blue" @click="afterSaleProtocol('protocol100121')"
            >《隐私政策》</a
          ></span
        >
      </p>
      <button
        :style="{ background: !checked ? '#ddd' : '#4974f5' }"
        :disabled="!checked"
        @click="submit"
      >
        同意协议并继续
      </button>
    </div>
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Icon,
  Skeleton,
  Checkbox,
} from '@chipspc/vant-dgg'

import { mapState } from 'vuex'
import { auth } from '@/api'
import HeaderSlot from '@/components/common/head/HeaderSlot'
export default {
  name: 'Protocol',
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Skeleton.name]: Skeleton,
    [Icon.name]: Icon,
    [HeaderSlot.name]: HeaderSlot,
    [Checkbox.name]: Checkbox,
  },
  data() {
    return {
      article: {
        title: '',
        content: '',
      },
      loading: true,
      hideHeader: this.$route.query.hideHeader || false,
      categoryCode: this.$route.query.categoryCode,
      redirect: this.$route.query.redirect || '', // 登录后需要跳转的地址
      checked: false,
      times: 10,
      timer: null,
      isDisabledBtn: true,
    }
  },
  computed: {
    ...mapState({
      isApplets: (state) => state.app.isApplets,
    }),
  },
  created() {
    if (process && process.client) {
      console.log(this.$route.query.categoryCode)
      this.getProtocol(this.categoryCode)
    }
  },
  mounted() {},
  methods: {
    onClickLeft() {
      if (this.redirect) {
        const isPath = /\//.test(this.redirect + '')
        const pushParams = {
          path: isPath ? this.redirect : null,
          name: isPath ? null : this.redirect,
        }
        this.$router.push(pushParams)
      } else {
        this.$router.go(-1)
      }
    },

    async getProtocol(categoryCode) {
      if (!categoryCode) {
        this.$xToast.warning('请传入需要获取的协议!')
        return
      }
      const params = {
        categoryCode,
        includeField: 'content,title',
      }
      try {
        this.loading = true
        const data = await auth.protocol(params)
        console.log('data:', data)
        const { rows = [] } = data || {}
        this.article = rows[0] || {}
        this.loading = false
        return rows[0] || {}
      } catch (error) {
        this.$xToast.error(error.message || '请求失败')
        return Promise.reject(error)
      }
    },
    submit() {
      if (!this.checked) {
        this.$xToast.show({ message: '请阅读并知晓服务协议和隐私协议' })
        return false
      } else {
        this.$router.push({
          path: '/my/settings/setPwd?status=0',
        })
      }
    },
    afterSaleProtocol(code) {
      this.$router.push({
        path: '/login/protocol',
        query: {
          categoryCode: code,
        },
      })
    },
  },

  head() {
    return {
      title:
        this.$route.query.categoryCode === 'protocol100121'
          ? '隐私政策'
          : '服务协议',
    }
  },
}
</script>

<style lang="less" scoped>
.blue {
  color: #4974f5;
}
.protocol {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  .top {
    flex: 88px 0 0;
    ::v-deep.sp-top-nav-bar {
      height: 88px;
      min-height: auto;
      &__left,
      &__right {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-weight: 400;
      }
    }
  }
  ::v-deep.content {
    flex: 1;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    color: #555555;
    padding: 40px;
    &-text {
      font-size: 26px;
      line-height: 1.6;
      span {
        color: #4974f5;
      }
    }
    img {
      max-width: 100%;
      height: auto;
    }
    * {
      word-wrap: break-word;
      word-break: break-all;
    }
  }
}
.submit {
  padding: 0 40px;
  position: fixed;
  bottom: 32px;
  left: 0;
  width: 100%;
  background: #fff;
  padding-top: 20px;
  > p {
    font-family: PingFangSC-Regular;
    font-size: 24px;
    color: #999999;
    line-height: 32px;
    margin-bottom: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    ::v-deep .sp-checkbox {
      margin-right: 10px;
    }
  }
  > button {
    font-size: 32px;
    color: #ffffff;
    text-align: center;
    width: 100%;
    display: block;
    height: 95px;
    background: #4974f5;
    border-radius: 8px;
    font-weight: bold;
  }
}
</style>
