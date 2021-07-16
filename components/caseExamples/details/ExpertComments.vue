<template>
  <div class="report">
    <div class="report_title">
      <p class="report_title_lf">专家点评</p>
    </div>
    <div class="report_con">
      <div class="result">
        <p class="score">{{ num }}</p>
        <p class="txt">评估结果：<span>优秀</span></p>
      </div>

      <div class="process">
        <div v-for="(item, index) of list" :key="index" class="process_item">
          <p class="title">{{ item.name }}</p>
          <div class="process_item_line no_margin">
            <sp-progress :show-pivot="false" :percentage="item.val" />
          </div>
          <p class="process_item_score">{{ item.val }}</p>
        </div>
      </div>
    </div>

    <div class="report_user">
      <div class="report_user_info">
        <div class="report_user_info_img">
          <sp-image
            class="image"
            width="0.72rem"
            height="0.72rem"
            round
            fit="cover"
            lazy-load
            src="https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0"
          ></sp-image>
        </div>
        <div class="report_user_info_name">用户名</div>
      </div>
      <div class="report_user_content">
        最常见的定义是：“主题是文章中通过具体材料所表达的基本思想。”这个定义由来已久，似无庸置疑，但仔细想来，它似有片面之嫌。常识告诉我们：文章是表情达意的工具。这个定义只及“达意”（表达的基本思想），而不及“表情”，岂不为缺漏？或谓“达意”。
      </div>
    </div>
  </div>
</template>

<script>
import { Progress, Image } from '@chipspc/vant-dgg'
export default {
  name: 'ExpertComments',
  components: {
    [Progress.name]: Progress,
    [Image.name]: Image,
  },
  data() {
    return {
      num: 99,
      list: [
        {
          name: '接单速度',
          val: 99.99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 9.1,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
        {
          name: '接单速度',
          val: 99,
        },
      ],
    }
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>

<style lang="less" scoped>
.report {
  padding: 47px 40px 40px 40px;
  border-bottom: 24px solid #f8f8f8;
  background-color: #fff;
  &_title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    &_lf {
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
    }
  }
  &_con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    margin-top: 54px;
    /*position: relative;*/
    .result {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-direction: column;

      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/ad51idi4arc0000.png);
      background-size: 100%;
      background-repeat: no-repeat;

      .score {
        font-size: 66px;
        font-family: Bebas;
        font-weight: 400;
        color: #4974f5;
      }
      .txt {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 32px;
        span {
          color: #4974f5;
        }
      }
    }
    // .dividing {
    //   height: 130px;
    //   border-right: 1px solid #f4f4f4;
    // }
    .process {
      width: 440px;

      &_item {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-direction: row;
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #1a1a1a;
        margin-top: 27px;

        .title {
          margin-right: 20px;
        }
        &_line {
          flex: 1;
          margin-right: 22px;
        }
        &_score {
          min-width: 40px;
          color: #999999;
          letter-spacing: 0;
          text-align: center;
          line-height: 22px;
        }
      }
      &_item:first-child {
        margin-top: 0;
      }
    }
  }

  .report_user {
    .report_user_info {
      display: flex;
      flex-direction: row;
      align-items: center;

      .report_user_info_img {
        width: 72px;
        height: 72px;
        font-size: 0;
        overflow: hidden;
        // .image {
        //   width: 100%;
        //   height: 100%;
        // }
      }
      .report_user_info_name {
        margin-left: 16px;
        font-family: PingFangSC-Medium;
        font-weight: bold;
        font-size: 30px;
        color: #222222;
        line-height: 30px;
      }
    }
    .report_user_content {
      margin-top: 28px;
      position: relative;

      background: rgba(242, 245, 255, 0.5);

      border-radius: 0 12px 12px 12px;

      font-family: PingFangSC-Regular;
      font-size: 26px;
      color: #555555;
      letter-spacing: 0;
      line-height: 40px;

      padding: 26px;
    }
    .report_user_content::before {
      position: absolute;
      top: -20px;
      left: 0;
      content: '';
      width: 42px;
      height: 20px;
      background-image: url(https://cdn.shupian.cn/sp-pt/wap/images/4sjy206r9ke0000.png);
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
