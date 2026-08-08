import {defineStore} from 'pinia'


type ElementRef = HTMLElement | null | any

export const useDomStore = defineStore('domStore', {
    state: () => ({
        RMAG_ID_now: null as ElementRef,
        RMAG_database_read_ok: false as ElementRef
    }),
    actions: {
        // 存入test1的ref
        set_RMAG_ID_now_Ref(elf: ElementRef) {
            this.RMAG_ID_now = elf
        },
        set_RMAG_database_read_ok_Ref(elf: ElementRef) {
            this.RMAG_database_read_ok = elf
        },
        // 清空ref
        clear_RMAG_ID_now_Ref() {
            this.RMAG_ID_now = null
        }
    }
})