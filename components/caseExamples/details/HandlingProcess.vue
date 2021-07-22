<template>
  <div class="case">
    <h1 class="title">办理经过</h1>

    <div class="list">
      <div v-for="(item, index) in info" :key="index" class="item">
        <span class="item_num"> </span>

        <div class="item_num_right">
          <h1 class="item_num_right_title">{{ item.name }}</h1>
          <p
            v-if="item.time && item.time.length > 0"
            class="item_num_right_time"
          >
            {{ formatDate(item.time[0]) }}~{{ formatDate(item.time[1]) }}
          </p>

          <div v-if="item.content" class="item_num_right_des">
            <TwoLine fontsize="0.26rem" :text="item.content"></TwoLine>
          </div>

          <div v-if="item.imgs && item.imgs.length > 0" class="images">
            <div class="images_container">
              <sp-image
                v-for="(image, imageIndex) in item.imgs"
                :key="imageIndex"
                class="image"
                :src="image"
              ></sp-image>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import { Image, Icon } from '@chipspc/vant-dgg'
import TwoLine from '@/components/caseExamples/details/TwoLine.vue'
export default {
  name: 'OrderCase',
  components: {
    [Image.name]: Image,
    [Icon.name]: Icon,
    TwoLine,
  },
  props: {
    info: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      list: [
        {
          name: '公司核名',
          time: '2021.4.15公司核名公司核名公司核名公司核名公司核名公司核名公司核名',
          content:
            '山东省潍坊市中级人民法院于2009年10月14日以(2009) 潍刑一初字第35号刑事判决，认定被告人王志才犯故意杀人罪，判处死刑，剥夺政治权利终身。宣判后，王志才提出上诉。山东省高级人民法院于2010年6月18日以(2010)鲁刑四终字第2号刑事裁定，驳回上诉，维持原判，并依法报请最高人民法院核准。最高人民法院根据复核确认的事实，以（2010三复2265192）',
          images: [1, 2, 3],
        },
        {
          name: '提交资料至工商管理局',
          time: '2021.4.19',
          images: [1, 2, 3, 4],
        },
        {
          name: '领取执照',
          time: '2021.4.23',
        },
      ],
    }
  },
  methods: {
    formatDate(time) {
      return moment(time).format('YYYY年MM月DD日')
    },
  },
}
</script>

<style lang="less" scoped>
.case {
  background: #fff;
  border-bottom: 24px solid #f8f8f8;
  padding: 48px 0 40px 0;
  > .title {
    padding-left: 40px;
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 40px;
    margin-bottom: 48px;
  }

  > .list {
    margin-top: 28px;
    margin-bottom: 12px;
    padding: 0 40px;

    > .item {
      padding: 0 0 40px 40px;
      position: relative;
      border-left: 2px solid #f4f4f4;
      margin-left: 14px;

      > .item_num {
        width: 30px;
        height: 30px;
        // box-sizing: border-box;
        // border: 7px solid #4974f5;
        // box-shadow: 0 0 3px #4974f5;
        background: #ffffff;

        border-radius: 100%;

        position: absolute;
        left: -16px;
        top: 3px;
        background-image: url('https://cdn.shupian.cn/sp-pt/wap/images/a0x4tlxjr0g0000.png');
        background-size: 100%;
        background-repeat: no-repeat;
      }
      > .item_num_right {
        > .item_num_right_title {
          font-family: PingFangSC-Medium;
          font-weight: bold;
          font-size: 32px;
          color: #222222;
          line-height: 34px;
        }
        > .item_num_right_time {
          font-family: PingFangSC-Medium;
          font-size: 26px;
          line-height: 26px;
          color: #555555;
          letter-spacing: 0;

          margin-top: 32px;
        }

        .item_num_right_des {
          margin: 16px 0 24px;
          font-size: 26px;
          color: #555555;
          line-height: 40px;
        }
        .images {
          overflow: hidden;
          font-size: 0;
          .images_container {
            margin: 0 -5px;
          }
          .image {
            margin: 0 5px 10px;
            width: 32%;
            width: calc(33% - 10px);
            max-width: 216px;
            height: 131px;
          }
        }
      }
    }
    > .item:last-child {
      border: none;
      margin-left: 16px;
      padding: 0 0 0px 40px;
    }
  }
}
</style>
