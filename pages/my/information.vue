<template>
  <div class="information">
    <!--S 头部-->
    <Header title="个人信息" />
    <!--E 头部-->
    <!--S 内容-->
    <div class="information_con">
      <div class="information_con_tp">
        <div class="avatar_con" @click="handleClick(1)">
          <spMobileUpload
            v-if="isUpdateAvatar"
            ref="SpUpLoad"
            tip="仅图片上传："
            :file-id="info.fileId"
            is-add-watermark
            class="uploader"
            list-url="https://spmicrouag.shupian.cn/tac-external-platform-server/oss/find"
            delete-url="https://spmicrouag.shupian.cn/tac-external-platform-server/oss/deleteSingle"
            call-back-url="https://spmicrouag.shupian.cn/tac-external-platform-server/oss/callback"
            @onSuccess="success"
          />
          <div class="cell">
            <p class="title">头像</p>
            <div class="right_icon">
              <sp-image
                round
                width="0.88rem"
                height="0.88rem"
                fit="cover"
                class="avatar"
                :src="
                  info.url ? info.url : 'https://img.yzcdn.cn/vant/cat.jpeg'
                "
              />
              <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
            </div>
          </div>
        </div>
        <div class="cell" @click="handleClick(2)">
          <p class="title">昵称</p>
          <div class="right_icon">
            <p class="txt">{{ info.nickName || '未设置' }}</p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(3)">
          <p class="title">生日</p>
          <div class="right_icon">
            <p class="txt">
              {{ info.birthday || '未设置' }}
            </p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(4)">
          <p class="title">性别</p>
          <div class="right_icon">
            <p class="txt">
              {{
                info
                  ? info.sex === 1
                    ? '男'
                    : info.sex === 0
                    ? '女'
                    : '未知' || '未知'
                  : '未知'
              }}
            </p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
      </div>
      <div class="information_con_tp">
        <div class="cell" @click="handleClick(5)">
          <p class="title">电子邮箱</p>
          <div class="right_icon">
            <p class="txt">{{ info.email || '未设置' }}</p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(6)">
          <p class="title">所在地区</p>
          <div class="right_icon">
            <p class="txt">
              {{
                info.province
                  ? `${info.province ? info.province : ''} ${
                      info.city ? info.city : ''
                    }`
                  : '未设置'
              }}
            </p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
      </div>
    </div>
    <!--E 内容-->
    <!--S 上传图片popup-->
    <ImgSelected :show.sync="show" />
    <!--E 上传图片popup-->
    <!--S 上传图片popup-->
    <SexSelected
      :show.sync="sexShow"
      :sex="info ? info.sex : 1"
      @changeSex="changeSex"
    />
    <!--E 上传图片popup-->
    <!--S 上传图片popup-->
    <AreaSelect :show.sync="areaShow" :city-data="area" @select="select" />
    <!--E 上传图片popup-->
    <!--S 选择生日popup-->
    <BirthdaySelected
      :show.sync="birthShow"
      :birthday="info && info.birthday ? StrToGMT(info.birthday) : new Date()"
      @changeBirthday="changeBirthday"
    />
    <!--S 选择生日popup-->
    <sp-toast ref="spToast"></sp-toast>
  </div>
</template>

<script>
import { TopNavBar, Cell, Uploader, Image } from '@chipspc/vant-dgg'
import { mapState } from 'vuex'
import ImgSelected from '~/components/my/information/ImgSelected'
import SexSelected from '~/components/my/information/SexSelected'
import AreaSelect from '~/components/common/areaSelected/AreaSelect'
import BirthdaySelected from '~/components/my/information/BirthdaySelected'
import { ossApi, userinfoApi } from '@/api'
import SpToast from '@/components/common/spToast/SpToast'
import Header from '@/components/common/head/header'
import '@fe/sp-ui-mobile/lib/index.css'
import { baseURL } from '~/config/index'
export default {
  name: 'Information',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    [Image.name]: Image,
    ImgSelected,
    SexSelected,
    AreaSelect,
    BirthdaySelected,
    SpToast,
    Header,
  },
  data() {
    return {
      show: false,
      sexShow: false, // 显示性别选择
      areaShow: false, // 显示地区选择
      birthShow: false, // 显示生日选择
      area: [], // 地区
      uploader: [],
      info: {
        nickName: '',
        birthday: '',
        sex: 0,
        email: '',
        province: '',
        city: '',
        url: '',
      }, // 用户信息
      isUpdateName: false, // 能否修改昵称
      isUpdateAvatar: false, // 能否修改头像
      avatar: '', // 头像
    }
  },
  computed: {
    ...mapState({
      userId: (state) => state.user.userInfo.userId,
    }),
    baseURL() {
      return baseURL
    },
  },
  mounted() {
    this.getUserInfo()
    this.getConfig()
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    async changeSex(sex) {
      // 修改性别
      this.info.sex = sex
      const params = {
        type: 3,
        value: this.info.sex,
      }
      const res = await this.$axios.post(userinfoApi.update, params)
      if (res.code === 200) {
        this.$refs.spToast.show({
          message: '设置成功',
          duration: 1500,
          forbidClick: true,
        })
      }
    },
    handleClick(val) {
      if (val === 2) {
        if (!this.isUpdateName) {
          // 如果不能修改
          this.$refs.spToast.show({
            message: '抱歉，昵称暂不支持修改',
            duration: 1500,
            forbidClick: true,
          })
        } else {
          // this.$router.push(`/my/info/nickname/${this.info.nickName}`)
          this.$router.push({
            path: '/my/info/nickname',
            query: {
              nickName: this.info.nickName,
            },
          })
        }
      } else if (val === 5) {
        // this.$router.push(`/my/info/email/${this.info.email}`)
        this.$router.push({
          path: '/my/info/email',
          query: {
            email: this.info.email,
          },
        })
      } else if (val === 4) {
        this.sexShow = true
      } else if (val === 6) {
        this.areaShow = true
      } else if (val === 3) {
        this.birthShow = true
      } else if (val === 1) {
        if (!this.isUpdateAvatar) {
          // 如果不能修改
          this.$refs.spToast.show({
            message: '抱歉，头像暂不支持修改',
            duration: 1500,
            forbidClick: true,
          })
        }
      }
    },
    async select(data) {
      // 地区选择
      this.info.province = data[0].name
      this.info.city = data[1].name
      const pCode = data[0].code
      const cCode = data[1].code
      this.$set(this.area, 0, { name: data[0].name, code: data[0].code })
      this.$set(this.area, 1, { name: data[1].name, code: data[1].code })
      const params = {
        type: 5,
        value: `${pCode},${cCode}`,
      }
      const res = await this.$axios.post(userinfoApi.update, params)
      if (res.code === 200) {
        this.$refs.spToast.show({
          message: '设置成功',
          duration: 1500,
          forbidClick: true,
        })
      }
    },
    GMTToStr(time) {
      const date = new Date(time)
      const Str =
        date.getFullYear() +
        '-' +
        (date.getMonth() + 1) +
        '-' +
        date.getDate() +
        ' '
      return Str
    },
    StrToGMT(time) {
      const GMT = new Date(time)
      return GMT
    },
    async changeBirthday(val) {
      // 生日选择
      this.info.birthday = this.GMTToStr(val)
      const params = {
        type: 2,
        value: this.info.birthday,
      }
      const res = await this.$axios.post(userinfoApi.update, params)
      if (res.code === 200) {
        this.$refs.spToast.show({
          message: '设置成功',
          duration: 1500,
          forbidClick: true,
        })
      }
    },
    onOversize() {},
    async getUserInfo() {
      // 获取用户信息
      try {
        const params = {
          id: this.userId,
        }
        const data = await this.$axios.get(userinfoApi.info, { params })
        this.info = data.data
        this.$set(this.area, 0, {
          name: data.data.province ? data.data.province : '',
          code: '',
        })
        this.$set(this.area, 1, {
          name: data.data.city ? data.data.city : '',
          code: '',
        })
      } catch (err) {}
    },
    async getConfig() {
      // 获取用户配置
      await this.getNameConfig()
      await this.getAvatarConfig()
    },
    async getNameConfig() {
      // 获取用户昵称配置
      try {
        const params = {
          code: 'ordinary_allow_modify_nick_name',
        }
        const res = await this.$axios.get(userinfoApi.configuration, { params })
        if (res.code === 200) {
          this.isUpdateName = res.data === '1'
        }
      } catch (err) {}
    },
    async getAvatarConfig() {
      // 获取用户头像配置
      try {
        const params = {
          code: 'ordinary_allow_modify_photo',
        }
        const res = await this.$axios.get(userinfoApi.configuration, { params })
        if (res.code === 200) {
          this.isUpdateAvatar = res.data === '1'
        }
      } catch (err) {}
    },
    success(fileList) {
      this.info.url = fileList.oss_filePath
    },
  },
}
</script>

<style lang="less" scoped>
.information {
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
  /deep/ .sp-top-nav-bar {
    height: 88px;
  }
  &_con {
    display: flex;
    flex-direction: column;
    &_tp {
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      border-top: 1px solid #f4f4f4;
      margin-top: 24px;
      background-color: #fff;
      padding-left: 40px;
      .cell {
        width: 100%;
        height: 120px;
        border-bottom: 1px solid #f4f4f4;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding-right: 40px;
        .title {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 44px;
        }
        .right_icon {
          height: 120px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          flex-direction: row;
          .avatar {
            margin-right: 16px;
          }
          .txt {
            margin-right: 16px;
            font-size: 28px;
            font-family: PingFang SC;
            font-weight: 400;
            color: #999999;
            line-height: 44px;
          }
        }
      }
      .avatar_con {
        width: 100%;
        position: relative;
        /deep/ .sp-uploader__wrapper {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          opacity: 0;
          overflow: hidden;
        }
        /deep/ .sp-uploader__upload {
          width: 100%;
          height: 120px;
        }
        /deep/ .sp-uploader__input {
          width: 100%;
          height: 120px;
        }
        .uploader {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 2px;
          z-index: 10;
          opacity: 0;
          overflow: hidden;
        }
      }
      &_item {
        height: 120px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding-right: 40px;
        border-bottom: 1px solid #f4f4f4;
        .title {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #1a1a1a;
          line-height: 44px;
        }
      }
    }
  }
}
</style>
