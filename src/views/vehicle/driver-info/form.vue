<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    id_no: "",
    mobile: "",
    attribute: "",
    settlement_company: "",
    remark: "",
    id_card_url: "",
    driver_license_url: "",
    certifiacation_url: ""
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
    <el-form-item label="驾驶员：" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入驾驶员名称"
      />
    </el-form-item>
    <el-form-item label="身份证号：" prop="id_no">
      <el-input
        v-model="newFormInline.id_no"
        clearable
        placeholder="请输入身份证号"
      />
    </el-form-item>
    <el-form-item label="手机号：" prop="mobile">
      <el-input
        v-model="newFormInline.mobile"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>
    <el-form-item label="属性：" prop="attribute">
      <el-input
        v-model="newFormInline.attribute"
        clearable
        placeholder="请输入属性"
      />
    </el-form-item>
    <el-form-item label="结算单位：" prop="settlement_company">
      <el-input
        v-model="newFormInline.settlement_company"
        clearable
        placeholder="请输入结算单位"
      />
    </el-form-item>
    <el-form-item label="备注：" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
