<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    boat_company: "",
    car_company: "",
    name: "",
    project: "",
    fee_cata: "",
    cata: "",
    fee_name: "",
    fee_code: "",
    company_type: "",
    gp20: "",
    tk20: "",
    gp40: "",
    tk40: "",
    hc40: "",
    ot40: "",
    ot20: "",
    fr40: ""
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
    <el-form-item label="船公司" prop="boat_company">
      <el-input
        v-model="newFormInline.boat_company"
        clearable
        placeholder="请输入船公司名"
      />
    </el-form-item>

    <el-form-item label="车队公司" prop="car_company">
      <el-input
        v-model="newFormInline.car_company"
        clearable
        placeholder="请输入车队公司名"
      />
    </el-form-item>

    <el-form-item label="客户" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入客户名"
      />
    </el-form-item>

    <el-form-item label="项目" prop="project">
      <el-input
        v-model="newFormInline.project"
        clearable
        placeholder="请输入项目名"
      />
    </el-form-item>

    <el-form-item label="费用类型" prop="fee_cata">
      <el-select
        v-model="newFormInline.fee_cata"
        placeholder="请选择费用类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="应付" value="0" />
        <el-option label="应收" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="类型" prop="cata">
      <el-select
        v-model="newFormInline.cata"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="全部" value="0" />
        <el-option label="进口" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="费用名称" prop="fee_name">
      <el-input
        v-model="newFormInline.fee_name"
        clearable
        placeholder="请输入费用名称"
      />
    </el-form-item>

    <el-form-item label="费用代码" prop="fee_code">
      <el-input
        v-model="newFormInline.fee_code"
        clearable
        placeholder="请输入费用代码"
      />
    </el-form-item>

    <el-form-item label="单位类型" prop="company_type">
      <el-select
        v-model="newFormInline.company_type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="客户" value="0" />
        <el-option label="车队" value="1" />
        <el-option label="船东" value="2" />
        <el-option label="码头堆场" value="3" />
      </el-select>
    </el-form-item>

    <el-form-item label="20GP" prop="gp20">
      <el-input
        v-model="newFormInline.gp20"
        clearable
        placeholder="请输入gp20"
      />
    </el-form-item>

    <el-form-item label="20TK" prop="tk20">
      <el-input
        v-model="newFormInline.tk20"
        clearable
        placeholder="请输入tk20"
      />
    </el-form-item>

    <el-form-item label="40GP" prop="gp40">
      <el-input
        v-model="newFormInline.gp40"
        clearable
        placeholder="请输入gp40"
      />
    </el-form-item>

    <el-form-item label="40TK" prop="tk40">
      <el-input
        v-model="newFormInline.tk40"
        clearable
        placeholder="请输入tk40"
      />
    </el-form-item>
  </el-form>
</template>
