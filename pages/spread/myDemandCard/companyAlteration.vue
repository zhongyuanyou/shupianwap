<template>
  <div class="company-alteration">
    <Header v-if="!isInApp" ref="headerRef" title="轻松找服务" />
    <TopLocation @onCity="onCity" />
    <div class="company-select">
      <!-- S您需要办理哪项业务的变更服务 -->
      <CompanySelec
        ref="businessRef"
        :columns="actionsServe"
        title-name="您需要办理哪项业务的变更服务？"
        @onSelect="onSelectServe"
      />
      <!-- E您需要办理哪项业务的变更服务 -->
      <!-- S您公司的注册在哪个区？ -->
      <CompanySelec
        ref="districtRef"
        :columns="actionsRegion"
        title-name="您公司的注册在哪个区？"
        @onSelect="onSelectDistrict"
      />
      <!-- E您公司的注册在哪个区？ -->
      <!-- S您的身份？ -->
      <SelectDesired
        ref="identityRef"
        :select-list="selectActive"
        title-name="你的身份？"
        @onSelectActive="onDistrict"
      />
      <!-- E您的身份？ -->
      <!-- S办理 -->
      <SelectDesired
        ref="timeRef"
        :select-list="selectTransact"
        title-name="您打算什么时候办理？"
        @onSelectActive="onTransact"
      />
      <!-- E办理 -->
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
import { mapState } from 'vuex'
import TopLocation from '@/components/spread/myDemandCard/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/myDemandCard/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/myDemandCard/companyAlteration/SelectDesired'
import { planner, dict } from '@/api'
import Header from '@/components/common/head/header'
export default {
  layout: 'keepAlive',
  name: 'CompanyAlteration',
  components: {
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
    Header,
  },

  data() {
    return {
      // 选择服务
      actionsServe: [
        '法人变更',
        '股东变更',
        '任职变更',
        '公司名称变更',
        '经营范围变更',
        '跨区地址变更',
        '同区地址变更',
        '注册资金增加变更',
        '注册资金减少变更',
        '公司类型变更',
        '个体变更',
        '股权变更',
        '认缴年限变更',
        '其他变更',
      ],
      // 区域
      actionsRegion: [],
      // 身份
      selectActive: [
        {
          name: '经办人',
        },
        {
          name: '法人',
        },
        {
          name: '股东',
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
      // 变更服务
      permission: '不限',
      // 那个区域
      district: '不限',
      // 你的身份
      identity: '经办人',
      // 办理时间
      handlingTime: '1个月内',
      // 城市
      cityVal: {
        code: '510100',
        name: '成都市',
      },
    }
  },
  computed: {
    isCityChange() {
      let num = 0
      let isHave = false
      let { district } = this
      const regionLength = this.actionsRegion.length
      if (district && district !== '不限' && regionLength) {
        for (let i = 0; i < this.actionsRegion.length; i++) {
          if (this.actionsRegion[i] === district) {
            num = i
            isHave = true
            break
          }
        }
        // 若之前选择的区域在当前区域列表中未找到，清空数据，取消回显
        if (!isHave) {
          district = '不限'
        }
      }
      return {
        num,
        district,
      }
    },
    ...mapState({
      isInApp: (state) => state.app.isInApp,
    }),
  },
  watch: {
    isCityChange: {
      handler(newVal) {
        this.$refs.districtRef.defaultIndex = newVal.num
        this.$refs.districtRef.title = newVal.district
      },
    },
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
        this.permission = sessionStorageFormData.content.bgxm || this.permission
        this.$refs.businessRef.title = this.permission
        if (this.permission && this.permission !== '不限') {
          for (let index = 0; index < this.actionsServe.length; index++) {
            if (this.actionsServe[index] === this.permission) {
              this.$refs.businessRef.defaultIndex = index
            }
          }
        }
        this.district =
          sessionStorageFormData.content['注册区域'] || this.district
        this.$refs.districtRef.title = this.district
        this.identity = sessionStorageFormData.content['身份'] || this.identity
        for (let index = 0; index < this.selectActive.length; index++) {
          if (this.identity === this.selectActive[index].name) {
            this.$refs.identityRef.selectActive = index
            break
          }
        }
        this.handlingTime =
          sessionStorageFormData.content['办理时间'] || this.handlingTime
        for (let index = 0; index < this.selectTransact.length; index++) {
          if (this.handlingTime === this.selectTransact[index].name) {
            this.$refs.timeRef.selectActive = index
            break
          }
        }
      })
    }
  },
  methods: {
    // 城市
    onCity(val) {
      if (val.code !== undefined) this.cityVal = val
      this.getRegionList(this.cityVal.code)
    },
    onSelectServe(val) {
      // 变更服务
      this.permission = val
    },
    onSelectDistrict(val) {
      // 区域
      this.district = val
    },
    onDistrict(item) {
      // 注册在哪个区
      this.identity = item.name
    },
    onTransact(item) {
      // 办理时间
      this.handlingTime = item.name
    },
    onButton() {
      let content = {
        bgxm: this.permission,
        注册区域: this.district,
        身份: this.identity,
        办理时间: this.handlingTime,
      }
      const sessionStorageFormData = JSON.parse(
        sessionStorage.getItem('formData')
      )
      // 合并两个页面之间缓存的数据
      if (sessionStorageFormData) {
        content = Object.assign(sessionStorageFormData.content, content)
      }
      const obj = JSON.stringify({
        type: 'gsbg',
        url: window.location.href,
        content,
      })
      sessionStorage.setItem('formData', obj)
      this.$router.push({ path: '/spread/myDemandCard/second' })
    },
    // 获取区域
    async getRegionList(code) {
      try {
        const data = await dict.findCmsTier({ axios: this.$axios }, { code })
        if (Array.isArray(data) && data.length) {
          const cityData = []
          data.forEach((resultArray) => {
            cityData.push(resultArray.name)
          })
          this.actionsRegion = cityData
        }
        return
      } catch (error) {
        console.error('getRegionList:', error)
        return Promise.reject(error)
      }
    },
  },
  head() {
    return {
      title: '工商变更',
    }
  },
}
</script>
<style lang="less" scoped>
.company-alteration {
  width: @spread-page-width;
  margin: 0 auto;
  font-size: 36px;
  background-color: #fff;
  .button {
    padding: 24px 40px;
    margin-top: 32px;
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
