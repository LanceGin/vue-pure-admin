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
    <el-form-item label="发票代码" prop="code">
      <el-input
        v-model="newFormInline.code"
        clearable
        placeholder="请输入发票代码"
      />
    </el-form-item>
    <el-form-item label="发票号码" prop="no">
      <el-input
        v-model="newFormInline.no"
        clearable
        placeholder="请输入发票号码"
      />
    </el-form-item>
    <el-form-item label="数电票号码" prop="digital_ticket_no">
      <el-input
        v-model="newFormInline.digital_ticket_no"
        clearable
        placeholder="请输入数电票号码"
      />
    </el-form-item>
    <el-form-item label="销方识别号" prop="seller_identification_no">
      <el-input
        v-model="newFormInline.seller_identification_no"
        clearable
        placeholder="请输入销方识别号"
      />
    </el-form-item>
    <el-form-item label="销方名称" prop="seller_name">
      <el-input
        v-model="newFormInline.seller_name"
        clearable
        placeholder="请输入销方名称"
      />
    </el-form-item>
    <el-form-item label="购方识别号" prop="buyer_identification_no">
      <el-input
        v-model="newFormInline.buyer_identification_no"
        clearable
        placeholder="请输入购方识别号"
      />
    </el-form-item>
    <el-form-item label="购方名称" prop="buyer_name">
      <el-input
        v-model="newFormInline.buyer_name"
        clearable
        placeholder="请输入购方名称"
      />
    </el-form-item>
    <el-form-item label="开票日期" prop="invoice_time">
      <el-date-picker
        v-model="newFormInline.invoice_time"
        type="date"
        placeholder="请输入开票日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="税收分类编号" prop="classification_code">
      <el-input
        v-model="newFormInline.classification_code"
        clearable
        placeholder="请输入税收分类编号"
      />
    </el-form-item>
    <el-form-item label="特定业务类型" prop="specific_type">
      <el-input
        v-model="newFormInline.specific_type"
        clearable
        placeholder="请输入特定业务类型"
      />
    </el-form-item>
    <el-form-item label="货物或应税劳务名称" prop="goods_or_taxable_service">
      <el-input
        v-model="newFormInline.goods_or_taxable_service"
        clearable
        placeholder="请输入货物或应税劳务名称"
      />
    </el-form-item>
    <el-form-item label="规格型号" prop="specification">
      <el-input
        v-model="newFormInline.specification"
        clearable
        placeholder="请输入规格型号"
      />
    </el-form-item>
    <el-form-item label="单位" prop="unit">
      <el-input
        v-model="newFormInline.unit"
        clearable
        placeholder="请输入单位"
      />
    </el-form-item>
    <el-form-item label="数量" prop="quantity">
      <el-input
        v-model="newFormInline.quantity"
        clearable
        placeholder="请输入数量"
      />
    </el-form-item>
    <el-form-item label="单价" prop="unit_price">
      <el-input
        v-model="newFormInline.unit_price"
        clearable
        placeholder="请输入单价"
      />
    </el-form-item>
    <el-form-item label="税率" prop="tax_rate">
      <el-input
        v-model="newFormInline.tax_rate"
        clearable
        placeholder="请输入税率"
      />
    </el-form-item>
    <el-form-item label="发票来源" prop="invoice_from">
      <el-input
        v-model="newFormInline.invoice_from"
        clearable
        placeholder="请输入发票来源"
      />
    </el-form-item>
    <el-form-item label="发票类型" prop="invoice_type">
      <el-input
        v-model="newFormInline.invoice_type"
        clearable
        placeholder="请输入发票类型"
      />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input
        v-model="newFormInline.status"
        clearable
        placeholder="请输入状态"
      />
    </el-form-item>
    <el-form-item label="是否正数" prop="is_positive">
      <el-select
        v-model="newFormInline.is_positive"
        placeholder="请选择是否正数"
        clearable
        class="!w-[180px]"
      >
        <el-option label="是" value="是" />
        <el-option label="否" value="否" />
      </el-select>
    </el-form-item>
    <el-form-item label="风险等级" prop="risk_level">
      <el-input
        v-model="newFormInline.risk_level"
        clearable
        placeholder="请输入风险等级"
      />
    </el-form-item>
    <el-form-item label="开票人" prop="invoice_by">
      <el-input
        v-model="newFormInline.invoice_by"
        clearable
        placeholder="请输入开票人"
        disabled
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
