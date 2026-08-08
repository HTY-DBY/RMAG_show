<template>
  <div class="row row-cols-3">
    <!--   ////////////////-->
    <div class="col">
      Data was updated on Jnly 20 2001.
    </div>
    <!--   ////////////////-->
    <q-input
        dense outlined
        v-model="text"
        placeholder="Search"
        class="q-pa-sm  col"
    >
      <template v-slot:append>
        <q-icon name="search"/>
      </template>
    </q-input>
    <!--   ////////////////-->
    <div ref="btnWrapRef" style="display: inline-block;" class="col-3 q-pa-sm ">
      <q-btn
          label="Details" no-caps color="white" text-color="black" class="width_100"
          :class="{ 'btn-disabled-style': selected.length === 0 }"
          @click="handleClickSearch"
      />
    </div>
    <!--   ////////////////-->
  </div>
  <div class="table-scroll-wrap">
    <q-table
        selection="single"
        v-model:selected="selected"
        :loading=!domStore.RMAG_database_read_ok
        dense
        flat
        bordered
        :rows="tableData"
        :columns="columns"
        row-key="ID"
        :rows-per-page-options="[0]"
        virtual-scroll
        class="my-sticky-header-table header-purple-style"
    >
    </q-table>
  </div>

  <div class="row">

    xxxxxx
  </div>


</template>

<script setup>
import {onMounted, onUnmounted, computed, ref, watch} from 'vue'
import {useExcelStore} from '@/Other/excelFunction.ts'
import {useDomStore} from '@/Other/store.ts'

const text = ref('')
const excelStore = useExcelStore()
const selected = ref([])
const btnWrapRef = ref(null)
const loading = ref(false)

const domStore = useDomStore()

const originList = computed(() => excelStore.pointList || [])

const tableData = computed(() => {
  const keyword = text.value.trim().toLowerCase()
  const source = originList.value
  if (!keyword) return source

  return source.filter(row => {
    const searchKeys = ['ID', 'SRR_ID_Link', 'BioProject_ID']
    return searchKeys.some(field => {
      const cellText = String(row[field] ?? '').toLowerCase()
      return cellText.includes(keyword)
    })
  })
})


watch(selected, (newVal) => {
  if (newVal.length > 0) {
    const selectRow = newVal[0]
    // 将选中行的ID传入pinia
    domStore.set_RMAG_ID_now_Ref(selectRow.ID)
  } else {
    // 未选中清空
    // domStore.set_RMAG_ID_now_Ref(null)
  }
}, {deep: true})


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
]

const handleClickSearch = () => {
  if (selected.value.length === 0) return
  const row = selected.value[0]
  console.log('选中的数据：', row)
}

onMounted(() => {
  excelStore.loadCache()
})
onUnmounted(() => {
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

.width_100 {
  width: 100%;
}

.table-scroll-wrap {
  height: 85%;
  overflow: auto;
}

.my-sticky-header-table {
  height: 100%;
  width: 100%;

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

    tbody {
      scroll-margin-top: 48px;
    }
  }
}

// 全局修改表头样式：紫色+斜体，代替header插槽
:deep(.header-purple-style thead th) {
  //color: purple;
  //font-style: italic;
  font-weight: bold;
}

.selected-row {
  background: #e8f4ff !important;
}

.btn-disabled-style {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}
</style>