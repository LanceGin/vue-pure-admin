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
    type: "应付",
    account_period: "",
    fee_name: "",
    amount: "",
    less_amount: "",
    more_amount: "",
    fee_type: "",
    remark: "",
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
    container_fee: "",
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
    car_no: "",
    add_by: "",
    add_time: "",
    project_name: "",
    custom_name: "",
    flow_direction: "",
    acc_company: "",
    content: "",
    invoice_no: ""
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
      company_name: `${item.company_name}-${item.account_no}`
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
    <el-form-item label="账期" prop="account_period">
      <el-date-picker
        v-model="newFormInline.account_period"
        type="month"
        placeholder="请输入账期"
        format="YYYY/MM"
        value-format="YYYY-MM"
      />
    </el-form-item>
    <el-form-item label="供应商" prop="custom_name">
      <el-input
        v-model="newFormInline.custom_name"
        clearable
        placeholder="请输入供应商"
      />
    </el-form-item>
    <el-form-item label="结算单位" prop="acc_company">
      <el-select
        v-model="newFormInline.acc_company"
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
    <el-form-item label="服务内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入服务内容"
      />
    </el-form-item>
    <el-form-item label="金额" prop="container_fee">
      <el-input
        v-model="newFormInline.container_fee"
        clearable
        placeholder="请输入金额"
        disabled
      />
    </el-form-item>
    <el-form-item label="扣除金额" prop="less_amount">
      <el-input
        v-model="newFormInline.less_amount"
        clearable
        placeholder="请输入扣除金额"
      />
    </el-form-item>
    <el-form-item label="增加金额" prop="more_amount">
      <el-input
        v-model="newFormInline.more_amount"
        clearable
        placeholder="请输入增加金额"
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
