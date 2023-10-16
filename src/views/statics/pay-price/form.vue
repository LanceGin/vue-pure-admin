<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: "",
    custom: "",
    project: "",
    door: "",
    wharf: "",
    i20gp: "",
    i40gp: "",
    i40tk: "",
    i40hc: "",
    o40tk: "",
    o40hc: "",
    o20tk: "",
    o40ot: ""
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
    <el-form-item label="状态" prop="status">
      <el-input
        v-model="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
  </el-form>
</template>
