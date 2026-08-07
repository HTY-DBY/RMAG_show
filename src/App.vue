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
          <q-separator/>
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component"/>
            </keep-alive>
          </router-view>
        </div>
        <div class="footer-status-bar row">
          <div class="status-item">时间：{{ nowTime }}</div>
          <div class="status-item">IP：{{ clientIp || '获取中...' }}</div>
          <div class="status-item">设备：{{ deviceInfo }}</div>
          <div class="status-item">UA：{{ browserUA }}</div>
        </div>
      </template>
      <!-- 底部状态栏 -->

    </q-splitter>


  </div>
</template>

<script setup lang="ts">
import {ref, computed, onMounted, onUnmounted} from 'vue'
import {useRoute} from 'vue-router'

const route = useRoute()
const splitterModel_1 = ref(8)

// 菜单配置，和子路由path严格对应
const menuList = [
  {title: 'RmagMainC', path: '/RmagMainC'},
  {title: 'Contact', path: '/ContactMainC'},
  {title: 'Test2C', path: '/Test2C'},
  {title: 'Test3C', path: '/Test3C'},
]

// 路由变化自动高亮左侧菜单
const activeMenu = computed(() => route.path)

// 实时时间
const nowTime = ref('')
let timer: number | null = null
const updateTime = () => {
  nowTime.value = new Date().toLocaleString('zh-CN', {
    hour12: false
  })
}

// 浏览器UA
const browserUA = ref(navigator.userAgent)

// 设备类型判断
const deviceInfo = computed(() => {
  const ua = navigator.userAgent
  if (/Android|iPhone|iPad|iPod/i.test(ua)) {
    return '移动端'
  }
  return 'PC端'
})

// IP地址（前端无法直接获取内网IP，只能获取公网IP，借助公开接口）
const clientIp = ref('')
const getIp = async () => {
  try {
    const res = await fetch('https://api.ipify.org?format=json')
    const json = await res.json()
    clientIp.value = json.ip
  } catch (err) {
    clientIp.value = '无法获取'
  }
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
  getIp()
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
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