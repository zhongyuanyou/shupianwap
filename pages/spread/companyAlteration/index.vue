<template>
  <div class="company-alteration">
    <TopLocation @onCity="onCity" />
    <div class="company-select">
      <!-- S您需要办理哪项业务的变更服务 -->
      <CompanySelec
        :columns="actionsServe"
        title-name="您需要办理哪项业务的变更服务？"
        @onSelect="onSelectServe"
      />
      <!-- E您需要办理哪项业务的变更服务 -->
      <!-- S您公司的注册在哪个区？ -->
      <CompanySelec
        :columns="actionsRegion"
        title-name="您公司的注册在哪个区？"
        @onSelect="onSelectDistrict"
      />
      <!-- E您公司的注册在哪个区？ -->
      <!-- S您的身份？ -->
      <SelectDesired
        :select-list="selectActive"
        title-name="你的身份？"
        @onSelectActive="onDistrict"
      />
      <!-- E您的身份？ -->
      <!-- S办理 -->
      <SelectDesired
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
import TopLocation from '@/components/spread/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/companyAlteration/SelectDesired'
import { planner, dict } from '@/api'
export default {
  components: {
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
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
      actionsRegion: [
        '锦江区',
        '青羊区',
        '金牛区',
        '武侯区',
        '成华区',
        '龙泉驿区',
        '青白江区',
        '新都区',
        '温江区',
        '金堂县',
        '双流县',
        '郫都区',
        '大邑县',
        '蒲江县',
        '新津县',
        '都江堰市',
        '彭州市',
        '邛崃市',
        '崇州市',
        '高新区',
        '天府新区',
      ],
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
  mounted() {
    const param = {
      platform_type: 'H5', // 平台类型：App，H5，Web
      app_name: '薯片wap端', // 应用名称
      product_line: '免费帮找页',
      current_url: location.href,
      referrer: document.referrer,
    }
    window.sensors.registerPage(param) // 设置公共属性
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
      const obj = JSON.stringify({
        type: 'gsbg',
        bgxm: this.permission,
        content: {
          注册区域: this.district,
          身份: this.identity,
          办理时间: this.handlingTime,
        },
      })
      localStorage.setItem('data', obj)
      this.$router.push({ path: '/spread/second' })
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
