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
      <el-select
        v-model="newFormInline.unload_port"
        placeholder="请选择还箱点"
        clearable
        filterable
        allow-create
        class="!w-[180px]"
      >
        <el-option label="武汉金口" value="武汉金口" />
        <el-option label="武汉阳逻" value="武汉阳逻" />
        <el-option label="武汉经开港" value="武汉经开港" />
      </el-select>
    </el-form-item>
    <el-form-item label="装箱封号：" prop="export_seal_no">
      <el-input
        v-model="newFormInline.export_seal_no"
        clearable
        placeholder="请输入装箱封号"
      />
    </el-form-item>
    <el-form-item label="装箱点：" prop="export_port">
      <el-select
        v-model="newFormInline.export_port"
        placeholder="请选择装箱点"
        clearable
        filterable
        allow-create
        class="!w-[180px]"
      >
        <el-option label="安吉" value="安吉" />
        <el-option label="汇众" value="汇众" />
        <el-option label="通用" value="通用" />
        <el-option label="发动机" value="发动机" />
      </el-select>
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
