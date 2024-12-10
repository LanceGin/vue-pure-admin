<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    car_no: "",
    company: "",
    inspect: "",
    rate: "",
    compulsory_insurance: "",
    commercial_insurance: "",
    trans_insurance: "",
    overclaims_insurance: "",
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
    <el-form-item label="车牌号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车牌号"
      />
    </el-form-item>
    <el-form-item label="公司" prop="company">
      <el-input
        v-model="newFormInline.company"
        clearable
        placeholder="请输入公司"
      />
    </el-form-item>
    <el-form-item label="年检到期" prop="inspect">
      <el-date-picker
        v-model="newFormInline.inspect"
        type="date"
        placeholder="请输入年检到期时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="等评到期" prop="rate">
      <el-date-picker
        v-model="newFormInline.rate"
        type="date"
        placeholder="请输入等评到期时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="交强险" prop="compulsory_insurance">
      <el-date-picker
        v-model="newFormInline.compulsory_insurance"
        type="date"
        placeholder="请输入交强险到期时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="商业险" prop="commercial_insurance">
      <el-date-picker
        v-model="newFormInline.commercial_insurance"
        type="date"
        placeholder="请输入商业险到期时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="货物运输险" prop="trans_insurance">
      <el-date-picker
        v-model="newFormInline.trans_insurance"
        type="date"
        placeholder="请输入货物运输险到期时间"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>
    <el-form-item label="超赔险" prop="overclaims_insurance">
      <el-date-picker
        v-model="newFormInline.overclaims_insurance"
        type="date"
        placeholder="请输入超赔险到期时间"
        value-format="YYYY-MM-DD"
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
