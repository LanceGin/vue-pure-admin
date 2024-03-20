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
    order_fee: "",
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
      <el-input v-model="newFormInline.name" placeholder="请输入船公司名" />
    </el-form-item>

    <el-form-item label="码头" prop="area">
      <el-input v-model="newFormInline.area" placeholder="请输入码头" />
    </el-form-item>

    <el-form-item label="打单费" prop="order_fee">
      <el-input v-model="newFormInline.order_fee" placeholder="请输入打单费" />
    </el-form-item>
  </el-form>
</template>
