<template>
  <div class="good-commentlist">
    <Header title="面谈记录">
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
          <div class="content">
            <div class="content-txt">
              奥克斯广场才开不久的一奥克斯广场才开不久的一奥克斯广场才开不久的一奥克斯广场才开不久的一奥克斯广场才开不久的一
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
              name="biaoqian"
              size="0.24rem"
              color="#999999"
            ></my-icon>
            <div class="tips-desc">
              性价比高，服务质量好，办理效率高,性价比高，服务质量好，办理效率高
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
    }
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
    }
    .score {
      margin-left: 100px;
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
    .content {
      margin-top: 24px;
      margin-left: 100px;
      &-txt {
        .textOverflow(3);
        color: #222222;
        font-size: 26px;
        line-height: 38px;
      }
      &-img {
        margin-top: 12px;
        height: 184px;
        display: flex;
        &__item {
          height: inherit;
          width: 184px;
          border-radius: 8px;
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
