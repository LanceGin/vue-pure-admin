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
    container_status: "待挑箱",
    order_time: "",
    order_fee: "",
    temp_status: "",
    remark: "",
    crossing: ""
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
    <el-form-item label="做箱时间" prop="make_time">
      <el-date-picker
        v-model="newFormInline.make_time"
        type="datetime"
        placeholder="请输入做箱时间"
        time-format="HH:mm"
        format="YYYY/MM/DD HH:mm"
        value-format="YYYY-MM-DD HH:mm"
      />
    </el-form-item>
    <el-form-item label="道口" prop="crossing">
      <el-select v-model="newFormInline.crossing" placeholder="请选择道口">
        <el-option label="GA" value="GA" />
        <el-option label="BS" value="BS" />
        <el-option label="PT" value="PT" />
        <el-option label="SGE" value="SGE" />
        <el-option label="SGE-LCM" value="LCM" />
        <el-option label="CVG" value="CVG" />
        <el-option label="CVG-LCM" value="CVG-LCM" />
        <el-option label="NGC" value="NGC" />
        <el-option label="CSS4" value="CSS4" />
        <el-option label="CSS" value="CSS" />
        <el-option label="CSS-LCM" value="CSS-LCM" />
        <el-option label="NGADK01" value="NGADK01" />
        <el-option label="NPGA" value="NPGA" />
        <el-option label="NPBS" value="NPBS" />
      </el-select>
    </el-form-item>
    <el-form-item label="提箱点" prop="load_port">
      <el-input
        v-model="newFormInline.load_port"
        clearable
        placeholder="请输入提箱点"
      />
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
