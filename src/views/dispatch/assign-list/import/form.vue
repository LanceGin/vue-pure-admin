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
    type: ""
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
    <el-form-item label="车牌号：" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车牌号"
      />
    </el-form-item>
    <!-- <el-form-item label="拆箱门点：" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入拆箱门点"
      />
    </el-form-item>
    <el-form-item label="做箱时间：" prop="make_time">
      <el-date-picker
        v-model="newFormInline.make_time"
        type="date"
        placeholder="请输入做箱时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item> -->
  </el-form>
</template>
