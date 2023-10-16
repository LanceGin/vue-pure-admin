<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    driver: "",
    idcard: "",
    mobile: "",
    meta: "",
    remark: "",
    idcard_pic: "",
    driver_license: "",
    congye: ""
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
    <el-form-item label="驾驶员：" prop="driver">
      <el-input
        v-model="newFormInline.driver"
        clearable
        placeholder="请输入驾驶员名"
      />
    </el-form-item>
  </el-form>
</template>
