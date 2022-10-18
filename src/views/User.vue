<template>
  <div>
    <van-row @click="showLoginModal">
      <van-col span="6">
        <img :src="avatarSrc" />
      </van-col>
      <van-col span="10">{{ nickname }}</van-col>
      <van-col span="8">
        <van-icon name="arrow" />
      </van-col>
    </van-row>
    <van-grid :column-num="3" square>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="user-o" text="用户信息" />
      <van-grid-item icon="setting-o" text="设置" />
    </van-grid>

    <van-popup v-model="isShowLoginModal">
      <van-form @submit="onSubmit">
        <h1 class="title">用户注册</h1>
        <div class="close" @click="isShowLoginModal = false">
          <van-icon name="cross" />
        </div>
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit"
            >登录</van-button
          >
        </div>
      </van-form>
    </van-popup>
  </div>
</template>

<script>
import { UserLoginApI } from "@/API";
export default {
  data() {
    return {
      // 头像
      avatarSrc: require("../assets/avatar.png"),
      // 是否显示登录模态框
      isShowLoginModal: false,
      username: "",
      password: "",
      nickname: "用户名",
    };
  },
  created() {
    //判断是否有token
    let token = localStorage.getItem("token");
    if (token) {
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.nickname = userInfo.username;
      this.avatarSrc = require("@/assets/avatar2.jpeg");
    }
  },
  methods: {
    showLoginModal() {
      let token = localStorage.getItem("token");
      if (!token) {
        this.isShowLoginModal = true;
      }
    },
    async onSubmit(values) {
      let userInfo = {
        username: values["用户名"],
        pwd: values["密码"],
      };
      let res = await UserLoginApI(userInfo);
      // 登录逻辑,如果为0,登录成功,反之失败
      if (res.errno == 0) {
        // 本地存储token
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userInfo", JSON.stringify(res.data.userInfo));
        this.$toast.success("登录成功");
        setTimeout(() => {
          this.isShowLoginModal = false;
          this.nickname = res.data.userInfo.username;
          this.avatarSrc = require("@/assets/avatar2.jpeg");
        }, 1000);
        this.onSubmit = null;
      } else {
        this.$toast.fail(res.errmsg);
        this.password = "";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.van-row {
  padding: 20px 4%;
  background: #333;
  color: #fff;
  .van-col {
    line-height: 70px;
    font-size: 16px;
    img {
      width: 70px;
      height: 70px;
      object-fit: cover;
      border-radius: 50%;
      display: block;
    }
    &:last-child {
      text-align: right;
    }
  }
}
.van-popup {
  width: 85%;
  border-radius: 6px;
}
.close {
  position: absolute;
  right: 10px;
  top: 10px;
}
.title {
  text-align: center;
  padding: 15px 0;
}
</style>
