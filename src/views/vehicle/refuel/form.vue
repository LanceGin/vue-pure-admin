<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    car_no: "",
    driver: "",
    addtime: "",
    volume: "",
    unit_price: "",
    type: "",
    amount: "",
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
    <el-form-item label="车号" prop="car_no">
      <el-input
        v-model="newFormInline.car_no"
        clearable
        placeholder="请输入车号"
      />
    </el-form-item>

    <el-form-item label="驾驶员" prop="driver">
      <el-input
        v-model="newFormInline.driver"
        clearable
        placeholder="请输入驾驶员"
      />
    </el-form-item>

    <el-form-item label="日期" prop="addtime">
      <el-date-picker
        v-model="newFormInline.addtime"
        type="date"
        placeholder="请输入日期"
        value-format="YYYY-MM-DD"
      />
    </el-form-item>

    <el-form-item label="升数" prop="volume">
      <el-input
        v-model="newFormInline.volume"
        clearable
        placeholder="请输入升数"
      />
    </el-form-item>

    <el-form-item label="单价" prop="unit_price">
      <el-input
        v-model="newFormInline.unit_price"
        clearable
        placeholder="请输入单价"
      />
    </el-form-item>

    <el-form-item label="类型" prop="type">
      <el-select
        v-model="newFormInline.type"
        placeholder="请选择类型"
        clearable
        class="!w-[180px]"
      >
        <el-option label="分配" value="分配" />
        <el-option label="买入" value="买入" />
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
