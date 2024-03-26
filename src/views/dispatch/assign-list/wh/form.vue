<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    dispatch_id: "",
    order_status: "",
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
    car_no: "",
    transport_status: "",
    temp_port: "",
    temp_status: "",
    temp_time: "",
    export_seal_no: "",
    export_port: "",
    dispatch_car_no: "",
    trans_status: "",
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
    <el-form-item label="还箱点：" prop="unload_port">
      <el-input
        v-model="newFormInline.unload_port"
        clearable
        placeholder="请输入还箱点"
      />
    </el-form-item>
    <el-form-item label="装箱封号：" prop="export_seal_no">
      <el-input
        v-model="newFormInline.export_seal_no"
        clearable
        placeholder="请输入装箱封号"
      />
    </el-form-item>
    <el-form-item label="装箱点：" prop="export_port">
      <el-input
        v-model="newFormInline.export_port"
        clearable
        placeholder="请输入装箱点"
      />
    </el-form-item>
    <el-form-item label="备注：" prop="dispatch_remark">
      <el-input
        v-model="newFormInline.dispatch_remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
