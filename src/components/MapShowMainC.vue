<template>
  <div class="thisbox" ref="mapDom"></div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, watch, onBeforeUnmount} from 'vue'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import L from 'leaflet'
import 'leaflet.markercluster'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'
import {useExcelStore} from '@/stores/excelFunction.ts'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
})

const mapDom = ref(null)
const excelStore = useExcelStore()
let map = null
let clusterGroup = null
let markerArr = []
const tipPopup = L.popup({offset: [0, -30]})

// ===================== 持久化配置 =====================
const STORAGE_KEY = "map_view_cache"
// 默认初始视角
const defaultView = {
  lat: 0,
  lng: 0,
  zoom: 2
}

// 读取本地缓存
function loadMapView() {
  try {
    const str = localStorage.getItem(STORAGE_KEY)
    if (!str) return {...defaultView}
    return JSON.parse(str)
  } catch {
    return {...defaultView}
  }
}

// 保存视角到 localStorage
function saveMapView(center, zoom) {
  const data = {
    lat: center.lat,
    lng: center.lng,
    zoom
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ======================================================

const initMap = () => {
  if (map) map.remove()
  map = L.map(mapDom.value, {
    attributionControl: false,
    worldCopyJump: true,
    maxBoundsViscosity: 1.0
  })

  // 读取缓存视角
  const viewData = loadMapView()
  map.setView([viewData.lat, viewData.lng], viewData.zoom)
  markerArr = []

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: ''
  }).addTo(map)

  clusterGroup = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50,
    spiderfyDistanceMultiplier: 2.2,
    spiderLegPolylineOptions: {weight: 2, color: '#000000'},
    iconCreateFunction: function (cluster) {
      const count = cluster.getChildCount()
      return L.divIcon({
        html: `<div style="
          width: 36px;height: 36px;line-height:36px;text-align:center;
          border-radius:10%;background:rgba(25,118,210,0.75);
          color:#fff;font-size:20px;font-weight:bold;">${count}</div>`,
        className: "",
        iconSize: [68, 68]
      })
    }
  })

  excelStore.pointList.forEach((point) => {
    const m = L.marker([Number(point.lat), Number(point.lng)])
    m.bindPopup(`<div style="font-size:16px">ID ${point.ID}<br>${point.lat}, ${point.lng}</div>`)
    clusterGroup.addLayer(m)
    markerArr.push({m, point})
  })

  map.addLayer(clusterGroup)

  const clickPopup = L.popup()

  function onMapClick(e) {
    const lat = e.latlng.lat.toFixed(6)
    const lng = e.latlng.lng.toFixed(6)
    clickPopup
        .setLatLng(e.latlng)
        .setContent(`You clicked is<br>${lat}, ${lng}`)
        .openOn(map)
  }

  map.on('click', onMapClick)

  // ========== 拖动/缩放结束自动保存视角 ==========
  map.on('moveend', () => {
    const center = map.getCenter()
    const z = map.getZoom()
    saveMapView(center, z)
  })
}

watch(
    () => excelStore.pointList,
    () => {
      if (!map || !clusterGroup) return
      clusterGroup.clearLayers()
      markerArr = []
      excelStore.pointList.forEach((point) => {
        const m = L.marker([Number(point.lat), Number(point.lng)])
        m.bindPopup(`<div style="font-size:16px">ID: ${point.ID}<br>${point.lat}, ${point.lng}</div>`)
        clusterGroup.addLayer(m)
        markerArr.push({m, point})
      })
    }
)

watch(
    () => excelStore.selectPoint,
    (val) => {
      if (!map || !val || markerArr.length === 0) return
      const targetLat = Number(val.lat)
      const targetLng = Number(val.lng)
      const targetItem = markerArr.find(item => {
        return Number(item.point.lat) === targetLat && Number(item.point.lng) === targetLng
      })
      if (!targetItem) return

      const targetMarker = targetItem.m
      clusterGroup.zoomToShowLayer(targetMarker, () => {
        tipPopup
            .setLatLng([targetLat, targetLng])
            .setContent(`ID ${val.ID}<br>${val.lat}, ${val.lng}`)
            .openOn(map)
      })
    }
)

onMounted(() => initMap())

// 组件销毁兜底保存
onBeforeUnmount(() => {
  if (map) {
    const center = map.getCenter()
    const z = map.getZoom()
    saveMapView(center, z)
    map.remove()
  }
})
onUnmounted(() => {
})
</script>

<style scoped lang="scss">
.thisbox {
  width: 100%;
  height: 100%;
}

:deep(.leaflet-popup-content-wrapper) {
  font-size: 20px;
}
</style>