<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    order_status: "未审核",
    order_type: "",
    ship_company: "",
    customer: "",
    subproject: "",
    arrive_time: "",
    start_port: "",
    target_port: "",
    containner_no: "",
    seal_no: "",
    container_type: "",
    ship_name: "",
    track_no: "",
    unload_port: "",
    door: "",
    make_time: "",
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "",
    order_time: "",
    order_fee: ""
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
    <el-form-item label="类型" prop="order_type">
      <el-input
        v-model="newFormInline.order_type"
        clearable
        placeholder="请输入类型"
      />
    </el-form-item>

    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户名"
      />
    </el-form-item>

    <el-form-item label="项目" prop="subproject">
      <el-input
        v-model="newFormInline.subproject"
        clearable
        placeholder="请输入项目名"
      />
    </el-form-item>

    <el-form-item label="运单号" prop="track_no">
      <el-input
        v-model="newFormInline.track_no"
        clearable
        placeholder="请输入运单号"
      />
    </el-form-item>

    <el-form-item label="箱量" prop="package_count">
      <el-input
        v-model="newFormInline.package_count"
        clearable
        placeholder="请输入箱量"
      />
    </el-form-item>

    <el-form-item label="船名/航次" prop="ship_name">
      <el-input
        v-model="newFormInline.ship_name"
        clearable
        placeholder="请输入船名/航次"
      />
    </el-form-item>

    <el-form-item label="船东" prop="ship_company">
      <el-input
        v-model="newFormInline.ship_company"
        clearable
        placeholder="请输入船东"
      />
    </el-form-item>

    <el-form-item label="船期" prop="arrive_time">
      <el-input
        v-model="newFormInline.arrive_time"
        clearable
        placeholder="请输入船期"
      />
    </el-form-item>
  </el-form>
</template>
