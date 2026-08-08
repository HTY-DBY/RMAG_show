<template>
  <div class="test1-container">
    <div class="row q-pa-sm">
      <div class="q-pa-sm">
        <v-btn @click="handlePrintStoreData">打印全局点位数据</v-btn>
      </div>
      <div class="q-pa-sm">
        <v-btn class="q-pa-sm" @click="handleRefreshExcel" :disabled="excelStore.loading">
          {{ excelStore.loading ? "Excel加载中..." : "刷新Excel数据" }}
        </v-btn>
      </div>
    </div>
    <!--····················-->
    <div class="row q-pa-sm">
      <div>RMAG_ID_now: {{ domStore.RMAG_ID_now }}</div>
      <q-separator color="orange" vertical inset/>
      <div>RMAG_database_read_ok: {{ domStore.RMAG_database_read_ok }}</div>
      <q-separator color="orange" vertical inset/>
      <div>动作：{{ info_1 }}</div>
      <q-separator color="orange" vertical inset/>
      <div>状态：{{ info_2 }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useExcelStore} from '@/Other/excelFunction'
import {onMounted, ref} from "vue";
import {useDomStore} from '@/Other/store.ts'

const domStore = useDomStore()
const excelStore = useExcelStore()
const info_1 = ref<string | number | null>(null)
const info_2 = ref<string | number | null>(null)

// 控制台打印所有点位
const handlePrintStoreData = () => {
  console.log('======== Test1C 打印点位数据 ========')
  console.log('pointList 数组：', excelStore.pointList)
  console.log('数据总条数：', excelStore.pointList.length)
  if (excelStore.pointList.length > 0) {
    console.log('第一条点位示例：', excelStore.pointList[0])
  }
  console.log('======================================')
}

// 手动触发excel刷新
const handleRefreshExcel = async () => {
  console.log('点击触发 excelStore.refreshExcel')
  info_1.value = '点击触发 excelStore.refreshExcel'
  info_2.value = '等待 excelStore.refreshExcel'
  await excelStore.refreshExcel()
  info_2.value = '已完成 excelStore.refreshExcel'
}
</script>

<style scoped lang="scss">
.test1-container {
  width: 100%;
  height: 100%;
}

:deep(.q-separator--vertical) {
  width: 1px !important;
  height: 20px !important;
  align-self: stretch;
  margin: 0 10px !important;
  flex-shrink: 0;
}

</style>