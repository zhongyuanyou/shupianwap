<template>
  <div class="dropdown-all">
    <div class="content-item-title">{{ title }}</div>
    <div class="dropdown-menu">
      <div
        v-md-map
        v-md:webClick
        data-name="工商聚合页_表单_我需要"
        class="dropdown-menu-content"
        @click="showDropdownList"
      >
        <span class="dropdown-menu-content-prefix">我需要</span>
        <span class="dropdown-menu-content-val">{{ dropdownValue }}</span>
        <my-icon
          class="dropdown-menu-content-img"
          name="sear_ic_open"
          size="0.2rem"
          color="#cccccc"
        ></my-icon>
      </div>
      <sp-popup v-model="dropdownMenuIsShow" round position="bottom">
        <sp-picker
          title="选择"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </sp-popup>
    </div>
  </div>
</template>

<script>
import { Picker, Popup } from '@chipspc/vant-dgg'

export default {
  name: 'Dropdown',
  components: {
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  data() {
    return {
      title: '您公司的主营业务是什么',
      columns: [
        '公司注册',
        '工商变更',
        '代理记账',
        '印章刻制',
        '银行服务',
        '许可证办理',
        '其他服务',
      ],
      // 下拉
      dropList: [
        { id: 1, name: '公司注册', color: '#5a79e8' },
        { id: 2, name: '工商变更', color: '#222222' },
        { id: 3, name: '代理记账', color: '#222222' },
        { id: 4, name: '印章刻制', color: '#222222' },
        { id: 5, name: '银行服务', color: '#222222' },
        { id: 6, name: '许可证办理', color: '#222222' },
        { id: 7, name: '其他服务', color: '#222222' },
      ],
      dropdownValue: '',
      dropdownMenuIsShow: false,
    }
  },
  methods: {
    // @--下拉
    onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.dropdownMenuIsShow = false
      this.dropdownValue = item
      this.dropList.forEach((obj) => {
        if (obj.name === item.name) {
          obj.color = '#5a79e8'
        } else {
          obj.color = '#222222'
        }
      })
    },
    onCancel() {
      this.dropdownMenuIsShow = false
    },
    onConfirm(value, index) {
      this.dropdownMenuIsShow = false
      this.dropdownValue = value
    },
    showDropdownList() {
      this.dropdownMenuIsShow = true
    },
  },
}
</script>

<style lang="less" scoped>
.dropdown-all {
  margin-bottom: 64px;
}
.content-item-title {
  height: 34px;
  font-size: 36px;
  font-weight: bold;
  color: #1a1a1a;
  margin-bottom: 32px;
}
.dropdown-menu {
  width: 100%;
  border-radius: 8px;
  .dropdown-menu-content {
    width: 100%;
    display: flex;
    height: 72px;
    align-items: center;
    position: relative;
    background: #ffffff;
    opacity: 0.5;
    border: 1px solid #cdcdcd;
    border-radius: 4px;
    padding: 0 24px;
    .dropdown-menu-content-prefix {
      flex: none;
      font-size: 28px;
      font-weight: 400;
      color: #1a1a1a;
      margin-right: 33px;
    }
    .dropdown-menu-content-val {
      flex: none;
      font-size: 28px;
      font-weight: bold;
      color: #1a1a1a;
    }
    .dropdown-menu-content-img {
      flex: none;
      position: absolute;
      right: 24px;
    }
  }
  /deep/ .sp-popup--bottom {
    width: @spread-page-width;
    left: 50%;
    right: auto;
    transform: translateX(-@spread-page-width / 2);
    //transform: translateX(-126px); // 该属性因为组件样式未知bug，导致左侧出来一部分。且距离是一直固定是63px，不能转成rem
  }
  /deep/ .sp-overlay {
    width: @spread-page-width;
    left: 50%;
    right: auto;
    transform: translateX(-@spread-page-width / 2);
  }
}
</style>
