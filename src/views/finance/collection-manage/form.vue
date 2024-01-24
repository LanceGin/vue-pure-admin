<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    type: "应收",
    status: "已审核",
    account_period: "",
    fee_name: "",
    custom_name: "",
    project_name: "",
    flow_direction: "",
    content: "",
    amount: "",
    total: "",
    f: "",
    t: "",
    is_invoice: "",
    add_by: ""
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
    <el-form-item label="应收费用" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        placeholder="请输入应收费用"
      />
    </el-form-item>
  </el-form>
</template>
