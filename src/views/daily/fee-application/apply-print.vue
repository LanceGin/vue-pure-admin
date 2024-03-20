<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";

interface FormItemProps {
  selectRows: [];
}
interface FormProps {
  formInline: FormItemProps;
}
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    selectRows: []
  })
});

const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const selectRows = newFormInline.value.selectRows;

console.log(11111, newFormInline, selectRows);

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
    数据冲突，请排查
  </el-form>
</template>
