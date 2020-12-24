<template>
  <div
    :class="{
      'problem-list': true,
      'problem-action': itemAction,
    }"
  >
    <h2 class="problem-list-title" @click="handleShowItem">
      <my-icon size="0.32rem" color="#4974F5" name="command_img_questions" />
      <span>专利转让合同中哪些是重点？</span>
      <em class="more-icon">
        <my-icon size="0.32rem" color="#969799" name="notify_ic_next" />
      </em>
    </h2>
    <div class="problem-list-box">
      <my-icon size="0.32rem" color="#FA7769" name="command_img_answers" />
      <div class="problem-list-box-center">
        <p>一、有效性审查</p>
        <p>
          签字前需要确认转让人是否是唯一专利权人，若不是需拿到专利权共有人的书面同意转让证明。还要确认专利是否在有效期内，在转让前是否已经许可他人使用或拿去质押融资。
        </p>
        <p>二、转让或许可的范围</p>
        <p>
          转让专利权有多种方式，是普通转让、排他转让、还是独家转让。如果不是独家转让的，还有明确具体专利实施许可范围，比如在什么地域什么时间可以实施该专利等。还有，对于专利技术的实施，转让人是否给予技术资料支持，是否提供实际专利技术实施的指导、指导时间。
        </p>
        <p>三、费用问题</p>
        <p>
          约定好转让费及支付方式，一次性支付还是分阶段、按实施收益支付。如果受让人因故未付清全部费用，是否要求受让人停止实施专利、是否要求归属技术资料等等。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProblemItem',
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
