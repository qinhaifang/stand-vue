import request from "@/utils/fetch";
const config = require('@/config')
// 获取所有设备品牌型号
export const findAllBrandModels = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/findAllBrandModels",
    data,
  });
// 根据型号id获取详情
export const getCollectOidByModelId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectOid/getCollectOidByModelId",
    data,
  });
// 修改设备详情
export const updateForModels = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectOid/updateForModels",
    data,
    config: {
      showMessage: true,
    },
  });

// 获取采集凭证表格数据
export const collectFindListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/findListByParam",
    data,
  });

// 新增编辑
export const collectSaveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/saveOrUpdate",
    data,
    config: {
      showMessage: true,
    },
  });

// 编辑时根据id查询
export const collectFindById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/findById",
    data,
  });

// 模糊查询
export const collectSearch = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/search",
    data,
    config: {
      showLoading: false,
    },
  });
// 删除
export const collectDeleteById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectcredit/deleteById",
    data,
    config: {
      showMessage: true,
    },
  });

// 根据条件查询列表
export const keysFindListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/findListByParam",
    data,
  });

// 删除
export const keysGetSearchBarData = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/search",
    data,
    config: {
      showLoading: false,
    },
  });

// 查找字段组和名称
export const keysFindByName = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/findByName",
    data,
  });

// 查找某个字段值
export const keysFindByIdForList = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/findByIdForList",
    data,
  });

// 查找字段组和名称
export const keysSaveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/saveOrUpdate",
    data,
    config: {
      showMessage: true,
    },
  });

// 自定义分组中调取字典表
export const getDictDataParamsKeys = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/getDictData",
    data,
    config: {
      caches: true,
    },
  });

// 根据条件查询列表
export const findListByParam = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/findListByParam",
    data,
  });

// 根据条件查询列表
export const getSearchBarData = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/search",
    data,
    config: {
      showLoading: false,
    },
  });

// 根据条件查询列表
export const findById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/findById",
    data,
  });

// 根据条件查询列表
export const saveOrUpdate = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/saveOrUpdate",
    data,
    config: {
      showMessage: true,
    },
  });

// 获取OID指标
export const findAllTargetName = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/collectOid/findAllTargetName",
    data,
    config: {
      showLoading: false,
    },
  });

// 删除
export const deleteById = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/deleteById",
    data,
    config: {
      type: "del",
      showMessage: true,
    },
  });

// 字典
export const getDictData = (data) =>
  request({
    method: "post",
    url: config.version + "/system/dict/getDictData",
    data,
  });

// 删除版本号
export const deleteVersionId = (data) =>
  request({
    method: "post",
    url: config.version + "/resource/devicemodel/deleteVersion",
    data,
    config: {
      type: "del",
    },
  });
