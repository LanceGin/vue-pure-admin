<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    status: "",
    type: "",
    title: "",
    content: "",
    add_by: "",
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
    <el-form-item label="类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="日报" value="日报" />
        <el-option label="周报" value="周报" />
        <el-option label="月报" value="月报" />
      </el-select>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input
        v-model="newFormInline.title"
        clearable
        placeholder="请输入标题"
      />
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        type="textarea"
        autosize
        placeholder="请输入内容"
      />
    </el-form-item>
  </el-form>
</template>
