// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import axios from 'axios'

import 'mint-ui/lib/style.css'

import Mint from 'mint-ui'


Vue.use(Mint)
Vue.use(Vuex)
Vue.prototype.$axios = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  beforeCreate () {
    Vue.prototype.bus = this
  }
})
