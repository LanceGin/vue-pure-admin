<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    xuhao: "",
    daima: "",
    haoma: "",
    shudianpiao: "",
    xiaofangsbh: "",
    xiaofangmc: "",
    goufangsbh: "",
    goufangmc: "",
    kaipiaoriqi: "",
    jine: "",
    shuie: "",
    jiashuiheji: "",
    laiyuan: "",
    piaozhong: "",
    zhuangtai: "",
    fengxiandengji: "",
    kaipiaoren: "",
    beizhu: "",
    shoukuanriqi: "",
    shoukuanjine: ""
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
    <el-form-item label="发票号码" prop="haoma">
      <el-input
        v-model="newFormInline.haoma"
        clearable
        placeholder="请输入发票号码"
      />
    </el-form-item>
  </el-form>
</template>
