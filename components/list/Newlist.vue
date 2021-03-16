<template>
  <div class="Newlist">
    <PullRefresh
      v-model="isLoading"
      :success-text="`刷新成功`"
      @refresh="onRefresh"
    >
      <List
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item, index) in list" :key="index" class="list">
          <div class="left">
            <img :src="item.img" alt="" />
          </div>
          <div class="right">
            <h1>{{ item.name }}</h1>
            <div class="tag">
              <p
                v-for="(tagitem, tagindex) in item.tag"
                :key="tagindex"
                :class="tagitem.is ? 'act' : ''"
              >
                {{ tagitem.name }}
              </p>
            </div>
            <p class="describe">
              {{ item.describe }}
            </p>
            <p class="price">{{ item.price }}元</p>
          </div>
        </div>
      </List>
    </PullRefresh>
  </div>
</template>

<script>
import { PullRefresh, List } from '@chipspc/vant-dgg'
export default {
  name: 'Newlist',
  components: {
    PullRefresh,
    List,
  },
  data() {
    return {
      loading: false,
      finished: false,
      isLoading: false,
      list: [
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司',
          tag: [
            { name: '活动标签', is: true },
            { name: '极速办理', is: false },
            { name: '好评多', is: false },
          ],
          describe: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123243432',
        },
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司',
          tag: [
            { name: '活动标签', is: true },
            { name: '极速办理', is: false },
            { name: '好评多', is: false },
          ],
          describe: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123243432',
        },
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司',
          tag: [
            { name: '活动标签', is: true },
            { name: '极速办理', is: false },
            { name: '好评多', is: false },
          ],
          describe: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123243432',
        },
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司',
          tag: [
            { name: '活动标签', is: true },
            { name: '极速办理', is: false },
            { name: '好评多', is: false },
          ],
          describe: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123243432',
        },
        {
          img:
            'https://anjia2.oss-cn-beijing.aliyuncs.com/test/1291267227269508147.png',
          name:
            '北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司北京市东城区  恒源置业**科技信 息公司',
          tag: [
            { name: '活动标签', is: true },
            { name: '极速办理', is: false },
            { name: '好评多', is: false },
          ],
          describe: '科技类 | 一般纳税人 | 50万 | 3年以上',
          price: '123243432',
        },
      ],
    }
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    onLoad() {
      setTimeout(() => {
        if (this.refreshing) {
          this.list = []
          this.refreshing = false
        }

        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        this.loading = false

        if (this.list.length >= 40) {
          this.finished = true
        }
      }, 1000)
    },
  },
}
</script>

<style lang="less" scoped>
.Newlist {
  .list {
    margin: 20px 20px 0 20px;
    padding: 20px;
    height: 253px;
    background: #fff;
    border-radius: 24px;
    box-sizing: border-box;
    display: flex;
    > .left {
      width: 160px;
      height: 160px;
      > img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    > .right {
      margin-left: 20px;
      width: calc(100% - 180px);
      > h1 {
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #222222;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      > .tag {
        margin-top: 10px;
        height: 35px;
        display: flex;
        align-items: center;
        > p {
          height: 32px;
          background: #f0f2f5;
          border-radius: 4px;
          padding: 0 9px;
          line-height: 32px;
          font-size: 22px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #5c7499;
          margin-left: 12px;
        }
        > p:nth-child(1) {
          margin-left: 0px;
        }
        > .act {
          background: #f1524e;
          color: #fff;
        }
      }
      > .describe {
        margin-top: 8px;
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #222222;
      }
      > .price {
        margin-top: 8px;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ec5330;
      }
    }
  }
}
</style>
