<template>
  <div class="AllBox">
    <div>
      <q-input
          dense outlined
          v-model="text"
          placeholder="Search"
          class="SearchMain"
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
        <!--        <div class="q-mt-md"> Selected: {{ JSON.stringify(selected) }}</div>-->

      </q-table>
    </div>
    <div v-if="(excelStore.pointList || []).length === 0" class="empty-tip mt-6 text-center">
      暂无点位数据
    </div>
  </div>
</template>

<script setup>
import {onMounted, onUnmounted, computed, ref} from 'vue'
import {useExcelStore} from '@/stores/excelFunction.ts'

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

.SearchMain {
  width: 350px;
  //height: 100%;
  //width: 100%;
  padding: 5px 0 5px 10px;
}

.my-sticky-header-table {
  height: 400px;
  width: 350px;
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

.AllBox {
  width: 100%;
  height: 100%;
  position: relative;
}

.selected-row {
  background: #e8f4ff !important;
}
</style>