import axios from "axios";
import router from "@/router";
import { getToken, setToken, removeToken } from "./auth";
import { message, loading, closeLoading, confirm } from "./notice";
const config = require("@/config");
let data = {};
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: config.url,
  // 超时15s
  timeout: 30 * 1000,
});
// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    if (getToken()) {
      config.headers["Authorization"] = getToken();
    } else {
      config.headers["Authorization"] = "";
    }
    if (config.method === "post") {
      config = Object.assign(config, {
        method: "post",
        data: config.data || config.params,
        params: undefined,
      });
    } else {
      config = Object.assign(config, {
        method: "get",
        params: config.data,
      });
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const {
      showLoading = true,
      showMessage = false,
      msg = "操作成功",
    } = res.config.config || {};
    if (res.status === 200) {
      const { url } = res.config;
      const { code } = res.data;
      // if (code !== "0000" && res.request.responseType !== "blob") {
      //   //不是导出 提示导出成功
      //   message(res.data.message, "info");
      // }

      if (res.config.config && res.config.config.caches && code === "0000") {
        data[url] = res.data;
      }
      if (
        code === "0018" ||
        code === "0023" ||
        code === "0024" ||
        code === "1007"
      ) {
        message({
          msg: res.data.message,
          type: "info",
        });
        router.replace({
          name: "login",
        });
        // removeToken();
      }
      const token = res.headers.authorization;
      if (token) {
        setToken(token);
      }
      //不是导出
      if (res.request.responseType !== "blob") {
        if (code === "0000") {
          setTimeout(() => {
            showMessage &&
              message({
                msg,
                type: "success",
              });
          }, 200);
          return Promise.resolve(res.data.data);
        } else {
          message({
            msg: res.data.message || "服务器异常",
            type: "error",
          });
          return Promise.reject(res);
        }
      } else {
        //是导出 判断导出接口是否成功
        if (res.data.type === "application/json") {
          message({
            msg: "解析文件失败",
            type: "error",
          });
          return Promise.reject(res);
        } else {
          return Promise.resolve(res);
        }
      }
    } else {
      return Promise.reject(res);
    }
  },
  (error) => {
    let msg = error.msg || "服务器异常";
    if (msg == "Network Error") {
      msg = "后端接口连接异常";
    } else if (msg.includes("timeout")) {
      msg = "系统接口请求超时";
    } else if (msg.includes("Request failed with status code")) {
      msg = "系统接口" + msg.substr(msg.length - 3) + "异常";
    }
    message({
      msg,
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default (params) => {
  /**
   * @param {String} method 请求方式 get post
   * @param {String} url 请求路径
   * @param {Object} data 请求参数
   * @param {Object} config 配置参数
   * @param {boolean} config.showLoading 是否加载loading 默认true
   * @param {boolean} config.showMessage 是否显示消息
   * @param {String} config.msg 消息提示内容
   * @param {String} config.caches 是否缓冲
   * @param {String} config.type请求类型 put(修改) del(删除) add(新增)
   */
  const {
    type = "get",
    showLoading = true,
    zdyMsg,
    dialogTitle,
  } = params.config || {};
  let mes = "";
  if (type == "add") mes = zdyMsg || "确定要新增吗?";
  if (type == "del") mes = zdyMsg || "确定要删除吗?";
  if (type == "put") mes = zdyMsg || "确定要修改吗?";
  if (mes) {
    return confirm({
      msg: mes,
      title: dialogTitle,
    })
      .then(() => {
        return service(params);
      })
      .catch((error) => {
        if (error) {
          message({
            msg: error.data.message || "服务器异常",
            type: "error",
          });
        } else {
          message({
            msg: "已取消操作",
            type: "info",
          });
        }
        return Promise.reject(false);
      });
  } else {
    showLoading && loading();
    return new Promise((resolve, reject) => {
      service(params)
        .then((response) => {
          showLoading && closeLoading();
          resolve(response);
        })
        .catch((error) => {
          showLoading && closeLoading();
          reject(error);
        });
    });
  }
};
