import {createMemoryHistory, createRouter, createWebHistory} from 'vue-router'
import {BASE_PREFIX} from '@/Other/VariableStorage.ts'
import Test2C from '@/components/Test2C.vue'
import Test3C from '@/components/Test3C.vue'
import DataShowC from '@/components/DataShowC.vue'
import RmagMainC from './components/RmagMainC.vue'
import ContactMainC from '@/components/ContactMainC.vue'


const routes = [
    {path: '/', component: RmagMainC},
    {path: '/ContactMainC', component: ContactMainC},
    {path: '/RmagMainC', component: RmagMainC},
    {path: '/Test2C', component: Test2C},
    {path: '/Test3C', component: Test3C},
]

const router = createRouter({
    history: createWebHistory(BASE_PREFIX),
    routes,
})

export default router