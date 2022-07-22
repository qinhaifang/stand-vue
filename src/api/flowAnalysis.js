import request from "@/utils/fetch";
const config = require("@/config");
// 获取IP类型
export const findAllIpTypeList = (data) =>
  request({
    method: "post",
    url: config.version + "/flowAnalysis/findAllIpTypeList",
    data,
    config: {
      showLoading: false,
    },
  });

// 流量分析-IP类型统计
export const ipTypeStatistics = (data) =>
  request({
    method: "post",
    url: config.version + "/flowAnalysis/ipTypeStatistics",
    data,
    config: {
      showLoading: false,
    },
  });

// TOP5 流量排行
export const topStatistics = (data) =>
  request({
    method: "post",
    url: config.version + "/flowAnalysis/topStatistics",
    data,
    config: {
      showLoading: false,
    },
  });

// TOP5 流量图
export const findFlowChartByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/flowAnalysis/findFlowChartByParam",
    data,
    config: {
      showLoading: false,
    },
  });
