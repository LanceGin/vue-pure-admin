<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    refer: "",
    name: "",
    address: "",
    contact_name: "",
    contact_mobile: "",
    status: "",
    project: "",
    mendian: "",
    zixiangmu: ""
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
    <el-form-item label="客户简称" prop="refer">
      <el-input
        v-model="newFormInline.refer"
        clearable
        placeholder="请输入客户简称"
      />
    </el-form-item>

    <el-form-item label="客户全称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入客户全称"
      />
    </el-form-item>

    <el-form-item label="企业地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        clearable
        placeholder="请输入企业地址"
      />
    </el-form-item>

    <el-form-item label="联系人" prop="contact_name">
      <el-input
        v-model="newFormInline.contact_name"
        clearable
        placeholder="请输入联系人"
      />
    </el-form-item>

    <el-form-item label="联系电话" prop="contact_mobile">
      <el-input
        v-model="newFormInline.contact_mobile"
        clearable
        placeholder="请输入联系电话"
      />
    </el-form-item>

    <el-form-item label="项目管理" prop="project">
      <el-input
        v-model="newFormInline.project"
        clearable
        placeholder="请输入项目管理"
      />
    </el-form-item>

    <el-form-item label="作业门点" prop="mendian">
      <el-input
        v-model="newFormInline.mendian"
        clearable
        placeholder="请输入作业门点"
      />
    </el-form-item>

    <el-form-item label="子项目" prop="zixiangmu">
      <el-input
        v-model="newFormInline.zixiangmu"
        clearable
        placeholder="请输入子项目"
      />
    </el-form-item>
  </el-form>
</template>
