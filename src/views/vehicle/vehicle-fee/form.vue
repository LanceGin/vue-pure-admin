<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    area: "",
    brand: "",
    car_no: "",
    emission: "",
    buy_year: "",
    axles: "",
    company: "",
    guakao: "",
    youka: "",
    guaban_no: "",
    driver: "",
    mobile: "",
    meta: "",
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
    <el-form-item label="所属地" prop="area">
      <el-input
        v-model="newFormInline.area"
        clearable
        placeholder="请输入所属地"
      />
    </el-form-item>
  </el-form>
</template>