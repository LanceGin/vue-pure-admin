<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    zhuangtai: "",
    xingzhengyewu: "",
    feiyongming: "",
    shoufu: "",
    zhifuleixing: "",
    shenqingjine: "",
    baoxiaojine: "",
    shuie: "",
    shenqingren: "",
    shenqingdanwei: "",
    lurushijian: "",
    baoxiaoren: "",
    shenheren: "",
    shenheshijian: "",
    shenpiren: "",
    feiyongbianhao: "",
    shenqingbianhao: "",
    beizhu: "",
    shenqingriqi: ""
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
    <el-form-item label="费用名" prop="feiyongming">
      <el-input
        v-model="newFormInline.feiyongming"
        clearable
        placeholder="请输入费用名"
      />
    </el-form-item>
  </el-form>
</template>
