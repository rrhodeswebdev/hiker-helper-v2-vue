import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(require('vue-moment'))

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCnyL8uMZZ2--PxXexaApNEb0oMTN2vbyM'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
