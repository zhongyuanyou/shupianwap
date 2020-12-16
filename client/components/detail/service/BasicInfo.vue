<template>
  <div class="basic">
    <h1 class="basic-name">{{ baseData.name }}</h1>
    <div class="basic-label">
      <a href="javascript:void(0)">1对1服务</a>
      <a href="javascript:void(0)">视频看房</a>
      <a href="javascript:void(0)">视频看房</a>
    </div>
    <div class="basic-describe">
      {{ baseData.productDescription }}
    </div>
    <div class="basic-price">
      <em>{{ baseData.referencePrice }}<span>起</span></em>
      <i
        >销量 <span>{{ saleMum }}</span></i
      >
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
  },
}
</script>

<style lang="less" scoped>
.basic {
  background-color: #fff;
  padding: 63px 41px 47px 41px;
  &-name {
    font-size: 44px;
    font-weight: bold;
    color: #222222;
    line-height: 52px;
  }
  &-label {
    display: flex;
    justify-content: left;
    margin-top: 15px;
    margin-bottom: 29px;
    a {
      display: inline-block;
      padding: 5px 8px;
      background: #f0f2f5;
      border-radius: 4px;
      font-size: 22px;
      font-weight: 400;
      color: #5c7499;
      text-align: center;
      margin-right: 12px;
    }
  }
  &-describe {
    font-size: 26px;
    font-weight: 400;
    color: #999999;
    line-height: 38px;
  }
  &-price {
    margin-top: 53px;
    font-style: normal;
    display: flex;
    justify-content: space-between;
    line-height: 52px;
    i,
    em {
      font-style: normal;
    }
    em {
      font-size: 44px;
      font-weight: bold;
      color: #ec5330;
      span {
        font-size: 26px;
        margin-left: 8px;
      }
    }
    i {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #999999;
    }
  }
}
</style>
