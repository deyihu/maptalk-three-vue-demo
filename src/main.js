import Vue from 'vue'
import App from './App.vue'

import router from './router/index';
import { createThreeLayer } from './components/createThreeLayer';

Vue.config.productionTip = false

let queue = [];
let initThreeLayerStart = false;
let initThreeLayerEnd = false;

Vue.prototype.initThreeLayer = function (callback) {
  if (!initThreeLayerEnd) {
    queue.push(callback);
  }
  if (!this.getThreeLayer() && !initThreeLayerStart) {
    initThreeLayerStart = true;
    createThreeLayer(this.getMap(), (threeLayer) => {
      window.threeLayer = threeLayer;
      initThreeLayerEnd = true;
      queue.forEach(cb => {
        cb && cb();
      });
      queue = [];
    });
  } else if (initThreeLayerEnd) {
    callback && callback();
  }
}
Vue.prototype.getMap = () => {
  return window.map;
}

Vue.prototype.getThreeLayer = () => {
  return window.threeLayer;
}

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
