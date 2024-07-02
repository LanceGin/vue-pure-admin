<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { vehicleInfoList } from "@/api/vehicle";
import type { PaginationProps } from "@pureadmin/table";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    order_status: "未审核",
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
    car_no: "",
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
    type: "",
    status: "",
    temp_status: "",
    temp_port: "",
    fee_name: "",
    fee: "",
    remark: "",
    add_by: "",
    abnormal_fee: "",
    dispatch_remark: "",
    city: ""
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
  territory: "",
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
    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户"
        name="customer"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="船名航次" prop="ship_name">
      <el-input
        v-model="newFormInline.ship_name"
        clearable
        placeholder="请输入船名航次"
        name="ship_name"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="运单号" prop="track_no">
      <el-input
        v-model="newFormInline.track_no"
        clearable
        placeholder="请输入运单号"
        name="track_no"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="箱号" prop="containner_no">
      <el-input
        v-model="newFormInline.containner_no"
        clearable
        placeholder="请输入箱号"
        name="containner_no"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="封号" prop="seal_no">
      <el-input
        v-model="newFormInline.seal_no"
        clearable
        placeholder="请输入封号"
        name="seal_no"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
        name="container_type"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="门点" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入门点"
        name="door"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="提箱点" prop="load_port">
      <el-input
        v-model="newFormInline.load_port"
        clearable
        placeholder="请输入提箱点"
        name="load_port"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="还箱点" prop="unload_port">
      <el-input
        v-model="newFormInline.unload_port"
        clearable
        placeholder="请输入还箱点"
        name="unload_port"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="暂落点" prop="temp_port">
      <el-input
        v-model="newFormInline.temp_port"
        clearable
        placeholder="请输入暂落点"
        name="temp_port"
        autocomplete="on"
      />
    </el-form-item>
    <el-form-item label="车号" prop="car_no">
      <el-select
        v-model="newFormInline.car_no"
        filterable
        remote
        reserve-keyword
        placeholder="输入车号关键字"
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
    <el-form-item label="做箱时间" prop="make_time">
      <el-date-picker
        v-model="newFormInline.make_time"
        type="datetime"
        placeholder="请输入做箱时间"
        format="YYYY/MM/DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
      />
    </el-form-item>
  </el-form>
</template>
