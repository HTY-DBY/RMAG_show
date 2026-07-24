import {fileURLToPath, URL} from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {resolve} from 'path'
import {defineConfig, loadEnv, ConfigEnv, UserConfig} from 'vite'
// @ts-ignore
// import {wrapperEnv} from './build'
// // https://vite.dev/config/
// export default defineConfig({
//     // base: "/main/",
//     plugins: [
//         vue(),
//         vueDevTools(),
//     ],
//     resolve: {
//         alias: {
//             '@': fileURLToPath(new URL('./src', import.meta.url)),
//         },
//     },
// })
// https://vitejs.dev/config/
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    // const viteEnv = wrapperEnv(env)

    return {
        base: env.VITE_PUBLIC_PATH,
        plugins: [vue()],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT) || 3000,
            open: true,
            // 本地跨域代理 https://cn.vitejs.dev/config/server-options.html#server-proxy
            // proxy: {
            //     '^/api': {
            //         target: 'http://192.168.1.4:8688',
            //         changeOrigin: true,
            //         rewrite: (path) => path.replace(/^\/api/, '')
            //     }
            // }
        }
    }
})