<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    status: "",
    is_admin: "",
    fee_name: "",
    is_pay: "",
    pay_type: "",
    apply_amount: "",
    reimburse_amount: "",
    tax_amount: "",
    apply_by: "",
    apply_department: "",
    acc_company_id: "",
    company_name: "",
    bank: "",
    account_no: "",
    create_time: "",
    reimburse_by: "",
    audit_by: "",
    audit_time: "",
    approve_by: "",
    fee_no: "",
    invoice_no: "",
    remark: "",
    apply_time: "",
    reciept_url: []
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
    <el-form-item
      v-for="(item, index) in newFormInline.reciept_url"
      :key="index"
      label=""
      prop="reciept_url"
    >
      <el-image
        style="width: 600px; height: 400px"
        :src="item.reciept_url"
        fit="contain"
      />
    </el-form-item>
  </el-form>
</template>
