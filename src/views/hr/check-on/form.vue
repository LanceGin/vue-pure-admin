<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    check_on_date: "",
    check_on_time: "",
    check_on_address: "",
    check_on_type: "",
    check_on_remark: "",
    check_out_time: "",
    check_out_address: "",
    check_out_type: "",
    check_out_remark: "",
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
