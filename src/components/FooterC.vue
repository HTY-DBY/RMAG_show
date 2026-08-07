<template>
  <div class="q-pa-lg">
    <q-separator color="orange" inset/>

    <div class="row q-pa-sm status-row">
      <div class="status-item">时间：{{ nowTime ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">公网IP：{{ clientIp || '获取中...' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">IP属地：{{ ipArea ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">设备端：{{ deviceInfo ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">系统：{{ systemInfo ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">系统位数：{{ osBit ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">浏览器：{{ browserInfo ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">浏览器版本：{{ browserVer ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">屏幕分辨率：{{ screenInfo ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">网页可视区：{{ viewSize ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">设备内存：{{ memoryInfo ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">CPU核心数：{{ cpuCore ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">系统时区：{{ timeZone ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">系统语言：{{ lang ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">网络制式：{{ netType ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">系统预估延迟：{{ netRtt ?? '--' }}ms</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">实时测速延迟：{{ realPing }}ms</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">深色模式：{{ darkMode ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">触屏设备：{{ isTouch ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">当前域名：{{ host ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">页面编码：{{ charset ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">页面协议：{{ protocol ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">像素比：{{ devicePixelRatio ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">最大连接数：{{ maxTouchPoints ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">平台架构：{{ platform ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">是否在线：{{ isOnline ?? '' }}</div>
      <q-separator color="orange" vertical inset/>

      <div class="status-item">UA：{{ browserUA ?? '' }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.status-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

:deep(.q-separator--vertical) {
  width: 1px !important;
  height: 20px !important;
  align-self: stretch;
  margin: 0 10px !important;
  flex-shrink: 0;
}

.status-item {
  white-space: nowrap;
  user-select: text;
}
</style>

<script setup lang="ts">
import {computed, onMounted, onUnmounted, ref} from "vue";

// 1. 实时时间
const nowTime = ref("");
let timer: number | null = null;
const updateTime = () => {
  nowTime.value = new Date().toLocaleString("zh-CN", {
    hour12: false,
  });
};

// 2. UA
const browserUA = ref(navigator.userAgent);

// 浏览器版本
const browserVer = computed(() => {
  const ua = navigator.userAgent;
  let ver = "";
  const matchChrome = ua.match(/Chrome\/(\d+)/);
  const matchEdge = ua.match(/Edg\/(\d+)/);
  const matchFirefox = ua.match(/Firefox\/(\d+)/);

  if (matchEdge) ver = matchEdge?.[1] ?? "";
  else if (matchChrome) ver = matchChrome?.[1] ?? "";
  else if (matchFirefox) ver = matchFirefox?.[1] ?? "";

  return ver || "未知";
});

// 3. 设备：PC/移动端
const deviceInfo = computed(() => {
  const ua = navigator.userAgent;
  if (/Android|iPhone|iPad|iPod/i.test(ua)) return "移动端";
  return "PC端";
});

// 4. 系统识别
const systemInfo = computed(() => {
  const ua = navigator.userAgent;
  if (ua.includes("Win11")) return "Windows 11";
  if (ua.includes("Windows NT 10.0")) return "Windows 10";
  if (ua.includes("Windows NT 6.3")) return "Windows 8.1";
  if (ua.includes("Windows NT 6.2")) return "Windows 8";
  if (ua.includes("Windows NT 6.1")) return "Windows 7";
  if (ua.includes("Mac OS X")) return "MacOS";
  if (/Android/.test(ua)) return "Android";
  if (/iPhone|iPad|iPod/.test(ua)) return "iOS";
  if (/Linux/.test(ua)) return "Linux";
  return "未知系统";
});

// 系统位数
const osBit = computed(() => navigator.platform.includes("Win64") ? "64位" : "32位");

// 5. 浏览器识别
const browserInfo = computed(() => {
  const ua = navigator.userAgent;
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome") && !ua.includes("Edg")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari") && !ua.includes("Chrome")) return "Safari";
  if (ua.includes("Opera")) return "Opera";
  if (ua.includes("QQBrowser")) return "QQ浏览器";
  if (ua.includes("MiuiBrowser")) return "小米浏览器";
  return "未知浏览器";
});

// 6. 公网IP
const clientIp = ref("");
const ipArea = ref("获取中");
const getIpAndLocation = async () => {
  try {
    const res = await fetch(`https://ipapi.co/json/`);
    const data = await res.json();
    clientIp.value = data.ip;
    ipArea.value = `${data.country_name} ${data.region} ${data.city}`;
  } catch (err) {
    try {
      const res2 = await fetch("https://api.ipify.org?format=json");
      const ipJson = await res2.json();
      clientIp.value = ipJson.ip;
      const locRes = await fetch(`https://ipapi.co/${ipJson.ip}/json/`);
      const loc = await locRes.json();
      ipArea.value = `${loc.country_name} ${loc.region}`;
    } catch {
      clientIp.value = "获取失败";
      ipArea.value = "无法定位";
    }
  }
};

// 7. 屏幕尺寸、可视区域
const screenInfo = ref(`${window.screen.width} × ${window.screen.height}`);
const viewSize = ref(`${document.documentElement.clientWidth} × ${document.documentElement.clientHeight}`);

// 8. 内存、CPU
const memoryInfo = ref("不支持读取");
const cpuCore = ref(String(navigator.hardwareConcurrency) + "核");

// 9. 时区、语言
const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone);
const lang = ref(navigator.language);

// 网络信息
const connection = (navigator as any).connection || {};
const netType = ref(connection.effectiveType || "未知");
const netRtt = ref(String(connection.rtt ?? "--"));
// 实时测速延迟
const realPing = ref("--");
let pingTimer: number | null = null;

// 测速方法
const testPing = async () => {
  const start = performance.now();
  try {
    await fetch('https://www.baidu.com/favicon.ico?_t=' + Date.now(), {
      mode: 'no-cors',
      cache: 'no-cache'
    })
    const end = performance.now();
    realPing.value = String(Math.round(end - start));
  } catch {
    realPing.value = "--";
  }
};

// 深色模式
const darkMode = computed(() => window.matchMedia("(prefers-color-scheme: dark)").matches ? "开启" : "关闭");

// 是否触屏
const isTouch = computed(() => "ontouchstart" in window ? "是" : "否");

// 域名、协议、编码
const host = ref(location.hostname);
const protocol = ref(location.protocol);
const charset = ref(document.characterSet);

// 设备像素比
const devicePixelRatio = ref(String(window.devicePixelRatio));

// 最大触控点数、平台架构
const maxTouchPoints = ref(String(navigator.maxTouchPoints));
const platform = ref(navigator.platform);

// 网络在线状态
const isOnline = computed(() => navigator.onLine ? "在线" : "离线");

// 获取内存
const getMemory = () => {
  // @ts-ignore
  if (navigator.deviceMemory !== undefined) {
    // @ts-ignore
    memoryInfo.value = navigator.deviceMemory + " GB";
  }
};

// 内网IP（仅控制台打印，页面不展示）
async function getLocalIp() {
  try {
    const pc = new RTCPeerConnection({iceServers: []});
    pc.createDataChannel("");
    pc.onicecandidate = (e) => {
      if (!e.candidate) return;
      const ipMatch = /([0-9]{1,3}\.){3}[0-9]{1,3}/.exec(e.candidate.candidate);
      if (ipMatch) {
        console.log("内网IP：", ipMatch[0]);
      }
      pc.close();
    };
    pc.createOffer().then((offer) => pc.setLocalDescription(offer));
  } catch (e) {
    console.log("获取内网IP被禁止");
  }
}

// 窗口 resize 监听
const handleResize = () => {
  viewSize.value = `${document.documentElement.clientWidth} × ${document.documentElement.clientHeight}`;
  devicePixelRatio.value = String(window.devicePixelRatio);
};

// 网络变化监听
const handleNetChange = () => {
  const conn = (navigator as any).connection;
  netType.value = conn?.effectiveType || "未知";
  netRtt.value = String(conn?.rtt ?? "--");
};

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
  getIpAndLocation();
  getMemory();
  getLocalIp();

  // 开启实时测速，2秒刷新一次延迟
  testPing();
  pingTimer = window.setInterval(testPing, 2000);

  window.addEventListener("resize", handleResize);
  connection.addEventListener?.("change", handleNetChange);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
  if (pingTimer) clearInterval(pingTimer);
  window.removeEventListener("resize", handleResize);
  connection.removeEventListener?.("change", handleNetChange);
});
</script>