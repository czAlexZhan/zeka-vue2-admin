import Vue from 'vue'
import './plugins/assets'
import { setupLoading } from './plugins'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

async function setupApp() {
  setupLoading()
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount('#app')
}

setupApp()
