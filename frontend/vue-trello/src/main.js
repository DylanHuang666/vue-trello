import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TMessage from '@/components/TMessage/TMessage.js';
import '@/assets/css/css.css'
Vue.prototype.$message = TMessage;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
