import "bootstrap/dist/css/bootstrap.css"
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import { createApp } from 'vue'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from "@fortawesome/free-solid-svg-icons"
import App from './App.vue'
import router from './router'

library.add(fas);


createApp(App)
    .component('fa', FontAwesomeIcon)
    .use(router)
    .mount('#app')


// import "jquery/dist/jquery.js"
import "bootstrap/dist/js/bootstrap.js"