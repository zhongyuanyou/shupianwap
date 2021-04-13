<template>
  <div ref="myPage">
    <div v-if="!showHead2" class="head head1">
      <my-icon
        name="zuo"
        class="btn-icon"
        size="0.4rem"
        color="#1A1A1A"
        @click.native="onLeftClick"
      ></my-icon>
      <div class="btn-area">
        <span>
          <my-icon
            name="yaoqing"
            size="0.4rem"
            @click.native="onLeftClick"
          ></my-icon>
          邀请</span
        >
        <span>
          <my-icon
            v-if="answerDetails && answerDetails.createrId === userInfo.userId"
            class="back-icon"
            name="xiehuida"
            size="0.4rem"
            @click.native="onLeftClick"
          ></my-icon>
          写回答</span
        >
      </div>
    </div>
    <div v-if="showHead2" class="head head2">
      <my-icon
        class="btn-icon"
        name="nav_ic_back"
        size="0.4rem"
        color="#1A1A1A"
        @click.native="onLeftClick"
      ></my-icon>
      <div class="user-info">
        <sp-image class="img" src="" />
        <div class="infos">
          <p>周转</p>
          我是一个牛人
        </div>
        <div class="btn">
          <sp-button>关注</sp-button>
        </div>
      </div>
    </div>
    <div class="title-area">
      <div class="title">哪部电影让你最有所触动？</div>
      <div class="nums-area">300个回答 · 200个关注</div>
    </div>
    <div class="main">
      <div class="user-info">
        <sp-image class="img" src="" />
        <div class="infos">
          <p>周转</p>
          我是一个牛人
        </div>
        <div class="btn">
          <sp-button>关注</sp-button>
        </div>
      </div>
      <div class="content">
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言。翻译还支持基尼亚卢旺达语、鞑靼语和维吾尔语的虚拟键盘输入。<br />
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）<br />
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言
        近日，据外媒报道，谷歌翻译新增了5种语音的翻译，它们分别是基尼亚卢旺达语（卢旺达）、奥里亚语（印度）、
        鞑靼语、土库曼语（土库曼斯坦），还有维吾尔语。这些语言目前的使用者大约为7500万人。这是谷歌自2016年以来首次新增翻译语言
      </div>
      <p class="pub-time">编辑于2021-05-10 16:40</p>
    </div>
    <Comment :article-id="'1'" />
    <div class="page-bottom">
      <div class="left-area">
        <span class="icon" @click="handleClickBottom(1)">
          <my-icon name="msg_ic_emoji" size="0.3rem" color="#000000"></my-icon
        ></span>
        <span class="text">赞同9999</span>
        <span class="icon" @click="handleClickBottom(2)">
          <my-icon name="msg_ic_emoji" size="0.3rem" color="#000000"></my-icon
        ></span>
      </div>
      <div class="right-area">
        <div class="item" @click="handleClickBottom(3)">
          <div class="icon">
            <my-icon name="shoucang" size="0.4rem" color="#999999"></my-icon>
          </div>
          收藏
        </div>
        <div class="item" @click="handleClickBottom(4)">
          <div class="icon">
            <my-icon name="pinglun" size="0.4rem" color="#999999"></my-icon>
          </div>
          评论
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Field, Tab, Tabs, Button, Image, Toast } from '@chipspc/vant-dgg'
import Comment from '~/components/mustKnown/DetailComment'
export default {
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [Field.name]: Field,
    Comment,
  },
  data() {
    return {
      showHead2: false,
      commentList: [
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
      commentList2: [],
      answerDetails: '',
      headerData: {},
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.user
    },
  },
  created() {
    if (this.$route.params.id) {
      this.currentDetailsId = this.$route.params.id
    } else {
      this.currentDetailsId = '8065065421625749504'
    }
    this.getDetailData()
  },
  mounted() {
    this.commentList2 = JSON.parse(JSON.stringify(this.commentList)).splice(
      0,
      2
    )
    // this.$refs.myPage.addEventListener('scroll', this.handleScoll)
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getDetailData() {
      const baseUrl =
        'http://172.16.132.255:7001/service/nk/question_article/v2/find_detail.do'
      this.loading = true
      this.$axios
        .get(baseUrl, {
          params: {
            id: this.currentDetailsId,
            userId: this.userInfo.userId || '120',
            userHandleFlag: 1,
            userType: this.userInfo.userType === 'ORDINARY_USER' ? 1 : 2,
            userName: this.userInfo.userName || '测试用户',
          },
        })
        .then((res) => {
          this.loading = false
          if (res.code === 200) {
            this.answerDetails = res.data
            this.headerData.createrName = this.answerDetails.createrName
            this.headerData.contentText = this.answerDetails.contentText
            this.headerData.avatar = this.answerDetails.avatar
            this.answerDetails.content =
              '哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈'
          } else {
            Toast.fail({
              duration: 2000,
              message: '服务异常，请刷新重试！',
              forbidClick: true,
              className: 'my-toast-style',
            })
          }
        })
    },
    handleScoll() {
      // 获取推荐板块到顶部的距离 减 搜索栏高度
      const scrollTop = this.$refs.myPage.getBoundingClientRect().top // 滚动条距离顶部的位置
      console.log('scrollTop', scrollTop)
      if (scrollTop < 0) {
        this.showHead2 = true
      } else {
        this.showHead2 = false
      }
    },
    onLeftClick() {
      this.$router.back(-1)
    },
    answersortfn(index) {
      console.log(index)
    },
    handleClickBottom(type) {
      console.log('type', type)
      switch (type) {
        case 1:
          this.$xToast.show({
            message: '点赞成功',
          })
          break

        default:
          this.$xToast.show({
            message: '操作成功',
          })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.head {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  font-size: 30px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #4974f5;
  padding: 0 40px;
  z-index: 99;
  .btn-icon {
    float: left;
  }
}
.head1 {
  height: 88px;
  background: #ffffff;
  line-height: 88px;
  .btn-area {
    float: right;
    width: auto;
    height: 100%;
    span {
      padding: 0 20px;
    }
  }
}
.head2 {
  height: 104px;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  .user-info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    padding: 16px 0;
    padding-left: 20px;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn {
      background: none;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #4974f5;
        border: none;
      }
    }
  }
  .btn-icon {
    line-height: 104px;
    float: left;
  }
}
.title-area {
  margin-top: 100px;
  padding: 20px 40px;
  border-bottom: 2px solid #ddd;
  .title {
    font-size: 40px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #222222;
    line-height: 68px;
    font-weight: 600;
  }
  .nums-area {
    font-size: 26px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #999999;
    margin: 20px 0;
    font-weight: 500;
  }
}
.main {
  padding: 40px;
  .user-info {
    display: flex;
    justify-content: space-between;
    .img {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: #d8d8d8;
      overflow: hidden;
    }
    .infos {
      flex: 1;
      height: 26px;
      font-size: 26px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #999999;
      line-height: 26px;
      padding-left: 20px;
      p {
        font-size: 30px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #222222;
        margin-bottom: 20px;
      }
    }
    .btn {
      width: 144px;
      height: 72px;
      background: #f5f5f5;
      border-radius: 12px;
      .sp-button {
        width: 100%;
        height: 100%;
        background: none;
        color: rgba(73, 116, 245, 1);
        display: block;
        float: left;
      }
    }
  }
  .content {
    padding-top: 40px;
    font-size: 34px;
    color: #666;
    font-weight: 400;
    color: #555555;
    line-height: 52px;
  }
  .pub-time {
    font-size: 26px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #999999;
    line-height: 26px;
    margin-top: 40px;
  }
}
.page-bottom {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 96px;
  background: #ffffff;
  padding: 10px 40px;
  border-top: 1px solid #ddd;
  .left-area {
    float: left;
    width: auto;
    height: 72px;
    background: #f2f5ff;
    border-radius: 8px;
    padding: 20px;
    span {
      display: block;
      float: left;
      margin-right: 4px;
    }
    .icon {
      padding: 0;
      width: 40px;
      height: 100%;
      line-height: 0;
      position: relative;
      .spiconfont {
        position: absolute;
        left: 0px;
        top: 20px;
        padding: 0;
        margin: 0;
        line-height: 0;
      }
    }
    .text {
      border-right: 1px solid #ddd;
      margin-right: 20px;
      font-size: 24px;
      color: #4974f5;
      font-weight: 500;
      padding-right: 20px;
    }
  }
  .right-area {
    float: right;
    width: auto;
    .item {
      height: 100%;
      float: left;
      margin-left: 10px;
      text-align: center;
      width: 80px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #999999;
      font-size: 28px;
      .icon {
        width: 100%;
        height: 40px;
      }
    }
  }
}
</style>
