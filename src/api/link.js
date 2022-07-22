import request from "@/utils/fetch";
const config = require("@/config");

// 查询数量
export const linkFindBaseInfo = (data) =>
  request({
    method: "post",
    url: config.version + "resource/devicerela/findBaseInfo",
    data,
    config: {
      showLoading: true,
    },
  });
// 解绑
export const linkRelaUnbind = (data) =>
  request({
    method: "post",
    url: config.version + "resource/devicerela/relaUnbind",
    data,
    config: {
      showLoading: true,
      showMessage: true,
    },
  });

// 一键绑定
export const linkGetRelaBindData = (data) =>
  request({
    method: "post",
    url: config.version + "resource/devicerela/relaBind",
    data,
    config: {
      showLoading: true,
      showMessage: true,
    },
  });

// 判断端口是否合规
export const findPortStatus = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicerela/findPortStatus",
    data,
    config: {
      showLoading: false,
    },
  });
