<template>
  <div>
    <div class="my-component">
      <div class="title">热门办理业务</div>
      <div class="content">
        <div
          v-for="(item, index) in $parent.hotBanLiYeWuList"
          :key="index"
          class="item"
          :class="index < 3 ? 'item-margin-bottom' : ''"
        >
          <div class="item-div-img">
            <img class="item-img" :src="item.img" />
          </div>
          <p class="item-title">{{ item.title }}</p>
          <p class="item-desc">{{ item.desc }}</p>
          <div class="item-line"></div>
          <p class="item-price">{{ item.price }}<span>元起</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HotBanLiYeWu',
  data() {
    return {
      data: [
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/19quq4wcjjk0000.png',
          title: 'ICP许可证',
          desc: '线上交易网站需办',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/5a1amw1bc3k0000.png',
          title: 'EDI许可证',
          desc: '互联网交易处理...',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/a9gcm9lyoo40000.png',
          title: 'IDC许可证',
          desc: '开展数据中心业......',
          price: '10000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/fmrk2ggqb8g0000.png',
          title: 'ISP许可证',
          desc: '因特网接入服务......',
          price: '15000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/8pz7o2wibsg0000.png',
          title: 'SP许可证',
          desc: '移动信息服务业.........',
          price: '12000',
        },
        {
          img: 'https://cdn.shupian.cn/sp-pt/wap/images/7n41i9e9zb80000.png',
          title: '网络文化经营...',
          desc: '经营性互联网文...',
          price: '14000',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.my-component {
  width: calc(100% - 80px);
  margin: 0 auto;
  .title {
    font-size: 40px;
    font-weight: 600;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 40px;
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      flex: none;
      width: 212px;
      background: #ffffff;
      border: 1px solid rgba(205, 205, 205, 0.5);
      border-radius: 4px;

      .item-div-img {
        width: 210px;
        height: 210px;
        margin-bottom: 24px;
        .item-img {
          width: 100%;
          height: 100%;
        }
      }
      .item-title {
        font-size: 26px;
        font-weight: 600;
        color: #222222;
        line-height: 26px;
        margin-bottom: 14px;
        margin-left: 16px;
        margin-right: 16px;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-desc {
        font-size: 22px;
        font-weight: 400;
        color: #999999;
        line-height: 22px;
        margin-left: 16px;
        margin-right: 16px;
        // 超出省略号
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .item-line {
        height: 1px;
        margin: 16px;
        background: #f4f4f4;
      }
      .item-price {
        font-size: 24px;
        font-weight: 600;
        color: #ec5330;
        line-height: 24px;
        margin: 16px;
      }
    }
    .item-margin-bottom {
      margin-bottom: 24px;
    }
  }
}
</style>
