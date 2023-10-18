<script setup lang="ts">
import { ref } from "vue";
import { formRules } from "./utils/rule";
import { FormProps } from "./utils/types";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    riqi: "",
    chuanming: "",
    tidanhao: "",
    zhuanghuogang: "",
    xiehuogang: "",
    mudigang: "",
    xianghuozongzhong: "",
    xianghao: "",
    chixiangren: "",
    fujiacaozuo: "",
    chuangongsixiangxing: "",
    haiguanxiangxing: "",
    ISO: "",
    jinchukou: "",
    kongzhong: "",
    maoyileixing: "",
    qianfenghao: "",
    huoming: "",
    xiechuanfufeiren: "",
    zhongzhuanleixing: ""
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
    <el-form-item label="船名：" prop="chuanming">
      <el-input
        v-model="newFormInline.chuanming"
        clearable
        placeholder="请输入船名"
      />
    </el-form-item>
  </el-form>
</template>
