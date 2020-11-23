<template>
  <div class="search">
    <!--S 搜索框-->
    <div class="search_input_con">
      <div class="con">
        <my-icon name="sear_ic_sear" size="0.28rem" color="#999" />
        <input type="text" placeholder="请输入搜索内容" v-model="keywords" />
      </div>
      <p class="cancel">取消</p>
    </div>
    <!--E 搜索框-->
    <!--S 内容-->
    <div class="search_con">
      <!--S 有搜索历史-->
      <div v-show="historySearch.length && !keywords" class="has_history">
        <div class="has_history_title">
          <p>搜索历史</p>
          <my-icon name="search_ic_deleted" size="0.22rem" color="#1a1a1a" />
        </div>
        <div class="has_history_con">
          <div
            v-for="(item, index) in historySearch"
            :key="index"
            class="has_history_con_item"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <!--E 有搜索历史-->
      <!--S 无搜索历史-->
      <div v-show="!historySearch.length && !keywords" class="no_history">
        <p>没有任何搜索历史</p>
      </div>
      <!--E 无搜索历史-->
    </div>
    <!--E 内容-->
  </div>
</template>

<script>
export default {
  name: 'FoundSearch',
  data() {
    return {
      historySearch: [
        '科技公司',
        '账目干净',
        '成立三年',
        '小规模记账',
        '纳税人代理记账',
      ], // 搜索历史
      keywords: '', // 搜索索引关键字
    }
  },
}
</script>

<style lang="less" scoped>
.search {
  padding: 0 40px;
  &_input_con {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 16px 40px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .con {
      width: 568px;
      height: 96px;
      background: #ffffff;
      border: 1px solid #cdcdcd;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.06);
      border-radius: 8px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: row;
      padding: 0 27px;
      input {
        width: 100%;
        height: 92px;
        text-indent: 15px;
        border: none;
        font-size: 30px;
        color: #1a1a1a;
        font-weight: bold;
        &:focus {
          outline: none;
        }
        //去除点击时候的背景色
        -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
      }
      //修改input-placeholder样式
      ::-webkit-input-placeholder {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #999999;
      }
    }
    .cancel {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #1a1a1a;
      line-height: 44px;
    }
  }
  &_con {
    margin-top: 128px;
    display: flex;
    .no_history {
      margin-top: 279px;
      display: flex;
      justify-content: center;
      align-items: center;
      p {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #1a1a1a;
      }
    }
    .has_history {
      margin-top: 49px;
      &_title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        p {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #1a1a1a;
          line-height: 44px;
        }
      }
      &_con {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: wrap;
        margin-top: 17px;
        &_item {
          height: 64px;
          background: #f9f9f9;
          border-radius: 4px;
          padding: 0 25px;
          margin-right: 16px;
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #222222;
          text-align: center;
          line-height: 64px;
          margin-top: 16px;
        }
      }
    }
  }
}
</style>
