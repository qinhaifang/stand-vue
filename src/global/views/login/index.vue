<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="hlcx-login-bg">
    <div class="hlcx-login-box">
      <el-form
        :model="loginForm"
        :rules="loginRules"
        size="medium"
        status-icon
        ref="loginForm"
        class="hlcx-loginForm"
      >
        <h1 class="textAlignCenter">欢迎登录</h1>
        <el-form-item prop="account" label="">
          <el-input
            placeholder="请输入用户名"
            prefix-icon="iconfont iconyonghuming"
            v-model="loginForm.account"
            @keyup.enter.native="submitForm('loginForm')"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="passwords" class="password">
          <el-input
            type="password"
            placeholder="密码"
            prefix-icon="iconfont iconmima"
            v-model="loginForm.passwords"
            minlength="8"
          ></el-input>
        </el-form-item>
        <el-form-item prop="captcha" class="captcha" style="position: relative">
          <el-input
            placeholder="请输入验证码"
            prefix-icon="iconfont iconyanzhengmamima"
            v-model="loginForm.captcha"
            class="hlcx-login-vcode"
            minlength="4"
            @keyup.enter.native="submitForm('loginForm')"
          ></el-input>
          <div class="hlcx-login-imgcode" @click="handleChangeCodeImg">
            <!--验证码组件-->
            <el-image :src="kaptcha" alt="验证码" style="height: 40px">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </div>
        </el-form-item>
        <el-form-item class="hlcx-login-btn-item" style="position: relative">
          <el-button
            type="primary"
            class="hlcx-login-btn"
            @click="submitForm('loginForm')"
            >登录</el-button
          >
        </el-form-item>
        <el-form-item style="position: relative">
          <p class="hlcx-login-msg">如忘记密码，请联系管理员</p>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { getPublicKey, getKaptcha } from "@/api/login";
import CryptoJS from "crypto-js";
import JSEncrypt from "jsencrypt/bin/jsencrypt";
import axios from "axios";
var timerId;
export default {
  data() {
    // 验证密码
    let validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else {
        callback();
      }
    };
    let inputDescription = (rule, value, callback) => {
      var reg = /\s+/g;
      if (value && reg.test(value)) {
        callback(new Error("用户名不可以输入空格"));
      } else {
        callback();
      }
    };
    return {
      redirect: undefined,
      title: this.$bkConfig.title,
      loginForm: {
        account: "",
        password: "",
        passwords: "",
        captcha: "",
        symmetricKey: "", //对称密钥
        captchaKey: "",
      },
      query: {},
      publicKey: "", //非对称密钥
      identifyCodes: "1234567890",
      identifyCode: "",
      loginRules: {
        account: [
          { required: true, trigger: "blur", message: "请输入用户名" },
          { validator: inputDescription, trigger: ["blur", "change"] },
        ],
        passwords: [
          { required: true, trigger: "blur", message: "请输入密码" },
          { validator: validatePass, trigger: "blur" },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },
      kaptcha: "",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
        if (Array.isArray(this.redirect)) {
          this.redirect = this.redirect[0];
        }
        this.query = route.query;
      },
      immediate: true,
    },
  },
  mounted() {
    this.handleKaptcha();
  },
  methods: {
    // 更新验证码
    handleChangeCodeImg() {
      clearTimeout(timerId);
      this.handleKaptcha();
    },
    // 获取验证码
    handleKaptcha() {
      axios.get("https://localhost:8080/captcha", {}).then((res) => {
        console.log(222, res.data.data);
      });
      // getKaptcha()
      //   .then((res) => {
      //     this.kaptcha = res.base64Img;
      //     this.loginForm.captchaKey = res.captchaKey;
      //     this.loginForm.symmetricKey = res.symmetricKey;
      //     this.publicKey = res.asymmetricPublicKey;
      //   })
      //   .catch((e) => {});
    },
    // 获取非对称私钥
    handlePublicKey() {
      getPublicKey().then((res) => {
        this.publicKey = res;
      });
    },
    // RSA加密
    encryptRSA(password, pub_key) {
      let enc = new JSEncrypt(); // 声明一个新的JSEncrypt对象
      enc.setPublicKey(pub_key); // 配置公钥
      return enc.encrypt(password); // 加密
    },
    // AES加密
    encrypt(word, keyStr) {
      let key = CryptoJS.enc.Utf8.parse(keyStr);
      let srcs = CryptoJS.enc.Utf8.parse(word);
      let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return encrypted.toString();
    },
    // 解密
    decrypt(word, keyStr) {
      keyStr = keyStr ? keyStr : "absoietlj32fai12";
      var key = CryptoJS.enc.Utf8.parse(keyStr);
      var decrypt = CryptoJS.AES.decrypt(word, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      return CryptoJS.enc.Utf8.stringify(decrypt).toString();
    },
    // 登录按钮
    submitForm(loginForm) {
      // RSA加密
      let RSApublicKeyData = this.encryptRSA(
        this.loginForm.passwords,
        this.publicKey
      );
      // AES加密
      let AESPassword = this.encrypt(
        RSApublicKeyData,
        this.loginForm.symmetricKey
      );
      this.$refs[loginForm].validate((valid) => {
        if (valid) {
          this.loginForm.password = AESPassword;
          const formData = {
            ...this.loginForm,
            passwords: undefined,
          };
          this.$store
            .dispatch("Login", formData)
            .then(() => {
              this.$notice.message({
                msg: "登录成功",
                type: "success",
              });
              this.$router.push({
                path: this.redirect || "/UserManage",
                query: this.query,
              });
            })
            .catch(() => {
              this.loginForm.passwords = "";
              this.loginForm.captcha = "";
              this.handleKaptcha();
            });
        } else {
          this.loginForm.passwords = "";
          return false;
        }
      });
    },
  },
};
</script>
<style scoped>
.hlcx-login-bg {
  width: 100%;
  height: 100%;
  background: url("./../../assets/imgs/login-bg.jpg");
  background-size: cover;
  position: relative;
}
.hlcx-login-box {
  width: 460px;
  position: absolute;
  right: 10%;
  padding: 60px 50px;
  box-shadow: 0px 21px 67px 1px #193b78;
  background: #fff;
  border-radius: 10px;
  color: #2970e9;
  top: 250px;
}
.hlcx-login-box */deep/ .el-form-item--feedback.captcha .el-form-item__content {
  height: 40px;
}
.hlcx-login-box h1 {
  font-size: 24px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #2970e9;
  line-height: 30px;
  margin-bottom: 30px;
}
.hlcx-login-box h2 {
  opacity: 0.9;
  font-size: 14px;
  color: #ffffff;
  letter-spacing: 0;
  text-align: left;
  font-weight: 400;
  margin-bottom: 20px;
}
.hlcx-login-title {
  font-size: 50px;
  color: #ffffff;
  letter-spacing: 0;
  line-height: 32px;
  font-weight: 600;
  position: absolute;
  top: 150px;
  left: 380px;
}
.hlcx-loginForm {
  text-align: center;
}
.hlcx-loginForm .el-input {
  height: 40px;
  line-height: 40px;
}
.hlcx-login-msg {
  width: 100%;
  text-align: right;
  line-height: 14px;
  font-size: 14px;
  color: #2970e9;
}
.hlcx-login-btn {
  width: 100%;
  height: 40px !important;
  font-size: 20px;
  background: #2970e9;
}
.hlcx-login-imgcode {
  border-radius: 4px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
  margin-left: 20px;
}
*/deep/.el-form > .el-form-item {
  margin: 0;
  margin-bottom: 30px;
}
*/deep/.el-form > .el-form-item.hlcx-login-btn-item {
  margin-bottom: 20px;
}
*/deep/.el-form > .el-form-item:last-child {
  margin-bottom: 0;
}
*/deep/.el-form-item {
  width: 100%;
}
*/deep/.hlcx-login-vcode input {
  width: 67%;
  float: left;
  padding-left: 36px !important;
}
*/deep/ .el-input__prefix {
  left: 10px;
}
*/deep/ .el-input__prefix i {
  width: 16px;
  font-size: 16px;
}
*/deep/.hlcx-login-btn span {
  display: block;
  text-align: center;
}
*/deep/.el-input--medium input {
  font-size: 14px;
}

*/deep/.hlcx-loginForm .el-input--medium .el-input__inner {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  padding-left: 36px;
}
*/deep/ .el-input__inner::placeholder {
  font-size: 14px;
}
*/deep/.el-form-item__error {
  /* top: 65%; */
  /* left: 8%; */
}
::v-deep .el-button {
  margin: 0 !important;
}
::v-deep .password .el-form-item__error {
  /* top: 78%; */
}
</style>
<style>
input:-webkit-autofill {
}
</style>
