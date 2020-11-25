<template>
  <div class="preferential-centent">
    <TabCurve
      :tab-list="tabBtn"
      :need-fixed="false"
      @selectTabHandle="selectTabHandle"
    ></TabCurve>
    <div class="scroll-centent">
      <ul>
        <li v-for="(item, index) in tabData" :key="index">
          <a href="javascript:void(0);">
            <div class="label-num">
              <span class="label">{{ item.label }}</span>
              <span class="num">{{ item.num }}人已购买</span>
            </div>
            <div class="text-content">
              <strong>{{ item.title }}</strong>
              <p>{{ item.describe }}</p>
            </div>
            <img :src="item.url" alt="" />
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TabCurve from '@/components/common/tab/TabCurve'
export default {
  components: {
    TabCurve,
  },
  props: {
    tabBtn: {
      type: Array,
      default: () => {
        return [
          {
            label: '限时特惠',
            code: '1',
          },
          {
            label: '内容待定',
            code: '2',
          },
        ]
      },
    },
    tabData: {
      type: Array,
      default: () => {
        return [
          {
            label: '抢购中',
            num: '82,588588588',
            title: '3天快速开公司3天快速开公司3天快速开公司',
            describe: '特价享好礼特价享好礼特价享好礼特价享好礼',
            url: require('~/assets/temporary/home/bn.png'),
          },
          {
            label: '抢购中',
            num: '82,588',
            title: '3天快速开公司',
            describe: '特价享好礼',
            url: require('~/assets/temporary/home/bn.png'),
          },
          {
            label: '抢购中',
            num: '82,588',
            title: '3天快速开公司',
            describe: '特价享好礼',
            url: require('~/assets/temporary/home/bn.png'),
          },
          {
            label: '抢购中',
            num: '82,588',
            title: '3天快速开公司',
            describe: '特价享好礼',
            url: require('~/assets/temporary/home/bn.png'),
          },
          {
            label: '抢购中',
            num: '82,588',
            title: '3天快速开公司',
            describe: '特价享好礼',
            url: require('~/assets/temporary/home/bn.png'),
          },
        ]
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    selectTabHandle(data) {
      console.log(data)
    },
  },
}
</script>

<style scoped lang="less">
.preferential-centent {
  width: 100%;
  padding-bottom: 32px;
  .scroll-centent {
    display: flex;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    padding-left: 40px;
    -webkit-overflow-scrolling: touch;
    margin-top: 16px;
    ul {
      display: flex;
      li {
        width: 327px;
        height: 228px;
        overflow: hidden;
        border-radius: 8px;
        margin-right: 16px;
        &:last-child {
          margin-right: 40px;
        }
        > a {
          position: relative;
          display: flex;
          width: 100%;
          height: 100%;
          &::after {
            content: '';
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            background: linear-gradient(0deg, rgba(0, 0, 0, 0.1), #000000);
            z-index: 1;
          }
          .label-num {
            display: block;
            margin: 12px 0 0 12px;
            position: relative;
            z-index: 2;
            display: flex;
            align-items: center;
            height: 31px;
            border-radius: 4px;
            overflow: hidden;
            font-size: 18px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #ffffff;
            background-color: rgba(0, 0, 0, 0.6);
            padding-right: 9px;
            > .label {
              height: 31px;
              display: flex;
              align-items: center;
              font-size: inherit;
              padding: 0 9px;
              background: linear-gradient(-90deg, #ef8572, #e6624b);
              border-radius: 4px 0px 0px 4px;
              margin-right: 9px;
            }
            > .num {
              flex: 1;
              .textOverflow(1);
            }
          }
          .text-content {
            position: absolute;
            left: 0;
            bottom: 0;
            z-index: 2;
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 23px 25px 23px;
            > strong {
              font-size: 28px;
              line-height: 38px;
              font-family: PingFang SC;
              font-weight: bold;
              color: #ffffff;
              .textOverflow(1);
            }
            > p {
              font-size: 22px;
              font-family: PingFang SC;
              font-weight: 400;
              color: #ffffff;
              opacity: 0.6;
              line-height: 32px;
              margin-top: 5px;
              .textOverflow(1);
            }
          }
          > img {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
}
</style>
