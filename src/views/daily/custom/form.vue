<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    company_code: "",
    company_name: "",
    bank: "",
    account_no: "",
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
    <el-form-item label="代码" prop="company_code">
      <el-input
        v-model="newFormInline.company_code"
        clearable
        placeholder="请输入代码"
      />
    </el-form-item>
    <el-form-item label="名称" prop="company_name">
      <el-input
        v-model="newFormInline.company_name"
        clearable
        placeholder="请输入名称"
      />
    </el-form-item>
    <el-form-item label="开户行" prop="bank">
      <el-input
        v-model="newFormInline.bank"
        clearable
        placeholder="请输入开户行"
      />
    </el-form-item>
    <el-form-item label="银行账号" prop="account_no">
      <el-input
        v-model="newFormInline.account_no"
        clearable
        placeholder="请输入银行账号"
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
