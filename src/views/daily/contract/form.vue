<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    contract_no: "",
    sign_time: "",
    contract_name: "",
    type: "",
    content: "",
    we_company: "",
    oppo_company: "",
    we_agent: "",
    effective_time: "",
    end_time: "",
    total_amount: "",
    paid_amount: "",
    remain_amount: "",
    counts: "",
    department: "",
    status: "",
    remark: ""
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
    <el-form-item label="合同编号" prop="contract_no">
      <el-input
        v-model="newFormInline.contract_no"
        clearable
        placeholder="请输入合同编号"
      />
    </el-form-item>
    <el-form-item label="签订日期" prop="sign_time">
      <el-date-picker
        v-model="newFormInline.sign_time"
        type="date"
        placeholder="请输入签订日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="合同名称" prop="contract_name">
      <el-input
        v-model="newFormInline.contract_name"
        clearable
        placeholder="请输入合同名称"
      />
    </el-form-item>
    <el-form-item label="合同类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择合同类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="劳动合同" value="劳动合同" />
        <el-option label="驾驶员合同" value="驾驶员合同" />
        <el-option label="货物运输合同" value="货物运输合同" />
        <el-option label="物流运输" value="物流运输" />
        <el-option label="挂靠协议" value="挂靠协议" />
        <el-option label="购买车辆" value="购买车辆" />
        <el-option label="车辆租赁" value="车辆租赁" />
        <el-option label="承包运营" value="承包运营" />
        <el-option label="商业保险" value="商业保险" />
        <el-option label="行政" value="行政" />
        <el-option label="其他" value="其他" />
      </el-select>
    </el-form-item>
    <el-form-item label="合同内容" prop="content">
      <el-input
        v-model="newFormInline.content"
        clearable
        placeholder="请输入合同内容"
      />
    </el-form-item>
    <el-form-item label="我方单位" prop="we_company">
      <el-input
        v-model="newFormInline.we_company"
        clearable
        placeholder="请输入我方单位"
      />
    </el-form-item>
    <el-form-item label="对方企业或个人" prop="oppo_company">
      <el-input
        v-model="newFormInline.oppo_company"
        clearable
        placeholder="请输入对方企业或个人"
      />
    </el-form-item>
    <el-form-item label="我司经办人" prop="we_agent">
      <el-input
        v-model="newFormInline.we_agent"
        clearable
        placeholder="请输入我司经办人"
      />
    </el-form-item>
    <el-form-item label="签订日期" prop="effective_time">
      <el-date-picker
        v-model="newFormInline.effective_time"
        type="date"
        placeholder="请输入签订日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="签订日期" prop="end_time">
      <el-date-picker
        v-model="newFormInline.end_time"
        type="date"
        placeholder="请输入签订日期"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="总价款" prop="total_amount">
      <el-input
        v-model="newFormInline.total_amount"
        clearable
        placeholder="请输入总价款"
      />
    </el-form-item>
    <el-form-item label="已支付金额" prop="paid_amount">
      <el-input
        v-model="newFormInline.paid_amount"
        clearable
        placeholder="请输入已支付金额"
      />
    </el-form-item>
    <el-form-item label="合同份数" prop="counts">
      <el-input
        v-model="newFormInline.counts"
        clearable
        placeholder="请输入合同份数"
      />
    </el-form-item>
    <el-form-item label="签约承办部门" prop="department">
      <el-input
        v-model="newFormInline.department"
        clearable
        placeholder="请输入签约承办部门"
      />
    </el-form-item>
    <el-form-item label="合同履行情况" prop="status">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择合同履行情况"
        clearable
        class="!w-[180px]"
      >
        <el-option label="履行中" value="履行中" />
        <el-option label="到期终止" value="到期终止" />
        <el-option label="异常-变更" value="异常-变更" />
        <el-option label="异常-解除" value="异常-解除" />
        <el-option label="异常-违约" value="异常-违约" />
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
