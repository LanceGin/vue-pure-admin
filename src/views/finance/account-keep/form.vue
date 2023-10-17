<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: "",
    yewu: "",
    name: "",
    zhifu: "",
    zhifu_type: "",
    amount: "",
    submit: "",
    tax: "",
    apply_staff: "",
    add_time: "",
    submit_staff: "",
    shenhe: "",
    shenpi: "",
    jizhang: "",
    feiyongbianhao: "",
    jizhang_time: "",
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
    <el-form-item label="费用名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入费用名称"
      />
    </el-form-item>
  </el-form>
</template>
