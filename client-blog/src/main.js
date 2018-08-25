import Vue from "vue";
import wysiwyg from "vue-wysiwyg";

import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(wysiwyg, {
  forcePlainTextOnPaste: true,
  maxHeight: "500px",
  hideModules: { bold: true }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
