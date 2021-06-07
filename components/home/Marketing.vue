<template>
  <div class="sp-main-box">
    <div class="inner">
      <div v-for="(item, index) in list" :key="index" class="sp-item">
        <p v-if="index === 1" class="sp-goods-title">
          <span>{{
            (bdData.length && bdData[0].materialList[0].materialName) ||
            item.productName
          }}</span>
          <span v-if="item.titleIcon" class="title-bar">
            {{ item.titleIcon }}
          </span>
        </p>
        <p v-else class="sp-goods-title">
          {{ item.productName }}
          <span v-if="item.titleIcon" class="title-bar">
            {{ item.titleIcon }}
          </span>
        </p>
        <p v-if="index === 1" class="sp-goods-slogan">
          {{
            (bdData.length && bdData[0].materialList[0].materialDescription) ||
            item.slogan
          }}
        </p>
        <p v-else class="sp-goods-slogan">
          {{ item.slogan }}
        </p>
        <p v-if="item.productDescript" class="sp-goods-des">
          {{ item.productDescript }}
        </p>
        <!-- 必懂入口 直播入口 -->
        <div v-if="index === 1" class="bd-imgs">
          <img
            :src="
              (bdData.length && bdData[0].materialList[0].materialUrl) ||
              item.imgs[0]
            "
            alt=""
            srcset=""
            class="bd-img"
            @click="
              adJumpHandleMixin(
                (bdData.length && bdData[0].materialList[0]) || item
              )
            "
          />
        </div>
        <!-- 千万补贴 -->
        <div v-else-if="index === 3" class="imgs">
          <img
            v-for="(subsidyItem, subIndex) in subsidyData"
            :key="subIndex"
            :src="subsidyItem.materialList[0].materialUrl"
            alt=""
            srcset=""
            :style="{ width: imgWidth }"
            @click="adJumpHandleMixin(subsidyItem.materialList[0])"
          />
        </div>
        <div
          v-else-if="index !== 3 && item.imgs && item.imgs.length"
          class="imgs"
        >
          <img
            v-for="(imgItem, imgIndex) in item.imgs"
            :key="imgIndex"
            :src="imgItem"
            :style="imgWidth"
            alt=""
            srcset=""
            @click="adJumpHandleMixin(imgItem)"
          />
        </div>
        <sp-button
          v-if="item.buttonText && index === 2"
          type="primary"
          class="sp-goods-btn"
          @click="
            adJumpHandleMixin(
              (helpBannerData[0] && helpBannerData[0].materialList[0]) || item
            )
          "
          >{{ item.buttonText }}</sp-button
        >
        <sp-button
          v-else-if="item.buttonText"
          type="primary"
          class="sp-goods-btn"
          @click="adJumpHandleMixin(item)"
          >{{ item.buttonText }}</sp-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from '@chipspc/vant-dgg'
import adJumpHandle from '~/mixins/adJumpHandle'
// 营销商品活动入口
export default {
  components: {
    [Button.name]: Button,
  },
  mixins: [adJumpHandle],
  props: {
    // 千万补贴广告
    subsidyData: {
      type: Array,
      default() {
        return []
      },
    },
    // 直播入口 必懂入口
    bdData: {
      type: Array,
      default() {
        return []
      },
    },
    // 帮找服务
    helpBannerData: {
      type: Array,
      default() {
        return []
      },
    },
  },
  data() {
    return {
      list: [
        {
          productName: '资产交易',
          slogan: '快速转让',
          productDescript: '公司/商标/专利/网店/新媒',
          buttonText: '我要转让',
          linkType: 1,
          wapLink: '/search/searchResult?keywords=商标',
        },
        {
          productName: '企服必懂',
          slogan: '创业路上的知识加油站',
          imgs: ['https://cdn.shupian.cn/sp-pt/wap/images/8yl438481uk0000.png'],
          linkType: 1,
          wapLink: '/known',
        },
        {
          productName: '帮找服务',
          slogan: '一键发需求',
          productDescript: '全国规划师为您服务',
          buttonText: '立即咨询',
          type: 'planner',
          titleIcon: '精选规划师',
          linkType: 2,
          materialLink: 'this.list',
        },
        {
          productName: '政策补贴',
          slogan: '企业补贴免费测算工具',
          imgs: [
            'https://cdn.shupian.cn/sp-pt/wap/5o4toa1pfgk0000.png',
            'https://cdn.shupian.cn/sp-pt/wap/95f9n61gks00000.png',
          ],
          linkType: 1,
          wapLink: '/activity/exclusive',
        },
      ],
    }
  },
  mounted() {
    let url = ''
    const localHerf = window.location.href
    if (localHerf.match('https://m.shupian')) {
      url = 'https://mtg.shupian.cn/spread/myDemandCard'
    } else if (localHerf.match('https://tm.shupian')) {
      url = 'https://tmtg.shupian.cn/spread/myDemandCard'
    } else {
      url = 'https://dmtg.shupian.cn/spread/myDemandCard'
    }
    this.list[2].materialLink = url
  },
  computed: {
    imgWidth() {
      return this.subsidyData && this.subsidyData.length > 1 ? '48%' : '100%'
    },
  },
  methods: {
    linkUrl(url) {
      window.location.href = url
    },
  },
}
</script>

<style lang="less" scoped>
.sp-item {
  width: 50%;
  height: 300px;
  box-sizing: border-box;
  border-right: 1px solid rgba(244, 244, 244, 1);
  border-bottom: 1px solid rgba(244, 244, 244, 1);
  padding: 24px 20px;
  position: relative;
  float: left;
  .sp-goods-title {
    font-size: 32px;
    font-family: PingFangSC-Medium, PingFang SC;
    color: #222222;
    line-height: 32px;
    margin-bottom: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    .title-bar {
      display: inline-block;
      width: auto;
      background: #4974f5;
      color: white;
      font-size: 24px;
      padding: 6px;
      transform: scale(0.9);
      transform-origin: 0 50%;
      border-radius: 4px;
      line-height: 24px;
      position: relative;
      margin-left: 6px;
      display: flex;
      align-items: center;
      bottom: 2px;
      &::before {
        position: absolute;
        content: '';
        left: -14px;
        top: 8px;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-right: 10px solid #4974f5;
        border-bottom: 10px solid transparent;
        border-left: 10px solid transparent;
      }
    }
  }
  .sp-goods-slogan {
    padding-top: 6px;
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 28px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
  .sp-goods-des {
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 26px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  // p {
  //   margin-bottom: 10px;
  // }
  .imgs {
    width: 315px;
    height: 162px;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 24px;
    img {
      width: auto;
      border-radius: 12px;
    }
  }
  .bd-imgs {
    position: absolute;
    // width: 100%;
    height: 162px;
    bottom: 28px;
    img {
      width: 315px;
    }
  }
  .sp-goods-btn {
    position: absolute;
    left: 20px;
    bottom: 20px;
    width: auto;
    height: 48px;
    background: rgba(73, 116, 245, 0.1);
    border-radius: 8px;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 700;
    border: none;
    color: #4974f5;
    padding: 0 12px;
    ::v-deep .sp-button__text {
      font-weight: 700;
    }
  }
  .bd-img {
    width: 100%;
  }
}
</style>
