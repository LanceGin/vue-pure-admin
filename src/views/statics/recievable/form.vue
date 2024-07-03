<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { feeNameList } from "@/api/finance";
import { getMotorcadeList } from "@/api/operation";
import type { PaginationProps } from "@pureadmin/table";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    status: "",
    type: "应收",
    account_period: "",
    fee_name: "",
    amount: "",
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
    container_count: "",
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
const fee_form = reactive({
  id: "",
  code: "",
  name: ""
});
const form = reactive({
  id: "",
  companyShortName: "",
  companyName: "",
  companyAddress: "",
  companyContact: "",
  companyPhone1: "",
  state: ""
});

interface FeeItem {
  id: string;
  fee_name: string;
}

interface CompanyItem {
  id: string;
  companyName: string;
  company: string;
}

const loading = ref(false);
const fee_list = ref<FeeItem[]>([]);
const fee_options = ref<FeeItem[]>([]);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let feeData = [];
let accData = [];
const fee_data = feeNameList({ pagination, form: fee_form });
const data = getMotorcadeList({ pagination, form });
fee_data.then(v => {
  feeData = v.data.list;
  fee_list.value = feeData.map(item => {
    return {
      id: `${item.id}`,
      fee_name: `${item.name}`
    };
  });
});
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      companyName: `${item.companyName}`,
      company: `${item.companyName}`
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
        return item.companyName.toLowerCase().includes(query.toLowerCase());
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
    <el-form-item label="客户名称" prop="custom_name">
      <el-select
        v-model="newFormInline.custom_name"
        filterable
        remote
        reserve-keyword
        placeholder="输入客户名称关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.company"
          :value="item.companyName"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="项目名称" prop="project_name">
      <el-input
        v-model="newFormInline.project_name"
        clearable
        placeholder="请输入项目名称"
      />
    </el-form-item>
    <el-form-item label="流向" prop="flow_direction">
      <el-input
        v-model="newFormInline.flow_direction"
        clearable
        placeholder="请输入流向"
      />
    </el-form-item>
    <el-form-item label="服务内容" prop="content">
      <el-select
        v-model="newFormInline.content"
        filterable
        remote
        reserve-keyword
        placeholder="输入服务内容关键字"
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
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="箱型" prop="container_type">
      <el-input
        v-model="newFormInline.container_type"
        clearable
        placeholder="请输入箱型"
        disabled
      />
    </el-form-item>
    <el-form-item label="箱量" prop="container_count">
      <el-input
        v-model="newFormInline.container_count"
        clearable
        placeholder="请输入箱量"
        disabled
      />
    </el-form-item>
    <el-form-item label="应收费用" prop="container_fee">
      <el-input
        v-model="newFormInline.container_fee"
        clearable
        placeholder="请输入应收费用"
        disabled
      />
    </el-form-item>
  </el-form>
</template>
