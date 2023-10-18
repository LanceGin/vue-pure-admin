<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    xianghao: "",
    xiangxing: "",
    mendian: "",
    tixiangdian: "",
    zuoxiangshijian: "",
    zanluo: "",
    yundanhao: "",
    chuanming: "",
    daogangshijian: "",
    liuxiang: ""
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
    <el-form-item label="运单号：" prop="yundanhao">
      <el-input
        v-model="newFormInline.yundanhao"
        clearable
        placeholder="请输入运单号"
      />
    </el-form-item>
  </el-form>
</template>
