<template>
  <div class="permit-handling">
    <TopLocation />
    <div class="company-select">
      <!-- S您需要办理的许可证业务 -->
      <CompanySelec
        :columns="actionsServe"
        title-name="您需要办理哪项业务的变更服务？"
        @onSelect="onSelectServe"
      />
      <!-- E您需要办理的许可证业务 -->
      <!-- S主要决策人 -->
      <SelectDesired
        :select-list="selectActive"
        title-name="您是否为主要决策人？"
        @onSelectActive="onDistrict"
      />
      <!-- E主要决策人 -->
      <!-- S办理时间 -->
      <SelectDesired
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
import { TopNavBar, NavSearch, Icon, Toast, Button } from '@chipspc/vant-dgg'
import TopLocation from '@/components/spread/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/companyAlteration/SelectDesired'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
  },
  data() {
    return {
      // 选择变更服务
      actionsServe: [
        '建造工程',
        '铁路工程',
        '港口和航道工程',
        '水利水电工程',
        '电力工程',
        '港口和航道工程',
        '水利水电工程',
        '电力工程',
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
    }
  },
  methods: {
    onSelectServe(val) {
      // 变更服务
      this.xkzlz = val
      console.log(val)
    },
    onDistrict(item) {
      // 是否决策人
      this.isDecision = item.name
      console.log(item)
    },
    onTransact(item) {
      // 办理时间
      this.handlingTime = item.name
      console.log(item)
    },
    onButton() {
      const obj = JSON.stringify({
        content: [
          { name: 'xkz1', value: `主要决策人：${this.isDecision}` },
          { name: 'xkz2', value: `办理时间：${this.handlingTime}` },
        ],
        param: [
          { name: 'type', value: 'xkx' },
          { name: 'xkzlx', value: this.permission },
        ],
      })
      localStorage.setItem('currentGroupId', obj)
      this.$router.push({ path: '/spread/second' })
    },
  },
}
</script>
<style lang="less" scoped>
.permit-handling {
  font-size: 36px;
  .button {
    padding: 24px 40px;
    margin-top: 174px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
  }
}
</style>
