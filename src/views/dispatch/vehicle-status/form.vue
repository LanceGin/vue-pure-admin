<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    id: "",
    territory: "",
    brand: "",
    car_no: "",
    emission: "",
    life: "",
    axles: "",
    owner: "",
    attachment: "",
    oil_card_owner: "",
    hang_board_no: "",
    driver: "",
    mobile: "",
    attribute: "",
    remark: "",
    status: ""
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
    <el-form-item label="状态：" prop="status">
      <el-select
        v-model="newFormInline.status"
        placeholder="请选择状态"
        clearable
        filterable
        allow-create
        class="!w-[180px]"
      >
        <el-option label="正常" value="正常" />
        <el-option label="不可用" value="不可用" />
      </el-select>
    </el-form-item>
  </el-form>
</template>
