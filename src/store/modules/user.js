import { login, logout, getUserInfo, getNodeType } from "@/api/login";
import { getDictData } from "@/api/common";
import { setDictData } from "@/dict";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { constantRoutes } from "@/router";
import { getRouters } from "@/api/menu";
import Layout from "@/global/layout/index";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    userId: "",
    roles: [],
    firstTimeLogin: true,
    isMasterNode: false, //是否为主节点
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_USERID: (state, userId) => {
      state.userId = userId;
    },
    SET_FIRSTLOGIN: (state, firstTimeLogin) => {
      state.firstTimeLogin = firstTimeLogin == 0 ? false : true;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_ISMASTERNODE: (state, isMasterNode) => {
      state.isMasterNode = isMasterNode;
    },
  },

  actions: {
    // 判断当前系统节点信息
    getSystemNodeType({ commit, state }) {
      getNodeType()
        .then((res) => {
          commit("SET_ISMASTERNODE", res === 1);
        })
        .catch((error) => {});
    },
    // 登录
    Login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo)
          .then((res) => {
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({ dispatch, commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(async (res) => {
            const user = res.userInfo;
            commit("SET_FIRSTLOGIN", res.firstTimeLogin);
            if (res.roles && res.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit(
                "SET_ROLES",
                res.roles.map((item) => item.roleName)
              );
            } else {
              commit("SET_ROLES", ["ROLE_DEFAULT"]);
            }
            commit("SET_NAME", user.userName);
            commit("SET_USERID", user.id);
            dispatch("getSystemNodeType");
            const data = await getDictData();
            setDictData(data);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 退出系统
    LogoutAction({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
  },
};
export default user;
