<script setup lang="ts">
import { ref, computed, watch, type Ref } from "vue";
import { useAppStoreHook } from "../../../store/modules/app";
import {
  delay,
  useDark,
  useECharts,
  type EchartOptions
} from "@pureadmin/utils";

const { isDark } = useDark();

const theme: EchartOptions["theme"] = computed(() => {
  return isDark.value ? "dark" : "light";
});

const pieChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, resize } = useECharts(pieChartRef as Ref<HTMLDivElement>, {
  theme
});

setOptions(
  {
    tooltip: {
      trigger: "item"
    },
    legend: {
      icon: "circle",
      right: "auto"
    },
    series: [
      {
        name: "月度饼图",
        type: "pie",
        top: "20%",
        radius: "80%",
        center: ["40%", "50%"],
        color: ["#f56c6c", "#cce0c5", "#53a7ff", "#e6a23c"],
        data: [
          { value: 1572, name: "上海" },
          { value: 256, name: "太仓" },
          { value: 883, name: "武汉" },
          { value: 265, name: "岳阳" }
        ]
      }
    ]
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  },
  // 点击空白处
  {
    type: "zrender",
    name: "click",
    callback: params => {
      console.log("点击空白处", params);
    }
  }
);

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="pieChartRef" style="width: 100%; height: 35vh" />
</template>
