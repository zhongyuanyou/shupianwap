<template>
  <div class="invoice_head_management">
    <div v-for="(show_list, index) of ShowList" :key="index" class="card">
      <div class="card_header">{{ show_list.title }}</div>
      <div
        v-for="item of show_list.list"
        :key="item.id"
        class="card_content"
        @click="toHeadEdit(item)"
      >
        <sp-cell center :label="item.dutyParagraph || ''">
          <template #title>
            <span class="custom-title">{{ item.invoiceHead }}</span>
            <sp-tag
              v-if="item.defaultHead === 1"
              class="custom-tag"
              type="danger"
              >默认</sp-tag
            >
          </template>
          <template #label>
            <span class="custom-label">{{ item.dutyParagraph }}</span>
          </template>

          <template #right-icon>
            <my-icon
              name="per_ic_addeditor"
              size="0.28rem"
              color="#222222"
              class="myIcon"
            />
          </template>
        </sp-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { Image, Button, Cell, Tag } from '@chipspc/vant-dgg'
export default {
  components: {
    [Image.name]: Image,
    [Button.name]: Button,
    [Cell.name]: Cell,
    [Tag.name]: Tag,
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      // 发票类型
      InvoiceType: {
        ORDINARY: '电子普通发票',
        SPECIAL: '增值税专用发票 ',
      },
      HeadType: {
        PERSONAL: '个人',
        COMPANY: '单位',
      },
    }
  },
  computed: {
    ShowList() {
      const ORDINARY_COMPANY = {
        title: '电子普通发票-公司',
        list: [],
      }
      const SPECIAL_COMPANY = {
        title: '增值税专用发票',
        list: [],
      }
      const ORDINARY_PERSONAL = {
        title: '电子普通发票-个人',
        list: [],
      }

      ORDINARY_COMPANY.list = this.list.filter((item) => {
        return item.headType === 'COMPANY' && item.type === 'ORDINARY'
      })
      SPECIAL_COMPANY.list = this.list.filter((item) => {
        return item.headType === 'COMPANY' && item.type === 'SPECIAL'
      })
      ORDINARY_PERSONAL.list = this.list.filter((item) => {
        return item.headType === 'PERSONAL' && item.type === 'ORDINARY'
      })
      const arr = []

      ORDINARY_COMPANY.list.length > 0 && arr.push(ORDINARY_COMPANY)
      SPECIAL_COMPANY.list.length > 0 && arr.push(SPECIAL_COMPANY)
      ORDINARY_PERSONAL.list.length > 0 && arr.push(ORDINARY_PERSONAL)

      return arr
    },
  },
  methods: {
    toHeadEdit(head) {
      this.$router.push({
        path: '/order/invoice/headEdit',
        query: {
          id: head.id,
        },
      })
    },
  },
}
</script>

<style lang="less" scoped>
.invoice_head_management {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 170px;

  .card {
    margin-top: 20px;
    background: #ffffff;
    .card_header {
      padding: 32px 40px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #222222;
      line-height: 30px;
      border-bottom: 1px solid #f4f4f4;
    }
    .card_content {
      padding: 0px 40px;
      .custom-title {
        font-family: PingFangSC-Regular;
        font-size: 30px;
        color: #222222;
        line-height: 30px;
      }
      .custom-tag {
        font-family: PingFangSC-Regular;
        // font-size: 20px;
        color: #ffffff;
        letter-spacing: 0;

        // height: 28px;
      }
      ::v-deep .sp-cell {
        padding: 32px 0;
        border-top: 1px solid #f4f4f4;
      }
    }
    & > div:nth-child(2) {
      ::v-deep .sp-cell {
        border-top: 0;
      }
    }
  }
}
</style>
