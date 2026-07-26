<template>
  <div class="excel-container pa-4">
    <div class="tool-bar mb-4 d-flex align-center gap-4">
      <h5 class="mb-0">总数量：{{ excelStore.pointList?.length || 0 }}</h5>
      <div v-if="excelStore.errMsg" class="error-text">{{ excelStore.errMsg }}</div>
    </div>

    <div class="table-scroll-wrap">
      <q-table
          dense
          :rows="excelStore.pointList || []"
          row-key="ID"
      >
        <template #header>
          <q-tr>
            <q-th>ID</q-th>
            <q-th>SRR_ID_Link</q-th>
            <q-th>BioProject_ID</q-th>
            <q-th>纬度 Lat</q-th>
            <q-th>经度 Lng</q-th>
          </q-tr>
        </template>

        <template #body="props">
          <q-tr
              :props="props"
              @click="excelStore.setSelectPoint(props.row)"
              :class="{ 'selected-row': excelStore.selectPoint?.ID === props.row.ID }"
          >
            <q-td>{{ props.row.ID }}</q-td>
            <q-td>{{ props.row.SRR_ID_Link }}</q-td>
            <q-td>{{ props.row.BioProject_ID }}</q-td>
            <q-td>{{ props.row.lat }}</q-td>
            <q-td>{{ props.row.lng }}</q-td>
          </q-tr>
        </template>
      </q-table>
    </div>

    <div v-if="(excelStore.pointList || []).length === 0" class="empty-tip mt-6 text-center">
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

.table-scroll-wrap {
  height: calc(100% - 80px);
  overflow-y: auto;
}

:deep(.q-table tbody tr) {
  cursor: pointer;
}

:deep(.q-table tbody tr:hover) {
  background: #dcfbda;
}

:deep(.selected-row) {
  background: #9fef9b !important;
}
</style>