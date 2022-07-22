import request from "@/utils/fetch";
const config = require("@/config");
// 资源概览
export const overviewBaseInfo = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/overview/getPerformance",
    data,
  });
export const overviewAlarm = (data) =>
  request({
    method: "post",
    url:
      config.version +
      "/resource/deviceDetail/overview/findWarnDetectByDeviceId",
    data,
    config: {
      showLoading: false,
    },
  });
export const getPerformance = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/overview/getPerformance",
    data,
    config: {
      showLoading: false,
    },
  });
// 业务连通实时数据
export const getPingStatus = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/ping/getPingStatus",
    data,
    config: {
      showLoading: false,
    },
  });
// 业务连通变化趋势
export const getPingStatusDefect = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/ping/getPingStatusDefect",
    data,
  });
// 性能监视
// cpu使用率
export const getCpuUsageDefect = (data) =>
  request({
    method: "post",
    url:
      config.version + "/resource/deviceDetail/performance/getCpuUsageDefect",
    data,
  });
// 物理内存实时数据
export const getPmemUsage = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/performance/getPmemUsage",
    data,
    config: {
      showLoading: false,
    },
  });
// 物理内存使用率
export const getPmemUsageDefect = (data) =>
  request({
    method: "post",
    url:
      config.version + "/resource/deviceDetail/performance/getPmemUsageDefect",
    data,
  });
// 虚拟内存实时数据
export const getVmemUsage = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/performance/getVmemUsage",
    data,
    config: {
      showLoading: false,
    },
  });
// 虚拟内存使用率
export const getVmemUsageDefect = (data) =>
  request({
    method: "post",
    url:
      config.version + "/resource/deviceDetail/performance/getVmemUsageDefect",
    data,
  });
// 进程折线图
export const processDefect = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/process/defect",
    data,
    timeout: 30000,
    // config: {
    //   showLoading: false,
    // },
  });
// 告警折现图
export const warnFindWarnDetectByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/warn/findWarnDetectByParam",
    data,
    config: {
      showLoading: false,
    },
  });
// 获取磁盘和进程
export const findTargetByDeviceId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/findTargetByDeviceId",
    data,
    config: {
      showLoading: false,
    },
  });
// 进程折线图
export const getDiskChar = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/overview/getDiskChar",
    data,
    timeout: 30000,
  });
// 获取磁盘空间
export const getDiskList = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceDetail/overview/getDiskList",
    data,
    config: {
      showLoading: false,
    },
  });
