import request from "@/utils/fetch";
const config = require("@/config");
// 映射管理—新增/修改接口
export const saveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/system/mappingmManagement/saveOrUpdate",
    data,
  });
// 映射管理—根据ID查询接口
export const findById = (data) =>
  request({
    method: "post",
    url: config.version + "/system/mappingmManagement/findById",
    data,
    config: {
      showLoading: false,
    },
  });
//映射管理—根据ID删除接口
export const deleteById = (data) =>
  request({
    method: "post",
    url: config.version + "/system/mappingmManagement/deleteById",
    data,
    config: {
      showMessage: true,
      type: "del",
      dialogTitle: "删除映射",
    },
  });
