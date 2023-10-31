<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    userName: "",
    clock_date: "",
    clockin_time: "",
    clockin_location: "",
    clockin_type: "",
    clockin_remark: "",
    clockout_time: "",
    clockout_location: "",
    clockout_type: "",
    clockout_remark: "",
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
    <!-- <el-form-item label="堆场名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入堆场名称"
      />
    </el-form-item> -->
  </el-form>
</template>
