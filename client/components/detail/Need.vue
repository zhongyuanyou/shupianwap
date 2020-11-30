<template>
  <div class="need">
    <p class="need_title">猜你需要</p>
    <div v-for="item in 3" :key="item" class="need_item">
      <div class="need_item_img">
        <sp-image
          width="1.6rem"
          height="1.6rem"
          fit="cover"
          radius="0.04rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </div>
      <div class="need_item_rt">
        <p class="title">成都市网络信息科技有限公司</p>
        <div class="label">
          <span v-for="(item, index) in label" :key="index">{{
            `${item}${index == label.length - 1 ? '' : '|'}`
          }}</span>
        </div>
        <div class="tags">
          <div v-for="(item, index) in tags" :key="index" class="tags_item">
            {{ item }}
          </div>
        </div>
        <p class="money">4.25元</p>
      </div>
    </div>
  </div>
</template>

<script>
import { Image } from '@chipspc/vant-dgg'
export default {
  name: 'Need',
  components: {
    [Image.name]: Image,
  },
  data() {
    return {
      label: ['四川成都', '2025到期', '有安许证'],
      tags: ['公司干净', '总包公司', '市政三级'],
    }
  },
}
</script>

<style lang="less" scoped>
.need {
  background-color: #fff;
  padding: 48px 40px 0 40px;
  &_title {
    font-size: 40px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    margin-bottom: 24px;
  }
  &_item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    padding: 40px 0;
    border-bottom: 1px solid #f4f4f4;
    &:last-child {
      border-bottom: none;
    }
    &_img {
      width: 160px;
      height: 160px;
    }
    &_rt {
      width: 100%;
      margin-left: 32px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        line-height: 32px;
      }
      .label {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 7px;
        span {
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
        }
      }
      .tags {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        margin-top: 7px;
        &_item {
          padding: 5px 10px;
          background: #f0f2f5;
          border-radius: 4px;
          margin-right: 12px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
        }
      }
      .money {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
        margin-top: 9px;
      }
    }
  }
}
</style>
