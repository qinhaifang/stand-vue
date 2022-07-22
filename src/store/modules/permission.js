import { constantRoutes } from "@/router";
import { getUserRoutes } from "@/api/menu";
import Layout from "@/global/layout/index";

const permission = {
  state: {
    routes: [],
    addRoutes: [],
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes;
      state.routes = routes.concat(constantRoutes);
    },
    SET_SIDEBAR_ROUTERS: (state, routes) => {
      state.sidebarRouters = routes;
    },
    SET_ALLROUTES: (state, routes) => {
      state.allRoutes = routes;
      console.log(routes, "routes");
    },
  },
  actions: {
    // 生成路由
    GenerateRoutes({ commit }) {
      return new Promise((resolve) => {
        // 向后端请求路由数据
        getUserRoutes().then((res) => {
          if (res.routeTaggingVOList) {
            // const result = res.routeTaggingVOList;
            const result = [
              {
                id: "754ac655c32d4cdea945247251292512",
                name: "systemManagement",
                path: "/systemManagement",
                hidden: false,
                component: "Layout",
                meta: {
                  title: "系统管理",
                  icon: "a-xingzhuang2",
                  routerParentUrl: null,
                },
                parentId: "0",
                children: [
                  {
                    id: "34ea311c5d42407aaf08e2efbecba294",
                    name: "UserManage",
                    path: "/UserManage",
                    hidden: false,
                    component: "systemManagement/UserManage",
                    meta: {
                      title: "用户管理",
                      icon: null,
                      routerParentUrl: null,
                    },
                    parentId: "754ac655c32d4cdea945247251292512",
                    children: [],
                    orderNum: 1,
                  },
                  {
                    id: "70d7500a485448278b4adf813f2c71af",
                    name: "RoleManage",
                    path: "/RoleManage",
                    hidden: false,
                    component: "systemManagement/RoleManage",
                    meta: {
                      title: "角色管理",
                      icon: null,
                      routerParentUrl: null,
                    },
                    parentId: "754ac655c32d4cdea945247251292512",
                    children: [],
                    orderNum: 2,
                  },
                  {
                    id: "5ab92d1889e941378bc92fc31a042cd3",
                    name: "menuData",
                    path: "/menuData",
                    hidden: false,
                    component: "systemManagement/menuData/index",
                    meta: {
                      title: "菜单管理",
                      icon: null,
                      routerParentUrl: null,
                    },
                    parentId: "754ac655c32d4cdea945247251292512",
                    children: [],
                    orderNum: 3,
                  },
                ],
                orderNum: 1,
              },
            ];
            const rdata = JSON.parse(JSON.stringify(result));
            commit("SET_ALLROUTES", filterAllRouter(rdata));

            const rewriteRoutes = filterAsyncRouter(rdata, false, true);
            rewriteRoutes.push({ path: "*", redirect: "/404", hidden: true });
            commit("SET_ROUTES", rewriteRoutes);
            resolve(rewriteRoutes);
          }
        });
      });
    },
  },
};

// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap) {
  return asyncRouterMap.filter((route) => {
    if (route.component) {
      // Layout组件特殊处理
      if (route.component === "Layout") {
        route.component = Layout;
      } else {
        route.component = loadView(route.component);
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children);
    }
    return true;
  });
}
function filterAllRouter(asyncRouterMap) {
  let arr = [];
  asyncRouterMap.map((route) => {
    if (route.component === "Layout" && route.children.length == 1) {
      arr.push({
        ...route.children[0],
        orderNum: 1,
      });
    } else {
      if (route.children != null && route.children && route.children.length) {
        arr.push(...filterAllRouter(route.children));
      } else {
        arr.push(route);
      }
    }
  });
  return arr;
}

export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve);
};

export default permission;
