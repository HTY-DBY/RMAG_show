<template>
  <div class="test1-container pa-6">
    <!-- 测试按钮 -->
    <v-btn @click="handlePrintStoreData">
      打印全局点位数据
    </v-btn>

    <v-btn class="ml-4" @click="handleRefreshExcel" :disabled="excelStore.loading">
      {{ excelStore.loading ? "Excel加载中..." : "刷新Excel数据" }}
    </v-btn>

    <!-- Toggle between Light / Dark -->
    <v-btn class="ml-4"
           @click="theme.toggle()"
           text="Toggle Light / Dark"
    ></v-btn>


    <div v-if="excelStore.errMsg" class="mt-4 text-red-500">
      错误信息：{{ excelStore.errMsg }}
    </div>
  </div>
</template>

<script setup lang="ts">
import {useExcelStore} from '@/stores/excelFunction'

const excelStore = useExcelStore()// 获取pinia仓库实例
import {useTheme} from 'vuetify'

const theme = useTheme()
/**
 * 测试：控制台打印所有点位
 */
const handlePrintStoreData = () => {
  console.log('======== Test1C 打印点位数据 ========')
  console.log('pointList 数组：', excelStore.pointList)
  console.log('数据总条数：', excelStore.pointList.length)
  if (excelStore.pointList.length > 0) {
    console.log('第一条点位示例：', excelStore.pointList[0])
  }
  console.log('======================================')
}

/**
 * 测试：手动触发excel刷新
 */
const handleRefreshExcel = async () => {
  console.log('Test1C页面：点击触发 refreshExcel')
  await excelStore.refreshExcel()
}
</script>

<style scoped lang="scss">
.test1-container {
  width: 100%;
  height: 100%;
}
</style>