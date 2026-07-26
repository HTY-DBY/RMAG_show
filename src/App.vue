<template>
  <div>
    <!-- ====== 新增加载提示 ====== -->
    <div v-if="excelStore.loading" class="loading-tip">
      <span>Data loading...</span>
    </div>
    <q-splitter v-model="splitterModel_1" class="MainBox" :limits="[1, 99]">
      <template v-slot:before>
        <!-- 左侧菜单 -->

        <q-tabs v-model="activeMenu" vertical>
          <q-tab no-caps
                 v-for="item in menuList"
                 :key="item.key"
                 :name="item.key"
                 :label="item.title"
                 @click="handleMenuChange(item.key)"
          />
        </q-tabs>
      </template>
      <!--###-->
      <template v-slot:after>
        <!--         右侧动态组件，不加key，保留组件状态 -->
        <div class="AllBox">
          <q-splitter v-model="splitterModel_2" class="AllBox" :limits="[1, 99]">
            <template v-slot:before>
              xxx
            </template>
            <template v-slot:after class="MainBox">
              <component :is="currentView"/>
            </template>
          </q-splitter>
        </div>
      </template>
    </q-splitter>

  </div>

</template>


<script setup lang="ts">

import {ref, computed, watch, onMounted, onUnmounted} from 'vue'

import Test1C from "@/components/Test1C.vue"
import ContactMain from "@/components/ContactMain.vue"
// @ts-ignore
import ExcelPointLoaderC from "@/components/ExcelPointLoaderC.vue"
// @ts-ignore
import MapShowMainC from "@/components/MapShowMainC.vue"
import {useExcelStore} from '@/stores/excelFunction'

const excelStore = useExcelStore()
const tab = ref('mails')
const splitterModel_1 = ref(10)
const splitterModel_2 = ref(30)
// ============ 统一配置中心 ============
const menuList = [
  {
    title: "Map show", key: "MapShowMainC", component: MapShowMainC
  },
  {
    title: "Test 1",
    key: "Test1C",
    component: Test1C
  },
  {
    title: "Data show",
    key: "DataShow",
    component: ExcelPointLoaderC
  },
  {
    title: "BioData show",
    key: "BioDataShow",
    component: Test1C
  },
  {
    title: "Add data",
    key: "AddData",
    component: Test1C
  },
  {
    title: "Contact",
    key: "ContactMain",
    component: ContactMain
  },
] as const

type MenuKey = (typeof menuList)[number]['key']
const validKeys = new Set<MenuKey>(menuList.map(i => i.key))

// 当前激活菜单
const activeMenu = ref<MenuKey>('MapShowMainC')

// key -> 组件映射
const componentMap = computed(() => {
  return menuList.reduce((res, item) => {
    res[item.key] = item.component
    return res
  }, {} as Record<MenuKey, unknown>)
})
const currentView = computed(() => componentMap.value[activeMenu.value])

/**
 * 解析url hash里面的参数 menu=xxx
 */
function getUrlMenuParam(): string | null {
  const searchStr = window.location.search
  const urlParams = new URLSearchParams(searchStr)
  return urlParams.get('menu')
}

/**
 * 修改浏览器地址参数，不刷新页面
 */
function updateUrlParam(key: MenuKey) {
  const url = new URL(window.location.href)
  url.searchParams.set('menu', key)
  // replace：不新增历史记录；想用前进后退改用 pushState
  history.replaceState({}, '', url.toString())
}

/**
 * 菜单点击切换
 */
const handleMenuChange = (val: MenuKey) => {
  console.log('\n========== 菜单切换日志 ==========')
  console.log('选中菜单key：', val)
  console.log('切换前activeMenu：', activeMenu.value)

  activeMenu.value = val
  updateUrlParam(val)

  console.log('切换完成activeMenu：', activeMenu.value)
  console.log('==================================\n')
}

/**
 * 浏览器前进/后退触发，监听popstate事件
 */
function onPopState() {
  const param = getUrlMenuParam()
  if (!param) return
  const key = param as MenuKey
  if (validKeys.has(key) && activeMenu.value !== key) {
    activeMenu.value = key
  }
}

// 监听浏览器后退/前进
window.addEventListener('popstate', onPopState)
onUnmounted(() => {
  window.removeEventListener('popstate', onPopState)
})

// 页面初始化：读取URL参数恢复页面
onMounted(async () => {
  const initKey = getUrlMenuParam() as MenuKey
  if (initKey && validKeys.has(initKey)) {
    activeMenu.value = initKey
  }
  // 初始化加载数据
  await excelStore.refreshExcel()
})
</script>


<style lang="scss" scoped>
.loading-tip {
  position: fixed;
  z-index: 9999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 24px;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 6px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.12);
  font-size: 24px;
  pointer-events: none;
}

.MainBox {
  width: 100vw;
  height: 100vh;
  position: relative;
}

.AllBox {
  width: 100%;
  height: 100%;
  position: relative;
}

/* 删掉 left_panel 的 width/fixed，抽屉自己控制尺寸 */
.left_panel {

}

.right_panel {
  position: fixed;
  height: 100%;
  width: 100%;
}


</style>
