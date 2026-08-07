import {fileURLToPath, URL} from 'node:url'
import {quasar, transformAssetUrls} from '@quasar/vite-plugin'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {defineConfig, loadEnv, ConfigEnv, UserConfig} from 'vite'
import {join} from 'node:path'
import {BASE_PREFIX} from './src/Other/VariableStorage'
import {viteSingleFile} from 'vite-plugin-singlefile'

export default defineConfig(({mode}: ConfigEnv): UserConfig => {
    const root = process.cwd()
    const env = loadEnv(mode, root)

    return {
        base: BASE_PREFIX,
        plugins: [
            vue({
                template: {transformAssetUrls}
            }),
            vueDevTools(),
            quasar({
                sassVariables: join(import.meta.dirname, 'src/assets/quasar-variables.sass')
            }),
            // 【全程生效：开发、打包全都把JS、CSS嵌入html内部】
            viteSingleFile({
                useRecommendedBuildConfig: true,
                deleteInlinedFiles: true
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

        build: {
            assetsInlineLimit: 50 * 1024 * 1024
        }
    }
})