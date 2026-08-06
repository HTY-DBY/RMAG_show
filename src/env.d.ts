// env.d.ts
declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 可选：让@别名拥有类型提示
declare module '@/*'