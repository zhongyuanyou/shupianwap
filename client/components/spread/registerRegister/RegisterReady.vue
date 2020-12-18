<template>
  <div class="register-ready">
    <h3>注册公司需要准备的工作</h3>
    <div class="message">
      <p><span>公司信息</span></p>
      <ul>
        <li><i></i><span>3-5个公司名称</span></li>
        <li><i></i><span>企业经营范围</span></li>
        <li><i></i><span>企业经营范围</span></li>
        <li><i></i><span>注册资金及比例</span></li>
      </ul>
    </div>
    <div class="message">
      <p><span>文件材料</span></p>
      <ul>
        <li><i></i><span>法人，股东，董事身份证原件及复印件</span></li>
      </ul>
    </div>
    <div class="message">
      <p><span>注册地址</span></p>
      <ul>
        <li><i></i><span>薯片APP可帮助获取合法地址</span></li>
      </ul>
    </div>
    <div class="superiority">
      <h3>平台优势</h3>
      <div class="superiority-item">
        <ul>
          <li>
            <sp-image
              round
              width="35px"
              height="35px"
              fit="cover"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </li>
          <li>5</li>
          <li>5</li>
          <li>5</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { Image, Toast } from '@chipspc/vant-dgg'
export default {
  name: 'Standard',
  components: {
    [Image.name]: Image,
    [Toast.name]: Toast,
  },
  data() {
    return {}
  },
}
</script>
<style lang="less" scoped>
.register-ready {
  font-size: 28px;
  padding: 0 42px 0 40px;
  h3 {
    font-size: 40px;
    font-weight: bold;
    color: #1a1a1a;
    line-height: 52px;
    padding-bottom: 30px;
  }
  .message {
    margin-bottom: 24px;
    p {
      width: 669px;
      height: 80px;
      margin: 0 auto;
      background: url(~assets/spreadImages/company_registry/busi_img_zegs_gsxx.png)
        no-repeat;
      background-size: contain;
      span {
        line-height: 80px;
        margin-left: 120px;
        font-size: 28px;
        font-weight: bold;
        color: #1db9b7;
      }
    }
    ul {
      background: #fffcfefe;
      font-size: 50px;
      li {
        float: left;
        width: 50%;
        height: 90px;
        line-height: 90px;
        padding: 0 32px;
        i {
          width: 12px;
          height: 12px;
          display: inline-block;
          background: #48c5c5;
          opacity: 0.5;
          margin-right: 12px;
          border-radius: 50%;
        }
        span {
          margin-left: -4px;
          font-size: 28px;
          color: #555555;
        }
      }
      &::after {
        content: '';
        display: block;
        clear: both;
      }
    }
    &:nth-child(3) {
      p {
        background: url(~assets/spreadImages/company_registry/busi_img_zcxx_wjcl.png)
          no-repeat;
        background-size: contain;
        span {
          color: #fca154;
        }
      }
      ul {
        li {
          width: 100%;
          background: #fffcfefe;
          i {
            background: #fea252;
          }
        }
      }
    }
    &:nth-child(4) {
      p {
        background: url(~assets/spreadImages/company_registry/busi_img_zegs_zcdz.png)
          no-repeat;
        background-size: contain;
        span {
          color: #9073e4;
        }
      }
      ul {
        li {
          width: 100%;
          background: #fffcfefe;
          i {
            background: #9273e3;
          }
        }
      }
    }
  }
  .superiority {
    .superiority-item {
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 323px;
          height: 118px;
          line-height: 118px;
          background: #ffffff;
          border: 1px solid rgba(205, 205, 205, 0.5);
          border-radius: 8px;
          margin-bottom: 24px;
          /deep/.sp-image {
            vertical-align: middle;
            margin: 0 16px 0 24px;
          }
        }
      }
    }
  }
}
</style>
