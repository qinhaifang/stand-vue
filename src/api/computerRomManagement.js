import request from "@/utils/fetch";
const config = require("@/config");
// 根据条件查询列表
export const findListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/findListByParam",
    data,
    config: {
      showLoading: true,
    },
  });

// 搜索名称
export const facilityRoomSearch = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/search",
    data,
    config: {
      showLoading: false,
    },
  });
//查询省市县
export const findArea = (data) =>
  request({
    method: "post",
    url: config.version + "/system/area/findArea",
    data,
    config: {
      showLoading: false,
    },
  });
// 查询机柜参数数据
export const findCabinetTree = (data) =>
  request({
    method: "post",
    url: config.version + "param/cabinet/tree",
    data,
    config: {
      showLoading: false,
    },
  });
// 新增或编辑机房
export const saveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/saveOrUpdate",
    data,
    config: {
      showMessage: true,
      showLoading: false,
    },
  });
// 删除机房
export const deleteById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/deleteById",
    data,
    config: {
      showMessage: true,
    },
  });
// 根据主键查询机房
export const findById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/findById",
    data,
  });
