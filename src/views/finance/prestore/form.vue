<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    yucun: "",
    kahao: "",
    wanglaidanwei: "",
    fuwu: "",
    chongzhishijian: "",
    chongzhijine: "",
    xiaofeishijian: "",
    xiaofeijine: "",
    yue: "",
    caozuo: ""
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
    <el-form-item label="预存信息" prop="yucun">
      <el-input
        v-model="newFormInline.yucun"
        clearable
        placeholder="请输入预存信息"
      />
    </el-form-item>
  </el-form>
</template>
