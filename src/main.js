import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Pusher.logToConsole = true;
new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
