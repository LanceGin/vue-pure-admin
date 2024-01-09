<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    code: "",
    no: "",
    digital_ticket_no: "",
    seller_identification_no: "",
    seller_name: "",
    buyer_identification_no: "",
    buyer_name: "",
    invoice_time: "",
    classification_code: "",
    specific_type: "",
    goods_or_taxable_service: "",
    specification: "",
    unit: "",
    quantity: "",
    unit_price: "",
    amount: "",
    tax_rate: "",
    tax: "",
    total_amount: "",
    invoice_from: "",
    invoice_type: "",
    status: "",
    is_positive: "",
    risk_level: "",
    invoice_by: "",
    remark: "",
    is_invoice: "",
    paid_time: "",
    certification_period: ""
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
    <el-form-item label="是否已收票" prop="is_invoice">
      <el-select
        v-model="newFormInline.is_invoice"
        placeholder="请选择是否已收票"
        clearable
        class="!w-[180px]"
      >
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
      </el-select>
    </el-form-item>
    <el-form-item label="付款日期" prop="paid_time">
      <el-date-picker
        v-model="newFormInline.paid_time"
        type="date"
        placeholder="请输入付款日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="认证期" prop="certification_period">
      <el-date-picker
        v-model="newFormInline.certification_period"
        type="date"
        placeholder="请输入认证期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
  </el-form>
</template>
