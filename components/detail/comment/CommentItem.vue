<template>
  <div class="content-wrap">
    <div ref="spaceholder" class="spaceholder"></div>
    <div class="tile">
      <img
        class="tile-avatar"
        :src="info.avatar || $ossImgSetV2('9zzzas17j8k0000.png')"
      />
      <div class="tile-desc">
        <div class="tile-desc__name">
          {{ info.choiceAnonymous ? '匿名用户' : info.userName }}
        </div>
      </div>
      <img
        v-if="info.goodEvaluate"
        :src="$ossImgSetV2('g31f5ub1prc0000.png')"
        class="tile-desc__icon"
      />
    </div>
    <div class="date-wrap">{{ info.evaluateTime }}</div>
    <div class="score">
      <div class="score-txt">服务评分</div>
      <template v-for="(item, i1) in 5">
        <my-icon
          :key="i1"
          class="score-star__item"
          :class="i1 === 4 ? 'z-last' : ''"
          name="dafen_mian"
          size="0.22rem"
          :color="
            i1 < Math.floor(info.averageScore / 100 / 2) ? '#FFB400' : '#F0F0F0'
          "
        ></my-icon>
      </template>
      <div class="score-level">{{ info.averageScore | fliterLevel }}</div>
    </div>
    <div
      v-if="
        info && info.evaluateDimensionList && info.evaluateDimensionList.length
      "
      class="score-detail"
    >
      <div
        v-for="(item, i) in info.evaluateDimensionList"
        :key="i"
        class="score-detail__item"
      >
        {{ item.name }}:{{ item.fraction }}分
      </div>
    </div>
    <div class="content">
      <div
        ref="contentTxt"
        class="content-txt"
        :class="[showAllContentTxt ? 'z-overflow' : '']"
      >
        {{ info.evaluateContent }}
      </div>
      <div
        v-show="showAllContentTxt"
        ref="fullContentFlag"
        class="content-full"
        @click="showAllContentTxt = false"
      >
        全文
      </div>
      <div v-if="info.imgs && info.imgs.length" class="content-img">
        <template v-for="(item, i) in info.imgs">
          <img :key="i" :src="item.filepath" class="content-img__item" />
        </template>
      </div>
    </div>
    <div
      v-if="info.evaluateTagList && info.evaluateTagList.length"
      class="tips"
    >
      <my-icon
        class="tips-icon"
        :class="[showTipTxt ? 'z-more' : '']"
        name="biaoqian"
        size="0.24rem"
        color="#999999"
      ></my-icon>
      <div ref="tipTxt" class="tips-desc" :class="[showTipTxt ? 'z-more' : '']">
        {{ info.evaluateTagList | filterTags }}
      </div>
    </div>
    <div
      v-if="info.reviewStatus && info.custAddComment"
      class="addcomments"
      :class="[showTipTxt ? 'z-small' : '']"
    >
      <div class="addcomments-item content">
        <div class="addcomments-item__tile">
          {{ info.custAddComment.xDayAfterTxt }}
        </div>
        <div
          ref="addCommentContentTxt"
          class="content-txt addcomments-item__txt"
          :class="[showAddCommentAllContentTxt ? 'z-overflow' : '']"
        >
          {{ info.custAddComment.reviewReplyContent }}
        </div>
        <div
          v-show="showAddCommentAllContentTxt"
          ref="addCommentfullContentFlag"
          class="content-full"
          @click="showAddCommentAllContentTxt = false"
        >
          全文
        </div>
        <div
          v-if="
            info &&
            info.custAddComment &&
            info.custAddComment.imgs &&
            info.custAddComment.imgs.length
          "
          class="content-img"
        >
          <template v-for="(item, i) in info.custAddComment.imgs">
            <img :key="i" :src="item.filepath" class="content-img__item" />
          </template>
        </div>
        <div
          v-if="info.replyStatus && info.custReplayComment"
          class="planner-wrap"
        >
          <div class="planner">
            <img
              class="planner-avatar"
              :src="
                info.custReplayComment.avatar ||
                $ossImgSetV2('9zzzas17j8k0000.png')
              "
            />
            <span class="planner-replay"
              ><span class="planner-name"
                >{{ info.custReplayComment.userName }}【规划师】</span
              >回复：{{ info.custReplayComment.reviewReplyContent }}</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodCommentItem',
  filters: {
    fliterLevel(val) {
      const txts = ['', '非常差', '差', '一般', '好', '非常好']
      return txts[Math.floor(val / 100 / 2)]
    },
    filterTags(val) {
      if (Array.isArray(val) && val.length) {
        const arr = val.reduce((acc, cur) => {
          acc.push(cur.name)
          return acc
        }, [])
        return arr.join()
      } else {
        return ''
      }
    },
  },
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      showAllContentTxt: false, // 显示全文标识
      showAddCommentAllContentTxt: false, // 追加评论显示全文标识
      showTipTxt: true, // 显示标签行数
      lineHeight: 0,
    }
  },
  computed: {
    info() {
      return this.comment
    },
  },
  watch: {
    info(val) {
      this.$nextTick(() => {
        this.renderView()
      })
    },
  },
  mounted() {
    // 定义一行间距
    this.lineHeight = this.$refs.spaceholder.offsetHeight
    this.$refs.spaceholder.style = 'display: none;'
    this.$nextTick(() => {
      this.renderView()
    })
  },
  methods: {
    renderView() {
      this.setContentTxt(this.$refs.contentTxt, 'showAllContentTxt')
      this.setContentTxt(
        this.$refs.addCommentContentTxt,
        'showAddCommentAllContentTxt'
      )
      this.setTipTxt()
    },
    // 设置评论区域行高
    setContentTxt(ele, flag) {
      if (ele) {
        const contentTxtHeight = ele.offsetHeight
        if (contentTxtHeight / this.lineHeight > 4) {
          this[flag] = true
        } else {
          this[flag] = false
        }
      }
    },
    setTipTxt() {
      if (this.$refs.tipTxt) {
        const tipHeight = this.$refs.tipTxt.offsetHeight
        if (this.lineHeight < tipHeight) {
          this.showTipTxt = true
        } else {
          this.showTipTxt = false
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.content-wrap {
  background: #fff;
  margin-bottom: 20px;
  padding: 32px 40px;
  .spaceholder {
    height: 28px;
  }
  .tile {
    display: flex;
    align-items: center;
    position: relative;
    margin-bottom: 16px;
    &-avatar {
      width: 80px;
      height: 80px;
      border-radius: 100%;
      margin-right: 18px;
      object-fit: cover;
    }
    &-desc {
      flex: 1;
      &__name {
        color: #1a1a1a;
        font-size: 34px;
        line-height: 1;
        font-weight: bold;
        margin-bottom: 20px;
        width: 380px;
        .mixin-text-oneoverflow();
      }
      &__icon {
        object-fit: cover;
        width: 80px;
        height: 80px;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }
  }
  .date-wrap {
    margin-top: 20px;
    color: #999999;
    font-size: 24px;
    line-height: 1;
    margin-bottom: 12px;
  }
  .score {
    display: flex;
    align-items: center;
    &-txt {
      font-size: 24px;
      line-height: 1;
      color: #222;
      margin-right: 16px;
    }
    &-star__item {
      margin-right: 8px;
      &.z-last {
        margin-right: 16px;
      }
    }
    &-level {
      font-size: 22px;
      line-height: 1;
      color: #555555;
    }
  }
  .score-detail {
    display: flex;
    flex-wrap: wrap;
    &__item {
      margin-top: 12px;
      line-height: 1;
      font-size: 24px;
      color: #999;
      margin-right: 24px;
    }
  }
  .content {
    margin-top: 24px;
    &-txt {
      color: #000000;
      font-size: 26px;
      line-height: 38px;
      &.z-overflow {
        .textOverflow(3);
      }
    }
    &-full {
      font-size: 26px;
      line-height: 28px;
      color: #4974f5;
      margin-top: 4px;
    }
    &-img {
      margin-top: 4px;
      display: flex;
      flex-wrap: wrap;
      &__item {
        height: 210px;
        width: 210px;
        border-radius: 8px;
        margin-right: 8px;
        margin-top: 8px;
        &.z-last {
          margin-right: 0;
        }
      }
    }
  }
  .tips {
    margin-top: 12px;
    display: flex;
    &-icon {
      margin-right: 12px;
      &.z-more {
        line-height: 36px;
      }
    }
    &-desc {
      font-size: 24px;
      line-height: 1;
      color: #999;
      &.z-more {
        line-height: 36px;
      }
    }
  }
  .addcomments {
    margin-top: 32px;
    &.z-small {
      margin-top: 26px;
    }
    &-item {
      &__tile {
        font-size: 28px;
        line-height: 40px;
        font-weight: bold;
        color: #222;
      }
      &__txt {
        margin-top: 4px;
      }
    }
    .planner-wrap {
      margin-top: 32px;
      border-top: 1px solid #f4f4f4;
      .planner {
        position: relative;
        padding-top: 24px;
        display: flex;
        &-avatar {
          position: absolute;
          top: 30px;
          left: 0;
          border-radius: 100%;
          width: 26px;
          height: 26px;
          object-fit: cover;
          margin-right: 8px;
          line-height: 38px;
        }
        &-name {
          color: #222;
          font-size: 26px;
          line-height: 38px;
        }
        &-replay {
          margin-left: 34px;
          color: #999;
          font-size: 26px;
          line-height: 38px;
        }
      }
    }
  }
}
</style>
