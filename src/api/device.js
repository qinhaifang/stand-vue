import request from "@/utils/fetch";
const config = require('@/config')
// 根据条件查询列表
export const deviceFindListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/findListByParam",
    data,
  });
// 编辑展示信息
export const deviceGetDataFindById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/findById",
    data,
    config: {
      showLoading: false,
    },
  });
// 点击确定
export const deviceSaveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/saveOrUpdate",
    data,
    config: {
      showMessage: false,
    },
  });
// 获取设备型号
export const deviceFindModelListByBrandAndType = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/findModelListByBrandAndType",
    data,
    config: {
      showLoading: false,
    },
  });
// 获取信息
export const deviceGetDeviceCollectData = (data) =>
  request({
    method: "post",
    timeout: 30000,
    url: config.version + "/resource/device/getDeviceCollectData",
    data,
  });
// 获取设备型号oid
export const deviceGetCollectOidByModelId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/getCollectOidByModelId",
    data,
    config: {
      showLoading: false,
    },
  });
// 模糊搜索
export const deviceGetSearchBarData = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/search",
    data,
    config: {
      showLoading: false,
    },
  });
// 查询所有凭证
export const deviceGetAllCreditForDevice = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/getAllCreditByType",
    data,
  });

// 搜索历史数据
export const getDeviceSearchHistory = (data) =>
  request({
    method: "post",
    url: config.version + "/searchHistory/getData",
    data,
    config: {
      showLoading: false,
    },
  });
// 新增编辑
export const collectSaveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/saveOrUpdate",
    data,
  });

export const addAllPortToDb = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/addAllPortToDb",
    data,
    timeout: 100000,
    config: {
      showMessage: true,
    },
  });

//查询带类型的采集凭证
export const getAllCreditTypeForDevice = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/getAllCreditTypeForDevice",
    data,
    config: {
      showLoading: false,
    },
  });
