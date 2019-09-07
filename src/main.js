// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";

//import Framework7 from 'framework7/framework7.esm.bundle';
//import Framework7Vue from 'framework7-vue';
//import "framework7/css/framework7.bundle.min.css";

// Import store
import store from "./store/store.js";
import moduleSocket from "./store/moduleSocket.js";
import moduleHttp from "./store/moduleHttp.js";

// import app.vue
import App from "./App";

//Framework7.use(Framework7Vue);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  components: { App },
  render: h => h(App),
  //template: "<App/>",
  created() {
    store.registerModule("settings", moduleSocket);
    store.registerModule("status", moduleSocket);
    store.registerModule("testhttp", moduleHttp)
  },
  mounted() {
    store.dispatch("settings/startAPI", "wss://echo.websocket.org");
    store.dispatch("status/startAPI", "wss://echo.websocket.org");
    store.dispatch("testhttp/startAPI", { url: "https://api.coindesk.com/v1/bpi/currentprice.json", interval : 5})
    //store.dispatch("testhttp/get", "https://jsonplaceholder.typicode.com/posts/1")
  }
});
