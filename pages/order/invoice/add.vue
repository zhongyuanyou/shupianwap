<template>
  <div class="invoice_add">
    <sp-sticky>
      <Header class="my-header" title="添加发票抬头"></Header>
    </sp-sticky>
    <div class="card">
      <div class="invoice_info">
        <sp-cell-group>
          <sp-field label="发票类型">
            <template #input>
              <div class="options">
                <sp-button class="btn active" size="small" type="primary">
                  电子普通发票
                </sp-button>
              </div>
            </template>
          </sp-field>

          <sp-field label="发票类型">
            <template #input>
              <div class="options">
                <sp-button
                  class="btn"
                  :class="{ active: type === 1 }"
                  size="small"
                  type="primary"
                  @click="type = 1"
                >
                  个人
                </sp-button>
                <sp-button
                  class="btn"
                  :class="{ active: type === 2 }"
                  size="small"
                  type="primary"
                  @click="type = 2"
                >
                  单位
                </sp-button>
              </div>
            </template>
          </sp-field>

          <sp-field
            v-if="type == 1"
            v-model="formData.username"
            required
            label="发票抬头"
            placeholder="请填写发票抬头"
          />

          <div v-if="type == 2">
            <sp-field
              v-model="formData.username"
              required
              label="单位名称"
              placeholder="请填写单位名称"
            />
            <sp-field
              v-model="formData.username"
              required
              label="纳税人识别号"
              placeholder="请填写纳税人识别号"
            />
            <sp-field
              v-model="formData.username"
              label="注册地址"
              placeholder="请填写注册地址"
            />
            <sp-field
              v-model="formData.username"
              label="注册电话"
              placeholder="请填写注册电话"
            />
            <sp-field
              v-model="formData.username"
              label="开户银行"
              placeholder="请填写开户银行"
            />
            <sp-field
              v-model="formData.username"
              label="银行账号"
              placeholder="请填写银行账号"
            />
          </div>
        </sp-cell-group>
      </div>
    </div>
    <div class="card">
      <sp-field label="设为默认">
        <template #input>
          <div class="options">每次开票时会默认填写抬头信息</div>
        </template>
        <template #button>
          <sp-switch v-model="checked" />
        </template>
      </sp-field>
    </div>
    <sp-bottombar safe-area-inset-bottom>
      <sp-bottombar-button type="primary" text="添加发票抬头" />
    </sp-bottombar>

    <Loading-center v-show="loading" />
  </div>
</template>
<script>
import {
  Button,
  Toast,
  TopNavBar,
  Uploader,
  Bottombar,
  Sticky,
  BottombarButton,
  WorkTab,
  WorkTabs,
  Empty,
  Field,
  Cell,
  CellGroup,
  Switch,
} from '@chipspc/vant-dgg'
import { mapState } from 'vuex'

import Header from '@/components/common/head/header.vue'

import LoadingCenter from '@/components/common/loading/LoadingCenter.vue'

export default {
  layout: 'keepAlive',
  name: 'Invoice',
  components: {
    LoadingCenter,
    Header,
    [WorkTab.name]: WorkTab,
    [WorkTabs.name]: WorkTabs,
    [Sticky.name]: Sticky,
    [Empty.name]: Empty,
    [Button.name]: Button,
    [Bottombar.name]: Bottombar,
    [BottombarButton.name]: BottombarButton,
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Cell.name]: Cell,
    [Switch.name]: Switch,
  },
  data() {
    return {
      loading: false, // 加载效果状态
      type: 1,
      formData: { username: '' },
      checked: true,
    }
  },
  methods: {
    // back() {
    //   if (this.isInApp) {
    //     this.$appFn.dggWebGoBack((res) => {})
    //     return
    //   }
    //   this.$router.back()
    // },
  },
}
</script>

<style lang="less" scoped>
.invoice_add {
  background: #f5f5f5;
  padding: 0 0 170px;
  min-height: 100vh;
  .card {
    background: #fff;
    margin-bottom: 20px;
    padding: 40px;

    .options {
      // padding-bottom: 20px;
      .btn {
        margin-right: 32px;
      }
    }
    .options .btn::v-deep.sp-button--primary {
      min-width: 152px;
      background: #f5f5f5;
      color: #999999;

      border-radius: 8px;
      border: none;

      font-size: 26px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 26px;
    }
    .options .btn.active::v-deep.sp-button--primary {
      background: #f2f5ff;
      color: #4974f5;
    }
    .des {
      font-size: 22px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 30px;
    }
    .tips {
      font-size: 24px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #222222;
      line-height: 36px;
    }

    .invoice_info {
    }
  }
}
</style>
