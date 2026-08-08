import {createMemoryHistory, createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import {BASE_PREFIX} from '@/Other/VariableStorage.ts'
import RmagMainC from './components/RmagMainC.vue'
import ContactMainC from '@/components/ContactMainC.vue'
import TestMainC from "@/components/TestMainC.vue";


const routes = [
    {path: '/', component: RmagMainC},
    {path: '/ContactMainC', component: ContactMainC},
    {path: '/RmagMainC', component: RmagMainC},
    {path: '/TestMainC', component: TestMainC},
    // {path: '/Test2C', component: Test2C},
    // {path: '/Test3C', component: Test3C},
]

const router = createRouter({
    history: createWebHashHistory(BASE_PREFIX),
    routes,
})

export default router