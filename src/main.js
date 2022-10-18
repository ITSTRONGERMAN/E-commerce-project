import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/flexible";
import "reset-css";
import "@/Tools/VantUI";

Vue.config.productionTip = false;
Vue.filter("RMBfilter", function (val) {
  return "￥" + Number(val).toFixed(2) + "元";
});
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
