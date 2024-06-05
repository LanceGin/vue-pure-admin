<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
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
    plan_time: "",
    load_port: "",
    count: "",
    transfer_port: "",
    package_count: "",
    gross_weight: "",
    volume: "",
    container_weight: "",
    container_status: "待挑箱",
    order_time: "",
    order_fee: "",
    temp_status: "",
    temp_port: "",
    remark: "",
    crossing: "",
    city: "",
    actual_amount_temp: ""
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
    <el-form-item label="暂落点" prop="temp_port">
      <el-input
        v-model="newFormInline.temp_port"
        clearable
        placeholder="请输入暂落点"
      />
    </el-form-item>
    <el-form-item label="实付金额" prop="actual_amount_temp">
      <el-input
        v-model="newFormInline.actual_amount_temp"
        clearable
        placeholder="请输入实付金额"
      />
    </el-form-item>
  </el-form>
</template>
