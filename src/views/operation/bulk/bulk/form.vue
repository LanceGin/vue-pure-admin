<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { convertTextToCode, regionData, CodeToText } from "@/utils/chinaArea";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    type: "2",
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
    <el-form-item label="承运车队" prop="fleet">
      <el-input
        v-model="newFormInline.fleet"
        clearable
        placeholder="请输入承运车队"
      />
    </el-form-item>
    <el-form-item label="装货地区" prop="load_area">
      <el-cascader
        :options="regionData"
        v-model="selectedOptions"
        @change="handleChange"
      />
    </el-form-item>
    <el-form-item label="装货地址" prop="load_address">
      <el-input
        v-model="newFormInline.load_address"
        clearable
        placeholder="请输入装货地址"
      />
    </el-form-item>
    <el-form-item label="卸货地区" prop="unload_area">
      <el-cascader
        :options="regionData"
        v-model="selectedOptions2"
        @change="handleChange2"
      />
    </el-form-item>
    <el-form-item label="卸货地址" prop="unload_address">
      <el-input
        v-model="newFormInline.unload_address"
        clearable
        placeholder="请输入卸货地址"
      />
    </el-form-item>
    <el-form-item label="车型" prop="car_type">
      <el-input
        v-model="newFormInline.car_type"
        clearable
        placeholder="请输入车型"
      />
    </el-form-item>
    <el-form-item label="车号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车号"
      />
    </el-form-item>
    <el-form-item label="驾驶员手机号" prop="driver_mobile">
      <el-input
        v-model="newFormInline.driver_mobile"
        clearable
        placeholder="请输入驾驶员手机号"
      />
    </el-form-item>
    <el-form-item label="运费" prop="freight">
      <el-input
        v-model="newFormInline.freight"
        clearable
        placeholder="请输入运费"
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
