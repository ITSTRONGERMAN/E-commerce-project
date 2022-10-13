import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/flexible";
import "reset-css";
import { Search, Swipe, SwipeItem } from "vant";
Vue.use(Search);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
