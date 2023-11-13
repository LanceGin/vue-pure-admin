<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    type: "1",
    customer: "",
    ship_company: "",
    fleet: "",
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
    <el-form-item label="封号" prop="bl_no">
      <el-input
        v-model="newFormInline.bl_no"
        clearable
        placeholder="请输入封号"
      />
    </el-form-item>
    <el-form-item label="流向" prop="flow_direction">
      <el-input
        v-model="newFormInline.flow_direction"
        clearable
        placeholder="请输入流向"
      />
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        clearable
        placeholder="请输入地址"
      />
    </el-form-item>
    <el-form-item label="车号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车号"
      />
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
