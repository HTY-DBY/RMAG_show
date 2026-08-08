<template>
  <div class="layout-wrap">
    <q-splitter class="MainBox" v-model="splitterModel_1" :limits="[1, 99]">
      <!-- 左侧菜单 -->
      <template #before>
        <q-tabs vertical v-model="activeMenu" animated="false">
          <q-tab
              v-for="item in menuList"
              :key="item.path"
              :name="item.path"
              :label="item.title"
              no-caps
              @click="$router.push(item.path)"
          />
        </q-tabs>
      </template>
      <!-- 右侧路由区域，KeepAlive缓存页面状态 -->
      <template #after>
        <div class="AllBox row">

          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
          <div class=" row">
            <FooterCC/>
          </div>

        </div>

      </template>
      <!-- 底部状态栏 -->

    </q-splitter>


  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {useRoute} from 'vue-router'
import FooterCC from "@/components/FooterC.vue";
import {useExcelStore} from "@/Other/excelFunction.ts";
import {useDomStore} from '@/Other/store.ts'

const route = useRoute()
const splitterModel_1 = ref(8)

// 菜单配置，和子路由path严格对应
const menuList = [
  {title: 'RmagMainC', path: '/RmagMainC'},
  {title: 'Contact', path: '/ContactMainC'},
  {title: 'TestMainC', path: '/TestMainC'},
]

// 路由变化自动高亮左侧菜单
const activeMenu = computed(() => route.path)
const excelStore = useExcelStore()
const domStore = useDomStore()


onMounted(async () => {
  await excelStore.refreshExcel()
  domStore.set_RMAG_database_read_ok_Ref(true)
})
</script>

<style lang="scss" scoped>
.layout-wrap {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.MainBox {
  flex: 1;
  width: 100%;
  height: 0;
}

.AllBox {
  width: 100%;
  height: 100%;
  position: relative;
}

.HeadC_style {

}

* {
  user-select: text !important;
}

:root {
  --q-transition-duration: 0s !important;
}

* {
  transition: background-color 0s, color 0s, border-color 0s !important;
}

// 底部状态栏样式
.footer-status-bar {
  height: 32px;
  background: #f5f5f5;
  border-top: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 24px;
  font-size: 13px;
  color: #444;

  .status-item {
    white-space: nowrap;
  }
}
</style>