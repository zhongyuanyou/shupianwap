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
        <span class="dropdown-menu-content-val">{{ dropdownValue }}</span>
        <my-icon
          class="dropdown-menu-content-img"
          name="sear_ic_open"
          size="0.2rem"
          color="#cccccc"
        ></my-icon>
      </div>
      <sp-popup v-model="dropdownShow" position="bottom">
        <sp-picker
          show-toolbar
          :title="selectTitle"
          :columns="columns"
          :default-index="defaultActive"
          @confirm="handleConfirm"
          @cancel="handleCancel"
      /></sp-popup>
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
  props: {
    index: {
      type: Number,
      default: () => {
        return ''
      },
    },
    title: {
      type: String,
      default: () => {
        return ''
      },
    },
    selectTitle: {
      type: String,
      default: () => {
        return ''
      },
    },
    tabs: {
      type: Array,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {
      dropdownValue: '不限', // 下拉框选中的值
      dropdownShow: false, // 唤起下部弹框
      columns: [], // 数据列表
      defaultActive: 0, // 默认选择下标
      type: 0,
    }
  },
  mounted() {
    // 返回时候数据回显
    const sessionStorageFormData = JSON.parse(
      sessionStorage.getItem('formData')
    )
    if (sessionStorageFormData) {
      this.tabs.forEach((item, index) => {
        this.columns.push(item.name)
      })
      //  办理业务
      if (this.index === 0) {
        const business = sessionStorageFormData.content['办理业务']
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i] === business) {
            this.defaultActive = i
          }
        }
      } else if (this.index === 2) {
        // 公司行业
        const industry = sessionStorageFormData.content['公司行业']
        for (let i = 0; i < this.columns.length; i++) {
          if (this.columns[i] === industry) {
            this.defaultActive = i
          }
        }
      }
    }
  },
  methods: {
    // 唤起下拉菜单的事件
    showDropdownList() {
      this.dropdownShow = true
      if (this.columns.length === 0) {
        this.tabs.forEach((item, index) => {
          this.columns.push(item.name)
        })
      }
    },
    // 点击确定时候的事件
    handleConfirm(value, index) {
      this.dropdownShow = false
      this.dropdownValue = value
      this.defaultActive = index
      this.$emit('dropdownValue', this.dropdownValue, this.index)
    },
    // 点击取消时候的事件
    handleCancel() {
      this.dropdownShow = false
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
  }
  /deep/ .sp-overlay {
    width: @spread-page-width;
    left: 50%;
    right: auto;
    transform: translateX(-@spread-page-width / 2);
  }
}
</style>
