<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    order_status: "未审核",
    order_type: "进口",
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
    add_by: "",
    city: ""
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
      <el-select
        v-model="newFormInline.order_type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="进口" value="进口" />
        <el-option label="出口" value="出口" />
      </el-select>
    </el-form-item>

    <el-form-item label="船公司" prop="ship_company">
      <el-input
        v-model="newFormInline.ship_company"
        clearable
        placeholder="请输入船公司"
        name="ship_company"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="客户" prop="customer">
      <el-input
        v-model="newFormInline.customer"
        clearable
        placeholder="请输入客户名"
        name="customer"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="子项目" prop="subproject">
      <el-input
        v-model="newFormInline.subproject"
        clearable
        placeholder="请输入子项目名"
        name="subproject"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="到港时间" prop="arrive_time">
      <el-date-picker
        v-model="newFormInline.arrive_time"
        type="date"
        placeholder="请输入到港时间"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="起始港" prop="start_port">
      <el-input
        v-model="newFormInline.start_port"
        clearable
        placeholder="请输入起始港"
        name="start_port"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="目的港" prop="target_port">
      <el-input
        v-model="newFormInline.target_port"
        clearable
        placeholder="请输入目的港"
        name="target_port"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="箱号" prop="containner_no">
      <el-input
        v-model="newFormInline.containner_no"
        clearable
        placeholder="请输入箱号"
        name="containner_no"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="封号" prop="seal_no">
      <el-input
        v-model="newFormInline.seal_no"
        clearable
        placeholder="请输入封号"
        name="seal_no"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
        name="container_type"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="船名航次" prop="ship_name">
      <el-input
        v-model="newFormInline.ship_name"
        clearable
        placeholder="请输入船名航次"
        name="ship_name"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="运单号" prop="track_no">
      <el-input
        v-model="newFormInline.track_no"
        clearable
        placeholder="请输入运单号"
        name="track_no"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="提箱码头" prop="load_port">
      <el-input
        v-model="newFormInline.load_port"
        clearable
        placeholder="请输入提箱码头"
        name="load_port"
        autocomplete="on"
      />
    </el-form-item>

    <el-form-item label="门点" prop="door">
      <el-input
        v-model="newFormInline.door"
        clearable
        placeholder="请输入门点"
        name="door"
        autocomplete="on"
      />
    </el-form-item>
  </el-form>
</template>
