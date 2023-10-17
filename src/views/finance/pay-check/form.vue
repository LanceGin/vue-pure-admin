<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    zhangqi: "",
    gongyingshang: "",
    jiesuandanwei: "",
    fuwu: "",
    f: "",
    t: "",
    xiangliang: "",
    jiesuan: "",
    kouchu: "",
    zengjia: "",
    shifu: "",
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
    <el-form-item label="供应商：" prop="gongyingshang">
      <el-input
        v-model="newFormInline.gongyingshang"
        clearable
        placeholder="请输入供应商名"
      />
    </el-form-item>
  </el-form>
</template>
