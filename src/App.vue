<template>
  <q-splitter class="MainBox" v-model="splitterModel_1" :limits="[1, 99]">
    <!-- 左侧菜单 -->
    <template #before>
      <q-tabs vertical v-model="activeMenu">
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
      <div class="AllBox">
        <HeadC/>
        <KeepAlive>

          <RouterView/>
        </KeepAlive>
      </div>
    </template>
  </q-splitter>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import {useRoute} from 'vue-router'
import HeadC from '@/components/HeadC.vue'

const route = useRoute()
const splitterModel_1 = ref(8)

// 菜单配置，和子路由path严格对应
const menuList = [
  {title: 'Map show', path: '/MapShowMainC'},
  {title: 'Contact', path: '/ContactMainC'},
  {title: 'Test2C', path: '/Test2C'},
  {title: 'Test3C', path: '/Test3C'},
]

// 路由变化自动高亮左侧菜单
const activeMenu = computed(() => route.path)
</script>

<style lang="scss" scoped>
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
</style>