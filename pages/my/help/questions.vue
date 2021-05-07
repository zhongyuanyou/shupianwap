<template>
  <div class="page-content">
    <Header v-if="!isApplets" title="问题解答" />
    <div class="title-box moudle">
      <my-icon
        name="command_img_questions"
        size="0.32rem"
        bg-color="linear-gradient(-45deg, #4974F5, #6093FB)"
      />
      <strong class="title-content">{{ title }}</strong>
    </div>
    <div class="content-box moudle">
      <my-icon
        name="command_img_answers"
        size="0.32rem"
        bg-color="linear-gradient(-45deg, #FF614E, #FA7769)"
      />
      <div class="text-content" v-html="content"></div>
    </div>
    <div v-if="isInApp" class="tit">
      没有解决您的问题？<span @click="handleIM">联系客服</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { foundApi } from '~/api'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'Questions',
  components: { Header },
  async asyncData({ $axios, query, redirect }) {
    let detailData = {}
    try {
      const res = await $axios.get(
        foundApi.infoDetail,
        {
          params: { id: query.id, includeField: 'id,title,content' },
        },
        {
          headers: {
            'x-cache-control': 'cache',
          },
        }
      )
      if (res.code === 200) {
        detailData = res.data
      } else {
        redirect('/404')
      }
    } catch (error) {}
    return detailData
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isApplets: (state) => state.app.isApplets,
      isInApp: (state) => state.app.isInApp,
    }),
  },
  methods: {
    handleIM() {
      this.uPIM({
        entranceId: 'STAFF_QUESTION_INFO_HELP_CENTER_CODE',
      })
    },
    uPIM(data = {}) {
      // const { mchUserId, userName, type } = data
      // 如果当前页面在app中，则调用原生IM的方法
      if (this.isInApp) {
        try {
          // 需要判断登陆没有，没有登录就是调用登录
          // await this.getUserInfo()
          this.$appFn.dggOpenOnlineServiceIM(
            {
              entranceId: 'STAFF_QUESTION_INFO_HELP_CENTER_CODE',
            },
            (res) => {
              const { code } = res || {}
              if (code !== 200)
                this.$xToast.show({
                  message: `联系失败`,
                  duration: 1000,
                  forbidClick: true,
                  icon: 'toast_ic_remind',
                })
            }
          )
        } catch (error) {
          console.error('uPIM error:', error)
        }
      }
    },
  },
}
</script>
<style lang="less" scoped>
.page-content {
  font-size: 32px;
  padding-bottom: 40px;
  ::v-deep a {
    color: #4974f5;
  }
  ::v-deep img {
    max-width: 100% !important;
    height: auto;
  }
  .moudle {
    padding: 0 40px;
    display: flex;
    .title-content {
      margin-left: 16px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 40px;
    }
    .text-content {
      margin-left: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 46px;
      margin-top: -4px;
      overflow: hidden;
      word-wrap: break-word;
      word-break: normal;
    }
  }
  .title-box {
    margin: 44px 0 40px 0;
  }
  .tit {
    margin-top: 126px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 70px;
    text-align: center;
    > span {
      color: #4974f5;
    }
  }
}
</style>
