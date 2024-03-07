<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
// import type { TabsPaneContext } from "element-plus";
// import { tableData } from "./utils/data";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    code: "",
    name: ""
  })
});

// const projectColumns: TableColumnList = [
//   {
//     label: "项目简称",
//     prop: "projectShortName"
//   },
//   {
//     label: "项目全称",
//     prop: "projectName"
//   },
//   {
//     label: "项目状态",
//     prop: "projectStatus"
//   },
//   {
//     label: "项目备注",
//     prop: "projectRemark"
//   }
// ];

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
// const activeName = ref("project");

// const handleClick = (tab: TabsPaneContext, event: Event) => {
//   console.log(tab, event);
// };

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
    <el-form-item label="费用代码" prop="code">
      <el-input v-model="newFormInline.code" placeholder="请输入费用代码" />
    </el-form-item>

    <el-form-item label="费用名称" prop="name">
      <el-input v-model="newFormInline.name" placeholder="费用名称" />
    </el-form-item>
  </el-form>
</template>
