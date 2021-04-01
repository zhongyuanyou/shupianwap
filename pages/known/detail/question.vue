<template>
  <div class="detail" :style="{ paddingBottom: fixedshow ? '1.3rem' : '' }">
    <Header v-show="!commetnShow" :title="title">
      <template #left>
        <div>
          <sp-icon name="arrow-left" size="0.4rem" @click="$router.back()" />
        </div>
      </template>
      <template #right>
        <div class="btn">
          <sp-icon
            name="search"
            size="0.4rem"
            color="#1A1A1A"
            class="ss"
            @click="$router.push('/known/search')"
          />
          <sp-icon
            name="ellipsis"
            size="0.4rem"
            color="#1A1A1A"
            class="ellipsis"
          />
        </div>
      </template>
    </Header>
    <div class="problem">
      <div class="tag">
        <ul class="box">
          <li v-for="(item, index) in taglist" :key="index">{{ item }}</li>
        </ul>
      </div>
      <h1 ref="title" class="tit">{{ detail.title }}</h1>
      <div
        v-if="
          detail.imglist.length <= 2 &&
          detail.imglist.length > 0 &&
          !contentshow
        "
        class="imglist"
      >
        <div
          v-for="(item, index) in detail.imglist"
          :key="index"
          class="imgbox"
        >
          <img :src="item" alt="" />
        </div>
      </div>
      <div v-if="detail.imglist.length > 2 && !contentshow" class="imglist">
        <div class="imgbox">
          <img :src="detail.imglist[0]" alt="" />
        </div>
        <div class="imgbox1">
          {{ `+${detail.imglist.length}` }}
        </div>
      </div>
      <div class="content">
        <p v-if="!contentshow" class="tit">
          {{ detail.content }}
        </p>
        <div v-else class="tit" v-html="detail.content"></div>
        <div class="btn" @click="contentshow = !contentshow">
          <span class="tit">{{ contentshow ? '收起' : '展开' }}</span>
          <sp-icon
            :name="contentshow ? 'arrow-up' : 'arrow-down'"
            size="0.4rem"
            color="#999999"
            class="ellipsis"
          />
        </div>
      </div>
      <div class="num">
        <div class="left">
          <div>{{ detail.follow }} <span>关注</span></div>
          <p></p>
          <div>{{ detail.comment }} <span>收藏</span></div>
          <p></p>
          <div>{{ detail.visit }} <span>游览</span></div>
        </div>
        <div class="right" :class="detail.isLike ? 'act' : ''">好问题</div>
      </div>
      <div ref="btns" class="btns">
        <div class="box" @click="$router.push('/known/detail/invitationList')">
          <sp-icon name="friends-o" size="0.4rem" />
          <p>邀请回答</p>
        </div>
        <div class="box" @click="$router.push('/known/publish/answer')">
          <sp-icon name="edit" size="0.4rem" />
          <p>写回答</p>
        </div>
        <div class="box">
          <sp-icon
            name="like-o"
            size="0.4rem"
            :color="detail.isagree ? '#4974F5' : ''"
          />
          <p :style="{ color: detail.isagree ? '#4974F5' : '' }">已收藏</p>
        </div>
      </div>
    </div>
    <div class="success">
      <div>
        <sp-icon name="certificate" size="0.45rem" color="#00B365" /><span
          >成功提问</span
        >
      </div>
      <p>你可以邀请下面用户来更快获得回答</p>
    </div>
    <div v-if="detail.answer.length < 1" class="user">
      <div class="head">
        <div class="left">
          <h1>邀请知友为你解答</h1>
          <p>为你精选 34 位优质回答者</p>
        </div>
        <div class="right">一键邀请</div>
      </div>
      <div class="listbox">
        <div v-for="(item, index) in userlist" :key="index" class="list">
          <img :src="item.img" alt="" />
          <p>{{ item.userName }}</p>
          <div>邀请</div>
        </div>
      </div>
      <div class="none">没有更多了</div>
    </div>
    <div v-else class="answer">
      <div class="head">
        <p>回答 {{ detail.answer.length }}</p>
        <div>
          <i class="bg" :class="answersort == 1 ? 'right' : ''"></i>
          <span :class="answersort == 0 ? 'act' : ''" @click="answersortfn(0)"
            >默认</span
          >
          <span :class="answersort == 1 ? 'act' : ''" @click="answersortfn(1)"
            >最新</span
          >
        </div>
      </div>
      <div v-for="(item, index) in detail.answer" :key="index" class="list">
        <div class="head">
          <img :src="item.img" alt="" />
          <p>{{ item.username }}</p>
        </div>
        <p class="content">
          {{ item.content }}
        </p>
        <div class="foot">
          <p>{{ item.agree }} 赞同</p>
          <span></span>
          <p>{{ item.like }} 喜欢</p>
          <span></span>
          <p @click="commetnShow = true">{{ item.agree }} 评论</p>
          <span></span>
          <p>{{ item.time }}</p>
        </div>
      </div>
    </div>
    <div v-show="fixedshow" class="fiexdbtn">
      <div class="btn" @click="$router.push('/known/detail/invitationList')">
        <sp-icon name="friends-o" size="0.4rem" />
        <span>邀请回答</span>
      </div>
      <div class="btn" @click="$router.push('/known/publish/answer')">
        <sp-icon name="edit" size="0.4rem" />
        <span>写回答</span>
      </div>
      <div class="btn">
        <sp-icon
          name="like-o"
          size="0.4rem"
          :color="detail.isagree ? '#4974F5' : ''"
        />
        <span :style="{ color: detail.isagree ? '#4974F5' : '' }">收藏</span>
      </div>
    </div>
    <comment-list
      :show="commetnShow"
      :list="commetnList"
      @sort="sort"
      @release="sum"
      @close="commetnShow = false"
    ></comment-list>
  </div>
</template>

<script>
import { Icon } from '@chipspc/vant-dgg'
import Header from '@/components/common/head/header'
import CommentList from '~/components/mustKnown/commentList.vue'
export default {
  name: 'Detail',
  components: {
    Header,
    [Icon.name]: Icon,
    CommentList,
  },
  data() {
    return {
      title: '',
      taglist: ['公司注册', '公司注册', '公司注册'],
      contentshow: false,
      detail: {
        title:
          '最近发现很多流量明星一不小心就火了，我想问问为什么粉丝可以突然就爱上一个明星？',
        imglist: [
          'https://cn.vuejs.org/images/logo.png',
          'https://cn.vuejs.org/images/logo.png',
          'https://cn.vuejs.org/images/logo.png',
        ],
        content:
          '尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长，他是你的尤其是有很多流浪都是有铁粉的，我理解铁粉不是应该一开始关注随着时间推长，他是你的',
        follow: '5',
        comment: '10',
        visit: '200',
        answer: [
          {
            username: '用户',
            img: 'https://cn.vuejs.org/images/logo.png',
            content:
              '心理学的研究发现，人们很容易相信一个笼统的人格描述，即使这种描述十分空洞，但仍然会认为反映了自己的人格面貌。心理学的研究发现，人们…',
            agree: '10',
            like: '20',
            comment: '20',
            time: '22小时前',
          },
          {
            username: '用户',
            img: 'https://cn.vuejs.org/images/logo.png',
            content:
              '心理学的研究发现，人们很容易相信一个笼统的人格描述，即使这种描述十分空洞，但仍然会认为反映了自己的人格面貌。心理学的研究发现，人们…',
            agree: '10',
            like: '20',
            comment: '20',
            time: '22小时前',
          },
          {
            username: '用户',
            img: 'https://cn.vuejs.org/images/logo.png',
            content:
              '心理学的研究发现，人们很容易相信一个笼统的人格描述，即使这种描述十分空洞，但仍然会认为反映了自己的人格面貌。心理学的研究发现，人们…',
            agree: '10',
            like: '20',
            comment: '20',
            time: '22小时前',
          },
          {
            username: '用户',
            img: 'https://cn.vuejs.org/images/logo.png',
            content:
              '心理学的研究发现，人们很容易相信一个笼统的人格描述，即使这种描述十分空洞，但仍然会认为反映了自己的人格面貌。心理学的研究发现，人们…',
            agree: '10',
            like: '20',
            comment: '20',
            time: '22小时前',
          },
        ],
        isLike: true,
        isagree: true,
      },
      userlist: [
        { userName: '用户', img: 'https://cn.vuejs.org/images/logo.png' },
      ],
      answersort: 0,
      fixedshow: false,
      scrollTop: 0,
      commetnShow: false,
      commetnList: [
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
        {
          username: '用户1',
          img: 'https://cn.vuejs.org/images/logo.png',
          time: '2010-01-11',
          content:
            '看串行，看成“祝每一个有梦想的人，都死得其所看串行，看成“祝每一个有梦想的人。',
          isLike: true,
          Likes: '1111',
        },
      ],
    }
  },
  mounted() {
    window.addEventListener('scroll', this.watchScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.watchScroll)
  },
  methods: {
    sum(val) {
      console.log(val)
    },
    sort(value) {
      console.log(value)
    },
    answersortfn(index) {
      console.log(index)
    },
    watchScroll() {
      if (this.$refs.btns.getBoundingClientRect().top < 0) {
        this.fixedshow = true
      } else {
        this.fixedshow = false
      }
      if (this.$refs.title.getBoundingClientRect().top < 0) {
        this.title = this.detail.title
      } else {
        this.title = ''
      }
    },
  },
}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background: #f5f5f5;
  /deep/.my-head {
    padding: 0 32px;
    box-sizing: border-box;
    .title {
      > span {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        width: 500px;
        margin: 0 auto;
      }
    }
  }
  > .problem {
    padding-top: 20px;
    background: #fff;
    > .tag {
      width: 100%;
      overflow: auto;
      padding: 0 32px;
      margin-bottom: 36px;
      > .box {
        display: flex;
        width: auto;
        > li {
          background: #f5f5f5;
          border-radius: 8px;
          padding: 16px 24px;
          font-size: 28px;
          font-weight: 400;
          color: #999999;
          margin-left: 16px;
        }
        > li:first-child {
          margin-left: 0;
        }
      }
    }
    > .tit {
      font-size: 40px;
      margin-bottom: 28px;
      font-weight: 600;
      color: #222222;
      padding: 0 32px;
      line-height: 56px;
    }
    > .imglist {
      display: flex;
      padding: 0 32px;
      justify-content: space-between;
      margin-bottom: 28px;
      > .imgbox {
        width: 339px;
        height: 226px;
        background: #f5f5f5;
        border-radius: 12px;
        overflow: hidden;
        > img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
      > .imgbox1 {
        width: 339px;
        height: 226px;
        background: rgba(0, 0, 0, 0.4);
        font-size: 52px;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        line-height: 226px;
        border-radius: 12px;
      }
    }
    > .content {
      font-size: 30px;
      font-weight: 400;
      color: #555555;
      line-height: 42px;
      padding: 0 32px;
      position: relative;
      margin-bottom: 48px;
      > .tit {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      > div.tit {
        display: block;
      }
      > .btn {
        margin-top: 20px;
        font-size: 28px;
        font-weight: 400;
        color: #999999;
        display: flex;
        align-items: center;
        justify-content: flex-end;
      }
    }
    > .num {
      display: flex;
      padding: 0 32px;
      align-items: center;
      margin-bottom: 40px;
      > .left {
        display: flex;
        > div {
          font-size: 24px;
          font-weight: 500;
          color: #222222;
          > span {
            color: #999999;
          }
        }
        > p {
          width: 4px;
          height: 4px;
          background: #999999;
          border-radius: 50%;
          margin: 0 16px;
          align-self: center;
        }
      }
      > .right {
        width: 156px;
        height: 56px;
        background: #f5f5f5;
        border-radius: 28px;
        font-size: 24px;
        font-weight: 500;
        color: #999999;
        margin-left: auto;
        text-align: center;
        line-height: 56px;
      }
      > .act {
        background: #f2f5ff;
        color: #4974f5;
      }
    }
    > .btns {
      display: flex;
      border-top: 1px solid #dddddd;
      border-bottom: 1px solid #dddddd;
      > .box {
        padding-top: 23px;
        box-sizing: border-box;
        width: 33%;
        height: 118px;
        font-size: 26px;
        font-weight: 500;
        color: #555555;
        text-align: center;
        border-left: 1px solid #ddd;
      }
      > .box:first-child {
        border-left: none;
      }
    }
  }
  > .success {
    margin-top: 21px;
    background: #fff;
    padding: 32px 0 40px 0;
    border: 1px solid #dddddd;
    > div {
      text-align: center;
      font-size: 40px;
      font-weight: 600;
      color: #222222;
      /deep/ i {
        vertical-align: -11px;
        margin-right: 5px;
      }
    }
    > p {
      margin-top: 24px;
      font-size: 28px;
      font-weight: 400;
      color: #999999;
      text-align: center;
    }
  }
  > .user {
    background: #fff;
    > .head {
      display: flex;
      align-items: center;
      height: 162px;
      padding: 0 32px;
      > .left {
        > h1 {
          font-size: 32px;
          font-weight: 600;
          color: #222222;
        }
        > p {
          margin-top: 16px;
          font-size: 26px;
          font-weight: 400;
          color: #999999;
        }
      }
      > .right {
        margin-left: auto;
        width: 144px;
        height: 72px;
        background: #f2f5ff;
        border-radius: 8px;
        font-size: 26px;
        font-weight: 500;
        color: #4974f5;
        text-align: center;
        line-height: 72px;
      }
    }
    > .listbox {
      margin: 0 32px;
      border-top: 1px solid #dddddd;
      padding-bottom: 58px;
      > .list {
        display: flex;
        margin: 20px 0;
        align-items: center;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          border-radius: 50%;
          margin-right: 24px;
        }
        > p {
          font-size: 30px;
          font-weight: 500;
          color: #222222;
        }
        > div {
          width: 144px;
          height: 72px;
          background: #4974f5;
          border-radius: 8px;
          font-size: 26px;
          font-weight: 500;
          color: #ffffff;
          margin-left: auto;
          text-align: center;
          line-height: 72px;
          box-sizing: border-box;
        }
      }
    }
    > .none {
      background: #f5f5f5;
      height: 96px;
      font-size: 24px;
      font-weight: 400;
      color: #999999;
      line-height: 96px;
      text-align: center;
    }
  }
  > .answer {
    margin-top: 21px;
    > .head {
      padding: 0 32px;
      height: 96px;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      background: #fff;
      > p {
        font-size: 30px;
        font-weight: 500;
        color: #222222;
      }
      > div {
        width: 216px;
        height: 60px;
        background: #f5f5f5;
        border-radius: 31px;
        position: relative;
        display: flex;
        margin-left: auto;
        align-items: center;
        > span {
          width: 104px;
          height: 52px;
          display: block;
          font-size: 26px;
          font-weight: 500;
          color: #999999;
          text-align: center;
          line-height: 52px;
          position: relative;
          z-index: 1;
        }
        > .act {
          color: #222222;
        }
        > .bg {
          width: 104px;
          height: 52px;
          background: #ffffff;
          border-radius: 27px;
          display: block;
          position: absolute;
          z-index: 0;
          top: 4px;
          left: 4px;
          transition: all 0.3s;
        }
        > .right {
          left: 108px;
          transition: all 0.3s;
        }
      }
    }
    > .list {
      margin-bottom: 10px;
      background: #fff;
      padding: 32px 32px 40px 32px;
      > .head {
        display: flex;
        align-items: center;
        > img {
          width: 72px;
          height: 72px;
          background: #d8d8d8;
          object-fit: cover;
          border-radius: 50%;
        }
        > p {
          font-size: 30px;
          font-weight: 600;
          color: #222222;
          margin-left: 16px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      > .content {
        margin-top: 22px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3;
        overflow: hidden;
        font-size: 30px;
        font-weight: 400;
        color: #555555;
      }
      > .foot {
        margin-top: 20px;
        display: flex;
        align-items: center;
        > p {
          font-size: 26px;
          font-weight: 400;
          color: #999999;
        }
        > span {
          width: 4px;
          height: 4px;
          background: #999999;
          display: block;
          margin: 0 16px;
        }
      }
    }
  }
  > .fiexdbtn {
    position: fixed;
    height: 104px;
    background: #ffffff;
    width: 100vw;
    bottom: -1px;
    left: 0;
    display: flex;
    align-items: center;
    z-index: 2;
    justify-content: space-between;
    padding: 0 32px;
    box-sizing: border-box;
    > .btn {
      width: 216px;
      height: 72px;
      background: #ffffff;
      border-radius: 8px;
      border: 1px solid #dddddd;
      font-size: 28px;
      font-weight: 500;
      color: #222222;
      text-align: center;
      line-height: 72px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
