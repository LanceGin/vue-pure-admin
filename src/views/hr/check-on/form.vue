<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    userName: "",
    clock_date: "",
    clockin_time: "",
    clockin_location: "",
    clockin_type: "",
    clockin_remark: "",
    clockout_time: "",
    clockout_location: "",
    clockout_type: "",
    clockout_remark: "",
    remark: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

const map = ref();
const instance = getCurrentInstance();
const { MapConfigure } = instance.appContext.config.globalProperties.$config;
const clockin = newFormInline.value.clockin_location.split(",");
const clockout = newFormInline.value.clockout_location.split(",");

function initMap() {
  AMapLoader.load({
    key: MapConfigure.amapKey, // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      "AMap.AutoComplete",
      "AMap.PlaceSearch",
      "AMap.Driving",
      "AMap.DragRoute"
    ]
  })
    .then(AMap => {
      map.value = new AMap.Map("mapview", {
        // 设置地图容器id
        viewMode: "2D", //  是否为3D地图模式
        zoom: 14, // 初始化地图级别
        center: clockin, //中心点坐标
        resizeEnable: true
      });
      const clockin_marker = new AMap.Marker({
        position: clockin
      });
      const clockout_marker = new AMap.Marker({
        position: clockout
      });
      clockin_marker.setMap(map.value);
      clockin_marker.setTitle("签到点");
      clockin_marker.setLabel({
        direction: "left",
        content: "签到点"
      });
      clockout_marker.setMap(map.value);
      clockout_marker.setTitle("签退点");
      clockout_marker.setLabel({
        direction: "right",
        content: "签退点"
      });
    })
    .catch(e => {
      console.log(e);
    });
}

onMounted(() => {
  initMap();
});

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <div id="mapview" ref="mapview" />
  </el-form>
</template>

<style lang="scss" scoped>
#mapview {
  height: calc(50vh - 86px);
}

:deep(.amap-marker-label) {
  border: none !important;
}
</style>
