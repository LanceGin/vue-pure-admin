<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    add_time: "",
    driver: "",
    company: "",
    car_no: "",
    hang_board_no: "",
    car_fees: "",
    content: "",
    quantity: "",
    amount: "",
    allocation_month: "",
    actual_amount: "",
    settlement_confirm: "",
    annex_url: "",
    remark: "",
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
    <el-form-item label="日期" prop="add_time">
      <el-date-picker
        v-model="newFormInline.add_time"
        type="date"
        placeholder="请输入日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="司机" prop="driver">
      <el-input
        v-model="newFormInline.driver"
        clearable
        placeholder="请输入司机"
      />
    </el-form-item>
    <el-form-item label="所属公司" prop="company">
      <el-input
        v-model="newFormInline.company"
        clearable
        placeholder="请输入所属公司"
      />
    </el-form-item>
    <el-form-item label="车头号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车头号"
      />
    </el-form-item>
    <el-form-item label="车挂号" prop="hang_board_no">
      <el-input
        v-model="newFormInline.hang_board_no"
        clearable
        placeholder="请输入车挂号"
      />
    </el-form-item>
    <el-form-item label="车辆费用" prop="car_fees">
      <el-input
        v-model="newFormInline.car_fees"
        clearable
        placeholder="请输入车辆费用"
      />
    </el-form-item>
    <el-form-item label="状态变化内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入状态变化内容"
      />
    </el-form-item>
    <el-form-item label="数量" prop="quantity">
      <el-input
        v-model="newFormInline.quantity"
        clearable
        placeholder="请输入数量"
      />
    </el-form-item>
    <el-form-item label="金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        placeholder="请输入金额"
      />
    </el-form-item>
    <el-form-item label="分摊月份" prop="allocation_month">
      <el-input
        v-model="newFormInline.allocation_month"
        clearable
        placeholder="请输入分摊月份"
      />
    </el-form-item>
    <el-form-item label="实际金额" prop="actual_amount">
      <el-input
        v-model="newFormInline.actual_amount"
        clearable
        placeholder="请输入实际金额"
      />
    </el-form-item>
    <el-form-item label="结算确认" prop="settlement_confirm">
      <el-input
        v-model="newFormInline.settlement_confirm"
        clearable
        placeholder="请输入结算确认"
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
