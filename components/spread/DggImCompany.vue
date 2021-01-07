<template>
  <sp-popup v-model="isPopupShow" position="bottom" class="chat">
    <div class="chat-box">
      <div class="chat-box_head">
        <span>{{
          recommendPlannerName ? recommendPlannerName : '顶呱呱平台'
        }}</span>
        <span @click="isPopupShow = false">
          <my-icon name="sear_ic_open" size="0.2rem" color="#ffffff"></my-icon>
        </span>
      </div>
      <div ref="viewBox" class="mobile-page">
        <template v-for="(item, index) in currentChatData">
          <div v-if="item.isUser" :key="index" class="user-group">
            <div class="user-msg">
              <h2 class="time">{{ item.createTime | timeFormat }}</h2>
              <pre
                class="user-reply"
                v-html="covertMessageText(item.text)"
              ></pre>
              <i class="triangle-user"></i>
            </div>
            <img
              class="user-img"
              src="https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/jyextension/emojis/ggw/ggw_1.png"
            />
          </div>
          <div v-else :key="index" class="admin-group">
            <img class="admin-img" :src="plannerImgSrc" />
            <div class="admin-msg">
              <h2 class="time">{{ item.createTime | timeFormat }}</h2>
              <i class="triangle-admin"></i>
              <pre
                class="admin-reply"
                v-html="covertMessageText(item.text)"
              ></pre>
            </div>
          </div>
        </template>
      </div>
      <!-- 输入消息 -->
      <div class="msg-input-bgk">
        <div v-if="emojishow" class="emoji-box">
          <div
            v-for="(currentEmojiArr, index) in currentAlbumKeys"
            :key="index"
          >
            <img
              v-for="(currentEmojiKey, keyIndex) in currentEmojiArr"
              :key="keyIndex"
              class="emoji-content-item"
              :src="emojiList[currentAlbum][currentEmojiKey].img"
              :class="
                currentAlbum == 'emoji' || currentAlbum == 'ggw'
                  ? 'emoji-content-img-emoji'
                  : 'emoji-content-img-other'
              "
              :data-src="emojiList[currentAlbum][currentEmojiKey].img"
              :data-emoji="currentEmojiKey"
              @click="emojiTap"
            />
          </div>
        </div>
        <span class="emoji-icon" @click="emoji">
          <!--            <i class="emoji" @click="emoji"></i>-->
          <my-icon
            name="msg_ic_emoji"
            size="0.4rem"
            color="#333"
            class="emoji"
          ></my-icon>
        </span>
        <textarea
          ref="msgInput"
          v-model="userText"
          style="softinputnavbar: none"
          class="inputText"
          placeholder="请输入"
          rows="1"
          @focus="closeEmoji"
        ></textarea>
        <!--          <div-->
        <!--            ref="msgInput"-->
        <!--            class="inputText"-->
        <!--            contenteditable="true"-->
        <!--            @keyup.enter="addMessageClick"-->
        <!--          >-->
        <!--            {{ userText }}-->
        <!--          </div>-->
        <a class="button" @click="addMessageClick">发送</a>
      </div>
    </div>
  </sp-popup>
</template>

<script>
import axios from 'axios'
import { Popup, Toast } from '@chipspc/vant-dgg'
// import { Popup, ScrollView, Toast, Icon } from 'mand-mobile'
import sdk from '@dgg/im-sdk'
import httpSign from '@dgg/http-sign'

import emojimap from '@/utils/spread/emojimap.js'
import utils from '@/utils/spread/imutil.js'
import EmojiObj from '@/utils/spread/emojimap'
export default {
  components: {
    [Popup.name]: Popup,
    [Toast.name]: Toast,
  },
  filters: {
    timeFormat(timestamp) {
      const formatNumber = (n) => {
        n = n.toString()
        return n[1] ? n : '0' + n
      }
      if (timestamp.toString().length <= 13) {
        const date = new Date(timestamp * 1)
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()
        const hour = date.getHours()
        const minute = date.getMinutes()
        const second = date.getSeconds()
        return [hour, minute, second].map(formatNumber).join(':')
      } else {
        return timestamp
      }
    },
  },
  data() {
    const DGG_SERVER_ENV = process.env.DGG_SERVER_ENV
    return {
      // 聊天框弹窗
      isPopupShow: false,
      dggenv: DGG_SERVER_ENV,
      plannerImgSrc:
        'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg',
      // 游客输入的内容
      userText: '',
      // im
      nimSdk: null,
      // 聊天信息
      currentChatData: [
        {
          text:
            '您好，欢迎来到【顶呱呱平台】，我是您的专属接待客服，请问有什么可以帮助您呢？',
          createTime: new Date().getTime(),
          isUser: false,
        },
      ],
      // 保存游客信息
      userInfo: {},
      emojishow: false,
      currentAlbumKeys: [], // 存储每一类别的key
      albumArr: [],
      currentAlbum: 'emoji',
      emojiList: {},
      userCenterId: '',
      recommendPlannerId: '', // 推荐规划师id
      recommendPlannerName: '', // 推荐规划师name
      recommendPlannerNum: '',
      // 重连轮询定时器
      reconnectInterval: null,
      // 是否是自动关闭的WebSocket
      isAutoDisConnect: true,
      // 聊天记录的groupID
      groupId: '',
      //
      inputTimer: null,
    }
  },
  watch: {
    userText(newVal) {
      // 当输入框里文字变化时，重新设置输入框的高度
      this.getInputHeight(this.$refs.msgInput)
    },
    isPopupShow(newVal) {
      if (!newVal) {
        // 当关闭对话框时，除了第一句问好，清除聊天数据，下次打开接口获取
        this.currentChatData = [
          {
            text:
              '您好，欢迎来到【顶呱呱平台】，我是您的专属接待客服，请问有什么可以帮助您呢？',
            createTime: new Date().getTime(),
            isUser: false, // true是用户，false是规划师
          },
        ]
        // 当关闭对话框时，关闭表情框
        this.emojishow = false
      }
    },
    // isPopupShow(val) {
    //   val === false
    //     ? (document.body.style.overflow = 'auto')
    //     : (document.body.style.overflow = 'hidden')
    // },
  },
  created() {
    // 在vue根实例上监听openIMM方法，对应的在需要的地方触发openIMM方法
    this.$root.$on('openIMM', (id, name, num, imgSrc) => {
      // id是规划师id，name是规划师名字，num是规划师工号，imgSrc是规划师头像
      if (imgSrc) {
        this.plannerImgSrc = imgSrc
      } else {
        this.plannerImgSrc =
          'https://tenant-assets.meiqiausercontent.com/avatars/16984/5uyI/HqRHeYKk3pkWUn04xfOB.jpg'
      }
      this.isPopupShow = true
      this.createSession(id, name, num)
    })
  },
  beforeMount() {
    const currentAlbumKeys = this.splitAlbumKeys(
      Object.keys(EmojiObj.emojiList[this.currentAlbum])
    )
    this.albumArr = EmojiObj.albumArr
    this.emojiList = EmojiObj.emojiList
    this.currentAlbumKeys = currentAlbumKeys
  },
  mounted() {
    //
    // window.addEventListener('keydown', function (event) {
    //   console.log(event)
    //   if (event.keyCode === 9) {
    //     event.keyCode = 0
    //     return false
    //   }
    // })
    // window.addEventListener('keyup', function (event) {
    //   console.log(event)
    //   if (event.keyCode === 9) {
    //     event.keyCode = 0
    //     return false
    //   }
    // })
    // document.activeElement.blur()
    // 创建网络在线/离线监听事件
    window.addEventListener('online', this.updateWebSocketStatus)
    window.addEventListener('offline', this.updateWebSocketStatus)
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval)
    }
    this.nimSdk = null
    sdk.sdkInstance = null
    // 初始化im
    this.nimSdk = sdk.instance({
      env: 'P',
      appKey: '3QMIICNFHJNHTLSTL88NPJRRJT', // 正式:'3QMIICNFHJNHTLSTL88NPJRRJT', 测试:5AF8SNB3AO6SQI962GI3B0OMBK
      userType: 'visitor',
      cilentToken: '',
      platform: 'web',
      initSessionListGroupType: null,
      userId: '',
      token: '',
      sysCode: 'dgg-jy',
      secret: 'e97bd82e0f7ff420d0728a41773f3ec7', // 正式:'e97bd82e0f7ff420d0728a41773f3ec7' 测试:650c1b1742f5c1433ca6758578ca1f4d
      sessionPageNumber: 1,
      sessionPageSize: 100,
      // 我的信息回调
      myInfo: this.myInfo,
      // 会话列表回调
      onSessions: (res) => {},
      // 发送消息后消息回调
      onMessage: this.onMessage,
      // scoket连接成功回调
      onConnect: (res) => {
        console.log('onconnect', res)
        if (this.reconnectInterval) {
          clearInterval(this.reconnectInterval)
        }
      },
      // scoket连接关闭回调
      onClose: (res) => {
        console.log('onclose', res)
        const that = this
        // TODO 判断标识
        if (this.isAutoDisConnect) {
          try {
            this.setDisConnect()
            // 改变标识变量的值
          } catch (e) {}
          try {
            setTimeout(() => {
              // 重连
              this.setOnline()
            }, 1000)
          } catch (e) {}
        }
      },
      // 错误信息回调
      onError: (res) => {
        console.log('onerr', res)
      },
    })
  },
  beforeDestroy() {
    // 销毁网络在线/离线监听事件
    window.removeEventListener('online', this.updateWebSocketStatus)
    window.removeEventListener('offline', this.updateWebSocketStatus)
    if (this.reconnectInterval) {
      clearInterval(this.reconnectInterval)
    }
    if (this.nimSdk) {
      this.nimSdk.disConnect()
      this.nimSdk = null
      sdk.sdkInstance = null
    }
  },
  methods: {
    getInputHeight(el) {
      // console.log(el)
      // 延时设置输入框高度
      clearTimeout(this.inputTimer)
      this.inputTimer = null
      this.inputTimer = setTimeout(() => {
        el.style.height = 'auto' // 必须设置为auto
        el.style.height = el.scrollHeight + 'px'
      }, 20)
    },
    // 点击发送消息
    addMessageClick() {
      const that = this
      if (!that.userText.trim()) {
        Toast.fail('不能发送空白消息')
        return
      }
      // 发送消息
      const ext = {
        sysCode: 'dgg-jy',
        sender: '客户通过推广页',
        JPUSH: that.recommendPlannerId,
        CORP_WECHAT: that.recommendPlannerNum,
      }
      that.sendMessage(
        {
          recver: that.recommendPlannerId, // 私聊, 接收者用户中心id7936100551358005248
          receiveType: 1,
          msgType: 'text',
          msgClass: 5,
          content: {
            text: that.userText,
            // ext: '拓展字段,任意数据类型都可以',
          },
        },
        ext
      )
    },
    // 发送消息
    sendMessage(form = {}, extContent) {
      const that = this
      // 调用sdk提供的方法, 进行消息发送
      that.nimSdk.sendMsg(
        form,
        (res) => {
          if (res.code !== 200) {
            Toast.fail(res.msg)
          }
        },
        extContent
      )
    },
    // 接收消息、发送消息成功的回调：将聊天记录存储进session
    onMessage(res) {
      const that = this
      console.log('onmessage', res)
      if (res.code === 200) {
        const data = res.data
        const obj = {
          text: data.content.text, // 消息内容对象
          isUser: that.userInfo.imUserId === data.sender, // isUser为true是用户，为false是规划师。
          createTime: new Date().getTime(),
        }
        // 规划师发来消息 并且 聊天框没有展开 显示红点
        // if (
        //   that.userInfo.imUserId !== data.sender &&
        //   that.isPopupShow === false
        // ) {
        //   that.$emit('showRed')
        // }
        that.currentChatData.push(obj)
        that.userText = ''
        that.chatBoxToBottom()

        // 2021-01-07修改
        // 1、IM的sessionStorage键值命名：ChatData + 规划师id + 客户id
        // 2、清除之前和规划师的sessionStorage，将新值存储进去
        sessionStorage.removeItem(
          `ChatData-${this.recommendPlannerId}-${this.userInfo.userId}`
        )
        // 3、将聊天记录新值存储进去
        sessionStorage.setItem(
          `ChatData-${this.recommendPlannerId}-${this.userInfo.userId}`,
          JSON.stringify(that.currentChatData)
        )
      }
    },
    // 我的消息回调
    myInfo(res) {
      const id = sessionStorage.getItem('userId')
      const that = this
      if (id) {
        that.userInfo = {
          imUserId: res.data.imUserId,
          userId: id, // 客户的id
        }
      } else {
        sessionStorage.setItem('userId', res.data.userId)
        that.userInfo = res.data
      }
    },
    // 创建对话
    async createSession(id, name, num) {
      // id：规划师id
      const that = this
      that.recommendPlannerId = id
      that.recommendPlannerName = name
      that.recommendPlannerNum = num
      // 1、根据规划师id创建对话
      // 2、根据创建的对话id查询 客户与该规划师之间的聊天记录
      await that.nimSdk.createSession(id, (res) => {
        console.log('createSession', res)
        if (res.code === 200) {
          // localStorage.setItem('currentGroupId', res.data)
          // 1、根据规划师id，先从sessionStorage里取聊天记录
          const data = JSON.parse(
            sessionStorage.getItem(
              `ChatData-${this.recommendPlannerId}-${this.userInfo.userId}`
            )
          )
          // 2、sessionStorage里聊天记录为空时，才调取接口
          if (data.length > 1) {
            that.currentChatData = data
            that.chatBoxToBottom()
            that.isPopupShow = true
          } else {
            that.getHistoryMsg()
          }
        }
      })
    },
    // 查询是否有聊天记录
    getHistoryMsg() {
      const that = this
      that.nimSdk.pullHistoryMessage(
        {
          pageNumber: 1,
          pageSize: 30,
          groupId: that.groupId, // 当前聊天群组id
          contentKey: '', // 搜索关键字
          localPoint: '', // 最后一次聊天记录的时间戳
        },
        (res) => {
          console.log(res)
          if (res.code === 200) {
            that.currentChatData = [
              {
                text:
                  '您好，欢迎来到【顶呱呱平台】，我是您的专属接待客服，请问有什么可以帮助您呢？',
                createTime: new Date().getTime(),
                isUser: false,
              },
            ]
            const arr = res.data
            if (arr && arr.length > 0) {
              arr.forEach((item) => {
                that.currentChatData.push({
                  text: item.content.text,
                  isUser: that.userInfo.imUserId === item.sender,
                  createTime: new Date().getTime(),
                })
              })
            } else {
              that.currentChatData = [
                {
                  text:
                    '您好，欢迎来到【顶呱呱平台】，我是您的专属接待客服，请问有什么可以帮助您呢？',
                  createTime: new Date().getTime(),
                  isUser: false,
                },
              ]
            }
            // 重新打开聊天框获取聊天记录后，聊天记录滑到最下面
            that.chatBoxToBottom()
          }
        }
      )
      that.isPopupShow = true
    },
    // 打开表情
    emoji() {
      this.emojishow ? (this.emojishow = false) : (this.emojishow = true)
    },
    // 关闭表情框
    closeEmoji() {
      this.emojishow = false
    },
    // 点击表情发送
    emojiTap(e) {
      const emoji = e.target.dataset.emoji
      if (!emoji) return
      this.emoji()
      this.userText += emoji
    },
    // 接受或者发送表情的显示
    covertMessageText(textMsg) {
      let showText = utils.escape(textMsg)
      // eslint-disable-next-line
      if (/\[([^\[\]]+)\]/.test(showText)) {
        // eslint-disable-next-line
        const emojiItems = showText.match(/\[([^\[\]]+)\]/g)
        emojiItems.forEach((text) => {
          const emojiCnt = emojimap.emojiList.emoji
          const ggwCnt = emojimap.emojiList.ggw
          if (emojiCnt[text]) {
            showText = showText.replace(
              text,
              `<img class="emoji" src="${emojiCnt[text].img}" style="width:25px;height=25px;">`
            )
          }
          if (ggwCnt[text]) {
            showText = showText.replace(
              text,
              `<img class="emoji" src="${ggwCnt[text].img}" style="width:25px;height=25px;">`
            )
          }
        })
      }
      return showText
    },
    splitAlbumKeys(arr, space, currentAlbum) {
      const delta = arr.length || 20
      let result = []
      const factor = Math.ceil(arr.length / delta)
      let begin = 0
      const end = 1

      if (factor === 1) {
        result = [[...arr]]
      } else {
        for (let i = 1; i < factor; i++) {
          let temp = []
          temp = [...arr.slice(begin, i * delta)]
          begin = i * delta
          result.push(temp)
        }

        result.push([...arr.slice(delta * (factor - 1), arr.length)])
      }

      if (
        currentAlbum === 'emoji' ||
        this.currentAlbum === 'emoji' ||
        currentAlbum === 'ggw' ||
        this.currentAlbum === 'ggw'
      ) {
        // 只有emoji才添加删除按钮
        result.map((cata, index) => {
          if (index !== result.length - 1) {
            cata.push('[删除]')
          }
        })
      }
      return result
    },
    // 让聊天框自动滚动到最底部
    chatBoxToBottom() {
      const that = this
      const viewBox = that.$refs.viewBox
      const timer = setTimeout(() => {
        viewBox.scrollTop = viewBox.scrollHeight
        clearTimeout(timer)
      })
    },
    // 根据规划师用户中心id查imUserid
    async getPlannerImUserId() {
      const data = await this.$axios({
        url: 'bigData',
        method: 'get',
      })
      this.userCenterId = data.data.userCentreId
      this.recommendPlannerName = data.data.realName
      const params = {
        userId: this.userCenterId,
        sysCode: 'dgg-jy',
      }
      const headers = httpSign.handleSign({
        method: 'post', // 请求类型, 大小写无所谓, 默认getP
        rawData: params, // 必传, 需要验签的数据, json类型
        token: '', // 用户token
        sysCode: 'dgg-jy', // P 必传, 平台sysCode
        secret: 'e97bd82e0f7ff420d0728a41773f3ec7', // P 必传, 平台sysCode对应的密钥
        reqClient: 'pc', // 请求头中的X-Req-Client
        deviceType: '', // 请求头中的X-Device-Type
        deviceCode: '', // 请求头中的X-Device-Code
        contentType: '', // 请求头中的Content-Type, 此字段建议别传, 暴露出来只是为了满足一些特殊场景的需求
      })
      axios({
        method: 'POST',
        url:
          'https://microuag.dgg188.cn/dgg-tac-imapi-server/api/v1/imserver/msg_user/get_user.do',
        data: params,
        headers,
      }).then((res) => {
        this.recommendPlannerId = res.data.data.imUserId
      })
    },
    setDisConnect() {
      if (this.nimSdk) {
        this.nimSdk.disConnect()
      }
    },
    setOnline() {
      if (this.nimSdk) {
        this.nimSdk.reconnect()
      }
    },
    //  监听网络状态,同步WebSocket状态
    updateWebSocketStatus(e) {
      // TODO 实际使用时, 可以在加一个判断, 如果用户选择的离线, 则不进行以下操作
      // online: 在线, offline: 离线
      const { type } = e
      const that = this
      if (type === 'online') {
        that.setOnline()
        that.isAutoDisConnect = true
      } else {
        that.isAutoDisConnect = false
        that.setDisConnect()
      }
    },
  },
}
</script>
<style lang="less" scoped>
// .chat覆写了组件原本的样式
// 该组件居中是因为父组件设置了居中
.chat {
  z-index: 9999;
  width: @spread-page-width !important;
  left: auto !important;
}

.chat-box {
  width: 100%;
  background: #ddd;
  height: 80vh;
  &_head {
    width: 100%;
    height: 120px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 32px;
    color: white;
    background: rgb(19, 179, 180);
  }
  i.triangle-admin,
  i.triangle-user {
    width: 0;
    height: 0;
    position: absolute;
    top: 10px;
    display: inline-block;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
  }
  .mobile-page {
    padding: 20px 20px 50px;
    height: calc(100% - 230px);
    overflow-y: scroll;
    background: #ffffff;
    .admin-img,
    .user-img {
      width: 72px;
      height: 72px;
    }
    i.triangle-admin {
      left: 4px;
      border-right: 12px solid rgb(240, 240, 240);
      border-top: 5px solid transparent;
      border-bottom: 5px solid transparent;
      left: 10px;
      border-right: 6px solid #fff;
    }
    i.triangle-user {
      right: 4px;
      border-left: 12px solid #13b3b4;
    }
    .admin-group,
    .user-group {
      padding: 20px 6px;
      display: flex;
      display: -webkit-flex;
    }
    .admin-group {
      justify-content: flex-start;
    }
    .user-group {
      justify-content: flex-end;
    }
    .admin-reply,
    .user-reply {
      display: inline-block;
      padding: 13px;
      border-radius: 4px;
      background-color: #fff;
      margin: 0 15px 12px;
      font-size: 24px;
      white-space: pre-wrap;
    }
    .admin-reply {
      box-shadow: 0px 0px 2px #ddd;
      background-color: rgb(255, 255, 255);
      border-radius: 3px;
      border: 1px solid rgb(240, 240, 240);
    }
    .user-reply {
      text-align: left;
      background-color: #13b3b4;
      box-shadow: 0px 0px 2px #bbb;
      color: #fff;
    }
    .user-msg,
    .admin-msg {
      width: 75%;
      position: relative;
      .time {
        font-size: 12px;
        color: rgb(178, 178, 178);
        margin: -30px 15px 0;
      }
    }
    .user-msg {
      text-align: right;
    }
    // .admin-msg {
    //   .time {
    //     font-size: 12px;
    //     color: rgb(178, 178, 178);
    //     margin: -30px 15px 0;
    //   }
    // }
  }
  /*--- 消息输入框--- */
  .msg-input-bgk {
    //width: 100%;
    width: @spread-page-width;
    height: auto;
    padding: 20px;
    background: #f8f8f8;
    position: fixed;
    bottom: 0;
    left: auto;
    right: auto;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-top: 1px solid #dddddd;
    margin-right: 20px;
    .emoji-box {
      width: 100%;
      position: absolute;
      bottom: 101%;
      background: rgb(255, 255, 255);
      border-top: 1px solid rgb(221, 221, 221);
      z-index: 2;
      left: 1px;
      right: 1px;
      box-sizing: border-box;
      div {
        display: flex;
        flex-wrap: wrap;
        overflow-y: auto;
        visibility: visible;
        z-index: 99;
        max-height: 400px;

        img {
          width: 50px;
          height: 50px;
          margin: 20px;
        }
      }
    }
    .emoji-icon {
      flex: none;
      height: 60px;
      line-height: 60px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      margin-bottom: 5px;
      margin-top: 5px;
    }
    .emoji {
      flex: none;
      display: inline-block;
      //background: url(https://dgg-xiaodingyun.oss-cn-beijing.aliyuncs.com/xdy-xcx/jyextension/emojis/emoji.png)
      //  no-repeat;
      //background-size: 100% 100%;
    }
    .inputText {
      // 输入框只有一行时，高度70px
      resize: none; // 让textarea不能改变宽高
      max-height: 180px;
      min-height: 70px;
      height: auto;
      border: none;
      border-radius: 5px;
      flex-grow: 2;
      margin-right: 10px;
      font-size: 28px;
      line-height: 40px;
      color: #333;
      //padding-left: 20px;
      outline: none;
      background: #ffffff;
      padding: 15px 20px;
      overflow-y: auto;
    }
    a.button {
      flex: none;
      display: inline-block;
      height: 60px;
      line-height: 60px;
      padding: 0px 20px;
      border-radius: 5px;
      background: rgb(19, 179, 180);
      color: #fff;
      font-size: 28px;
      margin-bottom: 5px;
      margin-top: 5px;
    }
  }
}
</style>
