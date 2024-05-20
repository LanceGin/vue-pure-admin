<script setup lang="ts">
import dayjs from "dayjs";
// import MdEditor from "md-editor-v3";
import Bar from "./components/Bar.vue";
import Pie from "./components/Pie.vue";
import Line from "./components/Line.vue";
import { getReleases } from "@/api/list";
import TypeIt from "@/components/ReTypeit";
// import { useWindowSize } from "@vueuse/core";
import { ref, markRaw } from "vue";
// import Github from "./components/Github.vue";
import { randomColor } from "@pureadmin/utils";
import { useRenderFlicker } from "@/components/ReFlicker";

defineOptions({
  name: "Manager"
});

const list = ref();
const loading = ref<boolean>(true);
// const { version } = __APP_INFO__.pkg;
// const titleClass = computed(() => {
//   return ["text-base", "font-medium"];
// });

// const { height } = useWindowSize();

setTimeout(() => {
  loading.value = !loading.value;
}, 800);

getReleases().then(({ data }) => {
  list.value = data.list.map(v => {
    return {
      content: v.body,
      timestamp: dayjs(v.published_at).format("YYYY/MM/DD hh:mm:ss A"),
      icon: markRaw(
        useRenderFlicker({
          background: randomColor({ type: "hex" }) as string
        })
      )
    };
  });
});
</script>

<template>
  <div>
    <el-row :gutter="24">
      <!-- 业务量对比图 -->
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <TypeIt
              :className="'type-it4'"
              :values="['最近一月业务量对比图']"
              :cursor="false"
              :speed="120"
            />
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Line />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <!-- github饼图信息 -->
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <TypeIt
              :className="'type-it3'"
              :values="['月度饼图']"
              :cursor="false"
              :speed="120"
            />
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Pie />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>

      <!-- github柱状图信息 -->
      <el-col
        :xs="24"
        :sm="24"
        :md="24"
        :lg="24"
        :xl="24"
        class="mb-[18px]"
        v-motion
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card shadow="never">
          <template #header>
            <TypeIt
              :className="'type-it5'"
              :values="['成本利润比']"
              :cursor="false"
              :speed="120"
            />
          </template>
          <el-skeleton animated :rows="7" :loading="loading">
            <template #default>
              <Bar />
            </template>
          </el-skeleton>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-timeline-item) {
  margin: 6px 0 0 6px;
}

.main-content {
  margin: 20px 20px 0 !important;
}
</style>
