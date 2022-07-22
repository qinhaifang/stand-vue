import request from "@/utils/fetch";
const config = require("@/config");

// 删除分组
export const groupsDeleteByIdGroup = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/deleteById",
    data,
  });

// 编辑获取数据
export const groupsFindById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/findById",
    data,
  });

// 保存
export const groupsSaveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/saveOrUpdate",
    data,
    config: {
      showMessage: true,
    },
  });

// 编辑页面模糊搜索
export const groupsSearchEdit = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/searchEdit",
    data,
    config: {
      showLoading: false,
    },
  });

// 根据条件查询设备全集
export const groupsFindDeviceAll = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/findDeviceAll",
    data,
  });

// 根据条件列表查询设备全集
export const groupsFindDeviceByCondition = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/findDeviceByCondition",
    data,
  });
// 点击分享
export const copyGroup = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/copyGroup",
    data,
    config: {
      showMessage: true,
      msg: "分享成功",
    },
  });
