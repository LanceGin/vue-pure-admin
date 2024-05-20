<script setup lang="ts">
import { useIntervalFn } from "@vueuse/core";
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
  return isDark.value ? "dark" : "default";
});

const lineChartRef = ref<HTMLDivElement | null>(null);
const { setOptions, getInstance, resize } = useECharts(
  lineChartRef as Ref<HTMLDivElement>,
  { theme }
);

const xData = (() => {
  // const data: any[] = [];
  // for (let i = 1; i < 31; i++) {
  //   data.push(`${i}日`);
  // }
  // return data;
  const data = [
    "2024-04-20",
    "2024-04-21",
    "2024-04-22",
    "2024-04-23",
    "2024-04-24",
    "2024-04-25",
    "2024-04-26",
    "2024-04-27",
    "2024-04-28",
    "2024-04-29",
    "2024-04-30",
    "2024-05-01",
    "2024-05-02",
    "2024-05-03",
    "2024-05-04",
    "2024-05-05",
    "2024-05-06",
    "2024-05-07",
    "2024-05-08",
    "2024-05-09",
    "2024-05-10",
    "2024-05-11",
    "2024-05-12",
    "2024-05-13",
    "2024-05-14",
    "2024-05-15",
    "2024-05-16",
    "2024-05-17",
    "2024-05-18",
    "2024-05-19"
  ];
  return data;
})();

setOptions(
  {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      }
    },
    grid: {
      bottom: "20px",
      right: "10px"
    },
    legend: {
      right: "auto",
      data: ["上海", "武汉", "太仓", "岳阳"]
    },
    calculable: true,
    xAxis: [
      {
        triggerEvent: true,
        type: "category",
        splitLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        data: xData
      }
    ],
    yAxis: [
      {
        triggerEvent: true,
        type: "value",
        splitLine: {
          show: false
        },
        axisLine: {
          show: true
        }
      }
    ],
    dataZoom: [
      {
        type: "slider",
        show: false,
        realtime: true,
        startValue: 0,
        endValue: 30
      }
    ],
    series: [
      {
        name: "上海",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#f56c6c",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          7, 18, 33, 58, 47, 89, 82, 66, 74, 98, 37, 2, 11, 8, 30, 57, 113, 55,
          85, 78, 86, 61, 47, 81, 111, 23, 24, 35, 49, 7
        ]
      },
      {
        name: "武汉",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#53a7ff",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          7, 13, 16, 24, 40, 32, 60, 5, 53, 58, 18, 24, 24, 17, 4, 19, 27, 48,
          44, 57, 45, 55, 70, 22, 14, 25, 28, 26, 8, 0
        ]
      },
      {
        name: "太仓",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#cce0c5",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          0, 9, 19, 20, 25, 15, 21, 22, 1, 26, 23, 0, 0, 0, 0, 0, 20, 14, 4, 7,
          11, 1, 0, 4, 0, 14, 0, 0, 0, 0
        ]
      },
      {
        name: "岳阳",
        type: "line",
        symbolSize: 10,
        symbol: "circle",
        color: "#e6a23c",
        markPoint: {
          label: {
            color: "#fff"
          },
          data: [
            {
              type: "max",
              name: "最大值"
            },
            {
              type: "min",
              name: "最小值"
            }
          ]
        },
        data: [
          13, 0, 1, 23, 22, 18, 18, 20, 0, 0, 2, 0, 0, 0, 0, 0, 18, 25, 24, 24,
          0, 0, 0, 22, 16, 19, 0, 0, 0, 0
        ]
      }
    ],
    addTooltip: true
  },
  {
    name: "click",
    callback: params => {
      console.log("click", params);
    }
  },
  {
    name: "contextmenu",
    callback: params => {
      console.log("contextmenu", params);
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

let a = 1;
useIntervalFn(() => {
  if (a == xData.length - 24) {
    a = 0;
  }
  getInstance()!.dispatchAction({
    type: "dataZoom",
    startValue: a,
    endValue: a + 30
  });
  a++;
}, 2000);

watch(
  () => useAppStoreHook().getSidebarStatus,
  () => {
    delay(600).then(() => resize());
  }
);
</script>

<template>
  <div ref="lineChartRef" style="width: 100%; height: 35vh" />
</template>
