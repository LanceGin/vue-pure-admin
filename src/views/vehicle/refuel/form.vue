<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    chehao: "",
    riqi: "",
    shengshu: "",
    danjia: "",
    leixing: "",
    jine: "",
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
    <el-form-item label="车号" prop="chehao">
      <el-input
        v-model="newFormInline.chehao"
        clearable
        placeholder="请输入车号"
      />
    </el-form-item>

    <el-form-item label="日期" prop="riqi">
      <el-input
        v-model="newFormInline.riqi"
        clearable
        placeholder="请输入日期"
      />
    </el-form-item>

    <el-form-item label="升数" prop="shengshu">
      <el-input
        v-model="newFormInline.shengshu"
        clearable
        placeholder="请输入升数"
      />
    </el-form-item>

    <el-form-item label="单价" prop="danjia">
      <el-input
        v-model="newFormInline.danjia"
        clearable
        placeholder="请输入单价"
      />
    </el-form-item>

    <el-form-item label="金额" prop="danjia*shengshu">
      <el-input
        v-model="newFormInline.jine"
        clearable
        placeholder="自动计算"
        disabled
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
