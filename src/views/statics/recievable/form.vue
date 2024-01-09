<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    status: "",
    type: "应收",
    account_period: "",
    fee_name: "",
    amount: "",
    fee_type: "",
    remark: "",
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
    container_count: "",
    container_fee: "",
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
    add_by: "",
    add_time: "",
    project_name: "",
    custom_name: "",
    flow_direction: "",
    content: "",
    invoice_no: ""
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
    <el-form-item label="账期" prop="account_period">
      <el-date-picker
        v-model="newFormInline.account_period"
        type="date"
        placeholder="请输入账期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="客户名称" prop="custom_name">
      <el-input
        v-model="newFormInline.custom_name"
        clearable
        placeholder="请输入客户名称"
      />
    </el-form-item>
    <el-form-item label="项目名称" prop="project_name">
      <el-input
        v-model="newFormInline.project_name"
        clearable
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item label="流向" prop="flow_direction">
      <el-input
        v-model="newFormInline.flow_direction"
        clearable
        placeholder="请输入流向"
      />
    </el-form-item>
    <el-form-item label="服务内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入服务内容"
      />
    </el-form-item>
    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
        disabled
      />
    </el-form-item>
    <el-form-item label="箱量" prop="container_count">
      <el-input
        v-model="newFormInline.container_count"
        clearable
        placeholder="请输入箱量"
        disabled
      />
    </el-form-item>
    <el-form-item label="应收费用" prop="container_fee">
      <el-input
        v-model="newFormInline.container_fee"
        clearable
        placeholder="请输入应收费用"
        disabled
      />
    </el-form-item>
  </el-form>
</template>
