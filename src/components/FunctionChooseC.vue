<template>
  <v-card flat>
    <v-layout>
      <v-navigation-drawer expand-on-hover permanent>
        <v-list density="compact" nav>
          <v-list-item
              v-for="item in menuList"
              :key="item.key"
              :title="item.title"
              :active="activeMenu === item.key"
              @click="$emit('menu-change', item.key)"
          />
        </v-list>
        <v-divider></v-divider>

        <template #append>
          <div class="d-flex align-center justify-between ">
            <v-list>
              <v-list-item subtitle="subtitle@gmail" title="title"/>
            </v-list>
            <v-icon-btn icon="mdi-cog-outline" size="default"/>
          </div>
        </template>
      </v-navigation-drawer>
    </v-layout>
  </v-card>
</template>

<style scoped lang="scss">
:deep(.v-navigation-drawer__append) {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 70px;
  display: flex;
  align-items: center;
}

:deep(.v-list-item-subtitle) {
  line-height: 2rem;
}
</style>

<script setup lang="ts">
// 把子组件定义为泛型组件，key类型跟随父组件传入的数据
export type MenuItem<Key extends string = string> = {
  title: string
  key: Key
  component: unknown
}

// 泛型props
const props = defineProps<{
  activeMenu: string
  menuList: MenuItem[]
}>()

const emit = defineEmits<{
  'menu-change': [key: string]
}>()
</script>