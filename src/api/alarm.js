import request from "@/utils/fetch";
const config = require("@/config");
// 获取告警类型
export const findWarnType = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/warn/findWarnType",
    data,
    config: {
      showLoading: false,
    },
  });
// 查找信息
export const findById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/warn/findById",
    data,
  });
