<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    yingfudanwei: "",
    yewu: "",
    mendian: "",
    t: "",
    f: "",
    xiangliang: "",
    yingfu: "",
    shifu: ""
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
    <el-form-item label="应付单位" prop="yingfudanwei">
      <el-input
        v-model="newFormInline.yingfudanwei"
        clearable
        placeholder="请输入应付单位"
      />
    </el-form-item>
  </el-form>
</template>
