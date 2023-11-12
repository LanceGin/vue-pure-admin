<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    old_id: "",
    shipCompany: "",
    fleet_customer_id: "",
    fleetCompanyId: "",
    project: "",
    costType: "",
    isStart: "",
    costName: "",
    costCode: "",
    accountCompanyType: "",
    price_gp20: "",
    price_tk20: "",
    price_gp40: "",
    price_tk40: "",
    price_hc40: "",
    price_ot40: "",
    price_ot20: "",
    price_fr40: ""
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
    <el-form-item label="船公司" prop="shipCompany">
      <el-input
        v-model="newFormInline.shipCompany"
        clearable
        placeholder="请输入船公司名"
      />
    </el-form-item>

    <el-form-item label="车队公司" prop="fleetCompanyId">
      <el-input
        v-model="newFormInline.fleetCompanyId"
        clearable
        placeholder="请输入车队公司名"
      />
    </el-form-item>

    <el-form-item label="客户" prop="fleet_customer_id">
      <el-input
        v-model="newFormInline.fleet_customer_id"
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

    <el-form-item label="费用类型" prop="costType">
      <el-select
        v-model="newFormInline.costType"
        placeholder="请选择费用类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="应付" value="0" />
        <el-option label="应收" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="类型" prop="isStart">
      <el-select
        v-model="newFormInline.isStart"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="全部" value="0" />
        <el-option label="进口" value="1" />
      </el-select>
    </el-form-item>

    <el-form-item label="费用名称" prop="costName">
      <el-input
        v-model="newFormInline.costName"
        clearable
        placeholder="请输入费用名称"
      />
    </el-form-item>

    <el-form-item label="费用代码" prop="costCode">
      <el-input
        v-model="newFormInline.costCode"
        clearable
        placeholder="请输入费用代码"
      />
    </el-form-item>

    <el-form-item label="单位类型" prop="accountCompanyType">
      <el-select
        v-model="newFormInline.accountCompanyType"
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

    <el-form-item label="20GP" prop="price_gp20">
      <el-input
        v-model="newFormInline.price_gp20"
        clearable
        placeholder="请输入gp20"
      />
    </el-form-item>

    <el-form-item label="20TK" prop="price_tk20">
      <el-input
        v-model="newFormInline.price_tk20"
        clearable
        placeholder="请输入tk20"
      />
    </el-form-item>

    <el-form-item label="40GP" prop="price_gp40">
      <el-input
        v-model="newFormInline.price_gp40"
        clearable
        placeholder="请输入gp40"
      />
    </el-form-item>

    <el-form-item label="40TK" prop="price_tk40">
      <el-input
        v-model="newFormInline.price_tk40"
        clearable
        placeholder="请输入tk40"
      />
    </el-form-item>
  </el-form>
</template>
