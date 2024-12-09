<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { accCompanyList } from "@/api/daily";
import { feeNameList } from "@/api/finance";
import type { PaginationProps } from "@pureadmin/table";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    is_submit: "",
    is_applied: "",
    add_time: "",
    driver: "",
    company: "",
    car_no: "",
    hang_board_no: "",
    type: "",
    car_fees: "",
    content: "",
    quantity: "",
    amount: "",
    allocation_month: "",
    actual_amount: "",
    tax_amount: "",
    settlement_confirm: "",
    annex_url: "",
    remark: "",
    add_by: "",
    apply_department: "",
    fee_name: "",
    allocation_start: ""
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
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
const fee_list = ref<FeeItem[]>([]);
const fee_options = ref<FeeItem[]>([]);
let accData = [];
let feeData = [];
const data = accCompanyList({ pagination, form });
const fee_data = feeNameList({ pagination, form: fee_form });
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
});

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
    fee_options.value = [];
  }
};

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
    <el-form-item label="费用名" prop="fee_name">
      <el-select
        v-model="newFormInline.fee_name"
        filterable
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
    <el-form-item label="申请单位" prop="apply_department">
      <el-select
        v-model="newFormInline.apply_department"
        placeholder="请选择申请单位"
        clearable
        allow-create
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
    <el-form-item label="结算单位" prop="company">
      <el-select
        v-model="newFormInline.company"
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
    <el-form-item label="支付类型" prop="type">
      <el-select
        v-model="newFormInline.type"
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
    <el-form-item label="是否已申请" prop="is_applied">
      <el-select
        v-model="newFormInline.is_applied"
        placeholder="请选择是否已申请"
        clearable
        disabled
        class="!w-[180px]"
      >
        <el-option label="已申请" value="已申请" />
        <el-option label="未申请" value="未申请" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        disabled
        placeholder="请输入申请金额"
      />
    </el-form-item>
    <el-form-item label="报销金额" prop="actual_amount">
      <el-input
        v-model="newFormInline.actual_amount"
        clearable
        disabled
        placeholder="请输入报销金额"
      />
    </el-form-item>
    <el-form-item label="税额" prop="tax_amount">
      <el-input
        v-model="newFormInline.tax_amount"
        clearable
        disabled
        placeholder="请输入税额"
      />
    </el-form-item>
  </el-form>
</template>
