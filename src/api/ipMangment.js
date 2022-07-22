import request from "@/utils/fetch";
const config = require("@/config");
// ip划分
export const save = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/mg/save",
    data,
    timeout: 50000,
    config: {
      showMessage: true,
    },
  });
export const deleteById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/mg/deleteById",
    data,
  });
//ip白名单
export const updateRosterStatusDel = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/updateRosterStatus",
    data,
  });
export const ipfindById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/findById",
    data,
  });
//ip 地址统计
export const ipGroup = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/ipGroup",
    data,
    config: {
      showLoading: false,
    },
  });
export const ipSave = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/save",
    data,
  });
export const findTabListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/findTabListByParam",
    data,
    // config: {
    //   showLoading: false,
    // },
  });
export const findListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/findListByParam",
    data,
    config: {
      showLoading: false,
    },
  });
export const findByIp = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/ip/ip/findByIp",
    data,
    config: {
      showLoading: false,
    },
  });
