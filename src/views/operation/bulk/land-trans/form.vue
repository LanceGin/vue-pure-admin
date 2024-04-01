<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { convertTextToCode, regionData, CodeToText } from "@/utils/chinaArea";
import { vehicleInfoList } from "@/api/vehicle";
import type { PaginationProps } from "@pureadmin/table";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    type: "1",
    customer: "",
    ship_company: "",
    fleet: "",
    load_area: "",
    unload_area: "",
    load_address: "",
    unload_address: "",
    bl_no: "",
    container_no: "",
    container_type: "",
    seal_no: "",
    start_point: "",
    flow_direction: "",
    voyage: "",
    address: "",
    car_type: "",
    car_no: "",
    driver_mobile: "",
    booking_fee: "",
    exchange_fee: "",
    freight: "",
    error_fee: "",
    remarks: "",
    add_time: ""
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const load_area = newFormInline.value.load_area.split("-");
const unload_area = newFormInline.value.unload_area.split("-");
const a = convertTextToCode(load_area[0], load_area[1], load_area[2]).split(
  ", "
);
const b = convertTextToCode(
  unload_area[0],
  unload_area[1],
  unload_area[2]
).split(", ");
const selectedOptions = ref(a);
const selectedOptions2 = ref(b);

const handleChange = value => {
  newFormInline.value.load_area = `${CodeToText[value[0]]}-${
    CodeToText[value[1]]
  }-${CodeToText[value[2]]}`;
};

const handleChange2 = value => {
  newFormInline.value.unload_area = `${CodeToText[value[0]]}-${
    CodeToText[value[1]]
  }-${CodeToText[value[2]]}`;
};

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
    <el-form-item label="日期" prop="add_time">
      <el-date-picker
        v-model="newFormInline.add_time"
        type="date"
        placeholder="请输入日期"
      />
    </el-form-item>
    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户"
      />
    </el-form-item>
    <el-form-item label="船公司" prop="ship_company">
      <el-input
        v-model="newFormInline.ship_company"
        clearable
        placeholder="请输入船公司"
      />
    </el-form-item>
    <el-form-item label="箱号" prop="container_no">
      <el-input
        v-model="newFormInline.container_no"
        clearable
        placeholder="请输入箱号"
      />
    </el-form-item>
    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
      />
    </el-form-item>
    <el-form-item label="封号" prop="seal_no">
      <el-input
        v-model="newFormInline.seal_no"
        clearable
        placeholder="请输入封号"
      />
    </el-form-item>
    <el-form-item label="始发地区" prop="load_area">
      <el-cascader
        :options="regionData"
        v-model="selectedOptions"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="始发地址" prop="load_address">
      <el-input
        v-model="newFormInline.load_address"
        clearable
        placeholder="请输入始发地址"
      />
    </el-form-item>
    <el-form-item label="目的地区" prop="unload_area">
      <el-cascader
        :options="regionData"
        v-model="selectedOptions2"
        @change="handleChange2"
      />
    </el-form-item>
    <el-form-item label="目的地址" prop="unload_address">
      <el-input
        v-model="newFormInline.unload_address"
        clearable
        placeholder="请输入目的地址"
      />
    </el-form-item>
    <el-form-item label="车号" prop="car_no">
      <el-select
        v-model="newFormInline.car_no"
        filterable
        allow-create
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
    <el-form-item label="运费" prop="freight">
      <el-input
        v-model="newFormInline.freight"
        clearable
        placeholder="请输入运费"
      />
    </el-form-item>
    <el-form-item label="异常费用" prop="error_fee">
      <el-input
        v-model="newFormInline.error_fee"
        clearable
        placeholder="请输入异常费用"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remarks">
      <el-input
        v-model="newFormInline.remarks"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
