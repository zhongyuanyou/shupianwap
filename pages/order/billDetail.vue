<template>
  <div class="page">
    <Header title="账单明细" @leftClickFuc="onClickLeft" />
    <div class="list">
      <div
        v-for="(item, index) in goodsList"
        :key="index"
        class="item"
        @click="toDetail"
      >
        <div class="left">
          <p class="goods-name">
            {{ item.name }}
          </p>
          <p class="goods-skus">
            {{ item.skus }}
          </p>
        </div>
        <div class="right">
          {{ item.price }}元
          <my-icon
            name="list_ic_next"
            size="0.24rem"
            color="rgba(204, 204, 204, 1)"
          >
          </my-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 服务商品账单明细
import Header from '@/components/common/head/header'
export default {
  components: {
    Header,
  },
  data() {
    return {
      goodsList: [
        {
          name: '商标注册',
          skus: '武侯区；无注册地址；认缴申请武侯区；武侯区开花13131414',
          price: 300,
        },
        {
          name: '商标注册2',
          skus: '武侯区；无注册地址；认缴申请武侯区；武侯区开花13131414',
          price: 300,
        },
        {
          name: '商标注册3',
          skus: '武侯区；无注册地址；认缴申请武侯区；武侯区开花13131414',
          price: 300,
        },
      ],
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back(-1)
    },
    toDetail() {
      console.log(':111')
      this.$router.push('/order/nodeDetail')
    },
  },
}
</script>

<style lang="less" scoped>
.page {
  min-height: 100vh;
  background: #f4f4f4;
  .list {
    background: white;
    padding: 0 40px;
    .item {
      padding: 40px 0;
      display: flex;
      border-bottom: 1px solid #f4f4f4;
      .left {
        flex: 1;
        .goods-name {
          font-size: 32px;
          font-weight: 600;
          color: #222;
          margin-bottom: 10px;
          .textOverflow(1);
        }
        .goods-skus {
          font-size: 24px;
          color: #999;
          .textOverflow(1);
        }
      }
      .right {
        padding-top: 30px;
        width: 170px;
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #ec5330;
        line-height: 48px;
        text-align: right;
      }
    }
  }
}
</style>
