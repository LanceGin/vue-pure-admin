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
    order_fee: "",
    type: "",
    status: "",
    temp_status: "",
    fee_name: "",
    fee: "",
    remark: "",
    add_by: "",
    abnormal_fee: "",
    dispatch_remark: ""
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
    <el-form-item label="运单号" prop="track_no">
      <el-input
        v-model="newFormInline.track_no"
        clearable
        placeholder="请输入运单号"
      />
    </el-form-item>
    <el-form-item label="箱号" prop="containner_no">
      <el-input
        v-model="newFormInline.containner_no"
        clearable
        placeholder="请输入箱号"
      />
    </el-form-item>
    <el-form-item label="封号" prop="seal_no">
      <el-input
        v-model="newFormInline.seal_no"
        clearable
        placeholder="请输入封号"
      />
    </el-form-item>
    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
      />
    </el-form-item>
    <el-form-item label="门点" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入门点"
      />
    </el-form-item>
  </el-form>
</template>