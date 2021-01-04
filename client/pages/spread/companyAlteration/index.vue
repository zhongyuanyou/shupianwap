<template>
  <div class="company-register">
    <TopLocation />
    <div class="company-select">
      <!-- S您需要办理哪项业务的变更服务 -->
      <CompanySelec
        :actions="actionsServe"
        titleName="您需要办理哪项业务的变更服务？"
        @onSelect="onSelectServe"
      />
      <!-- E您需要办理哪项业务的变更服务 -->
      <!-- S您公司的注册在哪个区？ -->
      <CompanySelec
        :actions="actionsRegion"
        titleName="您公司的注册在哪个区？"
      />
      <!-- S您公司的注册在哪个区？ -->
      <SelectDesired
        :selectList="selectActive"
        titleName="你的身份？"
        @onSelectActive="onDistrict"
      />
      <!-- E您公司的注册在哪个区？ -->
      <!-- S办理 -->
      <SelectDesired
        :selectList="selectTransact"
        titleName="您打算什么时候办理？"
        @onSelectActive="onTransact"
      />
      <!-- E办理 -->
      <button class="form-button">下一步(1/2)</button>
      <div class="button">
        <sp-button type="primary" size="large">大号按钮</sp-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  TopNavBar,
  NavSearch,
  Icon,
  Toast,
  Swipe,
  SwipeItem,
  Lazyload,
  Image,
  Button,
} from '@chipspc/vant-dgg'
import TopLocation from '@/components/spread/companyAlteration/TopLocation'
import CompanySelec from '@/components/spread/companyAlteration/CompanySelect'
import SelectDesired from '@/components/spread/companyAlteration/SelectDesired'
export default {
  components: {
    [TopNavBar.name]: TopNavBar,
    [NavSearch.name]: NavSearch,
    [Icon.name]: Icon,
    [Toast.name]: Toast,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [Image.name]: Image,
    [Button.name]: Button,
    TopLocation,
    CompanySelec,
    SelectDesired,
  },
  data() {
    return {
      // 选择服务
      actionsServe: [
        { name: '选项一*' },
        { name: '选项二*' },
        { name: '选项三*' },
      ],
      // 变更
      actionsRegion: [
        { name: '区域一' },
        { name: '区域二' },
        { name: '区域三' },
      ],
      // 区域
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
    }
  },
  methods: {
    onSelectServe(val) {
      // 变更服务
      console.log(val)
    },
    onDistrict(item) {
      // 注册在哪个区
      console.log(item)
    },
    onTransact(item) {
      // 办理时间
      console.log(item)
    },
  },
}
</script>
<style lang="less" scoped>
.company-register {
  font-size: 36px;
}
</style>
