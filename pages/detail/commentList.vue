<template>
  <div class="good-commentlist">
    <Header title="评价列表">
      <template #left>
        <div @click="$back()">
          <my-icon
            name="nav_ic_back"
            class="back_icon"
            size="0.4rem"
            color="#1A1A1A"
          ></my-icon>
        </div>
      </template>
    </Header>
    <div class="comments-wrap">
      <div class="comment">
        <div class="content-wrap">
          <div class="tile">
            <img
              class="tile-avatar"
              src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
            />
            <div class="tile-desc">
              <div class="tile-desc__name">
                哆啦不是A梦哆啦不是A梦哆啦不是A梦哆啦不是A梦
              </div>
              <div class="tile-desc__date"></div>
            </div>
            <img
              :src="$ossImgSetV2('g31f5ub1prc0000.png')"
              class="tile-desc__icon"
            />
          </div>
          <div class="date-wrap">2020/09/19 14:00</div>
          <div class="score">
            <div class="score-txt">服务评分</div>
            <template v-for="(item, index) in totalStars">
              <my-icon
                :key="index"
                class="score-star__item"
                :class="index === 4 ? 'z-last' : ''"
                name="dafen_mian"
                size="0.22rem"
                :color="item.flag ? '#FFB400' : '#F0F0F0'"
                @click.native="clkTotalStar(index, 'totalStarLevel')"
              ></my-icon>
            </template>
            <div class="score-level">一般</div>
          </div>
          <div class="score-detail">
            <div class="score-detail__item">专业能力:1分</div>
            <div class="score-detail__item">回复时效:3分</div>
            <div class="score-detail__item">时效效率:4分</div>
            <div class="score-detail__item">专业能力:1分</div>
            <div class="score-detail__item">回复时效:3分</div>
            <div class="score-detail__item">时效效率:4分</div>
          </div>
          <div class="content">
            <div
              ref="contentTxt"
              class="content-txt"
              :class="[showAllContentTxt ? 'z-overflow' : '']"
            >
              奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯
            </div>
            <div
              v-show="showAllContentTxt"
              ref="fullContentFlag"
              class="content-full"
              @click="showAllContentTxt = false"
            >
              全文
            </div>
            <div class="content-img">
              <img
                src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                class="content-img__item"
              />
              <img
                src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                class="content-img__item"
              />
              <img
                src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                class="content-img__item"
              />
            </div>
          </div>
          <div class="tips">
            <my-icon
              class="tips-icon"
              :class="[showTipTxt ? 'z-more' : '']"
              name="biaoqian"
              size="0.24rem"
              color="#999999"
            ></my-icon>
            <div
              ref="tipTxt"
              class="tips-desc"
              :class="[showTipTxt ? 'z-more' : '']"
            >
              性价比高，服务质量好，办理效率高,性价比高，服务质量好，办理效率高
            </div>
          </div>
          <div class="addcomments" :class="[showTipTxt ? 'z-small' : '']">
            <div class="addcomments-item content">
              <div class="addcomments-item__tile">用户x天后追评：</div>
              <div
                ref="addCommentContentTxt"
                class="content-txt addcomments-item__txt"
                :class="[showAddCommentAllContentTxt ? 'z-overflow' : '']"
              >
                奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯奥克斯广场才开不久的一奥克斯广场才奥克斯
              </div>
              <div
                v-show="showAddCommentAllContentTxt"
                ref="addCommentfullContentFlag"
                class="content-full"
                @click="showAddCommentAllContentTxt = false"
              >
                全文
              </div>
              <div class="content-img">
                <img
                  src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                  class="content-img__item"
                />
                <img
                  src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                  class="content-img__item"
                />
                <img
                  src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                  class="content-img__item"
                />
              </div>
              <div class="planner-wrap">
                <div class="planner">
                  <img
                    class="planner-avatar"
                    src="https://cdn.shupian.cn/cms/du7tol34xm80000.jpg"
                  />
                  <span class="planner-replay"
                    ><span class="planner-name">江刘杰【规划师】</span
                    >回复：谢谢您的认可,我们会越做约好的继续加油！</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/common/head/header'

export default {
  name: 'GoodCommentList',
  components: {
    Header,
  },
  data() {
    return {
      totalStars: [
        // 总得分
        { flag: true },
        { flag: true },
        { flag: true },
        { flag: false },
        { flag: false },
      ],
      showAllContentTxt: true, // 显示全文标识
      showAddCommentAllContentTxt: true, // 追加评论显示全文标识
      showTipTxt: true, // 显示标签行数
      lineHeight: 0,
    }
  },
  mounted() {
    this.lineHeight = this.$refs.fullContentFlag.offsetHeight
    this.setContentTxt(this.$refs.contentTxt, 'showAllContentTxt')
    this.setContentTxt(
      this.$refs.addCommentContentTxt,
      'showAddCommentAllContentTxt'
    )
    this.setTipTxt()
  },
  methods: {
    // 设置评论区域行高
    setContentTxt(ele, flag) {
      const contentTxtHeight = ele.offsetHeight
      if (contentTxtHeight / this.lineHeight >= 4) {
        this[flag] = true
      } else {
        this[flag] = false
      }
    },
    setTipTxt() {
      const tipHeight = this.$refs.tipTxt.offsetHeight
      if (this.lineHeight < tipHeight) {
        this.showTipTxt = true
      } else {
        this.showTipTxt = false
      }
    },
  },
}
</script>

<style lang="less" scoped>
.good-commentlist {
  ::v-deep.my-head {
    box-shadow: 0px 1px 0px 0px #f4f4f4;
  }
  .back_icon {
    margin-left: 40px;
  }
  background: #F5F5F5;
  .content-wrap {
    background: #fff;
    margin-bottom: 20px;
    padding: 32px 40px;
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
      &-spaceholder {
        font-size: 26px;
        line-height: 32px;
      }
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
        margin-top: 12px;
        height: 210px;
        display: flex;
        &__item {
          height: inherit;
          width: 210px;
          border-radius: 8px;
          margin-right: 8px;
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
}
</style>
