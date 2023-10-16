<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    status: "",
    cata: "",
    order_no: "",
    custom: "",
    project: "",
    tracking_no: "",
    box: "",
    boat: "",
    boat_company: "",
    commission_no: "",
    boat_date: "",
    fee_time: "",
    fee: "",
    fee_amount: "",
    add_time: "",
    add_stuff: ""
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
      <el-input
        v-model="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>

    <el-form-item label="类型" prop="cata">
      <el-input
        v-model="newFormInline.cata"
        clearable
        placeholder="请输入类型"
      />
    </el-form-item>

    <el-form-item label="订单编号" prop="order_no">
      <el-input
        v-model="newFormInline.order_no"
        clearable
        placeholder="请输入订单编号"
      />
    </el-form-item>

    <el-form-item label="客户" prop="custom">
      <el-input
        v-model="newFormInline.custom"
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

    <el-form-item label="运单号" prop="tracking_no">
      <el-input
        v-model="newFormInline.tracking_no"
        clearable
        placeholder="请输入运单号"
      />
    </el-form-item>

    <el-form-item label="箱量" prop="box">
      <el-input
        v-model="newFormInline.box"
        clearable
        placeholder="请输入箱量"
      />
    </el-form-item>

    <el-form-item label="船名/航次" prop="boat">
      <el-input
        v-model="newFormInline.boat"
        clearable
        placeholder="请输入船名/航次"
      />
    </el-form-item>

    <el-form-item label="船东" prop="boat_company">
      <el-input
        v-model="newFormInline.boat_company"
        clearable
        placeholder="请输入船东"
      />
    </el-form-item>

    <el-form-item label="客户委托号" prop="commission_no">
      <el-input
        v-model="newFormInline.commission_no"
        clearable
        placeholder="请输入客户委托号"
      />
    </el-form-item>

    <el-form-item label="船期" prop="boat_date">
      <el-input
        v-model="newFormInline.boat_date"
        clearable
        placeholder="请输入船期"
      />
    </el-form-item>
  </el-form>
</template>
