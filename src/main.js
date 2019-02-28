// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Mint from 'mint-ui';
import axios from 'axios'
import 'mint-ui/lib/style.css'
import 'swiper/dist/css/swiper.min.css'
import  { LoadingPlugin,ToastPlugin,Loading } from 'vux'
import vconsole from 'vconsole'

Vue.use(LoadingPlugin,ToastPlugin)
Vue.use(Mint);
Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.component('loading', Loading)
Vue.use(ToastPlugin, {position: 'center'})
Vue.prototype.vConsole = new vconsole()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
