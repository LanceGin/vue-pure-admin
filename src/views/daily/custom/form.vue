<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    daima: "",
    mingcheng: "",
    kaihuhang: "",
    yinhangzhanghao: "",
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
    <el-form-item label="代码" prop="daima">
      <el-input
        v-model="newFormInline.daima"
        clearable
        placeholder="请输入代码"
      />
    </el-form-item>
    <el-form-item label="名称" prop="mingcheng">
      <el-input
        v-model="newFormInline.mingcheng"
        clearable
        placeholder="请输入名称"
      />
    </el-form-item>
    <el-form-item label="开户行" prop="kaihuhang">
      <el-input
        v-model="newFormInline.kaihuhang"
        clearable
        placeholder="请输入开户行"
      />
    </el-form-item>
    <el-form-item label="银行账号" prop="yinhangzhanghao">
      <el-input
        v-model="newFormInline.yinhangzhanghao"
        clearable
        placeholder="请输入银行账号"
      />
    </el-form-item>
    <el-form-item label="备注" prop="beizhu">
      <el-input
        v-model="newFormInline.beizhu"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
