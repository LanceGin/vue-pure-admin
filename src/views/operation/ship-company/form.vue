<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
// import type { TabsPaneContext } from "element-plus";
// import { tableData } from "./utils/data";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    name: "",
    area: "",
    o20: "",
    o40: "",
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
    <el-form-item label="船公司名" prop="name">
      <el-input
        v-model="newFormInline.name"
        placeholder="请输入船公司名"
        name="ship_company_name"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="码头" prop="area">
      <el-input
        v-model="newFormInline.area"
        placeholder="请输入码头"
        name="load_port"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="20打单费" prop="o20">
      <el-input
        v-model="newFormInline.o20"
        placeholder="请输入打单费"
        name="o20"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="40打单费" prop="o40">
      <el-input
        v-model="newFormInline.o40"
        placeholder="请输入打单费"
        name="o40"
        autocomplete="on"
      />
    </el-form-item>
  </el-form>
</template>
