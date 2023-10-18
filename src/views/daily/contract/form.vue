<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    bianhao: "",
    qiandingriqi: "",
    mingcheng: "",
    leixing: "",
    xiangmu: "",
    wofangdanwei: "",
    duifangdanwei: "",
    wofangjingban: "",
    duifangjingban: "",
    wofanglianxi: "",
    duifanglianxi: "",
    shengxiaoriqi: "",
    zhongzhiriqi: "",
    zongjiakuan: "",
    yizhifu: "",
    yukuan: "",
    fenshu: "",
    qianyuebumen: "",
    hetongzhuangtai: "",
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
    <el-form-item label="合同名称" prop="mingcheng">
      <el-input
        v-model="newFormInline.mingcheng"
        clearable
        placeholder="请输入合同名称"
      />
    </el-form-item>
  </el-form>
</template>
