import hlCode from "./src/index.vue";

/* istanbul ignore next */
hlCode.install = function (Vue) {
  Vue.component(hlCode.name, hlCode);
};

export default hlCode;
