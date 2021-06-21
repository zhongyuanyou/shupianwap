<template>
  <div class="history_invoice">
    <div class="card">
      <div class="card_header">普通发票抬头-单位</div>
      <div v-for="item of list" :key="item.id" class="card_content">
        <sp-cell center title="单元格" label="描述信息">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <sp-tag type="danger">默认</sp-tag>
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
    <div class="card">
      <div class="card_header">普通发票抬头-个人</div>
      <div v-for="item of list" :key="item.id" class="card_content">
        <sp-cell center title="单元格" label="描述信息">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <sp-tag type="danger">默认</sp-tag>
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
    <div class="card">
      <div class="card_header">普通发票抬头-个人</div>
      <div v-for="item of list" :key="item.id" class="card_content">
        <sp-cell center title="单元格" label="描述信息">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <sp-tag type="danger">默认</sp-tag>
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
    <div class="card">
      <div class="card_header">普通发票抬头-个人</div>
      <div v-for="item of list" :key="item.id" class="card_content">
        <sp-cell center title="单元格" label="描述信息">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <sp-tag type="danger">默认</sp-tag>
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
    <div class="card">
      <div class="card_header">普通发票抬头-个人</div>
      <div v-for="item of list" :key="item.id" class="card_content">
        <sp-cell center title="单元格" label="描述信息">
          <template #title>
            <span class="custom-title">{{ item.name }}</span>
            <sp-tag type="danger">默认</sp-tag>
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
  data() {
    return {
      list: [
        {
          number: 1,
          name: '11111111111111111111111111111111111111111111111111111111',
          price: 22200,
          time: '2020-20-20 13:45:78',
        },
        {
          number: 2,
          name: '11111111111111111111111111111111111111111111111111111111',
          price: 22200,
          time: '2020-20-20 13:45:78',
        },
      ],
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.history_invoice {
  background: #f5f5f5;
  overflow: hidden;
  padding: 0 0 170px;

  .flex {
    display: flex;
  }
  .flex_1 {
    flex: 1;
  }

  .card {
    margin-top: 20px;
    background: #ffffff;
    .card_header {
      padding: 32px 40px;
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #222222;
      line-height: 30px;
      border-bottom: 1px solid #f4f4f4;
    }
    .card_content {
      padding: 0px 40px;
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

    .card_footer {
    }
  }
}
</style>
