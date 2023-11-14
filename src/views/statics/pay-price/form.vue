<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    is_pay: "0",
    status: "",
    customer: "",
    project: "",
    door: "",
    port: "",
    i20gp: "",
    i40gp: "",
    i20tk: "",
    i40hc: "",
    o20gp: "",
    o40gp: "",
    o20tk: "",
    o40hc: "",
    add_time: ""
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
    <el-form-item label="状态" prop="status">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        clearable
      >
        <el-option label="有效" value="1" />
        <el-option label="无效" value="0" />
      </el-select>
    </el-form-item>
    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户"
      />
    </el-form-item>
    <el-form-item label="项目" prop="project">
      <el-input
        v-model="newFormInline.project"
        clearable
        placeholder="请输入项目"
      />
    </el-form-item>
    <el-form-item label="门点" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入门点"
      />
    </el-form-item>
    <el-form-item label="码头" prop="port">
      <el-input
        v-model="newFormInline.port"
        clearable
        placeholder="请输入码头"
      />
    </el-form-item>
    <el-form-item label="装20GP" prop="i20gp">
      <el-input
        v-model="newFormInline.i20gp"
        clearable
        placeholder="请输入装20GP"
      />
    </el-form-item>
    <el-form-item label="装40GP" prop="i40gp">
      <el-input
        v-model="newFormInline.i40gp"
        clearable
        placeholder="请输入装40GP"
      />
    </el-form-item>
    <el-form-item label="装20TK" prop="i20tk">
      <el-input
        v-model="newFormInline.i20tk"
        clearable
        placeholder="请输入装20TK"
      />
    </el-form-item>
    <el-form-item label="装40HC" prop="i40hc">
      <el-input
        v-model="newFormInline.i40hc"
        clearable
        placeholder="请输入装40HC"
      />
    </el-form-item>
    <el-form-item label="拆20GP" prop="o20gp">
      <el-input
        v-model="newFormInline.o20gp"
        clearable
        placeholder="请输入拆20GP"
      />
    </el-form-item>
    <el-form-item label="拆40GP" prop="o40gp">
      <el-input
        v-model="newFormInline.o40gp"
        clearable
        placeholder="请输入拆40GP"
      />
    </el-form-item>
    <el-form-item label="拆20TK" prop="o20tk">
      <el-input
        v-model="newFormInline.o20tk"
        clearable
        placeholder="请输入拆20TK"
      />
    </el-form-item>
    <el-form-item label="拆40HC" prop="o40hc">
      <el-input
        v-model="newFormInline.o40hc"
        clearable
        placeholder="请输入拆40HC"
      />
    </el-form-item>
  </el-form>
</template>
