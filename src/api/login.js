import request from "@/utils/fetch";
const config = require("@/config");
// 登录接口
export const login = (data) =>
  request({
    method: "post",
    url: config.version + "/login",
    data,
  });
// 获取非对称私钥
export const getPublicKey = (data) =>
  request({
    method: "post",
    url: config.version + "/getAsymmetricPublicKey",
    data,
    config: {
      showLoading: false,
      showMessage: false,
    },
  });
// 获取对称密钥
export const getSymmetricKey = (data) =>
  request({
    method: "post",
    url: config.version + "/getSymmetricKey",
    data,
    config: {
      showLoading: false,
    },
  });
// 获取验证码
export const getKaptcha = (data) =>
  request({
    method: "post",
    url: config.version + "/captcha",
    data,
    config: {
      showLoading: false,
    },
  });
// 退出登录
export const logout = (data) =>
  request({
    method: "post",
    url: config.version + "/logout",
    data,
    config: {
      type: "put",
      zdyMsg: "确定要退出登录吗",
      showLoading: true,
      showMessage: false,
    },
  });
// 重置密码
export const resetPassword = (data) =>
  request({
    method: "post",
    url: config.version + "/system/user/updateUserPassword",
    data,
  });
// 获取用户信息
export const getUserInfo = (data) =>
  request({
    method: "post",
    url: config.version + "/system/user/getUserInfo",
    data,
    config: {
      showLoading: false,
    },
  });
// 获取当前节点信息
export const getNodeType = (data) =>
  request({
    method: "post",
    url: config.version + "/safetyZone/findNodeType",
    data,
    config: {
      showLoading: false,
    },
  });
