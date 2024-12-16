<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { accCompanyList } from "@/api/daily";
import type { PaginationProps } from "@pureadmin/table";
import { feeNameList, selectPayInvoicetList } from "@/api/finance";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    status: "",
    is_admin: "",
    fee_name: "",
    is_pay: "付",
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

/** 分页配置 */
const pagination = reactive<PaginationProps>({
  pageSize: 1000,
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
const fee_form = reactive({
  id: "",
  code: "",
  name: ""
});

interface CompanyItem {
  id: string;
  company_name: string;
}
interface FeeItem {
  id: string;
  fee_name: string;
}
interface InvoiceItem {
  id: string;
  invoice_no: string;
}
const loading = ref(false);
const isDisable = ref(true);
const isReserve = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
const fee_list = ref<FeeItem[]>([]);
const fee_options = ref<FeeItem[]>([]);
const invoice_list = ref<InvoiceItem[]>([]);
const invoice_options = ref<InvoiceItem[]>([]);
let accData = [];
let feeData = [];
let invoiceData = [];
const data = accCompanyList({ pagination, form });
const fee_data = feeNameList({ pagination, form: fee_form });
const invoice_data = selectPayInvoicetList();
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      company_name: `${item.company_name}——${item.account_no}——${item.bank}`
    };
  });
});
fee_data.then(v => {
  feeData = v.data.list;
  fee_list.value = feeData.map(item => {
    return {
      id: `${item.id}`,
      fee_name: `${item.name}`
    };
  });
  fee_options.value = fee_list.value;
});
invoice_data.then(v => {
  invoiceData = v.data.list;
  invoice_list.value = invoiceData.map(item => {
    return {
      id: `${item.id}`,
      invoice_no: `${item.invoice_no}`
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

const feeRemoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      fee_options.value = fee_list.value.filter(item => {
        return item.fee_name.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    fee_options.value = fee_list.value;
  }
};

const invoiceRemoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      invoice_options.value = invoice_list.value.filter(item => {
        return item.invoice_no.toLowerCase().includes(query.toLowerCase());
      });
    }, 200);
  } else {
    invoice_options.value = [];
  }
};

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

if (
  newFormInline.value.status === "未提交" ||
  newFormInline.value.status === ""
) {
  isDisable.value = false;
}

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
        :disabled="isDisable"
        class="!w-[180px]"
      >
        <el-option label="业务" value="业务" />
        <el-option label="行政" value="行政" />
      </el-select>
    </el-form-item>
    <el-form-item label="费用名" prop="fee_name">
      <el-select
        v-model="newFormInline.fee_name"
        filterable
        :disabled="isDisable"
        remote
        reserve-keyword
        placeholder="输入费用名关键字"
        :remote-method="feeRemoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in fee_options"
          :key="item.id"
          :label="item.fee_name"
          :value="item.fee_name"
        />
      </el-select>
    </el-form-item>
    <!-- <el-form-item label="收/付" prop="is_pay">
      <el-select
        v-model="newFormInline.is_pay"
        placeholder="请选择收/付"
        clearable
        class="!w-[180px]"
      >
        <el-option label="收" value="收" />
        <el-option label="付" value="付" />
      </el-select>
    </el-form-item> -->
    <el-form-item label="支付类型" prop="pay_type">
      <el-select
        v-model="newFormInline.pay_type"
        placeholder="请选择支付类型"
        clearable
        :disabled="isDisable"
        class="!w-[180px]"
      >
        <el-option label="转账" value="转账" />
        <el-option label="现金" value="现金" />
        <el-option label="支票" value="支票" />
        <el-option label="结算卡" value="结算卡" />
        <el-option label="银行" value="银行" />
        <el-option label="汇票" value="汇票" />
        <el-option label="三方协议扣缴" value="三方协议扣缴" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请金额" prop="apply_amount">
      <el-input
        v-model="newFormInline.apply_amount"
        clearable
        :disabled="isDisable"
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
        :disabled="isDisable"
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
        :disabled="isDisable"
        placeholder="请输入报销人"
      />
    </el-form-item>
    <el-form-item label="申请单位" prop="apply_department">
      <el-select
        v-model="newFormInline.apply_department"
        placeholder="请选择申请单位"
        clearable
        :disabled="isDisable"
        filterable
        class="!w-[180px]"
      >
        <el-option label="富安上海" value="富安上海" />
        <el-option label="富安太仓" value="富安太仓" />
        <el-option label="港鸣实业" value="港鸣实业" />
        <el-option label="濠瀚科技" value="濠瀚科技" />
        <el-option label="富安国际" value="富安国际" />
        <el-option label="鲜友网销" value="鲜友网销" />
        <el-option label="鲜友书局" value="鲜友书局" />
        <el-option label="武汉江通源" value="武汉江通源" />
        <el-option label="长沙沪源" value="长沙沪源" />
        <el-option label="众源润达" value="众源润达" />
        <el-option label="众源仁合" value="众源仁合" />
      </el-select>
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
    <el-form-item label="发票号码" prop="invoice_no">
      <el-select
        v-model="newFormInline.invoice_no"
        multiple
        filterable
        remote
        :reserve-keyword="isReserve"
        placeholder="输入发票号码关键字"
        :remote-method="invoiceRemoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in invoice_options"
          :key="item.id"
          :label="item.invoice_no"
          :value="item.invoice_no"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        :disabled="isDisable"
        placeholder="请输入备注"
      />
    </el-form-item>
  </el-form>
</template>
