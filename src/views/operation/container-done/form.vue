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
    fee_name: "",
    amount: "",
    add_by: ""
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
    <!-- <el-form-item label="类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="应收" value="应收" />
        <el-option label="应付" value="应付" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="费用名" prop="fee_name">
      <el-input
        v-model="newFormInline.fee_name"
        clearable
        placeholder="请输入费用名"
      />
    </el-form-item>

    <el-form-item label="金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        placeholder="请输入金额"
      />
    </el-form-item>
  </el-form>
</template>
