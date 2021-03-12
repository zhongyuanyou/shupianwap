<template>
  <div class="container">
    <div class="container_tp">
      <p class="container_tp_title">包含服务</p>
    </div>
    <div class="container_list">
      <div v-for="(item, index) in 3" :key="index" class="container_list_item">
        <sp-image width="1.2rem" height="1.2rem" fit="cover" lazy-load src="" />
        <div class="content">
          <div class="content_title hide">有限公司注册(工商）</div>
          <div class="content_desc hide">
            新手创业，找专业平台，省心更省钱新手创业，找专页平台
          </div>
          <div class="content_price">3000 <span>元</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'ContainService',
  components: {
    [Image.name]: Image,
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  background-color: #fff;
  padding-top: 44px;
  border-bottom: 24px solid #f8f8f8;
  font-family: PingFang SC;
  font-weight: 400;
  &_tp {
    padding: 0 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_title {
      font-size: 40px;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  &_list {
    margin-top: 10px;
    padding: 0 40px 16px;
    &_item {
      padding: 32px 0;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #f4f4f4;
      &:last-child {
        border-bottom: none;
      }
      .content {
        margin-left: 28px;
        flex: 1;
        min-width: 0;
        &_title {
          color: #222222;
          font-size: 32px;
          font-weight: bold;
        }
        &_desc {
          color: #222222;
          font-size: 22px;
          overflow: hidden;
        }
        &_price {
          font-weight: bold;
          color: #ec5330;
          font-size: 30px;
          margin-top: 16px;
          span {
            font-weight: 400;
            font-size: 22px;
          }
        }
        .hide {
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
