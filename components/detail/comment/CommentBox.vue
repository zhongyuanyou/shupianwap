<template>
  <div class="comment">
    <div class="tile-wrap">
      <div class="tile-tile">用户评价</div>
      <div class="tile-more">
        <div class="tile-more__txt" @click="linkMoreComment">更多评价</div>
        <my-icon
          name="order_ic_listnext"
          size="0.24rem"
          color="#CCCCCC"
        ></my-icon>
      </div>
    </div>
    <div class="content-wrap">
      <div class="tile">
        <img
          class="tile-avatar"
          :src="info.avatar || $ossImgSetV2('9zzzas17j8k0000.png')"
        />
        <div class="tile-desc">
          <div class="tile-desc__name">
            {{ filterUserName(info.userName) }}
          </div>
          <div class="tile-desc__content">
            <div class="score">
              <div class="score-txt">评分</div>
              <template v-for="(item, i) in 5">
                <my-icon
                  :key="i"
                  class="score-star__item"
                  :class="i === 4 ? 'z-last' : ''"
                  name="dafen_mian"
                  size="0.22rem"
                  :color="
                    i < Math.floor(info.averageScore / 100 / 2)
                      ? '#FFB400'
                      : '#F0F0F0'
                  "
                ></my-icon>
              </template>
            </div>
            <div class="date">
              {{ info.evaluateTime | filterDate }}
            </div>
          </div>
        </div>
        <img
          v-if="info.goodEvaluate"
          :src="$ossImgSetV2('g31f5ub1prc0000.png')"
          class="tile-desc__icon"
        />
      </div>
      <div class="content">
        <div class="content-txt">
          {{ info.evaluateContent }}
        </div>
        <div v-if="info.imgs && info.imgs.length" class="content-img">
          <template v-for="(item, i) in info.imgs">
            <img
              v-if="i < 6"
              :key="i"
              :class="[(i + 1) % 3 === 0 ? 'z-last' : '']"
              :src="item.filepath"
              class="content-img__item"
              @click="preview(item.filepath)"
            />
          </template>
        </div>
      </div>
      <div
        v-if="info.evaluateTagList && info.evaluateTagList.length"
        class="tips"
      >
        <my-icon
          class="tips-icon"
          name="biaoqian"
          size="0.24rem"
          color="#999999"
        ></my-icon>
        <div class="tips-desc">
          {{ info.evaluateTagList | filterTags }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { ImagePreview } from '@chipspc/vant-dgg'

export default {
  name: 'Comment',
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
    filterDate(val) {
      return moment(val).format('YYYY-MM-DD')
    },
  },
  components: {
    [ImagePreview.name]: ImagePreview,
  },
  props: {
    comment: {
      type: Object,
      default: () => {
        return {}
      },
    },
    goodId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  computed: {
    info() {
      return this.comment
    },
  },
  methods: {
    linkMoreComment() {
      this.$router.push({
        path: '/detail/commentList',
        query: {
          goodId: this.goodId,
        },
      })
    },
    filterUserName(val) {
      if (this.info.choiceAnonymous) {
        return '匿名用户'
      }
      if (!val) {
        return '***'
      }
      // 需求变更: 2021-10-26 这里需求改变,需要处理如果昵称也为一串加密数字，那么数字需要全部展示，不能加密
      const startString = val.slice(0, 1)
      if (!isNaN(Number(startString))) {
        return val.split(' ')[0]
      } else {
        return `${startString}**`
      }
    },
    // 预览大图
    preview(img) {
      ImagePreview({
        images: [img],
        startPosition: 0,
        closeable: true,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.comment {
  background: #fff;
  border-radius: 24px;
  margin-bottom: 24px;
  .tile-wrap {
    height: 106px;
    padding: 48px 40px 18px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .tile-tile {
      line-height: 1;
      font-size: 40px;
      color: #000000;
      font-weight: bold;
    }
    .tile-more {
      display: flex;
      &__txt {
        font-size: 26px;
        line-height: 1;
        color: #999999;
        margin-right: 14px;
      }
    }
  }
  .content-wrap {
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
          margin-bottom: 11px;
          width: 380px;
          .mixin-text-oneoverflow();
        }
        &__content {
          display: flex;
          align-items: center;
          .score {
            margin-right: 24px;
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
          .date {
            color: #999999;
            font-size: 24px;
            line-height: 1;
          }
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
    .content {
      margin-top: 13px;
      margin-left: 100px;
      &-txt {
        .textOverflow(3);
        color: #222222;
        font-size: 26px;
        line-height: 38px;
      }
      &-img {
        display: flex;
        flex-wrap: wrap;
        &__item {
          height: 184px;
          width: 184px;
          border-radius: 8px;
          margin-top: 12px;
          margin-right: 8px;
          &.z-last {
            margin-right: 0;
          }
        }
      }
    }
    .tips {
      margin-left: 100px;
      margin-top: 12px;
      display: flex;
      &-icon {
        margin-right: 12px;
      }
      &-desc {
        width: 560px;
        .mixin-text-oneoverflow();
        font-size: 24px;
        line-height: 1;
        color: #999;
      }
    }
  }
}
</style>
