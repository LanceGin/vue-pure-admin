<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    location: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

const map = ref();
const markers = ref([]);
// const auto = ref();
// const placeSearch = ref();
const instance = getCurrentInstance();
const { MapConfigure } = instance.appContext.config.globalProperties.$config;

function initMap() {
  console.log(1111, newFormInline);
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
        center: [121.59114837646484, 31.319860458374023], //中心点坐标
        resizeEnable: true
      });

      map.value.on("click", e => {
        newFormInline.value.location = e.pos.toString();
        map.value.remove(markers.value);
        const marker = new AMap.Marker({
          position: [e.lnglat.getLng(), e.lnglat.getLat()]
        });
        marker.setMap(map.value);
        markers.value.push(marker);
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
    <el-form-item label="办公地名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入办公地名"
      />
    </el-form-item>
    <el-form-item label="办公地址" prop="location">
      <el-input
        v-model="newFormInline.location"
        clearable
        placeholder="请输入办公地址"
      />
    </el-form-item>
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
