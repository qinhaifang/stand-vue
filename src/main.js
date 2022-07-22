import Vue from "vue";
import App from "./App";
import store from "./store";
import router from "./router";
import fetch from "@/utils/fetch";
import "./assets/css/index.scss";
Vue.prototype.$fetch = fetch;
import hlElement from "./global";
// import hlElement from "hlcx-ui";
import permission from "@/directives"; //权限指令
import "./permission"; // permission control
import * as dicts from "@/dict";
import "xterm/dist/xterm.css";
import VueCompositionAPI from "@vue/composition-api";
import * as echarts from "echarts";
const configBase = require("@/config/config.base");
Vue.use(hlElement, { size: "mini" });
Vue.use(VueCompositionAPI);
Vue.use(permission);

Vue.prototype.dicts = dicts;
Vue.prototype.$echarts = echarts;
Vue.prototype.$bkConfig = Object.assign({}, configBase);

if (process.env.NODE_ENV === "development") {
  const { mockXHR } = require("../mock");
  mockXHR();
}

window.vm = new Vue({
  el: "#app",
  router,
  store,
  render: (h) => h(App),
});
