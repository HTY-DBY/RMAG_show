import {createApp} from 'vue'
import {createPinia} from 'pinia'
// @ts-ignore
import App from './App.vue'
// Vuetify
import 'vuetify/styles'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import {createVuetify} from "vuetify/framework"; // Ensure you are using css-loader
import {createI18n} from 'vue-i18n'
import 'quasar/src/css/index.sass'
import {Quasar} from 'quasar'


export default createVuetify({
    theme: {
        defaultTheme: 'light', // 'system' | 'light' | 'dark'
    },
    icons: {
        defaultSet: 'mdi', // This is already the default value - only for display purposes
    },

})

// 创建实例
const i18n = createI18n({
    // something vue-i18n options here ...
})
const pinia = createPinia()
const app = createApp(App)
const vuetify = createVuetify({
    components,
    directives,
})
// 注册，挂载
app.use(pinia)
app.use(vuetify)
app.use(i18n)
app.use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
})
app.mount('#app')