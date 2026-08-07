<template>
  <div style="width: 100%; height: 100%; overflow: auto; padding: 8px;">
    <!-- Quasar QTree -->
    <q-tree
        :nodes="treeList"
        node-key="name"
        label-key="label"
        default-expand-all
        no-transition
        @node-click="handleClick"
    >
      <!-- 自定义节点内容：名称 + 蓝色百分比 -->
      <template #default-header="{ node }">
        <span>{{ node.label }}</span>
        <span style="color:#1976d2; margin-left: 10px;">{{ node.percent }}%</span>
      </template>
    </q-tree>
  </div>
</template>

<script setup>
import {defineEmits} from 'vue'

const emit = defineEmits(['selectSpecies'])

// 树形数据：同级相加=100%
const treeList = [
  {
    label: '生物界',
    name: '生物界',
    percent: 100,
    children: [
      {
        label: '细菌界',
        name: '细菌界',
        percent: 100,
        children: [
          {
            label: '厚壁菌门',
            name: '厚壁菌门',
            percent: 45,
            children: [
              {
                label: '芽孢杆菌纲',
                name: '芽孢杆菌纲',
                percent: 45,
                children: [
                  {label: '枯草芽孢杆菌', name: '枯草芽孢杆菌', percent: 45}
                ]
              }
            ]
          },
          {
            label: '变形菌门',
            name: '变形菌门',
            percent: 55,
            children: [
              {
                label: 'γ变形菌纲',
                name: 'γ变形菌纲',
                percent: 55,
                children: [
                  {label: '大肠杆菌', name: '大肠杆菌', percent: 55}
                ]
              }
            ]
          }
        ]
      }
    ]
  }
]

// 点击节点向外抛出
const handleClick = (node) => {
  emit('selectSpecies', node)
}
</script>