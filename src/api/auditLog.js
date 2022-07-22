import request from "@/utils/fetch";
const config = require("@/config");
// 审计日志 获取列表数据
export const dataList = (data) =>
  request({
    method: "post",
    url: config.version + "/operate-log/findOperateLogByParam",
    data,
    config: {
      showLoading: false,
    },
  });
//设备安全 模糊搜索
export const deviceSecuritySearch = (data) =>
  request({
    method: "post",
    url: config.version + "/operate-log/search",
    data,
    config: {
      showLoading: false,
    },
  });
// 设备安全获取详细信息
export const getOperateDeviceDetail = (data) =>
  request({
    method: "post",
    url: config.version + "/operate-log/getOperateDeviceDetail",
    data,
    config: {
      showLoading: false,
    },
  });
