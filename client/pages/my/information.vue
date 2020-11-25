<template>
  <div class="information">
    <!--S 头部-->
    <sp-top-nav-bar
      :title="'个人信息'"
      left-arrow
      ellipsis
      :fixed="true"
      @on-click-left="onClickLeft"
    />
    <!--E 头部-->
    <!--S 内容-->
    <div class="information_con">
      <div class="information_con_tp">
        <div class="avatar_con">
          <sp-uploader
            v-model="uploader"
            class="uploader"
            upload-text="点击上传"
            :max-count="1"
            :max-size="20 * 1024 * 1024"
            @oversize="onOversize"
          />
          <div class="cell">
            <p class="title">头像</p>
            <div class="right_icon">
              <img src="https://img.yzcdn.cn/vant/cat.jpeg" class="avatar" />
              <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
            </div>
          </div>
        </div>
        <div class="cell" @click="handleClick(2)">
          <p class="title">昵称</p>
          <div class="right_icon">
            <p class="txt">逆风而行</p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(3)">
          <p class="title">生日</p>
          <div class="right_icon">
            <p class="txt">
              {{
                birthday
                  ? `${birthday.getFullYear()}-${
                      birthday.getMonth() + 1
                    }-${birthday.getDate()}`
                  : '未设置'
              }}
            </p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(4)">
          <p class="title">性别</p>
          <div class="right_icon">
            <p class="txt">{{ sex }}</p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
      </div>
      <div class="information_con_tp">
        <div class="cell" @click="handleClick(5)">
          <p class="title">电子邮箱</p>
          <div class="right_icon">
            <p class="txt">未设置</p>
            <my-icon name="shop_ic_next" size="0.26rem" color="#ccc" />
          </div>
        </div>
        <div class="cell" @click="handleClick(6)">
          <p class="title">所在地区</p>
          <div class="right_icon">
            <p class="txt">
              {{ area.length ? `${area[0].name} ${area[1].name}` : '未设置' }}
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
    <SexSelected :show.sync="sexShow" :sex="sex" @changeSex="changeSex" />
    <!--E 上传图片popup-->
    <!--S 上传图片popup-->
    <AreaSelect :show.sync="areaShow" :city-data="area" @select="select" />
    <!--E 上传图片popup-->
    <!--S 选择生日popup-->
    <BirthdaySelected :show.sync="birthShow" @changeBirthday="changeBirthday" />
    <!--S 选择生日popup-->
  </div>
</template>

<script>
import { TopNavBar, Cell, Uploader } from '@chipspc/vant-dgg'
import ImgSelected from '~/components/my/information/ImgSelected'
import SexSelected from '~/components/my/information/SexSelected'
import AreaSelect from '~/components/common/areaSelected/AreaSelect'
import BirthdaySelected from '~/components/my/information/BirthdaySelected'
export default {
  name: 'Information',
  components: {
    [TopNavBar.name]: TopNavBar,
    [Cell.name]: Cell,
    [Uploader.name]: Uploader,
    ImgSelected,
    SexSelected,
    AreaSelect,
    BirthdaySelected,
  },
  data() {
    return {
      show: false,
      sexShow: false, // 显示性别选择
      areaShow: false, // 显示地区选择
      birthShow: false, // 显示生日选择
      sex: '男', // 性别
      area: [], // 地区
      birthday: '', // 生日
      uploader: [],
    }
  },
  methods: {
    onClickLeft() {
      // 点击返回
      this.$router.back()
    },
    changeSex(sex) {
      // 修改性别
      this.sex = sex
    },
    handleClick(val) {
      if (val === 2) {
        this.$router.push('/my/info/nickname')
      } else if (val === 5) {
        this.$router.push('/my/info/email')
      } else if (val === 4) {
        this.sexShow = true
      } else if (val === 6) {
        this.areaShow = true
      } else if (val === 3) {
        this.birthShow = true
      }
    },
    select(data) {
      // 地区选择
      this.area = data
    },
    changeBirthday(val) {
      // 生日选择
      this.birthday = val
    },
    onOversize() {},
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
    padding-top: 88px;
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
            width: 88px;
            height: 88px;
            border-radius: 50%;
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
          top: 0;
          bottom: 2px;
          z-index: 10;
          opacity: 1;
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
