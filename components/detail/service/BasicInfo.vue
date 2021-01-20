<template>
  <div class="basic">
    <h1 class="basic-name">
      {{ operatingData.showName ? operatingData.showName : baseData.name }}
    </h1>
    <div class="basic-label">
      <a v-for="tag in proSalesTag" :key="tag.id" href="javascript:void(0)">{{
        tag.name
      }}</a>
    </div>
    <div class="basic-describe">
      {{ operatingData.productDescribe }}
    </div>
    <div class="basic-price">
      <div>{{ baseData.referencePrice }}元<span>起</span></div>
      <p>
        销量 <span>{{ saleMum }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicInfo',
  props: {
    baseData: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    operatingData: {
      type: Object,
      required: true,
      default: () => {
        return {}
      },
    },
    tagsData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    saleMum() {
      return (
        Number(this.operatingData.defaultSales) +
        Number(this.operatingData.actualSales)
      )
    },
    proSalesTag() {
      return this.tagsData.PRO_SALES_TAG ? this.tagsData.PRO_SALES_TAG : []
    },
  },
}
</script>

<style lang="less" scoped>
.basic {
  background-color: #fff;
  padding: 60px 41px 45px 41px;
  &-name {
    font-size: 44px;
    font-weight: bold;
    color: #222222;
    line-height: 52px;
  }
  &-label {
    display: flex;
    justify-content: left;
    margin-top: 13px;
    flex-wrap: wrap;
    height: 68px;
    overflow: hidden;
    a {
      display: inline-block;
      /*width: 119px;*/
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 5px 8px;
      background: #f0f2f5;
      border-radius: 4px;
      font-size: 22px;
      font-weight: 400;
      color: #5c7499;
      text-align: center;
      margin-right: 12px;
      margin-bottom: 28px;
      display: inline-block;
      height: 42px;
    }
  }
  &-describe {
    height: 76px;
    font-size: 26px;
    font-weight: 400;
    color: #999999;
    line-height: 40px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  &-price {
    margin-top: 47px;
    font-style: normal;
    display: flex;
    justify-content: space-between;
    line-height: 44px;
    p,
    div {
      font-size: 44px;
      font-weight: bold;
      color: #ec5330;
      span {
        font-size: 26px;
        margin-left: 8px;
      }
    }
    p {
      font-size: 24px;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
