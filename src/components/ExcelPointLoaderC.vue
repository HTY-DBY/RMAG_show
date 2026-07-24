<template>
  <div class="excel-container pa-4">
    <div class="tool-bar mb-4 d-flex align-center gap-4">
      <h5 class="mb-0">总数量：{{ excelStore.pointList.length }}</h5>
      <div v-if="excelStore.errMsg" class="error-text">{{ excelStore.errMsg }}</div>
    </div>

    <!-- 滚动容器核心 -->
    <div class="table-scroll-wrap">
      <v-table density="compact">
        <thead>
        <tr>
          <th>ID</th>
          <th>SRR_ID_Link</th>
          <th>BioProject_ID</th>
          <th>经度 Lng</th>
          <th>经度 Lng</th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="item in excelStore.pointList"
            :key="item.ID"
            @click="excelStore.setSelectPoint(item)"
            :class="{
              'selected-row': excelStore.selectPoint?.ID === item.ID
            }"
        >
          <td>{{ item.ID }}</td>
          <td>{{ item.SRR_ID_Link }}</td>
          <td>{{ item.BioProject_ID }}</td>
          <td>{{ item.lat }}</td>
          <td>{{ item.lng }}</td>
        </tr>
        </tbody>
      </v-table>
    </div>

    <!-- 空数据提示 -->
    <div v-if="excelStore.pointList.length === 0" class="empty-tip mt-6 text-center">
      暂无点位数据
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted} from 'vue'
import {useExcelStore} from '@/stores/excelFunction.ts'

const excelStore = useExcelStore()

onMounted(() => {
  excelStore.loadCache()
})

onUnmounted(() => {
  excelStore.clearTimer()
})

</script>

<style scoped lang="scss">
.excel-container {
  width: 100%;
  height: 100%;
}

.empty-tip {
  color: #999;
  font-size: 16px;
}

.error-text {
  color: #f53f3f;
}

// 关键：滚动容器
.table-scroll-wrap {
  height: calc(100% - 80px);
  overflow-y: auto;
}

:deep(tbody tr) {
  cursor: pointer;
}

:deep(tbody tr:hover) {
  background: #dcfbda !important;
}

:deep(.selected-row) {
  background: #9fef9b !important;
}
</style>