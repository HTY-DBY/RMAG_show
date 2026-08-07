<template>
  <div class="row RootWrap">
    <div class="Panel_1 col-4 q-pa-sm">
      <DataShowC/>
    </div>
    <div class="Panel_2 col q-pa-sm">
      <MapMainC/>
    </div>
  </div>

  <div class="row RootWrap">
    <div class="Panel_1 col q-pa-sm">
      <TreeWithAbundance @selectSpecies="handleSpeciesClick"/>
    </div>

  </div>
</template>

<script setup>
import DataShowC from "@/components/DataShowC.vue";
import MapMainC from "@/components/MapMainC.vue";
import TreeWithAbundance from "@/components/TreeWithAbundance.vue";

const handleSpeciesClick = (name) => {
  console.log('选中物种：', name)
}
</script>

<style scoped lang="scss">
.RootWrap {
  width: 100%;
  height: 550px;
}

.Panel_1 {
  height: 100%;
}

.Panel_2 {
  height: 100%;
}
</style>