<template>
  <div
    :class="{
      'problem-list': true,
      'problem-action': itemAction,
    }"
  >
    <h2 class="problem-list-title" @click="handleShowItem">
      <my-icon size="0.32rem" color="#4974F5" name="command_img_questions" />
      <span>{{ itemData.title }}</span>
      <em class="more-icon">
        <my-icon size="0.32rem" color="#969799" name="notify_ic_next" />
      </em>
    </h2>
    <div class="problem-list-box">
      <my-icon size="0.32rem" color="#FA7769" name="command_img_answers" />
      <div class="problem-list-box-center" v-html="itemData.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemItem',
  props: {
    itemData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      itemAction: false,
    }
  },
  methods: {
    handleShowItem() {
      this.itemAction = !this.itemAction
    },
  },
}
</script>

<style scoped lang="less">
.problem {
  &-list {
    padding: 39px 40px;
    background-color: #fff;
    margin-bottom: 24px;
    &-title {
      display: flex;
      justify-content: space-between;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 40px;
      span {
        flex: 1;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      & > i {
        margin-right: 14px;
      }
      .more-icon {
        height: 40px;
        line-height: 40px;
        text-align: center;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg); /* Opera */
        transition: all 0.3s;
      }
    }
    &-box {
      display: flex;
      max-height: 0px;
      overflow: hidden;
      transition: all 0.3s;
      i {
        padding-right: 18px;
        margin-top: 24px;
      }
      &-center {
        font-size: 26px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #666666;
        line-height: 40px;
        margin-top: 24px;
        p {
          margin-bottom: 5px;
        }
      }
    }
  }
  &-action {
    .problem-list-box {
      max-height: 1500px;
    }
    .more-icon {
      text-align: center;
      transform: rotate(-90deg);
      -ms-transform: rotate(-90deg); /* IE 9 */
      -moz-transform: rotate(-90deg); /* Firefox */
      -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
      -o-transform: rotate(-90deg); /* Opera */
    }
  }
}
</style>
