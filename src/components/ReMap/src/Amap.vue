<script setup lang="ts">
import { reactive, getCurrentInstance, onBeforeMount, onUnmounted } from "vue";
import { deviceDetection } from "@pureadmin/utils";
import AMapLoader from "@amap/amap-jsapi-loader";

export interface MapConfigureInter {
  on: Fn;
  destroy?: Fn;
  clearEvents?: Fn;
  addControl?: Fn;
  setCenter?: Fn;
  setZoom?: Fn;
  plugin?: Fn;
}

defineOptions({
  name: "Amap"
});

let map: MapConfigureInter;

const instance = getCurrentInstance();

const mapSet = reactive({
  loading: deviceDetection() ? false : true
});

// 地图创建完成(动画关闭)
const complete = (): void => {
  if (map) {
    map.on("complete", () => {
      mapSet.loading = false;
    });
  }
};

onBeforeMount(() => {
  if (!instance) return;
  const { MapConfigure } = instance.appContext.config.globalProperties.$config;
  const { options } = MapConfigure;
  console.log(1111, options);

  AMapLoader.load({
    key: MapConfigure.amapKey,
    version: "2.0",
    plugins: ["AMap.MarkerCluster"]
  })
    .then(AMap => {
      // 创建地图实例
      map = new AMap.Map(instance.refs.mapview, options);

      complete();
    })
    .catch(() => {
      mapSet.loading = false;
      throw "地图加载失败，请重新加载";
    });
});

onUnmounted(() => {
  if (map) {
    // 销毁地图实例
    map.destroy() && map.clearEvents("click");
  }
});
</script>

<template>
  <div id="mapview" ref="mapview" v-loading="mapSet.loading" />
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(50vh - 86px);
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>
