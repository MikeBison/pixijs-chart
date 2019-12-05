import Vue from 'vue'
import App from './App.vue'
import * as PIXI from 'pixi.js';

window.__PIXI_INSPECTOR_GLOBAL_HOOK__ &&
  window.__PIXI_INSPECTOR_GLOBAL_HOOK__.register({ PIXI: PIXI })

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
