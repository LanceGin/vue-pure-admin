<script setup lang="ts">
import { reactive, ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";
import { vehicleInfoList } from "@/api/vehicle";
import type { PaginationProps } from "@pureadmin/table";
import { useUserStore } from "@/store/modules/user";

const user = useUserStore();
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    is_submit: "",
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
    allocation_start: "",
    actual_amount: "",
    tax_amount: "",
    settlement_confirm: "",
    annex_url: "",
    remark: "",
    add_by: "",
    fee_name: ""
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
  car_no: "",
  driver: "",
  territory: "",
  mobile: "",
  add_by: user.username
});

interface CompanyItem {
  id: string;
  car_no: string;
  car: string;
}
const loading = ref(false);
const list = ref<CompanyItem[]>([]);
const options = ref<CompanyItem[]>([]);
let accData = [];
const data = vehicleInfoList({ pagination, form });
data.then(v => {
  accData = v.data.list;
  list.value = accData.map(item => {
    return {
      id: `${item.id}`,
      car_no: `${item.car_no}`,
      car: `${item.car_no}-${item.driver}-${item.territory}`
    };
  });
});

const remoteMethod = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      options.value = list.value.filter(item => {
        return item.car_no.toLowerCase().includes(query.toLowerCase());
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
    <el-form-item label="是否已提交" prop="is_submit">
      <el-select
        v-model="newFormInline.is_submit"
        placeholder="请选择是否已提交"
        clearable
        class="!w-[180px]"
      >
        <el-option label="未提交" value="未提交" />
        <el-option label="已提交" value="已提交" />
      </el-select>
    </el-form-item>
    <el-form-item label="司机" prop="driver">
      <el-input
        v-model="newFormInline.driver"
        clearable
        placeholder="请输入司机"
      />
    </el-form-item>
    <el-form-item label="申请单位" prop="company">
      <el-input
        v-model="newFormInline.company"
        clearable
        placeholder="请输入申请单位"
      />
    </el-form-item>
    <el-form-item label="车号" prop="car_no">
      <el-select
        v-model="newFormInline.car_no"
        filterable
        remote
        reserve-keyword
        placeholder="输入车号关键字"
        :remote-method="remoteMethod"
        :loading="loading"
        style="width: 240px"
      >
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.car_no"
          :value="item.car_no"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="车挂号" prop="hang_board_no">
      <el-input
        v-model="newFormInline.hang_board_no"
        clearable
        placeholder="请输入车挂号"
      />
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
    <el-form-item label="费用名称" prop="car_fees">
      <el-input
        v-model="newFormInline.car_fees"
        clearable
        placeholder="请输入费用名称"
      />
    </el-form-item>
    <el-form-item label="申请金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        clearable
        placeholder="请输入申请金额"
      />
    </el-form-item>
    <el-form-item label="报销金额" prop="actual_amount">
      <el-input
        v-model="newFormInline.actual_amount"
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
    <el-form-item label="备注" prop="remark">
      <el-input
        v-model="newFormInline.remark"
        clearable
        placeholder="请输入备注"
      />
    </el-form-item>
    <el-form-item label="分摊月份" prop="allocation_month">
      <el-input
        v-model="newFormInline.allocation_month"
        clearable
        placeholder="请输入分摊月份"
      />
    </el-form-item>
    <el-form-item label="分摊起始月" prop="allocation_start">
      <el-date-picker
        v-model="newFormInline.allocation_start"
        type="month"
        placeholder="请输入分摊起始月"
        format="YYYY/MM"
        value-format="YYYY-MM"
      />
    </el-form-item>
  </el-form>
</template>
