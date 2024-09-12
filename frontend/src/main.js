import { createApp } from 'vue'
import './style.css'
import router from './router'
import App from './App.vue'
import { pinia } from './stores'

// Plugins
import { registerPlugins } from '@/plugins'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(registerPlugins);

app.mount('#app');