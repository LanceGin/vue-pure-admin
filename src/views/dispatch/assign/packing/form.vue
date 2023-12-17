<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    door: "",
    car_no: "",
    status: ""
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
    <el-form-item label="门点：" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入门点"
      />
    </el-form-item>
    <el-form-item label="车号：" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车号"
      />
    </el-form-item>
  </el-form>
</template>
