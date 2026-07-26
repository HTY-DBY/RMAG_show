import {fileURLToPath, URL} from 'node:url'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {defineConfig, loadEnv, ConfigEnv, UserConfig} from 'vite'
import {join} from 'node:path'
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

// https://www.cnblogs.com/weizwz/p/18411342
export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)
    // const viteEnv = wrapperEnv(env)
    return {
        base: '/RMAG_show/',
        // base: env.VITE_PUBLIC_PATH,
        plugins: [
            vue({
                template: {transformAssetUrls}
            }),
            vueDevTools(),
            quasar({
                sassVariables: join(import.meta.dirname, 'src/assets/quasar-variables.sass')
            })
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url)),
            },
        },
        server: {
            host: '0.0.0.0',
            port: Number(env.VITE_PORT) || 3333,
            open: true,
        },

    }
})