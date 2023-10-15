<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    realname: "",
    mobile: "",
    email: "",
    department: "",
    group: "",
    wechat: "",
    create_time: "",
    create_staff: ""
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
    <el-form-item label="用户名" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入用户名"
      />
    </el-form-item>

    <el-form-item label="姓名" prop="realname">
      <el-input
        v-model="newFormInline.realname"
        clearable
        placeholder="请输入姓名"
      />
    </el-form-item>

    <el-form-item label="手机号" prop="mobile">
      <el-input
        v-model="newFormInline.mobile"
        clearable
        placeholder="请输入手机号"
      />
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input
        v-model="newFormInline.email"
        clearable
        placeholder="请输入邮箱"
      />
    </el-form-item>

    <el-form-item label="部门" prop="department">
      <el-input
        v-model="newFormInline.department"
        clearable
        placeholder="请输入部门"
      />
    </el-form-item>

    <el-form-item label="工作组" prop="group">
      <el-input
        v-model="newFormInline.group"
        clearable
        placeholder="请输入工作组"
      />
    </el-form-item>
  </el-form>
</template>
