import request from "@/utils/fetch";
const config = require("@/config");
// 根据条件查询列表
export const findListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/findListByParam",
    data,
    config: {
      showLoading: true,
    },
  });
// 根据品牌获取型号
export const findModelByBrand = (data) =>
  request({
    method: "post",
    url: config.version + "/param/model/findModelByBrand",
    data,
    config: {
      showLoading: false,
    },
  });
//
// 根据型号获取版本
export const findVersionByModel = (data) =>
  request({
    method: "post",
    url: config.version + "/param/model/findVersionByModel",
    data,
    config: {
      showLoading: false,
    },
  });
export const findOsVersionByType = (data) =>
  request({
    method: "post",
    url: config.version + "/param/operatingSystem/findOsVersionByType",
    data,
    config: {
      showLoading: false,
    },
  });
export const findCreditByType = (data) =>
  request({
    method: "post",
    url: config.version + "/param/credit/snmp/findCreditByType",
    data,
    config: {
      showLoading: false,
    },
  });

export const findByIdSSh = (data) =>
  request({
    method: "post",
    url: config.version + "/param/credit/ssh/findById",
    data,
    config: {
      showLoading: false,
    },
  });
export const findByIdSnmp = (data) =>
  request({
    method: "post",
    url: config.version + "/param/credit/snmp/findById",
    data,
    config: {
      showLoading: false,
    },
  });
export const pingDevice = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/pingDevice",
    data,
    config: {
      showLoading: true,
    },
    timeout: 300000,
  });
export const findFacilityRoomForSelect = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/findFacilityRoomForSelect",
    data,
    config: {
      showLoading: false,
    },
  });
export const findGroupListByRoom = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/findGroupListByRoom",
    data,
    config: {
      showLoading: false,
    },
  });
export const findCabinetByRoomAndGroup = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/facilityRoom/findCabinetByRoomAndGroup",
    data,
    config: {
      showLoading: false,
    },
  });
export const saveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/saveOrUpdate",
    data,
  });
//根据id查询设备
export const findById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/findById",
    data,
    timeout: 300000,
    // config: {
    //   showLoading: false,
    // },
  });
// 设备添加指标
export const collectDeviceTarget = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/collectDeviceTarget",
    data,
    timeout: 300000,
    config: {
      showLoading: false,
    },
  });
// 根据设备类型获取品牌列表接口
export const findBrandByDeviceType = (data) =>
  request({
    method: "post",
    url: config.version + "/param/model/findBrandByDeviceType",
    data,
    config: {
      showLoading: false,
    },
  });
//主机一键添加
export const collectDeviceNetCard = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/collectDeviceNetCard",
    data,
  });
//网络设备一键添加
export const collectDevicePort = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/collectDevicePort",
    data,
  });
//校验ssh采集凭证是否正确
export const judgeSshCredit = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/device/judgeSshCredit",
    data,
    config: {
      showLoading: false,
    },
    timeout: 2 * 60 * 1000,
  });
// snmp
export function saveDataSnmp(data) {
  return request({
    url: "/param/credit/snmp/saveOrUpdate",
    method: "post",
    data: data,
    config: {
      showMessage: true,
      msg: "保存成功",
    },
  });
}
//SSH
export function saveDataSsh(data) {
  return request({
    url: "/param/credit/ssh/saveOrUpdate",
    method: "post",
    data: data,
    config: {
      showMessage: true,
      msg: "保存成功",
    },
  });
}
// telnet
export function saveDataTelnet(data) {
  return request({
    url: "/param/credit/telnet/saveOrUpdate",
    method: "post",
    data: data,
    config: {
      showMessage: true,
      msg: "保存成功",
    },
  });
}
