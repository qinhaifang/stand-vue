/*
 * @Description:
 * @Author: dubin
 * @Date: 2021-04-02 17:09:06
 */
import request from "@/utils/fetch";
const config = require('@/config')
// 我的收藏-添加收藏
export const devicesStar = (data) =>
  request({
    method: "post",
    url: "/webconsole/devices/star",
    data,
    config: {
      showLoading: false,
    },
  });
// 我的收藏-取消收藏
export const starDelete = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/star/delete",
    data,
    config: {
      showLoading: false,
    },
  });
// 搜历史记录
export const getSearchHistory = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/devices/getSearchHistory",
    data,
    config: {
      showLoading: false,
    },
  });
// 全部设备-查询
export const devicesQuery = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/devices/query",
    data,
    config: {
      showLoading: false,
    },
  });
// 日志查询-查询
export const logQuery = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/log/findAll",
    data,
    config: {
      showLoading: false,
    },
  });
// 日志-开启记录
export const startLog = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/log/startLog",
    data,
    config: {
      showLoading: false,
    },
  });
// 日志-关闭记录
export const stopLog = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/log/stopLog",
    data,
    config: {
      showLoading: false,
    },
  });
// 悬浮窗-设备详情
export const detailQuery = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/detail/query",
    data,
    config: {
      showLoading: false,
    },
  });
// 命令分组-查询
export const commandQuery = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/command/query",
    data,
    config: {
      showLoading: false,
    },
  });
// 命令分组-保存
export const commandSave = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/command/save",
    data,
    config: {
      showLoading: false,
    },
  });
// 设备-查询凭证
export const devicesCredit = (data) =>
  request({
    method: "post",
    url: config.version + "/webconsole/devices/credit",
    data,
    config: {
      showLoading: false,
    },
  });
