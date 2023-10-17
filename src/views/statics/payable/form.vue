<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    zhuangtai: "",
    zhangqi: "",
    feiyongmc: "",
    jine: "",
    zuoxiangshijian: "",
    kehu: "",
    qishigang: "",
    mudigang: "",
    matou: "",
    chuangongsi: "",
    chuanming: "",
    xiangfenghao: "",
    xianghao: "",
    yundanhao: "",
    xiangxing: "",
    danjuleibie: "",
    mendian: "",
    yewu: "",
    wanglaidanwei: "",
    cheliang: "",
    beizhu: "",
    fapiaohao: "",
    chedui: "",
    jiesuanhao: "",
    jihuahao: "",
    lururen: "",
    lurushijian: "",
    feiyongleixing: "",
    huidanbeizhu: ""
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
    <el-form-item label="费用名称" prop="feiyongmc">
      <el-input
        v-model="newFormInline.feiyongmc"
        clearable
        placeholder="请输入费用名称"
      />
    </el-form-item>
  </el-form>
</template>
