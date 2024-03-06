<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { accCompanyList } from "@/api/daily";
import type { PaginationProps } from "@pureadmin/table";

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
    remark: "",
    apply_time: ""
  })
});

/** 分页配置 */
const pagination = reactive<PaginationProps>({
  pageSize: 500,
  currentPage: 1,
  total: 0
});
const form = reactive({
  id: "",
  company_code: "",
  company_name: "",
  bank: "",
  account_no: "",
  remark: ""
});

interface CompanyItem {
  id: string;
  company_name: string;
}
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let accData = [];
const data = accCompanyList({ pagination, form });
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      company_name: `${item.company_name}——${item.account_no}——${item.bank}`
    };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter(item => {
        return item.company_name.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    options.value = [];
  }
};

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
    <el-form-item label="业务/行政" prop="is_admin">
      <el-select
        v-model="newFormInline.is_admin"
        placeholder="请选择业务/行政"
        clearable
        class="!w-[180px]"
      >
        <el-option label="业务" value="业务" />
        <el-option label="行政" value="行政" />
      </el-select>
    </el-form-item>
    <el-form-item label="费用名" prop="fee_name">
      <el-input
        v-model="newFormInline.fee_name"
        clearable
        placeholder="请输入费用名"
      />
    </el-form-item>
    <el-form-item label="收/付" prop="is_pay">
      <el-select
        v-model="newFormInline.is_pay"
        placeholder="请选择收/付"
        clearable
        class="!w-[180px]"
      >
        <el-option label="收" value="收" />
        <el-option label="付" value="付" />
      </el-select>
    </el-form-item>
    <el-form-item label="支付类型" prop="pay_type">
      <el-select
        v-model="newFormInline.pay_type"
        placeholder="请选择支付类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="转账" value="转账" />
        <el-option label="现金" value="现金" />
        <el-option label="支票" value="支票" />
        <el-option label="结算卡" value="结算卡" />
        <el-option label="银行" value="银行" />
        <el-option label="汇票" value="汇票" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请金额" prop="apply_amount">
      <el-input
        v-model="newFormInline.apply_amount"
        clearable
        placeholder="请输入申请金额"
      />
    </el-form-item>
    <el-form-item label="报销金额" prop="reimburse_amount">
      <el-input
        v-model="newFormInline.reimburse_amount"
        clearable
        placeholder="请输入报销金额"
      />
    </el-form-item>
    <el-form-item label="税额" prop="tax_amount">
      <el-input
        v-model="newFormInline.tax_amount"
        clearable
        placeholder="请输入税额"
      />
    </el-form-item>
    <el-form-item label="申请人" prop="apply_by">
      <el-input
        v-model="newFormInline.apply_by"
        clearable
        placeholder="请输入申请人"
        disabled
      />
    </el-form-item>
    <el-form-item label="报销人" prop="reimburse_by">
      <el-input
        v-model="newFormInline.reimburse_by"
        clearable
        placeholder="请输入报销人"
      />
    </el-form-item>
    <el-form-item label="申请单位" prop="apply_department">
      <el-input
        v-model="newFormInline.apply_department"
        clearable
        placeholder="请输入申请单位"
      />
    </el-form-item>
    <el-form-item label="结算单位" prop="acc_company_id">
      <el-select
        v-model="newFormInline.acc_company_id"
        filterable
        remote
        reserve-keyword
        placeholder="输入结算单位关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.company_name"
          :value="item.id"
        />
      </el-select>
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
