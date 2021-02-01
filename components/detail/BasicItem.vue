<template>
  <div class="item">
    <em>{{ baseDataList.listName }}:</em>
    <div
      :class="{
        'item-dropDown':
          baseDataList.listDropDown && baseDataList.listVal.length > 40,
        'item-itemDown': isShow,
      }"
    >
      <span class="dropDownContent">{{ baseDataList.listVal }}</span>
      <span
        v-if="baseDataList.listDropDown && baseDataList.listVal.length > 40"
        class="more-icon-btn"
        @click="handlToggleDropDown"
      >
        {{ isShowText }}
        <em class="more-icon">
          <my-icon size="0.32rem" color="#4974f5" name="notify_ic_next" />
        </em>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicItem',
  props: {
    baseDataList: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isShowText: '查看全部信息',
      isShow: false,
    }
  },
  methods: {
    handlToggleDropDown() {
      this.isShow = !this.isShow
      if (this.isShow) {
        this.isShowText = '收起全部信息'
      } else {
        this.isShowText = '查看全部信息'
      }
    },
  },
}
</script>

<style scoped lang="less">
.dropDownContent {
  color: #222222;
}
.item {
  min-width: 50%;
  max-width: 100%;
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 400;
  color: #999999;
  margin-top: 32px;
  display: flex;
  em {
    font-style: normal;
    width: 150px;
  }
  &-dropDown {
    color: #222222;
    flex: 1;
    position: relative;
    margin-bottom: 95px;
    &::after {
      content: '...';
      display: inline-block;
      position: absolute;
      width: 40px;
      background-color: #fff;
      bottom: 0px;
      right: 0px;
    }
    .dropDownContent {
      color: #222222;
      max-height: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: inline-block;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      transition: all 0.3s;
    }
    .more-icon-btn {
      position: absolute;
      bottom: -95px;
      width: 233px;
      height: 31px;
      line-height: 31px;
      left: 65px;
      display: inline-block;
      color: #4974f5;
      .more-icon {
        height: 31px;
        line-height: 31px;
        width: initial;
        float: right;
        display: inline-block;
        transform: rotate(90deg);
        -ms-transform: rotate(90deg); /* IE 9 */
        -moz-transform: rotate(90deg); /* Firefox */
        -webkit-transform: rotate(90deg); /* Safari 和 Chrome */
        -o-transform: rotate(90deg); /* Opera */
        transition: all 0.3s;
      }
    }
  }
  &-itemDown {
    &::after {
      display: none;
    }
    .dropDownContent {
      max-height: 1300px;
    }
    .more-icon-btn {
      .more-icon {
        transform: rotate(-90deg);
        -ms-transform: rotate(-90deg); /* IE 9 */
        -moz-transform: rotate(-90deg); /* Firefox */
        -webkit-transform: rotate(-90deg); /* Safari 和 Chrome */
        -o-transform: rotate(-90deg); /* Opera */
        transition: all 0.3s;
      }
    }
  }
  & > div {
    flex: 1;
  }
}
</style>
