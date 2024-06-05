<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { vehicleInfoList } from "@/api/vehicle";
import type { PaginationProps } from "@pureadmin/table";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    order_status: "",
    order_type: "",
    ship_company: "",
    customer: "",
    subproject: "",
    arrive_time: "",
    start_port: "",
    target_port: "",
    containner_no: "",
    seal_no: "",
    container_type: "",
    ship_name: "",
    track_no: "",
    unload_port: "",
    door: "",
    make_time: "",
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "",
    order_time: "",
    order_fee: "",
    car_no: "",
    transport_status: "",
    type: ""
  })
});

/** 分页配置 */
const pagination = reactive<PaginationProps>({
  pageSize: 500,
  currentPage: 1,
  total: 0
});
const form = reactive({
  id: "",
  car_no: "",
  driver: "",
  mobile: ""
});

interface CompanyItem {
  id: string;
  car_no: string;
  car: string;
}
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let accData = [];
const data = vehicleInfoList({ pagination, form });
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      car_no: `${item.car_no}`,
      car: `${item.car_no}-${item.driver}-${item.territory}`
    };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter(item => {
        return item.car_no.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
    label-width="82px"
  >
    <el-form-item label="车牌号" prop="car_no">
      <el-select
        v-model="newFormInline.car_no"
        filterable
        remote
        reserve-keyword
        placeholder="输入车牌号关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.car"
          :value="item.car_no"
        />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="拆箱门点：" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入拆箱门点"
      />
    </el-form-item>
    <el-form-item label="做箱时间：" prop="make_time">
      <el-date-picker
        v-model="newFormInline.make_time"
        type="date"
        placeholder="请输入做箱时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item> -->
  </el-form>
</template>
