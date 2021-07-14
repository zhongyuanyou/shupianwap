<template>
  <div class="title">
    <div class="flex title_tags">
      <div class="flex_1 title_tags_left">
        <span class="title_tags_item">视频看房</span>
        <span class="title_tags_item">视频看房</span>
        <span class="title_tags_item">视频看房</span>
      </div>
      <div class="title_tags_right">
        <my-icon name="popup_ic_closeb" size="0.24rem" color="#222222" />9999
      </div>
    </div>

    <p class="title_btitle">股份有限公司注册，公司资本为股份所组成的公司</p>

    <div class="title_info flex">
      <div class="flex_1">
        <div class="title_info_num">2999元</div>
        价格
      </div>
      <div class="flex_1">
        <div class="title_info_num">22天</div>
        办理周期
      </div>
      <div class="flex_1">
        <div class="title_info_num">四川成,都广元</div>
        注册区域
      </div>
    </div>

    <div class="title_bottom">
      <div class="title_bottom_button">报价方案</div>
    </div>
  </div>
</template>

<script>
import { Image, Icon } from '@chipspc/vant-dgg'
export default {
  name: 'Title',
  components: {
    [Image.name]: Image,
    // SpIcon: Icon,
  },
  props: {
    comment: {
      type: String,
      default: '',
    },
    sellingGoodsData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    commentfn() {
      this.$emit('onComment')
    },
  },
}
</script>

<style lang="less" scoped>
.title {
  font-family: PingFangSC;
  padding: 45px 40px 40px;
  background: #ffffff;
  font-size: 0;
  .flex {
    display: flex;
    // align-items: flex-start;
  }
  .flex_1 {
    flex: 1;
  }

  .title_tags {
    .title_tags_left {
      .title_tags_item {
        background: #f0f2f5;
        border-radius: 4px;
        display: inline-block;
        margin-right: 12px;

        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #5c7499;
        letter-spacing: 0;
        text-align: center;
      }
    }
    .title_tags_right {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #222222;
      letter-spacing: 0;
      line-height: 24px;
    }
  }

  .title_btitle {
    font-family: PingFangSC-Medium;
    font-weight: bold;
    font-size: 44px;
    color: #222222;
    line-height: 58px;
    margin: 20px 0 38px;
  }

  .title_info {
    font-size: 22px;
    color: #999999;
    letter-spacing: 0;
    line-height: 30px;

    .title_info_num {
      letter-spacing: 0;
      font-weight: bold;

      font-family: PingFangSC-Medium;
      font-size: 40px;
      color: #ec5330;
      line-height: 56px;

      white-space: nowrap;
    }
  }
  .title_info > div:nth-child(2) {
    border-right: 1px solid #f4f4f4;
    border-left: 1px solid #f4f4f4;
    padding: 0 20px;
    margin: 0 20px;
  }

  .title_bottom {
    margin-top: 40px;
    &_button {
      height: 96px;
      line-height: 96px;
      background: #4974f5;
      border-radius: 8px;

      font-family: PingFangSC-Medium;
      font-weight: bold;
      font-size: 32px;
      color: #ffffff;
      text-align: center;
    }
  }
}
</style>
