<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    riqi: "",
    leixing: "",
    kehu: "",
    chuangongsi: "",
    tidanhao: "",
    xianghao: "",
    xiangxing: "",
    fenghao: "",
    liuxiang: "",
    chuanming: "",
    dizhi: "",
    chehao: "",
    dingcangfei: "",
    huandanfei: "",
    yunfei: "",
    beizhu: ""
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
    <el-form-item label="客户" prop="kehu">
      <el-input
        v-model="newFormInline.kehu"
        clearable
        placeholder="请输入客户"
      />
    </el-form-item>
  </el-form>
</template>
