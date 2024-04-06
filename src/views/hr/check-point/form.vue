<script setup lang="ts">
import { ref, getCurrentInstance, onMounted } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import AMapLoader from "@amap/amap-jsapi-loader";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    address: "",
    location: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

const tipinput = ref("tipinput");
const map = ref();
const markers = ref([]);
const placeSearch = ref();
// const auto = ref();
// const placeSearch = ref();
const instance = getCurrentInstance();
const { MapConfigure } = instance.appContext.config.globalProperties.$config;

function initMap() {
  const loca = newFormInline.value.location.split(",");
  if (loca.length == 1) {
    loca.push("");
  }
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
        center: loca, //中心点坐标
        resizeEnable: true
      });

      const init_marker = new AMap.Marker({
        position: loca
      });
      init_marker.setMap(map.value);
      init_marker.setLabel({
        direction: "top",
        content: newFormInline.value.name
      });
      markers.value.push(init_marker);

      map.value.on("click", e => {
        newFormInline.value.location = [
          e.lnglat.getLng(),
          e.lnglat.getLat()
        ].join(",");
        map.value.remove(markers.value);
        const marker = new AMap.Marker({
          position: [e.lnglat.getLng(), e.lnglat.getLat()]
        });
        marker.setMap(map.value);
        markers.value.push(marker);
      });

      // 搜索
      placeSearch.value = new AMap.PlaceSearch({
        //构造地点查询类
        pageSize: 1, // 单页显示结果条数
        map: map.value // 展现结果的地图实例
      });
    })
    .catch(e => {
      console.log(e);
    });
}

function searchAdd() {
  //关键字查询
  placeSearch.value.search(newFormInline.value.address);
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
    <el-form-item label="办公地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        clearable
        placeholder="请输入办公地址"
        :id="tipinput"
        @change="searchAdd"
      />
    </el-form-item>
    <el-form-item label="经纬度" prop="location">
      <el-input
        v-model="newFormInline.location"
        clearable
        placeholder="请输入经纬度"
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
