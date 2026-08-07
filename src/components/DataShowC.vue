<template>
  <div class="row">
    <div class="col">
      Data updated on Jnly 20 2001
    </div>
    <q-input
        dense outlined
        v-model="text"
        placeholder="Search"
        class="q-pa-sm search_input  col"
    >
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
  </div>
  <div class="table-scroll-wrap">
    <q-table
        selection="single"
        v-model:selected="selected"
        dense
        flat
        bordered
        :rows="excelStore.pointList || []"
        :columns="columns"
        row-key="ID"
        :rows-per-page-options="[0]"
        virtual-scroll
        class="my-sticky-header-table "
    >

    </q-table>
  </div>
  <div v-if="(excelStore.pointList || []).length === 0" class="empty-tip mt-6 text-center">
    暂无点位数据
  </div>
  <div class="row q-pa-sm">
    <q-btn color="white" text-color="black" label="Search" class=""/>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, computed, ref} from 'vue'
import {useExcelStore} from '@/Other/excelFunction.ts'

const text = ref('')
const excelStore = useExcelStore()
const selected = ref([])
const columns = [
  {
    name: 'ID',
    label: 'ID',
    field: 'ID',
    align: 'left',
    sortable: true,
  },
  {
    name: 'SRR_ID_Link',
    label: 'SRR',
    field: 'SRR_ID_Link',
    align: 'left',
    sortable: true,
  },
  {
    name: 'BioProject_ID',
    label: 'BioProject',
    field: 'BioProject_ID',
    align: 'left',
    sortable: true,
  },
  // {
  //   name: 'lat',
  //   label: 'Latitude',
  //   field: 'lat',
  //   align: 'left',
  //   sortable: true,
  // },
  // {
  //   name: 'lng',
  //   label: 'Longitude',
  //   field: 'lng',
  //   align: 'left',
  //   sortable: true,
  // }
]

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

.search_input {
  width: 50%;
}

.SearchMain {
  height: 100%;
  width: 100%;
}

.table-scroll-wrap {
  /* 根据你的布局设置高度，比如剩余可视高度 70vh / 固定600px */
  height: 70%;
  overflow: auto;
}

.my-sticky-header-table {
  height: 100%;
  width: 100%;
  //height: 100%;
  //width: 100%;
  // scoped 穿透选择器 :deep()
  :deep() {
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th {
      background-color: rgb(173 223 225);
    }

    thead tr th {
      position: sticky;
      z-index: 1;
    }

    thead tr:first-child th {
      top: 0;
    }

    &.q-table--loading thead tr:last-child th {
      top: 48px;
    }

    tbody {
      scroll-margin-top: 48px;
    }
  }
}


// 自定义输入框高度 + 图标自适应居中
:deep(.search_input.q-field--dense .q-field__control) {
  height: 30px !important;
}

:deep(.search_input.q-field--dense .q-field__marginal) {
  height: 30px !important;
  // 让图标容器撑满高度，内部图标自动居中
  display: flex;
  align-items: center;
  justify-content: center;
}

// 图标跟随输入框高度缩放
:deep(.search_input.q-field--dense .q-field__marginal .q-icon) {
  font-size: 18px; /* 根据30px高度适配大小 */
}


.selected-row {
  background: #e8f4ff !important;
}
</style>