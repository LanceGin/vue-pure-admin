<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    car_no: "",
    month: "",
    mileage: "",
    oil_standard: "",
    mileage_fix: "",
    volume: "",
    actual_volume: "",
    total_amount: "",
    delta_volume: "",
    reward_amount: "",
    remark: ""
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
    <el-form-item label="车牌号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车牌号"
      />
    </el-form-item>
    <el-form-item label="月份" prop="month">
      <el-date-picker
        v-model="newFormInline.month"
        type="month"
        placeholder="请输入月份"
        format="YYYY/MM"
        value-format="YYYY-MM"
      />
    </el-form-item>
    <el-form-item label="月里程数" prop="mileage">
      <el-input
        v-model="newFormInline.mileage"
        clearable
        placeholder="请输入月里程数"
      />
    </el-form-item>
    <el-form-item label="油耗标准" prop="oil_standard">
      <el-input
        v-model="newFormInline.oil_standard"
        clearable
        placeholder="请输入油耗标准"
      />
    </el-form-item>
    <el-form-item label="里程修正" prop="mileage_fix">
      <el-input
        v-model="newFormInline.mileage_fix"
        clearable
        placeholder="请输入里程修正"
      />
    </el-form-item>
    <el-form-item label="实际升数" prop="actual_volume">
      <el-input
        v-model="newFormInline.actual_volume"
        clearable
        placeholder="请输入实际升数"
      />
    </el-form-item>
    <el-form-item label="实际金额" prop="total_amount">
      <el-input
        v-model="newFormInline.total_amount"
        clearable
        placeholder="请输入实际金额"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
