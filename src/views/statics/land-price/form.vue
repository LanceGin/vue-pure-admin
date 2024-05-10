<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    customer: "",
    fleet: "",
    load_address: "",
    unload_address: "",
    pay_price: "",
    collect_price: "",
    add_by: "",
    city: ""
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
    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户"
      />
    </el-form-item>
    <el-form-item label="车队" prop="fleet">
      <el-input
        v-model="newFormInline.fleet"
        clearable
        placeholder="请输入车队"
      />
    </el-form-item>
    <el-form-item label="始发地" prop="load_address">
      <el-input
        v-model="newFormInline.load_address"
        clearable
        placeholder="请输入始发地"
      />
    </el-form-item>
    <el-form-item label="目的地" prop="unload_address">
      <el-input
        v-model="newFormInline.unload_address"
        clearable
        placeholder="请输入目的地"
      />
    </el-form-item>
    <el-form-item label="应付价格" prop="pay_price">
      <el-input
        v-model="newFormInline.pay_price"
        clearable
        placeholder="请输入应付价格"
      />
    </el-form-item>
    <el-form-item label="应收价格" prop="collect_price">
      <el-input
        v-model="newFormInline.collect_price"
        clearable
        placeholder="请输入应收价格"
      />
    </el-form-item>
  </el-form>
</template>
