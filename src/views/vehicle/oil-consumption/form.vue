<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    car_no: "",
    mileage_6m: "",
    oil_standard: "",
    mileage_fix: "",
    volume: "",
    unit_price: "",
    amount: "",
    actual_volume: "",
    total_amount: "",
    delta_volume: "",
    reward_amount: ""
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
    <el-form-item label="6月里程数" prop="mileage_6m">
      <el-input
        v-model="newFormInline.mileage_6m"
        clearable
        placeholder="请输入6月里程数"
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
    <el-form-item label="核定升数" prop="volume">
      <el-input
        v-model="newFormInline.volume"
        clearable
        placeholder="请输入核定升数"
      />
    </el-form-item>
    <el-form-item label="平均单价" prop="unit_price">
      <el-input
        v-model="newFormInline.unit_price"
        clearable
        placeholder="请输入平均单价"
      />
    </el-form-item>
    <el-form-item label="核定金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        placeholder="请输入核定金额"
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
    <el-form-item label="油差升数" prop="delta_volume">
      <el-input
        v-model="newFormInline.delta_volume"
        clearable
        placeholder="请输入油差升数"
      />
    </el-form-item>
    <el-form-item label="油耗奖励" prop="reward_amount">
      <el-input
        v-model="newFormInline.reward_amount"
        clearable
        placeholder="请输入油耗奖励"
      />
    </el-form-item>
  </el-form>
</template>
