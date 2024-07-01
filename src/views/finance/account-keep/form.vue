<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { deleteReciept } from "@/api/third";

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
    create_time: "",
    reimburse_by: "",
    audit_by: "",
    audit_time: "",
    approve_by: "",
    fee_no: "",
    remark: "",
    apply_time: "",
    keep_by: "",
    keep_time: "",
    company_name: "",
    reciept_url: []
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

function removeDomain(item, index) {
  deleteReciept(item);
  newFormInline.value.reciept_url.splice(index, 1);
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
      <el-button
        class="mt-2"
        type="danger"
        @click.prevent="removeDomain(item, index)"
      >
        删除
      </el-button>
    </el-form-item>
  </el-form>
</template>
