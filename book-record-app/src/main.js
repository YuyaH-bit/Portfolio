import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router.js'

createApp(App).mount('#app')

new Vue({
  router,
  render: function (h) { return h(App) },
}).$mount('#app')