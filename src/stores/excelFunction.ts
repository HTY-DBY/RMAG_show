import {defineStore} from 'pinia'
import * as XLSX from 'xlsx'

const data_url = 'https://raw.githubusercontent.com/HTY-DBY/DataSave/refs/heads/main/db_excel.xlsx'


export const useExcelStore = defineStore('excel', {
    state: () => ({
        pointList: [],
        loading: false,
        errMsg: "",
        retryTimer: null as number | null,
        CACHE_KEY: "excel_DHong_cache"
    }),
    actions: {
        selectPoint: undefined,
        setData(list: any[]) {
            // @ts-ignore
            this.pointList = list
        },
        setSelectPoint(item: never) {
            this.selectPoint = item
        },
        clearTimer() {
            if (this.retryTimer) clearTimeout(this.retryTimer)
            this.retryTimer = null
        },
        saveCache(data: any[]) {
            localStorage.setItem(this.CACHE_KEY, JSON.stringify(data))
        },
        loadCache() {
            const cache = localStorage.getItem(this.CACHE_KEY)
            if (!cache) return
            try {
                this.setData(JSON.parse(cache))
            } catch {
                localStorage.removeItem(this.CACHE_KEY)
            }
        },

        // 对外暴露：全局刷新Excel方法，任意组件调用
        async refreshExcel() {
            console.log("【开始】刷新Excel数据");
            this.clearTimer();
            this.loading = true;
            this.errMsg = "";
            try {
                console.log("【进度】请求文件 db_excel.xlsx");
                // const res = await fetch(`/db_excel.xlsx?t=${Date.now()}`, {cache: "no-cache"});
                const url = `${data_url}?t=${Date.now()}`
                console.log('请求地址为', url)
                const res = await fetch(url, {cache: "no-cache"});
                if (!res.ok) throw new Error(`文件请求失败 ${res.status}`);
                console.log("【进度】文件下载成功");

                const buf = await res.arrayBuffer();
                console.log("【进度】解析Excel二进制数据");
                const workbook = XLSX.read(buf, {type: "array"});

                if (!workbook.Sheets["D_Hong"]) {
                    this.errMsg = "缺少工作表 D_Hong，3秒后重试";
                    throw new Error("sheet missing");
                }
                console.log("【进度】找到工作表 D_Hong");

                const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets["D_Hong"]);
                console.log(`【进度】原始读取行数：${jsonData.length}`);

                const result = jsonData
                    .map(row => {
                        // @ts-ignore
                        const lat = row["Latitude (°)"];
                        // @ts-ignore
                        const lng = row["Longitude (°)"];
                        // @ts-ignore
                        const ID = row["ID"];
                        // @ts-ignore
                        const SRR_ID_Link = row["SRR_ID_Link"];
                        // @ts-ignore
                        const BioProject_ID = row["BioProject_ID"];
                        if (typeof lat === "number" && typeof lng === "number") {
                            return {
                                ID, lat: lat.toFixed(6),
                                lng: lng.toFixed(6),
                                SRR_ID_Link: SRR_ID_Link,
                                BioProject_ID: BioProject_ID,
                            };
                        }
                        return null;
                    })
                    .filter(Boolean);

                if (result.length === 0) {
                    this.errMsg = "无有效经纬度数据，3秒后重试";
                    throw new Error("empty");
                }
                console.log(`【进度】过滤后有效点位：${result.length} 条`);

                this.setData(result);
                this.saveCache(result);
                this.errMsg = "";
                console.log("【完成】Excel刷新成功，数据已存入全局");
            } catch (err) {
                console.error("【失败】读取Excel异常：", err);
                this.retryTimer = setTimeout(() => this.refreshExcel(), 3000);
                console.log("【重试】3秒后自动重新加载");
            } finally {
                this.loading = false;
            }
        }
    }
})