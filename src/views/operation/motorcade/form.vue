<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
// import type { TabsPaneContext } from "element-plus";
// import { tableData } from "./utils/data";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    companyShortName: "",
    companyName: "",
    companyAddress: "",
    companyContact: "",
    companyPhone1: "",
    state: "",
    project: "",
    mendian: "",
    zixiangmu: ""
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
    <el-form-item label="客户简称" prop="companyShortName">
      <el-input
        v-model="newFormInline.companyShortName"
        placeholder="请输入客户简称"
        name="companyShortName"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="客户全称" prop="companyName">
      <el-input
        v-model="newFormInline.companyName"
        placeholder="请输入客户全称"
        name="companyName"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="企业地址" prop="companyAddress">
      <el-input
        v-model="newFormInline.companyAddress"
        placeholder="请输入企业地址"
        name="companyAddress"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="联系人" prop="companyContact">
      <el-input
        v-model="newFormInline.companyContact"
        placeholder="请输入联系人"
        name="companyContact"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="联系电话" prop="companyPhone1">
      <el-input
        v-model="newFormInline.companyPhone1"
        placeholder="请输入联系电话"
        name="companyPhone1"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="状态" prop="state">
      <el-select v-model="newFormInline.state" placeholder="请选择状态">
        <el-option label="正常" value="正常" />
        <el-option label="停用" value="停用" />
      </el-select>
    </el-form-item>

    <!-- <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="项目管理" name="project">
        <el-form :inline="true">
          <el-form-item>
            <el-button link type="primary">增加</el-button>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="danger">删除</el-button>
          </el-form-item>
        </el-form>
        <pure-table :data="tableData" :columns="projectColumns" />
      </el-tab-pane>
      <el-tab-pane label="作业门点" name="door">
        <el-form :inline="true">
          <el-form-item>
            <el-button link type="primary">增加</el-button>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="danger">删除</el-button>
          </el-form-item>
        </el-form>
        <pure-table :data="tableData" :columns="projectColumns" />
      </el-tab-pane>
      <el-tab-pane label="子项目" name="subproject">
        <el-form :inline="true">
          <el-form-item>
            <el-button link type="primary">增加</el-button>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="danger">删除</el-button>
          </el-form-item>
        </el-form>
        <pure-table :data="tableData" :columns="projectColumns" />
      </el-tab-pane>
    </el-tabs> -->
  </el-form>
</template>
