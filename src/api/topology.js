import request from "@/utils/fetch";
const config = require("@/config");
/* 拓扑管理 */
// 获取拓扑图数据
export const topologyFindTopoByDeviceGroupId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/topo/findTopoByDeviceGroupId",
    data,
  });
//获取拓扑分组
export const topologyGetGroups = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/deviceGroup/findByCreateUser",
    data,
    config: {
      showLoading: false,
    },
  });
// 获取分组样式
export const topologyStyleByDeviceGroupId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/topo/findTopoStyleByDeviceGroupId",
    data,
    config: {
      showLoading: false,
    },
  });
// 保存拓扑样式
export const topologySaveTopoStyle = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/topo/saveTopoStyle",
    data,
    // config: {
    //   showLoading: false,
    // },
  });
// 保存拓扑数据
export const topoSaveGraphData = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/topo/saveTopoPositon",
    data,
  });
// 拓扑搜索
export const topoSearch = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/topo/fuzzySearch",
    data,
    config: {
      showLoading: false,
    },
  });
// 链路详情
export const findDetailsByRelaId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicerela/findDetailsByRelaId",
    data,
  });
