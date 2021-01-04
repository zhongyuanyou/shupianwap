<template>
  <div class="company-register">
    <TopLocation />
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
import { TopNavBar, NavSearch, Button } from '@chipspc/vant-dgg'
import TopLocation from '@/components/spread/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/companyAlteration/SelectDesired'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
  },
  data() {
    return {
      // 选择服务
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
      // 区域
      actionsRegion: [
        '杭州',
        '宁波',
        '温州',
        '绍兴',
        '湖州',
        '嘉兴',
        '金华',
        '衢州',
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
    }
  },
  methods: {
    onSelectServe(val) {
      // 变更服务
      this.permission = val
      console.log(val)
    },
    onSelectDistrict(val) {
      // 区域
      this.district = val
      console.log(val)
    },
    onDistrict(item) {
      // 注册在哪个区
      this.identity = item.name
      console.log(item)
    },
    onTransact(item) {
      // 办理时间
      this.handlingTime = item.name
      console.log(item)
    },
    onButton() {
      // console.log(
      //   this.permission,
      //   this.district,
      //   this.identity,
      //   this.handlingTime
      // )
      const obj = JSON.stringify({
        content: [
          { name: 'gsbg1', value: `注册区域：${this.district}` },
          { name: 'gsbg2', value: `身份：${this.identity}` },
          { name: 'gsbg3', value: `办理时间：${this.identity}` },
        ],
        param: [
          { name: 'type', value: 'gsbg' },
          { name: 'bgxm', value: this.permission },
        ],
      })
      localStorage.setItem('currentGroupId', obj)
      this.$router.push({ path: '/spread/second' })
    },
  },
}
</script>
<style lang="less" scoped>
.company-register {
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
