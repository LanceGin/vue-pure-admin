<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    settlement: "",
    cargo_name: "",
    order_fee: "",
    p40: "",
    p20: "",
    c40: "",
    c20: "",
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
    <el-form-item label="结算方" prop="settlement">
      <el-input
        v-model="newFormInline.settlement"
        clearable
        placeholder="请输入结算方"
      />
    </el-form-item>
    <el-form-item label="货名" prop="cargo_name">
      <el-input
        v-model="newFormInline.cargo_name"
        clearable
        placeholder="请输入货名"
      />
    </el-form-item>
    <el-form-item label="换单费" prop="order_fee">
      <el-input
        v-model="newFormInline.order_fee"
        clearable
        placeholder="请输入换单费"
      />
    </el-form-item>
    <el-form-item label="40应付" prop="p40">
      <el-input
        v-model="newFormInline.p40"
        clearable
        placeholder="请输入40应付"
      />
    </el-form-item>
    <el-form-item label="20应付" prop="p20">
      <el-input
        v-model="newFormInline.p20"
        clearable
        placeholder="请输入20应付"
      />
    </el-form-item>
    <el-form-item label="40应收" prop="c40">
      <el-input
        v-model="newFormInline.c40"
        clearable
        placeholder="请输入40应收"
      />
    </el-form-item>
    <el-form-item label="20应收" prop="c20">
      <el-input
        v-model="newFormInline.c20"
        clearable
        placeholder="请输入20应收"
      />
    </el-form-item>
  </el-form>
</template>
