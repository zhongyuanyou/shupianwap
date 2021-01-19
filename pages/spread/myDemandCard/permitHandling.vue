<template>
  <div class="permit-handling">
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
    <TopLocation @onCity="onCity" />
    <div class="company-select">
      <!-- S您需要办理的许可证业务 -->
      <CompanySelec
        ref="companySelec"
        :columns="actionsServe"
        title-name="您需要办理的许可证业务是什么？"
        @onSelect="onSelectServe"
      />
      <!-- E您需要办理的许可证业务 -->
      <!-- S主要决策人 -->
      <SelectDesired
        ref="select1"
        :select-list="selectActive"
        title-name="您是否为主要决策人？"
        @onSelectActive="onDistrict"
      />
      <!-- E主要决策人 -->
      <!-- S办理时间 -->
      <SelectDesired
        ref="select2"
        :select-list="selectTransact"
        title-name="您打算什么时候办理？"
        @onSelectActive="onTransact"
      />
      <!-- E办理时间 -->
      <div class="button">
        <sp-button type="primary" size="large" @click="onButton"
          >下一步(1/2)</sp-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from '@chipspc/vant-dgg'
import { mapState, mapActions } from 'vuex'
import TopLocation from '@/components/spread/myDemandCard/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/myDemandCard/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/myDemandCard/companyAlteration/SelectDesired'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'PermitHandling',
  components: {
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
    Header,
  },
  data() {
    return {
      // 选择变更服务
      actionsServe: [
        '卫生许可证',
        '道路运输许可证',
        '医疗器械许可证',
        '进出口许可证',
        '食品通道许可证 HOT',
        '餐饮服务许可证',
        '医疗器械许可二类备案',
        '其他许可证',
      ],
      // 是否决策人
      selectActive: [
        {
          name: '是',
        },
        {
          name: '否',
        },
      ],
      // 办理
      selectTransact: [
        {
          name: '一个月内',
        },
        {
          name: '两个月内',
        },
        {
          name: '半年内',
        },
        {
          name: '1年内',
        },
      ],
      // 变更业务
      permission: '不限',
      // 是否决策人
      isDecision: '是',
      // 办理时间
      handlingTime: '一个月内',

      // 城市
      cityVal: {
        code: '510100',
        name: '成都市',
      },
    }
  },
  computed: {
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费帮找页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性

    // 数据回显
    const sessionStorageFormData = JSON.parse(
      sessionStorage.getItem('formData')
    )
    if (sessionStorageFormData) {
      this.$nextTick(() => {
        console.log(sessionStorageFormData)
        this.$refs.companySelec.title = sessionStorageFormData.content.xkzlx
        this.permission = sessionStorageFormData.content.xkzlx
        this.isDecision = sessionStorageFormData.content['主要决策人']
        for (let index = 0; index < this.selectActive.length; index++) {
          if (this.selectActive[index].name === this.isDecision) {
            this.$refs.select1.selectActive = index
            break
          }
        }
        this.handlingTime = sessionStorageFormData.content['办理时间']
        for (let index = 0; index < this.selectTransact.length; index++) {
          if (this.selectTransact[index].name === this.handlingTime) {
            this.$refs.select2.selectActive = index
            break
          }
        }
      })
    }
  },
  methods: {
    // 城市
    onCity(val) {
      this.cityVal = val
    },
    onSelectServe(val) {
      // 变更服务
      this.permission = val
    },
    onDistrict(item) {
      // 是否决策人
      this.isDecision = item.name
    },
    onTransact(item) {
      // 办理时间
      this.handlingTime = item.name
    },
    onButton() {
      const data = {
        type: 'xkx',
        url: window.location.href,
        content: {
          xkzlx: this.permission,
          主要决策人: this.isDecision,
          办理时间: this.handlingTime,
        },
      }
      const sessionStorageFormData = JSON.parse(
        sessionStorage.getItem('formData')
      )
      // 合并两个页面之间缓存的数据
      if (sessionStorageFormData) {
        data.content = Object.assign(
          sessionStorageFormData.content,
          data.content
        )
      }
      // 本地存储数据
      const obj = JSON.stringify(data)
      sessionStorage.setItem('formData', obj)
      this.$router.push({ path: '/spread/myDemandCard/second' })
    },
  },
  head() {
    return {
      title: '许可办理',
    }
  },
}
</script>
<style lang="less" scoped>
.permit-handling {
  width: @spread-page-width;
  margin: 0 auto;
  font-size: 36px;
  background-color: #fff;
  .button {
    padding: 24px 40px;
    margin-top: 174px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    .sp-button {
      border-radius: 8px;
    }
  }
}
</style>
