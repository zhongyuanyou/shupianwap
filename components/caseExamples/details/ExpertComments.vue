<template>
  <div class="report">
    <div class="report_title">
      <p class="report_title_lf">专家点评</p>
    </div>
    <!--  -->
    <div v-if="newInfo.dimension.length > 0" class="report_con">
      <div class="result">
        <p class="score">{{ newInfo.fraction }}</p>
        <p class="txt">
          综合点评：<span>{{ newInfo.fraction > 6 ? '优秀' : '良好' }}</span>
        </p>
      </div>

      <div class="process">
        <div
          v-for="(item, index) of newInfo.dimension"
          :key="index"
          class="process_item"
        >
          <p class="title">{{ item.name }}</p>
          <div class="process_item_line no_margin">
            <sp-progress :show-pivot="false" :percentage="item.fraction * 10" />
          </div>
          <p class="process_item_score">{{ item.fraction }}</p>
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
            :src="headImg || defaultImg"
          ></sp-image>
        </div>
        <div class="report_user_info_name">专家评语</div>
      </div>
      <div class="report_user_content">
        {{ newInfo.content }}
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
  props: {
    detailsId: {
      type: [Number, String],
      default: '',
    },
    info: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  data() {
    return {
      headImg: '',
      defaultImg:
        'https://cdn.shupian.cn/sp-pt/wap/images/727ro8a1oa00000.jpg?x-oss-process=image/resize,m_fill,w_80,h_80,limit_0',
      imgs: [
        '5kh95r57rl00000.jpg',
        'dw46uviu8kg0000.jpg',
        '5u7gygwxzsg0000.jpg',
        'ehczc451lpk0000.jpg',
        '6e5rze76buc0000.jpg',
      ],
    }
  },
  computed: {
    newInfo() {
      let content = '' // 评价内容
      let fraction = '' // "综合评分"

      const dimension = [] // 评价维度

      console.log(this.info)

      if (this.info.length > 0) {
        content = this.info[1].content

        if (this.info[0].infos && this.info[0].infos.length > 0) {
          fraction = this.info[0].infos[0].fraction
          for (let i = 1; i < this.info[0].infos.length; i++) {
            const element = this.info[0].infos[i]
            dimension.push(element)
          }
        }
      }

      return { content, fraction, dimension }
    },
  },
  mounted() {
    this.headImg = this.getImg()
    console.log(this.headImg)
  },
  methods: {
    getImg() {
      if (!this.detailsId) {
        console.log('no details id')
        return
      }
      const name = 'caseExamplesExpertComments:' + this.detailsId

      const val = window.sessionStorage.getItem(name)

      if (val === null || parseInt(val) > this.imgs.length) {
        const index = parseInt(Math.random() * this.imgs.length)
        window.sessionStorage.setItem(name, index)

        return this.$ossImgSetV2(this.imgs[index])
      } else {
        return this.$ossImgSetV2(this.imgs[parseInt(val)])
      }
    },
  },
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
        min-height: 78px;
      }
      .txt {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
        margin-top: 16px;
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
          margin-right: 10px;
          min-width: 120px;
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
    padding-top: 64px;
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
